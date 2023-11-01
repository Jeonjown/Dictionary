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

    // Part of Speech
    const partOfSpeechContainer = document.querySelector('.part-of-speech');
    partOfSpeechContainer.textContent = "";

    // Definitions
    const definitionContainer = document.querySelector('.definition-container');
    definitionContainer.innerHTML = "";

    // Synonyms
    const synonymContainer = document.querySelector('.synonyms');
    synonymContainer.innerHTML = "";

    if (meanings) {
        meanings.forEach((meaning) => {
            const partOfSpeech = meaning.partOfSpeech;
            const definitions = meaning.definitions;
            const synonyms = meaning.synonyms;


            if (partOfSpeech) {
                // Part of Speech
                const partOfSpeechElement = document.createElement('div');
                partOfSpeechElement.textContent = partOfSpeech;
                partOfSpeechContainer.appendChild(partOfSpeechElement);
            }

            if (definitions) {
                // Definitions
                definitions.forEach(definition => {
                    const definitionHTML = `<li>${definition.definition}</li>`;
                    definitionContainer.innerHTML += definitionHTML;
                });
            }

            if (synonyms) {
                // Synonyms
                synonyms.forEach(synonym => {
                    const synonymHTML = `<li>${synonym}</li>`;
                    synonymContainer.innerHTML += synonymHTML;
                });

            }
        });
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
    renderSources(data);

}


