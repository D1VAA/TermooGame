const keys = document.querySelector('.keyboard')
const display = document.querySelector('.display')

let currentElementClick;

let win = false;

const handleLastClass = function () {
    (currentElementClick === undefined)
        ? console.log('nada')
        : currentElementClick.classList.remove('selected');
}

function handleDisplaySelectedPos(direction, currRef) {
    const nextChild = currRef.nextSibling
    const previousChild = currRef.previousSibling
    if (direction === 'right') {
        if (!nextChild.className.includes('active')) return;

        currentElementClick.classList.remove('selected')
        currentElementClick = nextChild
        currentElementClick.classList.add('selected')
    } else if (direction === 'left') {
        if (!previousChild.className.includes('active')) return;

        currentElementClick.classList.remove('selected')
        currentElementClick = previousChild
        currentElementClick.classList.add('selected')
    }
}

function handleBackspace(curr) {
    const next = currentElementClick.nextSibling;
    const prev = currentElementClick.previousSibling;
    if (!prev.className.includes('active')) return;
    if (curr.className.includes('active') && curr.textContent !== '') {
        curr.textContent = ''
    } else {
        prev.textContent = ''
        handleDisplaySelectedPos('left', curr)
    }
}

function handleFocus() {
    const foc = [...document.querySelectorAll('.active')]
    for (let li of foc) {
        if (li.textContent === '') {
            li.classList.add('selected')
            currentElementClick = li
            li.focus()
            break
        }
    }
}

function handleKeyUsed(keys) {
    console.log(`As teclas usadas foram ${keys}`)
    
    
}

window.addEventListener("load", handleFocus)

display.addEventListener('click', event => {
    const liClicked = event.target;
    handleLastClass()
    if (liClicked.className.includes('active')) {
        currentElementClick = liClicked;
        liClicked.classList.add('selected')
    }
})

keys.addEventListener('click', event => {
    if (win) return;
    const keyClick = event.target;

    if (keyClick.className.includes('backspace')) {
        handleBackspace(currentElementClick)
        return;
    }
    if (keyClick.className.includes('ENTER')) sendWord();

    if (keyClick.className.includes('keyboard__key') && !keyClick.className.includes('ENTER')) {
        currentElementClick.textContent = event.target.textContent;
        handleDisplaySelectedPos('right', currentElementClick)
    }
})

document.addEventListener('keydown', e => {
    if (win) return;
    if (e.key === 'Enter') sendWord();
    if (e.key === 'Backspace') {
        handleBackspace(currentElementClick)
    }
    if (typeof currentElementClick !== 'undefined' && currentElementClick.className.includes('selected') && e.key.match(/[a-z]/i) && e.key.length === 1) {
        currentElementClick.textContent = e.key
        handleDisplaySelectedPos('right', currentElementClick)
    }
})

function sendWord() {
    const chars = [...document.querySelectorAll('.active')]
    const charsWord = chars.map(li => li.textContent).join('')
    if (charsWord.length === 5) sendAttempt(charsWord);
}

function handleAttempt(list) {
    const actives = [...document.querySelectorAll('.active')]
    actives.forEach((item, index) => {
        if (list[index] === 'c') {
            item.classList.add('key-right')
        } else if (list[index] === 'in') {
            item.classList.add('key-exist')
        } else {
            item.classList.add('key-wrong')
        }
        if (item.className.includes('selected')) item.classList.remove('selected');
        item.classList.remove('active')
    })
    if (win) {
        let interval = 800;
        actives.forEach(item => {
            setTimeout(() => item.classList.add('win'), interval)
            interval += 200;
        })
        return;
    }
    const lis = [...document.querySelectorAll("li:not([class])")]
    const line = lis.filter((item, index) => (index < 5))
    line.forEach((item, i) => {
        if (i === 0) {
            (item.classList.add('selected'))
            currentElementClick = item
        }
        item.classList.add('active')
    })
}
