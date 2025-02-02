import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import AppButton from "@/styles/app-button/AppButton";
import AppIconButton from "@/styles/app-icon-button/AppIconButton";
import AppModalWrapper from "@/styles/app-modal/AppModalWrapper";
import OverlayDecorator from "@/styles/app-modal/OverlayDecorator";
import AppDrawer from "@/styles/app-modal/app-drawer/AppDrawer";
import {
  AppDrawerConfig,
  AppDrawerProps,
} from "@/styles/app-modal/app-drawer/AppDrawer.types";
import getRequiredModalConfig from "@/styles/app-modal/getRequiredModalConfig";
import { useModalStore } from "@/styles/app-modal/hooks/use-modal/useModal";
import AppTextInput from "@/styles/app-text-input/AppTextInput";
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

const createOverlayStory = (
  overrideConfig: Partial<AppDrawerConfig> = {}
): Partial<Story> => {
  return {
    args: {
      config: {
        ...getRequiredModalConfig(),
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
    addDrawer(getRequiredModalConfig());
  };

  return (
    <>
      <AppModalWrapper />
      <AppButton onClick={handleOpenDrawer}>Open drawer</AppButton>
    </>
  );
});

export const DifferentModalStackingDemo: Story = createDemoStory(() => {
  const [postTitle, setPostTitle] = useState("My post 1");
  const { addDrawer, addDialog } = useModalStore();

  const handleAddDialog = () => {
    addDialog({
      id: "edit-post",
      renderContent: () => (
        <AppTextInput
          label="Title*"
          value={postTitle}
          onChange={event => setPostTitle(event.target.value)}
          fullWidth
        />
      ),
      title: `Edit post "${postTitle}"`,
      submitButton: { label: "Save" },
      cancelButton: true,
      shouldDisableOverlayClick: true,
    });
  };

  const handleOpenDrawer = () => {
    addDrawer({
      id: "post-drawer",
      title: "Posts",
      renderContent: () => (
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <AppTypography>{postTitle}</AppTypography>
          <AppIconButton icon="ic:round-edit" onClick={handleAddDialog} />
        </div>
      ),
    });
  };

  return (
    <>
      <AppModalWrapper />
      <AppButton onClick={handleOpenDrawer}>Open drawer</AppButton>
    </>
  );
});
