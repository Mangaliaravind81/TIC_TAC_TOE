const cells = document.querySelectorAll('.cell');
const xPlayer = document.getElementById('xplayer');
const oPlayer = document.getElementById('oplayer');
const title = document.getElementById('title');
const restartButton = document.getElementById('butt');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;


const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8], 
  [0,3,6], [1,4,7], [2,5,8], 
  [0,4,8], [2,4,6]           
];


function updatePlayerUI() {
  xPlayer.classList.remove('player-active');
  oPlayer.classList.remove('player-active');
  if (currentPlayer === 'X') {
    xPlayer.classList.add('player-active');
  } else {
    oPlayer.classList.add('player-active');
  }
}


function handleClick(e) {
  const index = Array.from(cells).indexOf(e.target);
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  
  if (currentPlayer === 'X') {
    e.target.style.color = '#1892EA';
  } else {
    e.target.style.color = '#A737FF';
  }

  if (checkWinner()) {
    title.textContent = `${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    title.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updatePlayerUI();
}


function checkWinner() {
  return winningCombos.some(combo => {
    return combo.every(i => board[i] === currentPlayer);
  });
}

// Reset the game
function restartGame() {
  board.fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = '';
  });
  currentPlayer = 'X';
  gameActive = true;
  title.textContent = 'CHOOSE';
  updatePlayerUI();
}

xPlayer.addEventListener('click', () => {
  if (currentPlayer !== 'X') {
    currentPlayer = 'X';
    restartGame();
  }
});

oPlayer.addEventListener('click', () => {
  if (currentPlayer !== 'O') {
    currentPlayer = 'O';
    restartGame();
  }
});


cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);


updatePlayerUI();
