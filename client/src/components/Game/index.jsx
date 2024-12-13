import { useEffect, useMemo, useRef, useState } from "react";
import BoardSection from "./BoardSection";
import HeaderSection from "./HeaderSection";
import ResultsSection from "./ResultsSection";
import GameOverPopup from "../GameOverPopup";
import RestartPopup from "../RestartPopup";
import checkGame from "./checkGame";

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
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] w-full min-w-[28.75rem]">
      <HeaderSection turn={turn} setIsRestarting={setIsRestarting} />
      <BoardSection turn={turn} setBoard={setBoard} board={board} />
      <ResultsSection gameResults={gameResults} mode={mode} />

      {isGameover && (
        <GameOverPopup
          winner={gameResult.winner}
          setIsGameover={setIsGameover}
          setBoard={setBoard}
          turn={turn}
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
