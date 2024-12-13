import { memo } from "react";
import { useOutletContext } from "react-router-dom";

function ResultsSection({ gameResults, mode }) {
  const { currentPlayer } = useOutletContext();
  return (
    <div className="grid  grid-cols-3 justify-items-center p-6 gap-5 [&>*]:flex [&>*]:flex-col [&>*]:justify-center [&>*]:items-center [&>*]:rounded-2xl [&>*]:text-darkblue-800 [&>*]:w-full [&>*]:h-20 [&>*]:font-medium">
      <div className="bg-skyblue-clr">
        <span>
          X ({currentPlayer == "x" ? "You" : mode == "computer" ? "CPU" : "P-1"}
          )
        </span>
        <span className="font-semibold text-2xl">{gameResults.x}</span>
      </div>
      <div className="bg-gray-clr">
        <span>TIES</span>
        <span className="font-semibold text-2xl">{gameResults.tie}</span>
      </div>
      <div className="bg-yellow-clr">
        <span>
          O ({currentPlayer == "o" ? "You" : mode == "computer" ? "CPU" : "P-2"}
          )
        </span>
        <span className="font-semibold text-2xl">{gameResults.o}</span>
      </div>
    </div>
  );
}

export default memo(ResultsSection);
