import { useEffect, useLayoutEffect, useState } from "react";

export function useLockPageScroll(initialLocked = false) {
  const [locked, setLocked] = useState(initialLocked);

  useLayoutEffect(() => {
    if (!locked) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked);
    }
  }, [initialLocked]);

  return { locked, setLocked } as const;
}
