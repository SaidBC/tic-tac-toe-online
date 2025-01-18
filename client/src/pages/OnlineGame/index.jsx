import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { socket } from "../../socket";
import { useEffect, useMemo, useRef, useState } from "react";
import connection from "../../utils/connection";
import {
  onClearStorage,
  onRedirect,
  onSaveToStorage,
} from "../../utils/eventHelper";

function OnlineGame() {
  const { alertRef, setAlertMessage } = useOutletContext();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const location = useLocation();
  const isMounted = useRef(false);
  const navigate = useNavigate();
  connection(setIsConnected, isMounted);

  useEffect(() => {
    socket.on("clear-storage", onClearStorage);
    socket.on("save-to-storage", onSaveToStorage);
    socket.on("redirect", onRedirect(location, navigate));
    return () => {
      socket.off("clear-storage", onClearStorage);
      socket.off("save-to-storage", onSaveToStorage);
      socket.off("redirect", onRedirect(location, navigate));
    };
  }, [socket]);
  const value = useMemo(
    () => ({
      isConnected,
      isMounted,
      alertRef,
      setAlertMessage,
    }),
    [isConnected, isMounted, alertRef, setAlertMessage]
  );
  if (!isConnected) return <></>;
  return <Outlet context={value} />;
}
export default OnlineGame;
