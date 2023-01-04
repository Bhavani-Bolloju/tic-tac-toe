import React, { useEffect } from "react";
import Square from "./Square";
import { calculateWinner } from "./winner";
import "./Board.css";

function Squares({ onPlay, squares, nextMove }) {
  const handleClick = function (i) {
    if (calculateWinner(squares).square) {
      return;
    }
    if (squares[i].value) return;
    const nextSquare = [...squares];

    nextSquare[i] = nextMove
      ? { value: "X", status: null }
      : { value: "O", status: null };
    onPlay(nextSquare);
  };

  let status;

  if (calculateWinner(squares).square) {
    status = `Winner : ${calculateWinner(squares).square}`;
  } else {
    status = `Next Player : ${nextMove ? "X" : "O"}`;
  }

  const RenderSquare = function ({ i }) {
    return (
      <Square
        value={squares[i].value}
        status={squares[i].status}
        i={i}
        onSquareClick={() => handleClick(i)}
      />
    );
  };

  return (
    <div className="board">
      <p className="status">{status}</p>
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            {Array(3)
              .fill(0)
              .map((_, value) => {
                return <RenderSquare i={3 * i + value} key={value} />;
              })}
          </div>
        ))}
    </div>
  );
}

export default Squares;
