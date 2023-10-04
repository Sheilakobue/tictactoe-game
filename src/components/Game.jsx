// Game.js

import React, { useState } from "react";
import Board from "./Board";
import calculateWinner from "./CalculateWinner";
//import "./style.css"; // Import styling for Game

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [winner, setWinner] = useState(null);
  const [playerXName, setPlayerXName] = useState("Player X"); // Default name
  const [playerOName, setPlayerOName] = useState("Player O"); // Default name
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Handle the square click event
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const newWinner = calculateWinner(nextSquares);
    if (newWinner) {
      setWinner(newWinner);
      if (newWinner === "X") {
        setPlayerXScore(playerXScore + 1);
      } else if (newWinner === "O") {
        setPlayerOScore(playerOScore + 1);
      }
    }
  }

  // Jump to a specific move
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setWinner(null);
  }

  // Update player names
  function updatePlayerName(player, name) {
    if (player === "X") {
      setPlayerXName(name);
    } else if (player === "O") {
      setPlayerOName(name);
    }
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `${winner === "X" ? playerXName : playerOName} wins!`;
  } else if (currentMove === 9) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? playerXName : playerOName}`;
  }

  return (
    <div className="game">
      <div className="instructions">
        <img
          src="/src/images/logo.png" // Update the path to your image
          alt="logo"
          className="instruction-image"
        />
        <h3>Game Instructions:</h3>

        <p>
          Click on a square to make your move. The goal is to get three of your
          symbols in a row, column, or diagonal.
        </p>
      </div>

      <div className="game-scores">
        <div>{`${playerXName} Score: ${playerXScore}`}</div>
        <div>{`${playerOName} Score: ${playerOScore}`}</div>
      </div>

      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        <div className="player-names">
          <div>
            <span className="player-name-label">Player X:</span>
            <input
              className="player-name-input"
              type="text"
              value={playerXName}
              onChange={(e) => updatePlayerName("X", e.target.value)}
            />
          </div>

          <div>
            <span className="player-name-label">Player O:</span>
            <input
              className="player-name-input"
              type="text"
              value={playerOName}
              onChange={(e) => updatePlayerName("O", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="game-info">
        {winner && (
          <div className="game-alert">
            <strong>{status}</strong>
          </div>
        )}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}