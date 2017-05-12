function botWait() {
  setTimeout(function() {
    tryMove('bot', pickSquare());
  }, Math.floor(Math.random() * 1000) + 1);
}
function pickSquare() {
  return pickRandomSquare();
}

function pickRandomSquare() {
  let index = randomBetween(0, board.available.length - 1);
  let pick = board.available[index];

  if (!includes(board.available, pick)) {
    pick = pickSquare();
  }

  return pick;
}
