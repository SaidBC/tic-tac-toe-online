import { useCallback, useEffect, useRef, useState } from "react";
import BoardSection from "./BoardSection";
import HeaderSection from "./HeaderSection";
import ResultsSection from "./ResultsSection";
import GameOverPopup from "../GameOverPopup";
import RestartPopup from "../RestartPopup";
import checkGame from "../../utils/checkGame";
import { useOutletContext } from "react-router-dom";

function Game({ mode }) {
  const [isGameover, setIsGameover] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const turn = useRef("x");
  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const gameResult = checkGame(board);
  const [gameResults, setGameResults] = useState({
    x: 0,
    tie: 0,
    o: 0,
  });

  useEffect(() => {
    if (gameResult.status === "gameover") {
      setIsGameover(true);
      setGameResults((prev) => {
        const temp = Object.assign({}, prev);
        ++temp[gameResult.winner ? gameResult.winner : "tie"];
        return temp;
      });
    }
  }, [board]);
  const turnHandle = useCallback(function (e) {
    if (e.target.tagName == "BUTTON") {
      const blockType = +e.target.getAttribute("data-block-type");
      if (blockType === 0) {
        const index = e.target.getAttribute("data-index");
        setBoard((prev) => {
          const temp = Array.from(prev);
          const x = Math.floor(index / 3);
          const y = index % 3;
          temp[x][y] = turn.current === "x" ? 1 : 2;
          turn.current = turn.current === "x" ? "o" : "x";
          return temp;
        });
      }
    }
  });
  const { currentPlayer } = useOutletContext();
  const nextRoundHandle = function () {
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    turn.current = "x";
    setIsGameover(false);
  };
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] w-full min-w-[28.75rem]">
      <HeaderSection turn={turn} setIsRestarting={setIsRestarting} />
      <BoardSection
        turn={turn}
        setBoard={setBoard}
        board={board}
        turnHandle={turnHandle}
      />
      <ResultsSection
        gameResults={gameResults}
        mode={mode}
        currentPlayer={currentPlayer}
      />

      {isGameover && (
        <GameOverPopup
          winner={gameResult.winner}
          nextRoundHandle={nextRoundHandle}
        />
      )}
      {isRestarting && (
        <RestartPopup
          setBoard={setBoard}
          turn={turn}
          setIsRestarting={setIsRestarting}
        />
      )}
    </div>
  );
}

export default Game;
