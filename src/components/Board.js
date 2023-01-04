import React from "react";
import Square from "./Square";
import { calculateWinner } from "./winner";
import "./Board.css";

function Squares({ onPlay, squares, nextMove, drawn }) {
  const handleClick = function (i, box) {
    if (calculateWinner(squares).square || squares[i].value) {
      return;
    }
    // console.log(box);
    const nextSquare = [...squares];
    nextSquare[i] = nextMove
      ? { value: "X", status: null }
      : { value: "O", status: null };
    onPlay(nextSquare, [box]);
  };

  let status;

  if (calculateWinner(squares).square) {
    status = `Winner : ${calculateWinner(squares).square}`;
  } else {
    status = `Next Player : ${nextMove ? "X" : "O"}`;
  }

  if (drawn) {
    status = `No one wins`;
  }

  const RenderSquare = function ({ i, box }) {
    // console.log(box);
    return (
      <Square
        value={squares[i].value}
        status={squares[i].status}
        i={i}
        onSquareClick={() => handleClick(i, box)}
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
                return (
                  <RenderSquare
                    box={`${i + 1}, ${value + 1}`}
                    i={3 * i + value}
                    key={value}
                  />
                );
              })}
          </div>
        ))}
    </div>
  );
}

export default Squares;
