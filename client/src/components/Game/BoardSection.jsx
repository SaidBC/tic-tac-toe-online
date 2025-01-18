import { memo } from "react";
import Block from "./Block";

function BoardSection({ board, turnHandle }) {
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
