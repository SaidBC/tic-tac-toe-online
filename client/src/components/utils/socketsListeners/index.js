import { jwtDecode } from "jwt-decode";

const onClearStorage = () => {
  window.localStorage.clear();
};
const onSaveToStorage = (key, value) => {
  window.localStorage.setItem(key, value);
};

const onRedirect = function (location, navigate) {
  return (path, from) => {
    if (from == location.pathname || from === undefined) {
      navigate(path);
    }
  };
};

const onRecieveGame = function (setInitialized) {
  return (data) => {
    const token = window.localStorage.getItem("player");
    if (token) {
      const player = jwtDecode(token);
      data.currentPlayer = player.initialTurn;
    }
    setInitialized(data);
  };
};

export { onClearStorage, onRedirect, onSaveToStorage, onRecieveGame };
