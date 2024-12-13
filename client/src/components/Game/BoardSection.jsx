import { memo } from "react";
import Block from "./Block";

function BoardSection({ board, setBoard, turn }) {
  const turnHandle = function (e) {
    if (e.target.tagName == "BUTTON") {
      const blockType = +e.target.getAttribute("data-block-type");
      if (blockType === 0) {
        const index = e.target.getAttribute("data-index");
        setBoard((prev) => {
          const temp = Array.from(prev);
          const x = Math.floor(index / 3);
          const y = index % 3;
          temp[x][y] = turn.current === "x" ? 1 : 2;
          turn.current = turn.current === "x" ? "o" : "x";
          return temp;
        });
      }
    }
  };
  return (
    <div
      className="grid grid-cols-3 grid-rows-[repeat(3,_minmax(5rem,7rem))] px-6 gap-5 mt-auto"
      onClick={turnHandle}
    >
      {board.flat(Infinity).map((blockType, index) => {
        return <Block blockType={blockType} index={index} key={index} />;
      })}
    </div>
  );
}

export default memo(BoardSection);
