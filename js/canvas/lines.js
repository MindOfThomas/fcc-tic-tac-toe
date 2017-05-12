function drawLines() {
  let canvas = document.getElementById('board');
  let width = canvas.width;
  let height = canvas.height;

  let vert1 = [
    {x: width / 3, y: 0},
    {x: width / 3, y: height}
  ];
  let vert2 = [
    {x: (width / 3) * 2, y: 0},
    {x: (width / 3) * 2, y: height}
  ];

  let hor1 = [
    {x: 0, y: height / 3},
    {x: width, y: height / 3}
  ];
  let hor2 = [
    {x: 0, y: (height / 3) * 2},
    {x: width, y: (height / 3) * 2}
  ];

  drawLine(vert1);
  drawLine(vert2);
  drawLine(hor1);
  drawLine(hor2);
}
function drawWinBar(square1, square2) {
  let square1Coords = getCoordBySquare(square1);
  let square1Center = centerCoordOf(square1Coords);

  let square2Coords = getCoordBySquare(square2);
  let square2Center = centerCoordOf(square2Coords);
  // coords order:
  //   topLeft, topRight, bottomRight, bottomLeft

  let leftCoord, rightCoord;
  if (square1Center.x === square2Center.x) {
    // vertical
    leftCoord = {x: square1Center.x, y: square1Coords[0].y};
    rightCoord = {x: square2Center.x, y: square2Coords[2].y};
  } else if (square1Center.y === square2Center.y) {
    // horizontal
    leftCoord = {x: square1Coords[0].x, y: square1Center.y};
    rightCoord = {x: square2Coords[2].x, y: square2Center.y};
  } else {
    // diagonal
    let leftSquareCoords, rightSquareCoords;
    if (square1Coords[0].x < square2Coords[0].x) {
      leftSquareCoords = square1Coords;
      rightSquareCoords = square2Coords;
    } else {
      leftSquareCoords = square2Coords;
      rightSquareCoords = square1Coords;
    }

    if (leftSquareCoords[0].y < rightSquareCoords[2].y) {
      leftCoord = leftSquareCoords[0];
      rightCoord = rightSquareCoords[2];
    } else {
      leftCoord = leftSquareCoords[3];
      rightCoord = rightSquareCoords[1];
    }
  }
  drawLine(leftCoord, rightCoord);
}
