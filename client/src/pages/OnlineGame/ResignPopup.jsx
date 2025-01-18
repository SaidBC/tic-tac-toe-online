import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

function ResignPopup({ setIsResigning }) {
  const cancelHandle = function () {
    setIsResigning(false);
  };
  const resignHandle = function () {
    const player = window.localStorage.getItem("player");
    socket.emit("resign-game", player);
    setIsResigning(false);
  };
  return (
    <div className="popup-wrapper">
      <div className="popup-container">
        <h2 className="text-2xl font-bold text-gray-clr tracking-[2px]">
          RESIGN GAME?
        </h2>
        <div className="grid grid-cols-[auto_auto] gap-4">
          <button
            onClick={cancelHandle}
            className="btn-sm shadow-gray-shadow-clr bg-gray-clr"
          >
            NO, CANCEL
          </button>
          <button
            onClick={resignHandle}
            className="btn-sm shadow-yellow-shadow-clr bg-yellow-clr"
          >
            YES, RESIGN
          </button>
        </div>
      </div>
    </div>
  );
}
export default ResignPopup;
