import { useCallback, useRef, useState } from "react";

import { Interval } from "@/types/helpers";

type UseCountdown = {
  seconds: number;
  onCountdownStarted?: () => void;
  onCountdownFinished?: () => void;
};

export default function useCountdown({
  seconds,
  onCountdownStarted,
  onCountdownFinished,
}: UseCountdown) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const timerRef = useRef<Interval>();
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setSecondsLeft(seconds);
    setIsTimerRunning(false);
  }, [setSecondsLeft, seconds]);

  const start = useCallback(() => {
    onCountdownStarted?.();
    reset();
    setIsTimerRunning(true);

    timerRef.current = setInterval(() => {
      setSecondsLeft(prevSecondsLeft => {
        const decreasedSeconds = prevSecondsLeft - 1;

        if (decreasedSeconds <= 0) {
          onCountdownFinished?.();

          reset();
          return 0;
        }

        return decreasedSeconds;
      });
    }, 1000);
  }, [onCountdownStarted, onCountdownFinished, setSecondsLeft, reset]);

  return { isTimerRunning, secondsLeft, start, reset } as const;
}
