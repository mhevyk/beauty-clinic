import { useCallback, useEffect, useRef } from "react";

import { Interval } from "@/types/helpers";

type UseInterval = {
  onTick: () => void;
  duration: number;
};

export default function useInterval({ onTick, duration }: UseInterval) {
  const timerRef = useRef<Interval>();

  const startInterval = useCallback(() => {
    timerRef.current = setInterval(() => {
      onTick();
    }, duration);
  }, [onTick, duration]);

  const stopInterval = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, [startInterval, stopInterval]);

  return { startInterval, stopInterval };
}
