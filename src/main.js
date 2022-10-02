// display draw

const display = function() {
    const displayParent = document.querySelector('.display');
    for (var item = 0 ; item < 35 ; item++) {
        const display_item = document.createElement('li');
        displayParent.appendChild(display_item);
    }
}

display();

// keyboard draw

const keyboard = function() {
    const webKeyboard = document.querySelector('.keyboard');

    const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫', 'ENTER'];

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
        if ((result.word).length === 5) {
            return word(result.word);
        } else {
            return reqWord();
        }
    })
    .catch ((error) => {
        console.error(error);
    })
}

//reqWord();