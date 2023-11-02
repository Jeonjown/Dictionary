//EVENT LISTENERS

const searchIcon = document.querySelector(".search-icon");
searchIcon.addEventListener('click', () => {
    const word = getUserInput();
    fetchApi(word);
});


//FUNCTIONS

function getUserInput() {
    const userInput = document.getElementById("searchbar");
    if (userInput.value !== "") {
        const inputText = userInput.value;
        userInput.value = "";
        return inputText;

    } else {
        console.log('please enter a word');
        return null;
    }
}

function fetchApi(userInput) {

    if (userInput === null) {
        return;
    }

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
        .then(response => {
            // Check if the response status code is OK (200)
            if (response.ok) {
                // Parse the response as JSON and log it
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
            // Log the data to the console
            renderData(data[0]);
        });


}



// render word container
function renderWordContainer(data) {
    //word-wrapper
    const wordWrapper = document.querySelector('.word-wrapper');
    wordWrapper.innerHTML = "";

    //word-div
    const wordDiv = document.createElement('div');
    wordDiv.textContent = data.word;
    wordDiv.classList.add('word');
    wordWrapper.append(wordDiv);

    //phonetic-div
    const phoneticDiv = document.createElement('div');
    phoneticDiv.textContent = data.phonetic;
    phoneticDiv.classList.add('phonetic');
    wordWrapper.append(phoneticDiv);
}


function renderMeanings(data) {
    const meanings = data.meanings;

    if (meanings) {
        // Create an object to store meanings and synonyms by part of speech
        const meaningsByPartOfSpeech = {};

        meanings.forEach((meaning) => {
            const partOfSpeech = meaning.partOfSpeech;

            // Check if the partOfSpeech is not in the object, create an entry
            if (!meaningsByPartOfSpeech[partOfSpeech]) {
                meaningsByPartOfSpeech[partOfSpeech] = {
                    meanings: [],
                    synonyms: [],
                };
            }

            // Add definitions and synonyms to the appropriate part of speech
            if (meaning.definitions) {
                meaningsByPartOfSpeech[partOfSpeech].meanings.push(...meaning.definitions);
            }

            if (meaning.synonyms) {
                meaningsByPartOfSpeech[partOfSpeech].synonyms.push(...meaning.synonyms);
            }
        });

        // Render the meanings and synonyms for each part of speech
        for (const partOfSpeech in meaningsByPartOfSpeech) {
            const partOfSpeechContainer = document.querySelector(`.${partOfSpeech}`);
            if (partOfSpeechContainer) {
                const meaningsList = partOfSpeechContainer.querySelector('.meanings');
                const synonymsList = partOfSpeechContainer.querySelector('.synonyms');

                // Clear the previous synonyms before rendering new ones
                synonymsList.innerHTML = "";

                // Render a maximum of 3 meanings for this part of speech
                meaningsByPartOfSpeech[partOfSpeech].meanings.slice(0, 3).forEach((definition) => {
                    const definitionHTML = `<li>${definition.definition}</li>`;
                    meaningsList.innerHTML += definitionHTML;
                });

                // Render a maximum of 3 synonyms for this part of speech
                meaningsByPartOfSpeech[partOfSpeech].synonyms.slice(0, 3).forEach((synonym) => {
                    const synonymHTML = `<li>${synonym}</li>`;
                    synonymsList.innerHTML += synonymHTML;
                });
            }
        }
    }
}


function renderSources(data) {
    const source = data.sourceUrls;

    if (source) {
        let sourceContainer = document.querySelector('.link');
        sourceContainer.innerHTML = "";

        source.forEach(source => {
            const sourceHTML = `${source}`;
            sourceContainer.innerHTML = sourceHTML;
        });
    }
}



// Main Function 
function renderData(data) {
    renderWordContainer(data);
    renderMeanings(data);

    // Select the source container
    const sourceContainer = document.querySelector('.source');

    if (data.sourceUrls) {
        // If there are source URLs, make the source container visible
        sourceContainer.classList.remove('hidden');

        // Render the source URLs
        const sourceLinkContainer = sourceContainer.querySelector('.link');
        sourceLinkContainer.innerHTML = "";

        data.sourceUrls.forEach(source => {
            const sourceHTML = `<a href="${source}" target="_blank">${source}</a>`;
            sourceLinkContainer.innerHTML += sourceHTML;
        });
    } else {
        // If there are no source URLs, hide the source container
        sourceContainer.classList.add('hidden');
    }

    // Loop through part-of-speech elements and check if they have meanings
    const partOfSpeechElements = document.querySelectorAll('.part-of-speech');
    partOfSpeechElements.forEach((partOfSpeechElement) => {
        const meaningsList = partOfSpeechElement.querySelector('.meanings');
        if (meaningsList && meaningsList.children.length > 0) {
            partOfSpeechElement.classList.remove('hidden');
        }
    });
}


//audio button

// Add an event listener to the audio button and play the audio for the searched word
const audioButton = document.querySelector('.audio-icon');

audioButton.addEventListener('click', function () {
    // Get the current word from the word wrapper
    const wordElement = document.querySelector('.word');
    const currentWord = wordElement.textContent;

    // Fetch the API to get word data, including audio URL
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(data => {
            // Extract the audio URL from the API response
            const audioUrl = data[0].phonetics[0].audio;

            // If there's an audio URL, create an audio element and play the audio
            if (audioUrl) {
                const audioElement = new Audio(audioUrl);
                audioElement.play();
            } else {
                console.log('No audio available for this word.');
            }
        });
});









//darkmode

document.addEventListener('DOMContentLoaded', function () {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    darkModeToggle.addEventListener('change', function () {
        if (darkModeToggle.checked) {
            body.classList.add('dark-mode-active');
        } else {
            body.classList.remove('dark-mode-active');
        }
    });
});


//font changer

const selectFontElement = document.getElementById("select-font");
selectFontElement.addEventListener('change', changeFont);

function changeFont() {
    // Get the selected font value
    const select = document.getElementById("select-font");
    const selectedFont = select.value;

    // Set the font style for the entire HTML document
    document.documentElement.style.fontFamily = selectedFont;
}
