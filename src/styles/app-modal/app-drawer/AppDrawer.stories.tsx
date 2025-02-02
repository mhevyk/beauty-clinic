import { Meta, StoryObj } from "@storybook/react";

import AppButton from "@/styles/app-button/AppButton";
import AppModalWrapper from "@/styles/app-modal/AppModalWrapper";
import OverlayDecorator from "@/styles/app-modal/OverlayDecorator";
import AppDrawer from "@/styles/app-modal/app-drawer/AppDrawer";
import {
  AppDrawerConfig,
  AppDrawerProps,
} from "@/styles/app-modal/app-drawer/AppDrawer.types";
import { useModalStore } from "@/styles/app-modal/hooks/use-modal/useModal";
import AppTypography from "@/styles/app-typography/AppTypography";

const meta: Meta<AppDrawerProps> = {
  title: "modals/AppDrawer",
  component: AppDrawer,
  tags: ["autodocs"],
  beforeEach: () => useModalStore.getState().closeAllModals(),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Some stories are not included in the docs, see them separately",
      },
      story: {
        height: "100dvh",
      },
    },
  },
};

export default meta;

type Story = StoryObj<AppDrawerProps>;

const getRequiredDrawerConfig = () => {
  return {
    id: crypto.randomUUID(),
    title: "Title",
    renderContent: () => (
      <AppTypography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eligendi
        suscipit accusamus veritatis ullam in doloremque dolor voluptate,
        facilis, nam voluptatem sapiente repellendus vero culpa nemo officia
        quia? Non, iste?
      </AppTypography>
    ),
  };
};

const createOverlayStory = (
  overrideConfig: Partial<AppDrawerConfig> = {}
): Partial<Story> => {
  return {
    args: {
      config: {
        ...getRequiredDrawerConfig(),
        ...overrideConfig,
      },
    },
    decorators: [OverlayDecorator],
  };
};

const createDemoStory = (render: Story["render"]): Partial<Story> => {
  return {
    parameters: { layout: "padded" },
    tags: ["!autodocs"],
    render,
  };
};

export const Default: Story = createOverlayStory();

export const DefaultDemo: Story = createDemoStory(() => {
  const { addDrawer } = useModalStore();

  const handleOpenDrawer = () => {
    addDrawer(getRequiredDrawerConfig());
  };

  return (
    <>
      <AppModalWrapper />
      <AppButton onClick={handleOpenDrawer}>Open drawer</AppButton>
    </>
  );
});
