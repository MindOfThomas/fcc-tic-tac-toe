function setupCanvas() {
  let canvas = document.getElementById('board');
  let width = canvas.width;
  let height = canvas.height;

  canvas.addEventListener('click', handleCanvasClick);

  drawLines();
}
function clearCanvas() {
  let canvas = document.getElementById('board');
  canvas.removeEventListener('click', handleCanvasClick)

  let ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleCanvasClick(event) {
  let canvas = document.getElementById('board');
  let clickCoord = getCursorPosition(canvas, event);
  let square = getSquareByCoord(clickCoord);

  tryMove('person', square);
}
