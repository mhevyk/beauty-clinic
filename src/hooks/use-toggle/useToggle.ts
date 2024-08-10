import { useCallback, useState } from "react";

export default function useToggle(initialIsOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(isOpen => !isOpen);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  } as const;
}
