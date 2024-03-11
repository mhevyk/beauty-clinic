import { useState } from "react";

export default function useToggle(initialIsOpen: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  } as const;
}
