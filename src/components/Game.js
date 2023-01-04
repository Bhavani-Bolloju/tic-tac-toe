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

  // console.log(history);

  const handlePlay = function (nextSquare) {
    const nextHistory = [...history, nextSquare];
    if (calculateWinner(nextSquare).square) {
      const [a, b, c] = calculateWinner(nextSquare).order;
      const nextMatchSquare = [...nextSquare];
      nextMatchSquare[a] = { ...nextMatchSquare[a], status: true };
      nextMatchSquare[b] = { ...nextMatchSquare[b], status: true };
      nextMatchSquare[c] = { ...nextMatchSquare[c], status: true };
      setHistory([...history, nextMatchSquare]);
    } else {
      setHistory(nextHistory);
    }
    setCurrentMove(nextHistory.length - 1);
  };

  // console.log(history);

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
