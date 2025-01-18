import { useOutletContext } from "react-router-dom";

function PickPlayer() {
  const { currentPlayer, setCurrentPlayer } = useOutletContext();
  return (
    <div className="grid text-center text-gray-clr bg-darkblue-700 shadow-container p-5 gap-4 rounded-[1.25rem]">
      <h3 className="font-bold text-lg ">PICK PLAYER 1'S MARK</h3>
      <div className="grid grid-cols-2 grid-rows-[5rem] p-2.5 gap-2  bg-darkblue-800 rounded-[0.625rem]">
        <div className="x-radio-wrapper">
          <input
            type="radio"
            name="player-option"
            checked={currentPlayer == "x"}
            onChange={() => setCurrentPlayer("x")}
          />
        </div>
        <div className="o-radio-wrapper">
          <input
            type="radio"
            name="player-option"
            checked={currentPlayer == "o"}
            onChange={() => setCurrentPlayer("o")}
          />
        </div>
      </div>
      <p className="opacity-75 tracking-[2px] font-medium">
        REMEMBER : X GOES FIRST
      </p>
    </div>
  );
}

export default PickPlayer;
