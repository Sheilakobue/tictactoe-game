import { useState } from "react";

// Square component represents a single square on the game board.
// It receives the `value` of the square and a callback `onSquareClick` function.
export default function Square({ value, onSquareClick }) {
 return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
