import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to PlayPortal</h1>
      <div className="game-links">
        <Link to="/tic-tac-toe" className="game-link">Play Tic-Tac-Toe</Link>
        <Link to="/rock-paper-scissors" className="game-link">Play Rock Paper Scissors</Link>
      </div>
    </div>
  );
};

export default Dashboard;
