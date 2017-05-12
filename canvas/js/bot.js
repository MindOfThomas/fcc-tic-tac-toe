function botWait() {
  setTimeout(function() {
    tryMove('bot', pickSquare());
  }, Math.floor(Math.random() * 1000) + 1);
}
function pickSquare() {
  let pick;

  switch(mode) {
    case 'easy': {
      // pick moves randomly

      let index = randomBetween(0, game.squares.length - 1);
      pick = game.squares[index];

      if (!includes(game.squares, pick)) {
        pick = pickSquare();
      }
      break;
    }
    case 'normal': {
      // make moves that result in bot winning
      break;
    }
    case 'hard': {
      // 1. block player from winning
      // 2. make moves that result in bot winning
      break;
    }
  }

  return pick; // pick should be square coordinates (e.g. [0, 1])
}

function nextSquareWin(player) {
  // return whether player can win on thier next turn
}
