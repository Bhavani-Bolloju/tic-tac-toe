import React, { useState } from "react";
import Board from "./Board";
import "./Game.css";

function Games() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const nextMove = currentMove % 2 === 0;
  const currentSquare = history[currentMove];
  const [order, setOrder] = useState(true);

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

  const sortingOrder = function () {
    setOrder((prev) => !prev);
  };

  return (
    <div className="game">
      <Board onPlay={handlePlay} squares={currentSquare} nextMove={nextMove} />
      <div className="time-travel">
        <button className="sort" onClick={sortingOrder}>
          {order ? "Descending" : "Ascending"}
        </button>
        <div
          className={!order ? "time-travel-list arrange" : "time-travel-list"}
        >
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
