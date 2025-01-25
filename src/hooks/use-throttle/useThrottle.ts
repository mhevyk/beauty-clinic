import { useRef } from "react";

export default function useThrottle<T extends (...args: Parameters<T>) => void>(
  callback: T,
  interval: number = 50
) {
  const lastCall = useRef(Date.now());

  return (...args: Parameters<T>) => {
    if (Date.now() >= lastCall.current + interval) {
      callback(...args);
      lastCall.current = Date.now();
    }
  };
}
