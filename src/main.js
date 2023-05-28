// display draw

const displayGen = function() {
    const displayParent = document.querySelector('.display');
    for (var item = 0 ; item < 30 ; item++) {
        const display_item = document.createElement('li');
        if (item < 2) display_item.setAttribute('class', 'key-right');
        if (item >= 2 & item <= 3) display_item.setAttribute('class', 'key-wrong');
        if (item === 4) display_item.setAttribute('class', 'key-exist');
        if (item >= 5 & item < 10) display_item.setAttribute('class', 'active');
        if (item < 5) {
            display_item.textContent = 'A';
        }
        displayParent.appendChild(display_item);
    }
}

displayGen();

// keyboard draw

const keyboard = function() {
    const webKeyboard = document.querySelector('.keyboard');
    const fragment = document.createDocumentFragment()
    const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'backspace', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'ENTER'];

    for (let key of keys) {
        const newKey = document.createElement('li');
        if (key === 'backspace') {
            const imgLi = document.createElement('img');
            imgLi.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjI1NSIgdmlld0JveD0iMCAwIDI5MCAyNTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOS44OTE0IDEyNy4yNTFMMTAzLjA2OCA0MEgyNzVWMjE2SDEwMy4xM0wxOS44OTE0IDEyNy4yNTFaIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGxpbmUgeDE9IjEzIiB5MT0iLTEzIiB4Mj0iMTMwLjk0NyIgeTI9Ii0xMyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxMDcgMC43MDcxMDcgLTAuNzY1MzY3IDAuNjQzNTk0IDExNSA4NikiIHN0cm9rZT0iI0ZBRkFGRiIgc3Ryb2tlLXdpZHRoPSIyNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxsaW5lIHgxPSIxMyIgeTE9Ii0xMyIgeDI9IjEzMC45NDciIHkyPSItMTMiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IC0wLjcwNzEwNyAwLjc2NTM2NyAwLjY0MzU5NCAxMzMuNDY1IDE4Ny43ODYpIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';
            newKey.append(imgLi);
        } else {
            newKey.innerText = `${key}`;
        }
        newKey.className = `keyboard__key ${key}`;
        fragment.appendChild(newKey);
    }
    webKeyboard.appendChild(fragment);
}

keyboard();

const keys = document.querySelector('.keyboard')
const display = document.querySelector('.display')

let lastElementClick;

const reqWord = async function() {
    const requestWord = await fetch('https://api.dicionario-aberto.net/random')
    const wordRaw = await requestWord.json();
    if (wordRaw.word.length > 5) {
        reqWord()
    }
}

const handleLastClass = function() {
    (lastElementClick === undefined) 
        ? console.log('nada')
        : lastElementClick.classList.remove('selected');
}

display.addEventListener('click', event => {
    const liClicked = event.target;
    handleLastClass()
    if (liClicked.className.includes('active')) {
        lastElementClick = liClicked;
        liClicked.classList.add('selected')
    }
})

keys.addEventListener('click', event => {
    const keyClick = event.target;
    const nextChild = lastElementClick.nextSibling;
    const previous = lastElementClick.previousSibling;

    if (keyClick.className.includes('backspace')) {
        (!nextChild.className.includes('active'))
            ? (lastElementClick.textContent = '', console.log('apagando ', lastElementClick))
            : (previous.textContent = '', console.log('apagando ', previous));
        if (previous.className.includes('active')) {
            lastElementClick.classList.remove('selected')
            previous.classList.add('selected')
            lastElementClick = previous;
        }
        return;
    }
    if (keyClick.className.includes('keyboard__key')) {
        lastElementClick.textContent = event.target.textContent;
        if (nextChild.className.includes('active')) {
            lastElementClick.classList.remove('selected')
            nextChild.classList.add('selected')
            lastElementClick = nextChild;
            console.log(lastElementClick)
        } 
    }
})

var wordToVerify = [];
const enterKey = document.querySelector('.ENTER');
enterKey.addEventListener('click', event => {
	const getWord = document.querySelectorAll('.active');
    getWord.forEach(value => {
        wordToVerify.push(value.textContent);
    })
    $.ajax({
        url: "verify_word.py",
        type: "POST",
        succes: function(response){
            console.log(response);
        }
    })
})
