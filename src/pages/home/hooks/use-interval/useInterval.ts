import { useEffect, useRef } from "react";

import { Interval } from "@/types/helpers";

type UseInterval = {
  onTick: () => void;
  duration: number;
};

export default function useInterval({ onTick, duration }: UseInterval) {
  const timerRef = useRef<Interval>();

  const startInterval = () => {
    timerRef.current = setInterval(() => {
      onTick();
    }, duration);
  };

  const stopInterval = () => {
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    startInterval();
    return () => stopInterval();
  }, [startInterval]);

  return { startInterval, stopInterval };
}
