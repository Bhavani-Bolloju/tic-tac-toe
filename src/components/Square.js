import React from "react";
import "./Square.css";

const Square = function ({ onSquareClick, value, status }) {
  // console.log(status);
  return (
    <button
      className={!status ? "square" : "square win"}
      onClick={() => onSquareClick()}
    >
      {value}
    </button>
  );
};

export default Square;
