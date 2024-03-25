import { useState } from "react";

export function useDelayedUnmount(delay: number) {
  const [shouldRender, setShouldRender] = useState(false);

  function mountAndStartCountdown() {
    setShouldRender(true);

    const timeoutId = setTimeout(() => {
      setShouldRender(false);
      clearTimeout(timeoutId);
    }, delay);
  }

  return [shouldRender, mountAndStartCountdown] as const;
}
