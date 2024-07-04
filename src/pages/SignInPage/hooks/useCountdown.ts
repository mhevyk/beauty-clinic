import { useCallback, useRef, useState } from "react";

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
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setSecondsLeft(seconds);
  }, [onCountdownFinished, setSecondsLeft]);

  const start = useCallback(() => {
    onCountdownStarted?.();
    reset();

    timerRef.current = setInterval(() => {
      setSecondsLeft(secondsLeft => {
        const decreasedSeconds = secondsLeft - 1;

        if (decreasedSeconds <= 0) {
          onCountdownFinished?.();
          reset();
          return 0;
        }

        return decreasedSeconds;
      });
    }, 1000);
  }, [onCountdownStarted, setSecondsLeft, reset]);

  return { secondsLeft, start, reset } as const;
}
