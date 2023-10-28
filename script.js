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
            renderData(data);
        })
        .catch(error => {
            console.error('Error fetching data: ' + error);
        });

}



// render word container
function renderWordContainer(data) {
    //word-wrapper
    const wordWrapper = document.querySelector('.word-wrapper');
    wordWrapper.innerHTML = "";

    //word-div
    const wordDiv = document.createElement('div');
    wordDiv.textContent = data[0].word;
    wordDiv.classList.add('word');
    wordWrapper.append(wordDiv);

    //phonetic-div
    const phoneticDiv = document.createElement('div');
    phoneticDiv.textContent = data[0].phonetic;
    phoneticDiv.classList.add('phonetic');
    wordWrapper.append(phoneticDiv);
}

function renderPartOfSpeech(data) {
    //noun-div
    const nounDiv = document.querySelector('.part-of-speech');
    nounDiv.innerHTML = "";
    const paragraph = document.createElement('p');
    paragraph.textContent = data[0].meanings[0].partOfSpeech;
    nounDiv.append(paragraph);

}

function renderDefinition() {

}

function renderSynonyms() {

}

function renderExamples() {

}

function renderSources() {

}



// Main Function 
function renderData(data) {
    renderWordContainer(data);
    renderPartOfSpeech(data);
}