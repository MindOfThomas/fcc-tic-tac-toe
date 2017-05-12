const winningMoves = [
  [
    [0, 0], // 1
    [1, 0], // 2
    [2, 0]  // 3
  ],
  [
    [0, 0], // 1
    [1, 1], // 5
    [2, 2]  // 9
  ],
  [
    [0, 0], // 1
    [0, 1], // 4
    [0, 2]  // 7
  ],
  [
    [1, 0], // 2
    [1, 1], // 5
    [1, 2]  // 8
  ],
  [
    [2, 0], // 3
    [1, 1], // 5
    [0, 2]  // 7
  ],
  [
    [2, 0], // 3
    [2, 1], // 6
    [2, 2]  // 9
  ],
  [
    [0, 1], // 4
    [1, 1], // 5
    [2, 1]  // 6
  ],
  [
    [0, 2], // 7
    [1, 2], // 8
    [2, 2]  // 9
  ]
];
const squares = [
  [0, 0], // 0
  [1, 0], // 1
  [2, 0], // 2

  [0, 1], // 3
  [1, 1], // 4
  [2, 1], // 5

  [0, 2], // 6
  [1, 2], // 7
  [2, 2]  // 8
];

// quality check:
if (squares[0].toString() !== [0, 0].toString()) throw new Error('wrong square');
if (squares[1].toString() !== [1, 0].toString()) throw new Error('wrong square');
if (squares[2].toString() !== [2, 0].toString()) throw new Error('wrong square');

if (squares[3].toString() !== [0, 1].toString()) throw new Error('wrong square');
if (squares[4].toString() !== [1, 1].toString()) throw new Error('wrong square');
if (squares[5].toString() !== [2, 1].toString()) throw new Error('wrong square');

if (squares[6].toString() !== [0, 2].toString()) throw new Error('wrong square');
if (squares[7].toString() !== [1, 2].toString()) throw new Error('wrong square');
if (squares[8].toString() !== [2, 2].toString()) throw new Error('wrong square');
