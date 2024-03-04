import { useState } from "react";
import { useLockPageScroll } from "./useLockPageScroll";

export function useMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setLocked } = useLockPageScroll();

  function setMenuState(isOpen: boolean) {
    setIsMobileMenuOpen(isOpen);
    setLocked(isOpen);
  }

  function toggleMobileMenu() {
    setMenuState(!isMobileMenuOpen);
  }

  function closeMobileMenu() {
    setMenuState(false);
  }

  return { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu };
}
