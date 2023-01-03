import React, { useState } from "react";
import Board from "./Board";
import "./Game.css";

function Games() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const nextMove = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

  const handlePlay = function (nextSquare) {
    const nextHistory = [...history, nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const timeTravelHandler = function (i) {
    const nextHistory = [...history].slice(0, i + 1);
    setHistory(nextHistory);
    setCurrentMove(i);
  };

  return (
    <div className="game">
      <Board onPlay={handlePlay} squares={currentSquare} nextMove={nextMove} />
      <div>
        <div className="time-travel">
          {history.map((item, i) => {
            return (
              <button key={i} onClick={() => timeTravelHandler(i)}>
                <span>{i === 0 ? "Start Over" : `You're at move: ${i}`}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Games;
