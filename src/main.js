// keyboard draw

const keyboard = function criarTeclado() {
    const webKeyboard = document.querySelector('.keyboard');

    const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

    for (var key of keys) {
        const newKey = document.createElement('li');
        newKey.innerText = `${key}`;
        newKey.className = 'keyboard__key';
        webKeyboard.appendChild(newKey);
    }
}

keyboard();

// buscando a palavra

const word = function(request) {
    const newWord = document.createElement('div');
    newWord.innerText = `${request}`;
    document.body.appendChild(newWord);
}

const reqWord = function() {
    fetch('https://api.api-ninjas.com/v1/randomword', {
        method: 'GET',
        headers: {'X-Api-Key':'SbkzU+duifK06hONAS74Hg==3DrEJk0vcLjdHC8T'}
    })
    .then ((response) => response.json())
    .then ((result) => {
        return word(result.word);
    })
    .catch ((error) => {
        console.error(error);
    })
}

reqWord();