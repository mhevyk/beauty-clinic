import { useEffect } from "react";

function useLockPageScroll(
  shouldLockPageScroll: boolean,
  preserveScrollbar = true
) {
  useEffect(() => {
    const body = document.body;

    if (preserveScrollbar) {
      document.documentElement.style.scrollbarGutter = "stable";
    }

    if (shouldLockPageScroll) {
      body.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = "";
      document.documentElement.style.scrollbarGutter = "";
    };
  }, [shouldLockPageScroll, preserveScrollbar]);
}

export default useLockPageScroll;
