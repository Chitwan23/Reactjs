import React, { useState } from 'react';
import './RockPaperScissors.css';

const RockPaperScissors = () => {
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [message, setMessage] = useState('Play your move');

  const choices = ['rock', 'paper', 'scissors'];

  const genCompChoice = () => {
    const randIdx = Math.floor(Math.random() * 3);
    return choices[randIdx];
  };

  const drawGame = () => {
    setMessage('Game was Draw. Play again.');
  };

  const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
      setUserScore(userScore + 1);
      setMessage(`You win! Your ${userChoice} beats ${compChoice}`);
    } else {
      setCompScore(compScore + 1);
      setMessage(`You lost. ${compChoice} beats your ${userChoice}`);
    }
  };

  const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
      drawGame();
    } else {
      let userWin = true;
      if (userChoice === 'rock') {
        userWin = compChoice === 'scissors';
      } else if (userChoice === 'paper') {
        userWin = compChoice === 'rock';
      } else {
        userWin = compChoice === 'paper';
      }
      showWinner(userWin, userChoice, compChoice);
    }
  };

  return (
    <div className="rps-container">
      <h1>Rock Paper Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <div key={choice} className="choice" id={choice} onClick={() => playGame(choice)}>
            <img src={`./images/${choice}.png`} alt={choice} />
          </div>
        ))}
      </div>

      <div className="score-board">
        <div className="score">
          <p id="user-score">{userScore}</p>
          <p>You</p>
        </div>
        <div className="score">
          <p id="comp-score">{compScore}</p>
          <p>Comp</p>
        </div>
      </div>

      <div className="msg-container">
        <p id="msg">{message}</p>
      </div>
    </div>
  );
};

export default RockPaperScissors;

