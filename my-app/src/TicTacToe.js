import React, { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turnO, setTurnO] = useState(true); // Player O starts
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0); // To track draw

  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurnO(true);
    setMessage('');
    setCount(0);
  };

  const handleClick = (index) => {
    if (board[index] || message) return;
    
    const newBoard = board.slice();
    newBoard[index] = turnO ? 'O' : 'X';
    setBoard(newBoard);
    setTurnO(!turnO);
    setCount(count + 1);

    if (checkWinner(newBoard)) {
      setMessage(`Congratulations, Winner is ${newBoard[index]}`);
    } else if (count + 1 === 9) {
      setMessage('Game was a Draw.');
    }
  };

  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="game-container">
      {message && (
        <div className="msg-container">
          <p id="msg">{message}</p>
          <button id="new-btn" onClick={resetGame}>New Game</button>
        </div>
      )}
      <main>
        <h1>Tic Tac Toe</h1>
        <div className="container">
          <div className="game">
            {board.map((value, index) => (
              <button key={index} className="box" onClick={() => handleClick(index)}>
                {value}
              </button>
            ))}
          </div>
        </div>
        <button id="reset-btn" onClick={resetGame}>Reset Game</button>
      </main>
    </div>
  );
};

export default TicTacToe;
