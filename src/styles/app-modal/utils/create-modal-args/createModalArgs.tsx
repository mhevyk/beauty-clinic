import { AppModalConfig } from "@/styles/app-modal/AppModalWrapper.types";
import AppTypography from "@/styles/app-typography/AppTypography";

export const createModalArgs = <ModalConfig extends AppModalConfig>(
  overrideArgs?: Partial<ModalConfig>
) => {
  return {
    config: {
      id: crypto.randomUUID(),
      title: "Title",
      renderContent: () => (
        <AppTypography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          eligendi suscipit accusamus veritatis ullam in doloremque dolor
          voluptate, facilis, nam voluptatem sapiente repellendus vero culpa
          nemo officia quia? Non, iste?
        </AppTypography>
      ),
      ...overrideArgs,
    } as ModalConfig,
  };
};
