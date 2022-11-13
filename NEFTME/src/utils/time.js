const padTime = (time) => {
    return String(time).length === 1 ? `0${time}` : `${time}`;
  };

export const format = (time) => {
    // Convert seconds into minutes and take the whole part
    const minutes = Math.floor(time / 60);

    // Get the seconds left after converting minutes
    const seconds = time % 60;

    // Return combined values as string in format mm:ss
    return `${minutes}:${padTime(seconds)}`;
  };

  export const getDurationFormatted = (millis) => {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };