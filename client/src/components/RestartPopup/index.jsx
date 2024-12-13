function RestartPopup({ setIsRestarting, setBoard, turn }) {
  const cancelHandle = function () {
    setIsRestarting(false);
  };
  const restartHandle = function () {
    setIsRestarting(false);
    setBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    turn.current = "x";
  };
  return (
    <div className="popup-wrapper">
      <div className="popup-container">
        <h2 className="text-2xl font-bold text-gray-clr tracking-[2px]">
          RESTART GAME?
        </h2>
        <div className="grid grid-cols-[auto_auto] gap-4">
          <button
            onClick={cancelHandle}
            className="btn-sm shadow-gray-shadow-clr bg-gray-clr"
          >
            NO, CANCEL
          </button>
          <button
            onClick={restartHandle}
            className="btn-sm shadow-yellow-shadow-clr bg-yellow-clr"
          >
            YES, RESTART
          </button>
        </div>
      </div>
    </div>
  );
}
export default RestartPopup;
