function Timer({ type, turn, time }) {
  const turnsStyles = {
    x: "bg-skyblue-clr shadow-skyblue-shadow-clr",
    o: "bg-yellow-clr shadow-yellow-shadow-clr",
    default: "bg-gray-clr shadow-gray-shadow-clr ",
  };
  return (
    <div
      className={`flex items-center py-3 px-4 rounded-md  shadow-container-sm gap-2 text-darkblue-700  font-semibold tracking-[1px] ${
        type === turn ? turnsStyles[turn] : turnsStyles.default
      }`}
    >
      <span
        className={`relative w-6 ${type === "x" ? "turn-x" : "turn-o"}`}
      ></span>
      <span className="text-xl">{time}</span>
    </div>
  );
}

export default Timer;
