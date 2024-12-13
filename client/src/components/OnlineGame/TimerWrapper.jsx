import { useEffect, useState } from "react";
import Timer from "./Timer";
import { socket } from "../../socket";
import secondsToMinutes from "../utils/secondsToMinutes";

function TimerWrapper({ turn, initialTimer }) {
  const [time, setTime] = useState({
    x: secondsToMinutes(initialTimer.x),
    o: secondsToMinutes(initialTimer.o),
  });
  useEffect(() => {
    socket.on("countdown", (timer) => {
      setTime({ x: secondsToMinutes(timer.x), o: secondsToMinutes(timer.o) });
    });
  }, [socket]);
  return (
    <div className="flex">
      <div className="flex gap-4">
        <Timer turn={turn.current} type="x" time={time.x} />
        <Timer turn={turn.current} type="o" time={time.o} />
      </div>
    </div>
  );
}
export default TimerWrapper;
