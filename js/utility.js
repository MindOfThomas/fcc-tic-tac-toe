function centerCoord(width, height) {
  let canvas = document.getElementById('board');
  let cwidth = canvas.width;
  let cheight = canvas.height;

  return {
    x: (cwidth / 2) - (width / 2),
    y: (cheight / 2) - (height / 2)
  };
}
function centerCoordOf(shape) {
  // shape = array of obj-coords
  let x  = shape[0].x;
      x += shape[1].x;
      x += shape[2].x;
      x += shape[3].x;
      x /= 4;

  let y  = shape[0].y;
      y += shape[1].y;
      y += shape[2].y;
      y += shape[3].y;
      y /= 4;

  return {x, y};
}
function getCoordBySquare(square) {
  let canvas = document.getElementById('board');
  let width = canvas.width;
  let height = canvas.height;

  let topLeft = {
    x: (width / 3) * square[0],
    y: (height / 3) * square[1]
  };
  let topRight = {
    x: topLeft.x + (width / 3),
    y: topLeft.y
  };
  let bottomLeft = {
    x: topLeft.x,
    y: topLeft.y + (height / 3)
  };
  let bottomRight = {
    x: topRight.x,
    y: topRight.y + (height / 3)
  };

  return [topLeft, topRight, bottomRight, bottomLeft];
}
function getSquareByCoord(coord) {
  let canvas = document.getElementById('board');
  let width = canvas.width;
  let height = canvas.height;

  let column;
  if (coord.x <= (width / 3)) {
    column = 0;
  } else if (coord.x <= ((width / 3) * 2)) {
    column = 1;
  } else {
    column = 2;
  }

  let row;
  if (coord.y <= (height / 3)) {
    row = 0;
  } else if (coord.y <= ((height / 3) * 2)) {
    row = 1;
  } else {
    row = 2;
  }

  return [column, row];
}
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getCursorPosition(canvas, event) {
  // http://stackoverflow.com/a/27204937

  var x, y;

  var rect = canvas.getBoundingClientRect();
  var top = rect.top;
  var bottom = rect.bottom;
  var left = rect.left;
  var right = rect.right;

  var styling = getComputedStyle(canvas, null);

  var topBorder = parseInt(styling.getPropertyValue('border-top-width'), 10);
  var rightBorder = parseInt(styling.getPropertyValue('border-right-width'), 10);
  var bottomBorder = parseInt(styling.getPropertyValue('border-bottom-width'), 10);
  var leftBorder = parseInt(styling.getPropertyValue('border-left-width'), 10);

  left   += leftBorder;
  right  -= rightBorder;
  top    += topBorder;
  bottom -= bottomBorder;

  x = event.clientX - left;
  y = event.clientY - top;

  var width = right - left;

  if(canvas.width != width) {
    var height = bottom - top;

    x = x * (canvas.width / width);
    y = y * (canvas.height / height);
  }

  return {x,y};
}
function includes(arr1, arr2) {
  // not a very general function; only checks first 2 items
  for(var i = 0; i < arr1.length; i++) {
    if (arr1[i][0] === arr2[0] && arr1[i][1] === arr2[1]) {
      return true;
    }
  }
  return false;
}
function indexOf(arr1, arr2) {
  for(var i = 0; i < arr1.length; i++) {
    if (arr1[i][0] === arr2[0] && arr1[i][1] === arr2[1]) {
      return i;
    }
  }
  return -1;
}
