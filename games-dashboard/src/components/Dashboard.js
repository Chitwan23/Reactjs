import React, { useState } from 'react';
import TicTacToe from './TicTacToe';
import Snake from './Snake';
import RacingCar from './RacingCar';
import Fight from './Fight';
import './Dashboard.css';
import ticTacToeIcon from './tic-tac-toe-icon.png'; // Ensure this path is correct
import snakeIcon from './snake-icon.png'; // Ensure this path is correct
import racingCarIcon from './racing-car-icon.png'; // Add appropriate icon
import fightIcon from './fight-icon.png'; // Add appropriate icon

const Dashboard = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'TicTacToe':
        return <TicTacToe />;
      case 'Snake':
        return <Snake />;
      case 'RacingCar':
        return <RacingCar />;
      case 'Fight':
        return <Fight />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        {!selectedGame ? (
          <div className="game-selection text-center mt-5">
            <h1 className="mb-4">Gaming Dashboard</h1>
            <p className="mb-5">Choose a game to start playing!</p>
            <div className="row justify-content-center">
              <div className="col-md-3">
                <div className="card game-card" onClick={() => setSelectedGame('TicTacToe')}>
                  <img src={ticTacToeIcon} className="card-img-top" alt="Tic Tac Toe" />
                  <div className="card-body">
                    <h5 className="card-title">Tic Tac Toe</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card game-card" onClick={() => setSelectedGame('Snake')}>
                  <img src={snakeIcon} className="card-img-top" alt="Snake" />
                  <div className="card-body">
                    <h5 className="card-title">Snake</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card game-card" onClick={() => setSelectedGame('RacingCar')}>
                  <img src={racingCarIcon} className="card-img-top" alt="Racing Car" />
                  <div className="card-body">
                    <h5 className="card-title">Racing Car</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card game-card" onClick={() => setSelectedGame('Fight')}>
                  <img src={fightIcon} className="card-img-top" alt="Fight" />
                  <div className="card-body">
                    <h5 className="card-title">Fight</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          renderGame()
        )}
      </div>
    </div>
  );
};

export default Dashboard;
