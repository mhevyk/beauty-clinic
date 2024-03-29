import { useState } from "react";

export function useDelayedUnmount(delay: number) {
  const [shouldRender, setShouldRender] = useState(false);

  function mountAndStartCountdown() {
    setShouldRender(true);

    setTimeout(() => {
      setShouldRender(false);
    }, delay);
  }

  return [shouldRender, mountAndStartCountdown] as const;
}
