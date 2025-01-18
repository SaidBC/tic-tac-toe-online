import XOLogo from "../../components/XOLogo";
import TimerWrapper from "./TimerWrapper";

function HeaderSection({ turn, setIsResigning, initialTimer }) {
  return (
    <div className="flex justify-between items-center">
      <XOLogo />
      <TimerWrapper turn={turn} initialTimer={initialTimer} />
      <div>
        <button
          onClick={() => setIsResigning(true)}
          type="button"
          className="w-12 h-12 bg-gray-clr rounded-lg shadow-container-sm shadow-gray-shadow-clr active:shadow-none active:relative active:top-1"
        >
          <i className="fa-solid fa-flag text-darkblue-700 text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

export default HeaderSection;
