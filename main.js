
function createBoard() {
    for(let i = 1; i<10; i++) {
        const tile = document.createElement('div')
        tile.setAttribute('class', 'square')
        tile.setAttribute('id', i)
        document.getElementById('game').appendChild(tile)
    }
}

createBoard()

let squares = document.querySelectorAll('.square');

let xTurn = true

squares.forEach(square => {
    square.addEventListener('click', function() {
        handleTurns(square)
        checkVerticalWin(square)
        checkHorizontalWin(square)
        checkDiagonalWin(square)
    })
})

function handleTurns(square){
    if(xTurn) {
        square.innerText = 'X'
        square.classList.add('x')
        xTurn = false
    } else {
        square.innerText = 'O'
        square.classList.add('o')
        xTurn = true
    }
}

function checkVerticalWin(square) {
    let columnIndex = (square.id - 1) % 3
    if(
        checkSquare(1 + columnIndex) &&
        checkSquare(4 + columnIndex) &&
        checkSquare(7 + columnIndex)
    ) {
        endGame()
    }
}

function checkSquare(id) {
    const square = document.getElementById(id);
    return square && square.innerText !== '' && square.innerText === squares[id - 1].innerText;
}

function checkHorizontalWin(square) {
    let rowIndex = Math.floor((square.id -1) / 3)
    if(
        checkSquare(1 + rowIndex * 3) &&
        checkSquare(2 + rowIndex * 3) &&
        checkSquare(3 + rowIndex * 3)
    ) {
        endGame()
    }
}

function checkDiagonalWin(square) {
    if(checkSquare(1) && checkSquare(5) && checkSquare(9)) {
        endGame()
    } else if (checkSquare(3) && checkSquare(5) && checkSquare(7)) {
        endGame()
    }
}

function endGame(){
    let winText = document.getElementById('winText');
    winText.classList.remove('hidden')
    playAgain.classList.remove('hidden')
    if(xTurn) {
        winText.innerHTML = `O is the winner`
    } else winText.innerHTML = `X is the winner`
}

function restartGame() {
    let winText = document.getElementById('winText');
    winText.classList.add('hidden')
    playAgain.classList.add('hidden')
    squares.forEach(square => {
        square.className = 'square'
        square.innerText = ''
    })
}

let playAgain = document.getElementById('playAgain');

playAgain.addEventListener('click', restartGame)
