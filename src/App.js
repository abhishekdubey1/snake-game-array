import { useState } from "react";
import useStore from "./useStore";
import Board from "./Board";
import "./styles.css";

export const Modal = ({ children }) => <div className="modal">{children}</div>;

export default function App() {
  // const [status, setStatus] = useState("");
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const showStatus = () => {
    if (status === "Game Over") {
      return status;
    } else if (status === "Paused") {
      return (
        <>
          Paused{" "}
          <span
            className="play"
            onClick={() => {
              setStatus("");
            }}
          >
            <span className="play-animate">▶</span>
          </span>
        </>
      );
    }
    // else if (status === "") {
    //   return;
    // }
    // else if (status === "Game Over") {
    //   return;
    // }
  };

  return (
    <div className="App">
      <Board setStatus={setStatus} />
      {status && (
        <Modal>
          <div className="status">{showStatus()}</div>
        </Modal>
      )}
    </div>
  );
}

// useEffect(() => {
//   if (wall1.includes(snake[0]) && direction === "ArrowUp") {
//     setIsChecked(false);
//   } else if (wall2.includes(snake[0]) && direction === "ArrowLeft") {
//     setIsChecked(false);
//   } else if (wall3.includes(snake[0]) && direction === "ArrowRight") {
//     setIsChecked(false);
//   } else if (wall4.includes(snake[0]) && direction === "ArrowDown") {
//     setIsChecked(false);
//   }
// }, [direction, wall1, wall2, wall3, wall4, snake]);
