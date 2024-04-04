import { useEffect, useRef } from "react";

type UseInterval = {
  onTick: () => void;
  duration: number;
};

export default function useInterval({ onTick, duration }: UseInterval) {
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, []);

  const stopInterval = () => {
    clearInterval(timerRef.current);
  };

  const startInterval = () => {
    timerRef.current = setInterval(() => {
      onTick();
    }, duration);
  };

  return { startInterval, stopInterval };
}
