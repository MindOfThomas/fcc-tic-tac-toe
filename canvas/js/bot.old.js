function botWait() {
  setTimeout(function() {
    if (impossible && working) {
      // still working; try again in a moment
      botWait();
      return;
    }

    tryMove('bot', pickSquare());
  }, Math.floor(Math.random() * 1000) + 1);
}
function pickSquare() {
  let pick, index;
  if (impossible) {
    index = nextSquareWin(players.person);
    if (index !== null) {
      return squares[index];
    } else {
      index = nextSquareWin(players.bot);
      if (index !== null) return squares[index];
    }

    // debugging
    if (true) {
      if (turnNumber === 1) return squares[0];
      if (turnNumber === 3) return squares[6];
      if (turnNumber === 5) return squares[5];
      if (turnNumber === 7) return squares[3];
    }

    // look through either the games in which bot wins or the game ties
    let list = botKnowledge[players.bot].length > 0 ? botKnowledge[players.bot] : botKnowledge.tie;

    // pick a random game
    let pickedGame = list[ randomBetween(0, list.length) ].moves;

    // get the square picked in that game
    index = pickedGame[turnNumber];

    pick = squares[index];

    // console.log('list:',list);
    // console.log('picked game:',pickedGame);
    // console.log('move index:',index);
    // console.log('move coordinate:',pick);
  } else {
    index = randomBetween(0, game.squares.length - 1);
    pick = game.squares[index];

    if (!includes(game.squares, pick)) {
      pick = pickSquare();
    }
  }

  return pick;
}

function nextSquareWin(player) {
  // loop through winning games
  //   if any of those games win in the next turn, bot should make that move
  for(var i = 0, len = botKnowledge[player].length; i < len; i++) {
    if (botKnowledge[player][i].turns === turnNumber + 1) {
      console.log(botKnowledge[player][i].moves);
      let index = botKnowledge[player][i].moves[turnNumber + 1];

      // console.log('picked', index, turnNumber, botKnowledge[player][i].turns);
      // pick = squares[index];

      return index;
    }
  }
  return null;
}
