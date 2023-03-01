// constants 
const colors = {
    '1': 'green',
    '-1': 'red',
    'null': 'grey'
  };
  
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  // app's state variables
  let board
   let turn
     let winner;
  
  // cached element 
  const msg = document.querySelector('h1');
  const reStartBtn = document.querySelector('button');
  
  // event listeners 
  document.getElementById('board').addEventListener('click', moveHandle);
 reStartBtn.addEventListener('click', initialize);
  
 
  
  // Initializing  state variables
  function initialize() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = null;
    render();
  }
 // functions 
 initialize();
  // Views of state in the DOM
  function render() {
    renderBoard();
    rendermsg(); 
  }
  
  function renderBoard() {
    board.forEach(function(squareVal, index) {
      const squareEl = document.getElementById(`sq-${index}`);
      squareEl.style.backgroundColor = colors[squareVal];

    });
  }
  
  function rendermsg() {
    if (winner === 'T') {
      msg.innerHTML = ' Tie Game!';
    } else if (winner) {
      msg.innerHTML = `You are the winner <span style="color: ${colors[winner]}">${colors[winner].toUpperCase()}</span>!`;
    } else {
      msg.innerHTML = `<span style="color: ${colors[turn]}">${colors[turn].toUpperCase()}</span>'s Attempt`;
    }
  }
  
  // Updating all impacted state
  function moveHandle(evt) {
    // index of square
    const index = parseInt(evt.target.id.replace('sq-', ''));
   if (isNaN(index) ||board[index] ||winner)
     return;
    // Updating state: board, turn, winner
    board[index] = turn;
    turn *= -1;
    winner = getWinner();
    // Render updated state
    render();
  }
  
  function getWinner() {
    for (let i = 0; i < winningCombinations.length; i++) {
      if (Math.abs(board[winningCombinations[i][0]] + board[winningCombinations[i][1]] + board[winningCombinations[i][2]]) === 3) return board[winningCombinations[i][0]];
    }
    
    if (board.includes(null)) return null;
    return 'T';
  }
  
  