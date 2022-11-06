import { useRef, useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export function useIntervalWhen(
  callback_: () => void,
  intervalDurationMs: number = 0,
  when: boolean = true,
  startImmediate: boolean = false
): void {
  const savedRefCallback = useRef<() => any>();

  useEffect(() => {
    savedRefCallback.current = callback_;
  });

  function callback() {
    savedRefCallback.current && savedRefCallback.current();
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (when) {
        if (startImmediate) {
          callback();
        }
        const interval = window.setInterval(callback, intervalDurationMs);

        return () => {
          window.clearInterval(interval);
        };
      }
    } else {
      console.warn("useIntervalWhen: window is undefined.");
    }
  }, [when, intervalDurationMs, startImmediate]);
}
