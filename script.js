const board = document.getElementById('chessboard');
const pieces = {
    r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
    R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙"
};

let selected = null;

// Initial board setup (simple 2D array)
let gameBoard = [
  ["r","n","b","q","k","b","n","r"],
  ["p","p","p","p","p","p","p","p"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["P","P","P","P","P","P","P","P"],
  ["R","N","B","Q","K","B","N","R"]
];

function drawBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.classList.add((i+j)%2 === 0 ? 'light' : 'dark');
            square.dataset.row = i;
            square.dataset.col = j;
            square.textContent = pieces[gameBoard[i][j]] || "";
            square.addEventListener('click', onSquareClick);
            board.appendChild(square);
        }
    }
}

function onSquareClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (selected) {
        // Move piece
        gameBoard[row][col] = gameBoard[selected.row][selected.col];
        gameBoard[selected.row][selected.col] = "";
        selected = null;
        drawBoard();
    } else if (gameBoard[row][col] !== "") {
        selected = { row, col };
        highlightMoves(row, col);
    }
}

function highlightMoves(row, col) {
    drawBoard();
    const square = document.querySelector(`.square[data-row='${row}'][data-col='${col}']`);
    square.classList.add('highlight');
}

drawBoard();
