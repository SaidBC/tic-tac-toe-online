import { useEffect } from "react";
import { socket } from "../../socket";

function Loading() {
  useEffect(() => {
    const roomId = window.localStorage.getItem("roomId");
    socket.emit("join-room", roomId);
  }, []);
  return (
    <div className="flex flex-col items-center gap-4 absolute w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-clr ">
      <>
        <h1 className="text-5xl font-extrabold tracking-widest">LOADING ...</h1>
        <span className="text-2xl">Waiting for other oppenent</span>
      </>
    </div>
  );
}

export default Loading;
