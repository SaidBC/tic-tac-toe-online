import { useEffect } from "react";
import { socket } from "../socket";

function connection(setIsConnected, isMounted) {
  useEffect(() => {
    socket.connect();
    isMounted.current = true;
    const onConnect = function () {
      setIsConnected(true);
    };
    const onDisconnect = function () {
      setIsConnected(false);
    };
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.disconnect();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
}

export default connection;
