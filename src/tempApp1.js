import { useEffect, useRef, useState } from "react";
import { createBoard, randomIntFromInterval } from "./lib/utils";
import "./styles.css";

const BOARD_SIZE = 10;
const PROBABILITY_OF_DIRECTION_REVERSAL_FOOD = 0.3;
const Direction = {
  UP: "UP",
  RIGHT: "RIGHT",
  DOWN: "DOWN",
  LEFT: "LEFT"
};
export default function App() {
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const [snake, setSnake] = useState([3]);
  // const [snakeCells, setSnakeCells] = useState();
  const [foodCell, setFoodCell] = useState(25);
  const App = useRef(null);

  useEffect(() => App.current.focus());
  useEffect(() => {
    if (snake[0] === foodCell) {
      setScore((score) => score + 1);
      setFoodCell(randomIntFromInterval(1, BOARD_SIZE * BOARD_SIZE));
    }
  }, [snake, foodCell]);
  const handleMovements = (movement) => {
    if (movement === "ArrowLeft" && !((snake[0] - 1) % BOARD_SIZE === 0)) {
      let temp = snake[0] - 1;
      setSnake([temp]);
    } else if (movement === "ArrowRight" && !(snake[0] % BOARD_SIZE === 0)) {
      let temp = snake[0] + 1;
      setSnake([temp]);
    } else if (movement === "ArrowUp" && !(snake[0] <= BOARD_SIZE)) {
      let temp = snake[0] - BOARD_SIZE;
      setSnake([temp]);
    } else if (
      movement === "ArrowDown" &&
      snake[0] <= BOARD_SIZE * (BOARD_SIZE - 1)
    ) {
      let temp = snake[0] + BOARD_SIZE;
      setSnake([temp]);
    }
  };
  return (
    <div
      className="App"
      tabIndex={board[0][0] && "0"}
      ref={App}
      onKeyDown={({ key }) => {
        handleMovements(key);
      }}
    >
      <>
        <div>
          <button
            onClick={() => {
              handleMovements("ArrowLeft");
            }}
          >
            left
          </button>
          <button
            onClick={() => {
              handleMovements("ArrowRight");
            }}
          >
            right
          </button>
          <button
            onClick={() => {
              handleMovements("ArrowUp");
            }}
          >
            up
          </button>
          <button
            onClick={() => {
              handleMovements("ArrowDown");
            }}
          >
            down
          </button>
        </div>
        <h1>Score: {score}</h1>
        <div className="board">
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((cellValue, cellIdx) => {
                const className = snake.includes(cellValue)
                  ? `cell cell-green`
                  : foodCell === cellValue
                  ? "cell cell-red"
                  : "cell";
                return <div key={cellIdx} className={className}></div>;
              })}
            </div>
          ))}
        </div>
      </>
    </div>
  );
}
