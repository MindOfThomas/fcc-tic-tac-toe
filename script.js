var winCombos = [
	[1, 2, 3, 'win'],
	[1, 4, 7, 'win win-vertical'],
	[1, 5, 9, 'win win-lefttoright'],
	[2, 5, 8, 'win win-vertical'],
	[3, 5, 7, 'win win-righttoleft'],
	[3, 6, 9, 'win win-vertical'],
	[4, 5, 6, 'win'],
	[7, 8, 9, 'win']
];
var AI = null;
var player = null;
var currentTurn = null;
var moves = {
	1: [],
	2: []
};
var freeSquares = [1,2,3,4,5,6,7,8,9];
function makeAMove(who, move) {
	if(currentTurn !== who) {
		return;
	}
	var i = freeSquares.indexOf(move);
	if(i > -1) {
		$('#s' + move).text(who === 1 ? 'X' : 'O');
		$('#s' + move).parent().off('click');
		freeSquares.splice(i, 1);
		moves[who].push(move);
		if(gameEnd()) {
			return;
		}
		currentTurn = currentTurn === 2 ? 1 : 2;
		if(who !== AI) {
			AIMove();
		}
	}
}
function gameEnd() {
	for(var i = 0; i < winCombos.length; i++) {
		if(moves[1].indexOf(winCombos[i][0]) > -1 &&
			moves[1].indexOf(winCombos[i][1]) > -1 &&
			moves[1].indexOf(winCombos[i][2]) > -1) {
			uiGameEnd(i, 1);
			return true;
		}
		if(moves[2].indexOf(winCombos[i][0]) > -1 &&
			moves[2].indexOf(winCombos[i][1]) > -1 &&
			moves[2].indexOf(winCombos[i][2]) > -1) {
			uiGameEnd(i, 2);
			return true;
		}
	}
	if(freeSquares.length <= 0) {
		uiGameEnd();
		return true;
	}
	return false;
}
function uiGameEnd(i, winner) {
	if(!i && !winner) {
		$('#winner').parent().text('Tie!');
		$('#winRow').show();
		return;
	}
	$('#s' + winCombos[i][0]).parent().addClass(winCombos[i][3]);
	$('#s' + winCombos[i][1]).parent().addClass(winCombos[i][3]);
	$('#s' + winCombos[i][2]).parent().addClass(winCombos[i][3]);
	$('#winner').text(winner === 1 ? 'X' : 'O');
	$('#winRow').show();
}
function pickNextSquare(who) {
	var square;
	do {
		square = Math.floor(Math.random() * 9 + 1);
	} while(freeSquares.indexOf(square) === -1)
	return square;
}
function AIMove() {
	var square = pickNextSquare(AI);
	setTimeout(function() {
		makeAMove(AI, square);
	}, 1000);
}
function startGame() {
	currentTurn = 1;
	$('#pregame').hide();
	$('#board').show();
	if(AI === 1) {
		AIMove();
	}
}
function restart() {
	$('#board').hide();
	$('#winRow').hide();
	$('.square').removeClass('win win-vertical win-lefttoright win-righttoleft');
	player = null;
	AI = null;
	currentTurn = null;
	$('#pregame').show();
	$('.square span').text('');
	freeSquares = [1,2,3,4,5,6,7,8,9];
	moves[1] = [];
	moves[2] = [];
	init();
}
function init() {
	var select = function(e) {
		player = e.target.id.indexOf('X') > -1 ? 1 : 2;
		AI = player === 2 ? 1 : 2;
		$('#selectX').off('click');
		$('#selectO').off('click');
		startGame();
	};
	var move = function(e) {
		var num = +$(e.target).children('span').attr('id').replace('s', '');
		makeAMove(player, num);
	};
	$('#selectX').on('click', select);
	$('#selectO').on('click', select);
	$('.square').on('click', move);
}
$(document).ready(function() {
	init();
	$('#restart').on('click', restart);
});
