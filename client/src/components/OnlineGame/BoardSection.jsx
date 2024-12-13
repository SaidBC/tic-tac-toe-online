import { memo } from "react";
import Block from "./Block";
import { socket } from "../../socket";
import { useParams } from "react-router-dom";

function BoardSection({ board, turn, currentPlayer }) {
  const { "*": roomId } = useParams();
  const turnHandle = function (e) {
    if (e.target.tagName == "BUTTON" && currentPlayer === turn.current) {
      const blockType = +e.target.getAttribute("data-block-type");
      if (blockType === 0) {
        const index = e.target.getAttribute("data-index");
        const token = window.localStorage.getItem("player");
        socket.emit("send-game", {
          index,
          turn: turn.current,
          token,
          roomId,
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
