import { useEffect, useMemo, useRef, useState } from "react";
import { createBoard, randomIntFromInterval, useInterval } from "./lib/utils";

const BOARD_SIZE = 20;
const PROBABILITY_OF_DIRECTION_REVERSAL_FOOD = 0.3;
const Direction = {
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
};
export default function Board({ setStatus }) {
  const [score, setScore] = useState(0);
  const [board] = useState(createBoard(BOARD_SIZE));
  const [snake, setSnake] = useState([
    board[Math.round(BOARD_SIZE / 2)][Math.round(BOARD_SIZE / 2)],
  ]);
  const [direction, setDirection] = useState("");
  const [speedRange, setSpeedRange] = useState(100); //
  const [delay, setDelay] = useState(speedRange * 8);
  const [foodCell, setFoodCell] = useState(25);
  const [isChecked, setIsChecked] = useState(true); //
  const allWalls = useMemo(
    () => [
      ...board[0].slice(0),
      ...board.map((el) => el[0]),
      ...board.map((el) => el[BOARD_SIZE - 1]),
      ...board[BOARD_SIZE - 1].slice(0, BOARD_SIZE),
    ],
    [board]
  );

  useEffect(() => {
    setDelay(speedRange * 8);
  }, [speedRange, delay]);

  useEffect(() => {
    if (allWalls.includes(snake[0])) {
      setStatus("Game Over");
    }
  }, [allWalls, snake]);

  const Board = useRef(null);
  useEffect(() => Board.current.focus());
  useEffect(() => {
    if (snake[0] === foodCell) {
      eatFood();
    }
  }, [snake, foodCell]);

  useInterval(
    () => {
      handleMovements(direction);
    },
    isChecked ? delay : null
  );

  const changeDirection = (key) =>
    Object.keys(Direction).includes(key) && setDirection(key);
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
    if (true) {
      /*

*/
    }
  };
  const eatFood = () => {
    setScore((score) => score + 1);
    setDelay((delay) => delay >= 200 && delay - 25);
    setFoodCell(randomIntFromInterval(1, BOARD_SIZE * BOARD_SIZE, allWalls));
  };

  return (
    <div
      className="Board"
      tabIndex={board[0][0] && "0"}
      ref={Board}
      onKeyDown={({ key }) => {
        changeDirection(key);
      }}
    >
      <>
        <div className="details-box">
          <h1>
            Score: {score}
            <label className="label-checkbox" htmlFor="checkbox">
              {status === "Paused" ? <>▶</> : <span>⏸</span>}
            </label>
            <input
              type="checkbox"
              value={status === "Paused"}
              onClick={({ target }) => {
                setStatus("Paused");
              }}
              id="checkbox"
              className="checkbox"
            />
          </h1>
        </div>
        <div className="board">
          {board.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((cellValue, cellIdx) => {
                const className = snake.includes(cellValue)
                  ? `cell cell-green`
                  : foodCell === cellValue
                  ? "cell cell-red"
                  : allWalls.includes(cellValue)
                  ? "cell cell-wall"
                  : "cell";
                return <div key={cellIdx} className={className}></div>;
              })}
            </div>
          ))}
        </div>
        {}
        <ButtonContainer changeDirection={changeDirection} />
      </>
    </div>
  );
}
const ButtonContainer = ({ changeDirection }) => {
  const ArrowButton = ({ direction, btnClass }) => (
    <button
      onClick={() => {
        changeDirection(direction);
      }}
      className={`btn btn-${btnClass}`}
    >
      {direction[5]}
    </button>
  );
  const directions = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
  const btnClass = ["left", "right", "up", "down"];
  return (
    <div>
      {directions.map((direction, idx) => {
        console.log(btnClass[idx]);
        return (
          <ArrowButton
            key={direction}
            direction={direction}
            btnClass={btnClass[idx]}
          />
        );
      })}
    </div>
  );
};

const Range = ({ speedRange, setSpeedRange }) => (
  <input
    type="range"
    value={speedRange}
    onChange={({ target }) => {
      setSpeedRange(target.value);
    }}
  />
);
const Delay = ({ delay, setDelay }) => (
  <input
    type="text"
    value={delay}
    className="delay"
    onChange={({ target }) => {
      setDelay(target.value);
    }}
  />
);
