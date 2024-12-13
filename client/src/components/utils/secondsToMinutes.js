const secondsToMinutes = function (seconds) {
  return `${Math.floor(seconds / 60)}:${
    seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60
  }`;
};

export default secondsToMinutes;
