import { Link } from "react-router-dom";

function BtnsWrapper() {
  return (
    <div className="flex flex-col gap-5">
      <Link
        to="./computer"
        className="new-game-btn bg-yellow-clr shadow-yellow-shadow-clr"
      >
        NEW GAME (VS CPU)
      </Link>
      <Link
        to="./online"
        className="new-game-btn bg-gray-clr shadow-gray-shadow-clr"
      >
        NEW GAME (VS PLAYER ONLINE)
      </Link>
      <Link
        to="./offline"
        className="new-game-btn bg-skyblue-clr shadow-skyblue-shadow-clr"
      >
        NEW GAME (VS PLAYER OFFLINE)
      </Link>
      <p className="opacity-75 tracking-[2px] text-sm font-medium text-center text-gray-clr">
        NOTE : PICKING PLAYER <br /> ONLY FOR CPU & OFFLINE GAMES
      </p>
    </div>
  );
}

export default BtnsWrapper;
