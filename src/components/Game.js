import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./winner";
import "./Game.css";

function Games() {
  const [history, setHistory] = useState([
    Array(9).fill({ value: null, status: null }),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  const nextMove = currentMove % 2 === 0;
  const [order, setOrder] = useState(true);
  const [location, setLocation] = useState([[0, 0]]);

  const handlePlay = function (nextSquare, squareBox) {
    let nextHistory;

    if (calculateWinner(nextSquare).square) {
      const [a, b, c] = calculateWinner(nextSquare).order;
      const nextMatchSquare = [...nextSquare];
      nextMatchSquare[a] = { ...nextMatchSquare[a], status: true };
      nextMatchSquare[b] = { ...nextMatchSquare[b], status: true };
      nextMatchSquare[c] = { ...nextMatchSquare[c], status: true };
      nextHistory = [...history, nextMatchSquare];
    } else {
      nextHistory = [...history, nextSquare];
    }

    setLocation((prev) => [...prev, squareBox]);
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
  // console.log(location, history);
  // console.log(location.length, history.length);

  return (
    <div className="game">
      <Board
        onPlay={handlePlay}
        squares={currentSquare}
        drawn={history.length > 9}
        nextMove={nextMove}
      />
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
                <span>
                  {i === 0
                    ? "Start Over - (row, col)"
                    : `You're at move: ${i} - (${location[i]})`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Games;
