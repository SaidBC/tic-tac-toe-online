import OIcon from "../utils/OIcon";
import XIcon from "../utils/XIcon";
import XOLogo from "../utils/XOLogo";
import { Link } from "react-router-dom";
function GameOverPopup({ winner, setBoard, setIsGameover, turn }) {
  const winnerStyle = {
    x: "text-skyblue-clr",
    o: "text-yellow-clr",
    tie: "text-gray-clr",
  };
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
          <Link
            to="/play"
            className="btn-sm shadow-gray-shadow-clr bg-gray-clr"
          >
            QUIT
          </Link>
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
