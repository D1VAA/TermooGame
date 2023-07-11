socket = io.connect();
console.log('Connecting...')

function sendAttempt(word) {
    console.log("Enviando...")
    socket.emit('attempt', word)
}

socket.on('response', function ({atp, ver}) {
    if (ver.join('') === 'ccccc') win = true;
    handleAttempt(ver)
})
