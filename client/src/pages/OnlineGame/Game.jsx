import { useCallback, useEffect, useRef, useState } from "react";
import BoardSection from "../../components/Game/BoardSection";
import HeaderSection from "./HeaderSection";
import ResultsSection from "../../components/Game/ResultsSection";
import GameOverPopup from "../../components/GameOverPopup";
import { socket } from "../../socket";
import ResignPopup from "./ResignPopup";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

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
  const { "*": roomId } = useParams();
  const turnHandle = useCallback(function (e) {
    if (e.target.tagName == "BUTTON" && currentPlayer === turn.current) {
      const blockType = +e.target.getAttribute("data-block-type");
      if (blockType === 0) {
        const index = e.target.getAttribute("data-index");
        const token = window.localStorage.getItem("player");
        socket.emit("send-game", {
          index,
          turn: turn.current,
          token,
          roomId,
        });
      }
    }
  });
  const navigate = useNavigate();
  const nextRoundHandle = function () {
    const player = window.localStorage.getItem("player");
    const fn = function () {
      setAlertMessage({
        title: "request was sent",
        content: "waiting for oppenent response",
      });
      alertRef.current.toast();
    };
    socket.emit("next-round", player, fn);
  };
  const quitHandle = function () {
    onClearStorage();
    navigate("../../");
  };

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto_1fr_auto] w-full min-w-[28.75rem]">
        <HeaderSection
          initialTimer={initialTimer}
          turn={turn}
          setIsResigning={setIsResigning}
        />
        <BoardSection board={board} turnHandle={turnHandle} />
        <ResultsSection
          turnHandle={turnHandle}
          gameResults={gameResults}
          currentPlayer={currentPlayer}
          mode="online"
        />

        {currentPlayer && gameStatus.status === "gameover" && (
          <GameOverPopup
            winner={gameStatus.winner}
            nextRoundHandle={nextRoundHandle}
            quitHandle={quitHandle}
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
