import { memo, useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";
import Game from "./Game";
import { onRecieveGame } from "../../utils/eventHelper";

function OnlineGameBoard() {
  const [initialized, setInitialized] = useState(null);
  const { "*": roomId } = useParams();
  useEffect(() => {
    socket.emit("join-room", roomId);
  }, []);
  useEffect(() => {
    socket.on("initial-recieve-game", onRecieveGame(setInitialized));
    return () => {
      socket.off("initial-recieve-game", onRecieveGame(setInitialized));
    };
  }, [socket]);
  if (!initialized) return <>LOADING ...</>;
  return <Game initialData={initialized} />;
}

export default memo(OnlineGameBoard);
