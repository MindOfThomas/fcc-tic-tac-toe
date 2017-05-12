function perm(permutation) {
  // http://stackoverflow.com/a/37580979
  var length = permutation.length,
      result = new Array([0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600][length]),
      c = new Array(length).fill(0),
      i = 1,
      j = 1;

  result[0] = permutation.slice();
  while (i < length) {
    if (c[i] < i) {
      var k = (i % 2) ? c[i] : 0,
          p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result[j] = permutation.slice();
      ++j;
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}
const winningMoves = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8]
];

const MEASURE_PERFORMANCE = false;
if (MEASURE_PERFORMANCE) {
  var start = performance.now();
}

let games = perm('012345678'.split(''));

let gameStates = {
  X: [],
  O: [],
  tie: []
};
let gameStatesBackup;

removeLosers();

// console.log(games.length + ' games');
// console.log('x wins ' + gameStates.X.length + ' times');
// console.log('o wins ' + gameStates.O.length + ' times');
// console.log('tie ' + gameStates.tie.length + ' times');

// should be:
// 362880 games
// x wins 212256 times
// o wins 104544 times
// tie 46080 times

function gamesQualityCheck() {
  if (
    games.length !==
    (gameStates.X.length + gameStates.O.length + gameStates.tie.length)
  ) throw new Error('bot algorithm error, wrong counts');
}
gamesQualityCheck();

if (MEASURE_PERFORMANCE) {
  console.log(performance.now() - start + 'ms');
}

function removeLosers() {
  for(var i = 0, len = games.length; i < len; i++) {
    let gameState = fakeGame(games[i]);
    if (gameState.winner === 0) {
      gameStates.X.push({
        moves: games[i],
        turns: gameState.turns
      });
    } else if (gameState.winner === 1) {
      gameStates.O.push({
        moves: games[i],
        turns: gameState.turns
      });
    } else {
      gameStates.tie.push({
        moves: games[i]
      });
    }
  }
  gameStatesBackup = JSON.stringify(gameStates);
}

function fakeGame(game) {
  let squares = [0,1,2,3,4,5,6,7,8];

  let moves = [ [], [], ];

  for(var i = 0, len = game.length, turn = 0; i < len; i++) {
    let winner = move(turn, game[i], i);
    if (winner !== null) {
      return {
        winner: winner.winner,
        turns: winner.turns
      };
    }
    turn = turn === 0 ? 1 : 0;
  }

  return false;

  function move(player, square, turn) {
    square = +square;

    squares[indexOf(squares, square)] = squares[squares.length - 1];
    squares.pop();

    moves[player].push(square);

    return tryWin(player, turn);
  }
  function tryWin(player, turn) {
    for(var i = 0, len = winningMoves.length; i < len; i++) {
      if (
        includes(moves[player], winningMoves[i][0]) &&
        includes(moves[player], winningMoves[i][1]) &&
        includes(moves[player], winningMoves[i][2])
      ) {
        return {
          winner: player,
          turns: turn
        };
      }
    }
    return null;
  }
}

function includes(arr, item) {
  for(var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === item) {
      return true;
    }
  }
  return false;
}
function indexOf(arr, item) {
  for(var i = 0, len = arr.length; i < len; i++) {
    if (arr[i] === item) {
      return i;
    }
  }
  return -1;
}

function sync() {
  postMessage(gameStates);
}

sync();

onmessage = function(event) {
  if (event.data === 'reset') {
    gameStates = JSON.parse(gameStatesBackup);
    gamesQualityCheck();
    sync();
    return;
  }

  // main sent a new move, remove games in which this move doesn't happen
  // console.log(event.data);
  filter(event.data.turnNumber, event.data.square, event.data.bot);
  sync();
}

function filter(turnNumber, move, bot) {
  move = typeof move !== 'string' ? move + '' : move;
  let filter = function(game) {
    return game.moves[turnNumber] === move;
  }

  // only filter games where the bot wins or the game ties
  // console.log(bot);
  // console.log(gameStates[bot]);
  gameStates.X = gameStates.X.filter(filter);
  gameStates.O = gameStates.O.filter(filter);
  gameStates.tie = gameStates.tie.filter(filter);

  // console.log('bot wins ' + gameStates[bot].length + ' times');
  // console.log('tie ' + gameStates.tie.length + ' times');
}
