import { Dispatch, SetStateAction, useState } from "react";

import { useIntervalWhen } from "./useInterval";

interface UseCountdownType {
  duration: number;
  interval: number;
  isIncrement?: boolean;
}

export function useCountdown({
  duration,
  interval,
  isIncrement,
}: UseCountdownType): number {
  const { count, increment, decrement } = useCounter(duration, 100);

  useIntervalWhen(
    isIncrement ? increment : decrement,
    interval,
    count > 0,
    true
  );

  return Math.floor((count / duration) * count);
}

interface ReturnType {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: Dispatch<SetStateAction<number>>;
}

const useCounter = (initialValue?: number, step?: number): ReturnType => {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => setCount((x) => x + (step ? step : 1));
  const decrement = () => setCount((x) => x - (step ? step : 1));
  const reset = () => setCount(initialValue || 0);

  return {
    count,
    increment,
    decrement,
    reset,
    setCount,
  };
};
