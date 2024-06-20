// src/Game.js
import React, { useState, useEffect } from 'react';
import './Fight.css';

const Game = () => {
  const [player1Health, setPlayer1Health] = useState(100);
  const [player2Health, setPlayer2Health] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState(1); // 1 for player 1, 2 for player 2

  useEffect(() => {
    if (player1Health <= 0 || player2Health <= 0) {
      setGameOver(true);
    }
  }, [player1Health, player2Health]);

  const attack = () => {
    const damage = Math.floor(Math.random() * 20) + 1; // Random damage between 1 and 20
    if (turn === 1) {
      setPlayer2Health((prev) => Math.max(prev - damage, 0));
      setTurn(2);
    } else {
      setPlayer1Health((prev) => Math.max(prev - damage, 0));
      setTurn(1);
    }
  };

  const resetGame = () => {
    setPlayer1Health(100);
    setPlayer2Health(100);
    setGameOver(false);
    setTurn(1);
  };

  return (
    <div className="game-area">
      <div className="player" id="player1">
        <h2>Player 1</h2>
        <div className="health-bar">
          <div className="health" style={{ width: `${player1Health}%` }}></div>
        </div>
        <p>{player1Health} HP</p>
      </div>
      <div className="player" id="player2">
        <h2>Player 2</h2>
        <div className="health-bar">
          <div className="health" style={{ width: `${player2Health}%` }}></div>
        </div>
        <p>{player2Health} HP</p>
      </div>
      {!gameOver ? (
        <button onClick={attack} className="attack-button">
          Player {turn} Attack
        </button>
      ) : (
        <button onClick={resetGame} className="reset-button">
          Reset Game
        </button>
      )}
      {gameOver && (
        <h1>
          Game Over! Player {player1Health <= 0 ? 2 : 1} Wins!
        </h1>
      )}
    </div>
  );
};

export default Game;
