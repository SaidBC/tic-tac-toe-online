import { useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import AlertPopup from "./components/utils/AlertPopup";

function App() {
  const alertRef = useRef();
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    content: "",
  });
  const [currentPlayer, setCurrentPlayer] = useState("x");
  const value = useMemo(
    () => ({ currentPlayer, setCurrentPlayer, alertRef, setAlertMessage }),
    [currentPlayer, setCurrentPlayer, alertRef, setAlertMessage]
  );
  return (
    <div>
      <main className="grid w-full min-w-[21.875rem] max-w-[31.25rem] h-[100dvh] p-5 mx-auto">
        <Outlet context={value} />
      </main>
      <AlertPopup
        ref={alertRef}
        variant="success"
        title={alertMessage.title}
        content={alertMessage.content}
      />
    </div>
  );
}

export default App;
