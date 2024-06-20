import React, { useEffect, useState, useRef } from 'react';
import './Snake.css';

const Snake = () => {
  const [snake, setSnake] = useState([{ x: 13, y: 15 }]);
  const [food, setFood] = useState({ x: 6, y: 7 });
  const [inputDir, setInputDir] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(19);
  const [lastPaintTime, setLastPaintTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => JSON.parse(localStorage.getItem('hiscore')) || 0);
  const boardRef = useRef();

  const foodSound = new Audio('music/food.mp3');
  const gameOverSound = new Audio('music/gameover.mp3');
  const moveSound = new Audio('music/move.mp3');
  const musicSound = new Audio('music/music.mp3');

  useEffect(() => {
    window.requestAnimationFrame(main);
    window.addEventListener('keydown', handleKeydown);
    musicSound.play();

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [snake, food, inputDir]);

  const handleKeydown = (e) => {
    moveSound.play();
    switch (e.key) {
      case 'ArrowUp':
        setInputDir({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        setInputDir({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        setInputDir({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        setInputDir({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  const main = (ctime) => {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
    setLastPaintTime(ctime);
    gameEngine();
  };

  const isCollide = (snake) => {
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) return true;

    return false;
  };

  const gameEngine = () => {
    // Part 1: Updating the snake array & Food
    if (isCollide(snake)) {
      gameOverSound.play();
      musicSound.pause();
      setInputDir({ x: 0, y: 0 });
      alert('Game Over. Press any key to play again!');
      setSnake([{ x: 13, y: 15 }]);
      musicSound.play();
      setScore(0);
      setGameOver(true);
    }

    // If you have eaten the food, increment the score and regenerate the food
    if (snake[0].y === food.y && snake[0].x === food.x) {
      foodSound.play();
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
        localStorage.setItem('hiscore', JSON.stringify(score + 1));
      }
      setSnake([{ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y }, ...snake]);
      let a = 2;
      let b = 16;
      setFood({ x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) });
    } else {
      setSnake((prev) => {
        const newSnake = [...prev];
        for (let i = newSnake.length - 2; i >= 0; i--) {
          newSnake[i + 1] = { ...newSnake[i] };
        }
        newSnake[0] = { x: newSnake[0].x + inputDir.x, y: newSnake[0].y + inputDir.y };
        return newSnake;
      });
    }
  };

  return (
    <div className="snake-game">
      <div id="scoreBox">Score: {score}</div>
      <div id="hiscoreBox">HiScore: {highScore}</div>
      <div id="board" ref={boardRef}>
        {snake.map((segment, index) => (
          <div
            key={index}
            className={index === 0 ? 'head' : 'snake'}
            style={{ gridRowStart: segment.y, gridColumnStart: segment.x }}
          ></div>
        ))}
        <div className="food" style={{ gridRowStart: food.y, gridColumnStart: food.x }}></div>
      </div>
    </div>
  );
};

export default Snake;
