// dictionary:
// token = X || O

let winnerName = '';
let board = {
  available: [],
  X: [],
  O: []
};

let botEnabled = true;

let turnToken = 'X';
let turnNumber = 0;

let tokens = {
  person: 'X',
  bot: 'O'
};

function setupGame() {
  winnerName = '';
  turnToken = 'X';
  turnNumber = 0;

  board.available = JSON.parse(JSON.stringify(squares));
  board.X.length = 0;
  board.O.length = 0;
}

function moveController() {
  // TODO if player clicks before bot moves player can go more than once
  //   NOTE maybe not
  if (winnerName !== '') return;

  if (botEnabled && turnToken === tokens.bot) {
    botWait();
  }
}

function tryMove(playerName, square) {
  let playerToken = botEnabled ? tokens[playerName] : turnToken;

  let squareAvailable = includes(board.available, square);
  if (!squareAvailable || turnToken !== playerToken) return;

  let index = indexOf(board.available, square);
  board.available.splice(index, 1);

  board[playerToken].push(square);

  let canvas = document.getElementById('board');
  let width = canvas.width;
  let squareCoords = getCoordBySquare(square);
  let squareCenter = centerCoordOf(squareCoords);
  drawText(playerToken, squareCenter, 200, (width / 3), playerToken === 'X' ? '#C62828' : 'black');

  tryWin(playerName, playerToken);

  turnToken = turnToken === 'X' ? 'O' : 'X';

  moveController();

  turnNumber++;
}

function tryWin(playerName, playerToken) {
  let moves = board[playerToken];
  if (moves.length < 3) return;

  for(var i = 0; i < winningMoves.length; i++) {
    let combo = winningMoves[i];
    if (includes(moves, combo[0]) && includes(moves, combo[1]) && includes(moves, combo[2])) {
      win(playerName, playerToken, combo);
      return;
    }
  }

  if (board.available.length === 0) {
    win(null);
    return;
  }
}
function win(playerName, playerToken, squares) {
  let winner = 'Nobody';
  if (playerName !== null) {
    if (botEnabled) {
      winner = playerName === 'bot' ? 'Bot' : 'You';
    } else {
      winner = playerToken;
    }
    drawWinBar(squares[0], squares[2]);
  }

  let winnerNameEl = document.getElementById('player');
  winnerNameEl.textContent = winner;
  document.getElementById('winner').style.display = 'block';
  document.getElementById('play-again').style.display = 'block';

  setTimeout(function() {
    showModal();
  }, 750);

  winnerName = winner;
}
