import { ReactNode } from "react";

export type AppModalConfig = {
  id: string;
  title?: string;
  renderContent: () => ReactNode;
  shouldDisableOverlayClick?: boolean;
};
