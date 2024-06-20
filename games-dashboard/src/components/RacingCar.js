// src/Game.js
import React, { useState, useEffect, useRef } from 'react';
import './RacingCar.css';

const Game = () => {
  const [carPosition, setCarPosition] = useState(50);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const gameAreaRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCarPosition((prev) => Math.max(prev - 5, 0));
      } else if (e.key === 'ArrowRight') {
        setCarPosition((prev) => Math.min(prev + 5, 100));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) => {
        const newObstacles = prev.map(obstacle => ({
          ...obstacle,
          top: obstacle.top + 5,
        })).filter(obstacle => obstacle.top < 100);
        if (Math.random() < 0.1) {
          newObstacles.push({ left: Math.random() * 90, top: 0 });
        }
        return newObstacles;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const checkCollision = () => {
      for (const obstacle of obstacles) {
        if (
          obstacle.top > 80 && 
          obstacle.top < 90 && 
          Math.abs(obstacle.left - carPosition) < 10
        ) {
          alert('Game Over');
          setObstacles([]);
          setScore(0);
          return;
        }
      }
      setScore(prev => prev + 1);
    };
    checkCollision();
  }, [obstacles, carPosition]);

  return (
    <div className="game-area" ref={gameAreaRef}>
      <div className="car" style={{ left: `${carPosition}%` }} />
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className="obstacle"
          style={{ left: `${obstacle.left}%`, top: `${obstacle.top}%` }}
        />
      ))}
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Game;
