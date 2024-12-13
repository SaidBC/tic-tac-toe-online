import { useState } from "react";
const { parse, stringify } = JSON;
function useLocalStrorage(key, value) {
  const [state, setState] = useState(() => {
    const storageValue = window.localStorage.getItem(key);
    if (!storageValue) {
      window.localStorage.setItem(key, stringify(value));
      return value;
    }
    return parse(storageValue);
  });
  const setStorageValue = function (ValueOrCallback) {
    let value = ValueOrCallback;
    if (typeof ValueOrCallback === "function") {
      value = ValueOrCallback();
    }
    setState(value);
    window.localStorage.setItem(key, stringify(value));
  };

  return [state, setStorageValue];
}

export default useLocalStrorage;
