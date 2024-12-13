import { useNavigate } from "react-router-dom";
import OIcon from "../utils/OIcon";
import { onClearStorage } from "../utils/socketsListeners";
import XIcon from "../utils/XIcon";
import XOLogo from "../utils/XOLogo";
import { socket } from "../../socket";

function GameOverPopup({ winner, setAlertMessage, alertRef }) {
  const navigate = useNavigate();
  const winnerStyle = {
    x: "text-skyblue-clr",
    o: "text-yellow-clr",
    tie: "text-gray-clr",
  };
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
    <div className="popup-wrapper">
      <div className="popup-container">
        <div className="text-gray-clr font-semibold tracking-[1px]">
          {winner && winner.toUpperCase()} {winner ? "WON!" : "IT'S DRAW"}
        </div>
        <div className="flex items-center gap-4">
          {winner == "x" ? <XIcon /> : winner == "o" ? <OIcon /> : <XOLogo />}
          <span
            className={
              "text-[2rem] font-semibold " +
              winnerStyle[winner ? winner : "tie"]
            }
          >
            {!winner && "NO ONE"} TAKES THE ROUND
          </span>
        </div>
        <div className="grid grid-cols-[auto_auto] gap-4">
          <button
            onClick={quitHandle}
            className="btn-sm shadow-gray-shadow-clr bg-gray-clr"
          >
            QUIT
          </button>
          <button
            onClick={nextRoundHandle}
            className="btn-sm shadow-yellow-shadow-clr bg-yellow-clr"
          >
            NEXT ROUND
          </button>
        </div>
      </div>
    </div>
  );
}
export default GameOverPopup;
