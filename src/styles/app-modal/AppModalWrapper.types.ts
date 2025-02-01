import { ReactNode } from "react";

export type AppModalType = "dialog" | "drawer";

export type AppModalWithType<Modal extends AppModalConfig> = Modal & {
  type: AppModalType;
};

export type AppModalConfig = {
  id: string;
  title?: string;
  renderContent: () => ReactNode;
  shouldDisableOverlayClick?: boolean;
};
