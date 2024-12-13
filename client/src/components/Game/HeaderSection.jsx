import { useEffect, useReducer } from "react";
import XOLogo from "../utils/XOLogo";

function HeaderSection({ turn, setIsRestarting }) {
  const [_, forceUpdate] = useReducer(() => true);
  useEffect(() => {
    forceUpdate();
  }, [turn.current]);
  return (
    <div className="flex justify-between items-center">
      <XOLogo />
      <div className="flex items-center py-3 px-4 rounded-[0.25rem] shadow-container-sm gap-2 text-gray-clr font-semibold tracking-[1px] bg-darkblue-700">
        <span
          className={`relative w-6 ${
            turn.current == "x" ? "turn-x" : "turn-o"
          }`}
        ></span>
        <span>TURN</span>
      </div>
      <div>
        <button
          onClick={() => setIsRestarting(true)}
          type="button"
          className="w-12 h-12 bg-gray-clr rounded-lg shadow-container-sm shadow-gray-shadow-clr active:shadow-none active:relative active:top-1"
        >
          <i className="fa-solid fa-rotate-right text-dark-900 text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default HeaderSection;
