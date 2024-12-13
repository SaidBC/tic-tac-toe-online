import { memo, useRef } from "react";
const emptyStyle =
  "bg-darkblue-700 shadow-container rounded-2xl hover:bg-[rgb(44,74,87)]";
const filledStyle = "bg-darkblue-700 rounded-2xl top-2 relative ";
function Block({ index, blockType }) {
  const blockStyle = useRef(emptyStyle);
  if (blockType !== 0) {
    blockStyle.current =
      filledStyle + (blockType === 1 ? "x-block" : "o-block");
  } else {
    blockStyle.current = emptyStyle;
  }
  return (
    <>
      <button
        data-block-type={blockType}
        data-index={index}
        className={blockStyle.current}
      ></button>
    </>
  );
}

export default memo(Block);
