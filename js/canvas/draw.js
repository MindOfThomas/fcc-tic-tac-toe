function drawSquare(coord, width, color) {
  let ctx = document.getElementById('board').getContext('2d');

  ctx.fillStyle = color || 'rgba(0, 0, 200, 0.5)';

  ctx.rect(coord.x, coord.y, width, width);
  ctx.fill();
}
function drawLine(coord1, coord2) {
  if (Array.isArray(coord1)) {
    coord2 = coord1[1];
    coord1 = coord1[0];
  }

  let ctx = document.getElementById('board').getContext('2d');

  ctx.beginPath();
  ctx.moveTo(coord1.x, coord1.y);
  ctx.lineTo(coord2.x, coord2.y);
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.closePath();
}
function drawText(text, coord, size, width, color) {
  let canvas = document.getElementById('board');
  let ctx = canvas.getContext('2d');

  ctx.font = size + 'px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (color) ctx.fillStyle = color;
  ctx.fillText(text, coord.x, coord.y, width);
}
