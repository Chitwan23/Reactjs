import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import TicTacToe from './TicTacToe';
import RockPaperScissors from './RockPaperScissors'; // Import the new game component
import './App.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/rock-paper-scissors" element={<RockPaperScissors />} /> {/* New route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
