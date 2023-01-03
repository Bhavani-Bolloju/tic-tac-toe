import React from "react";
import "./Square.css";

const Square = function ({ onSquareClick, value }) {
  return (
    <button className="square" onClick={() => onSquareClick()}>
      {value}
    </button>
  );
};

export default Square;
