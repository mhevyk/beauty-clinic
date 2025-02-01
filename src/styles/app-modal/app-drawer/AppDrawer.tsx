import { KeyboardEvent, MouseEvent } from "react";

import AppIconButton from "@/styles/app-icon-button/AppIconButton";
import "@/styles/app-modal/app-drawer/AppDrawer.scss";
import { AppDrawerProps } from "@/styles/app-modal/app-drawer/AppDrawer.types";
import { useModalStore } from "@/styles/app-modal/hooks/use-modal/useModal";
import AppTypography from "@/styles/app-typography/AppTypography";

const AppDrawer = ({ config }: AppDrawerProps) => {
  const { closeModalById } = useModalStore();

  const { id: drawerId } = config;

  const handleDrawerClose = () => {
    closeModalById(drawerId);
  };

  const handleDrawerClick = (event: MouseEvent<HTMLDialogElement>) => {
    event.stopPropagation();
  };

  const handleDrawerKeydown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleDrawerClose();
    }
  };

  return (
    <aside
      className="app-drawer"
      onClick={handleDrawerClick}
      onKeyDown={handleDrawerKeydown}
      role="dialog"
      tabIndex={0}
    >
      <header className="app-drawer__header">
        <AppTypography variant="h4">{config.title}</AppTypography>
        <AppIconButton
          icon="ic:sharp-close"
          aria-label="Close drawer"
          onClick={handleDrawerClose}
          className="app-drawer__close-button"
        />
      </header>
      <div className="app-drawer__content">{config.renderContent()}</div>
    </aside>
  );
};

export default AppDrawer;
