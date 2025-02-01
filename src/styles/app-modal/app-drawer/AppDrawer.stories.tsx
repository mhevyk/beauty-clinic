import { Meta, StoryObj } from "@storybook/react";

import AppButton from "@/styles/app-button/AppButton";
import AppModalWrapper from "@/styles/app-modal/AppModalWrapper";
import AppDrawer from "@/styles/app-modal/app-drawer/AppDrawer";
import { AppDrawerProps } from "@/styles/app-modal/app-drawer/AppDrawer.types";
import { useModalStore } from "@/styles/app-modal/hooks/use-modal/useModal";
import { createModalArgs } from "@/styles/app-modal/utils/create-modal-args/createModalArgs";

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
    backgrounds: {
      default: "overlay",
    },
  },
};

export default meta;

type Story = StoryObj<AppDrawerProps>;

const getDefaultDemoStoryProps = (): Partial<Story> => {
  return {
    tags: ["!autodocs"],
    parameters: {
      layout: "padded",
      backgrounds: { default: "light" },
    },
  };
};

export const Default: Story = {
  args: createModalArgs(),
};

export const DefaultDemo: Story = {
  ...getDefaultDemoStoryProps(),
  render: () => {
    const { addDrawer } = useModalStore();

    const handleOpenDrawer = () => {
      addDrawer(createModalArgs().config);
    };

    return (
      <>
        <AppModalWrapper />
        <AppButton onClick={handleOpenDrawer}>Open drawer</AppButton>
      </>
    );
  },
};
