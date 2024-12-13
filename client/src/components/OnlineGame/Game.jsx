import { useEffect, useRef, useState } from "react";
import BoardSection from "./BoardSection";
import HeaderSection from "./HeaderSection";
import ResultsSection from "./ResultsSection";
import GameOverPopup from "./GameOverPopup";
import { socket } from "../../socket";
import ResignPopup from "./ResignPopup";
import { useOutletContext } from "react-router-dom";

function Game({ initialData }) {
  const { alertRef, setAlertMessage } = useOutletContext();
  const currentPlayer = initialData.currentPlayer;
  const initialTimer = initialData.currentGame.timer;
  const [board, setBoard] = useState(initialData.currentGame.board);
  const [isResigning, setIsResigning] = useState(false);
  const turn = useRef(initialData.currentGame.turn);
  const [gameStatus, setGameStatus] = useState(
    initialData.currentGame.gameStatus
  );
  const [gameResults, setGameResutls] = useState(initialData.results);
  useEffect(() => {
    socket.on("popup-alert", (message) => {
      setAlertMessage(message);
      alertRef.current.toast();
    });
    socket.on("recieve-game", (data) => {
      setBoard(data.currentGame.board);
      turn.current = data.currentGame.turn;
      setGameStatus(data.currentGame.gameStatus);
      setGameResutls(data.results);
    });
  }, [socket]);

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] w-full min-w-[28.75rem]">
        <HeaderSection
          initialTimer={initialTimer}
          turn={turn}
          setIsResigning={setIsResigning}
        />
        <BoardSection turn={turn} board={board} currentPlayer={currentPlayer} />
        <ResultsSection
          gameResults={gameResults}
          currentPlayer={currentPlayer}
        />

        {currentPlayer && gameStatus.status === "gameover" && (
          <GameOverPopup
            winner={gameStatus.winner}
            alertRef={alertRef}
            setAlertMessage={setAlertMessage}
          />
        )}
        {currentPlayer && isResigning && (
          <ResignPopup setIsResigning={setIsResigning} />
        )}
      </div>
    </>
  );
}

export default Game;
