import { useEffect } from "react";

function useLockPageScroll(shouldLockPageScroll: boolean) {
  useEffect(() => {
    const body = document.body;

    if (shouldLockPageScroll) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }

    return () => {
      body.style.overflow = "";
    };
  }, [shouldLockPageScroll]);
}

export default useLockPageScroll;
