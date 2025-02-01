import { Icon } from "@iconify/react";
import { Meta, StoryObj } from "@storybook/react";

import { APP_COLORS } from "@/styles";
import AppButton from "@/styles/app-button/AppButton";
import AppModalWrapper from "@/styles/app-modal/AppModalWrapper";
import AppDialog from "@/styles/app-modal/app-dialog/AppDialog";
import {
  AppDialogConfig,
  AppDialogProps,
} from "@/styles/app-modal/app-dialog/AppDialog.types";
import { useModalStore } from "@/styles/app-modal/hooks/use-modal/useModal";
import { createModalArgs } from "@/styles/app-modal/utils/create-modal-args/createModalArgs";
import AppTypography from "@/styles/app-typography/AppTypography";

const meta: Meta<AppDialogProps> = {
  title: "modals/AppDialog",
  component: AppDialog,
  tags: ["autodocs"],
  beforeEach: () => useModalStore.getState().closeAllModals(),
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Some stories are not included in the docs, see them separately",
      },
      story: {
        height: "300px",
      },
    },
  },
  globals: {
    backgrounds: { value: APP_COLORS.overlay },
  },
};

export default meta;

type Story = StoryObj<AppDialogProps>;

export const Default: Story = {
  args: createModalArgs(),
};

// @TODO: add AppTooltip for long title
export const WithLongTitle: Story = {
  args: createModalArgs({
    title: "This is a very long title that should be truncated",
  }),
};

export const DefaultDemo: Story = {
  tags: ["!autodocs"],
  globals: {
    backgrounds: null,
  },
  parameters: {
    layout: "padded",
  },
  render: () => {
    const { addDialog } = useModalStore();

    const handleOpenDialog = () => {
      addDialog(createModalArgs().config);
    };

    return (
      <>
        <AppModalWrapper />
        <AppButton onClick={handleOpenDialog}>Open modal</AppButton>
      </>
    );
  },
};

export const CustomizedDemo: Story = {
  tags: ["!autodocs"],
  globals: {
    backgrounds: null,
  },
  parameters: {
    layout: "padded",
  },
  render: () => {
    const { addDialog } = useModalStore();

    const handleOpenDialog = () => {
      addDialog(
        createModalArgs<AppDialogConfig>({
          size: "md",
          shouldDisableOverlayClick: true,
          submitButton: { label: "Save" },
          cancelButton: true,
        }).config
      );
    };

    return (
      <>
        <AppModalWrapper />
        <AppButton onClick={handleOpenDialog}>Open modal</AppButton>
      </>
    );
  },
};

export const WithDefaultSubmitButton: Story = {
  args: createModalArgs<AppDialogConfig>({ submitButton: true }),
};

export const WithDefaultCancelButton: Story = {
  args: createModalArgs<AppDialogConfig>({ cancelButton: true }),
};

export const WithBothDefaultButtons: Story = {
  args: createModalArgs<AppDialogConfig>({
    submitButton: true,
    cancelButton: true,
  }),
};

export const WithCustomisedCancelButton: Story = {
  args: createModalArgs<AppDialogConfig>({
    cancelButton: { label: "Custom cancel", disabled: true },
  }),
};

// @TODO: add danger variant for button
export const WithCustomizedSubmitButton: Story = {
  args: createModalArgs<AppDialogConfig>({
    submitButton: {
      label: "Delete",
      endAdornment: <Icon icon="mdi:trash" width="24" height="24" />,
    },
  }),
};

export const WithBothButtonsCustomized: Story = {
  args: createModalArgs<AppDialogConfig>({
    cancelButton: {
      label: "Reset",
    },
    submitButton: {
      isLoading: true,
    },
  }),
};

export const FullScreen: Story = {
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: createModalArgs<AppDialogConfig>({ isFullscreen: true }),
};

export const Small: Story = {
  args: createModalArgs<AppDialogConfig>({ size: "sm" }),
};

export const Medium: Story = {
  args: createModalArgs<AppDialogConfig>({ size: "md" }),
};

export const Large: Story = {
  args: createModalArgs<AppDialogConfig>({ size: "lg" }),
};

export const DisabledOverlayClickDemo: Story = {
  tags: ["!autodocs"],
  globals: {
    backgrounds: null,
  },
  parameters: {
    layout: "padded",
  },
  render: () => {
    const { addDialog } = useModalStore();

    const handleOpenDialog = () => {
      addDialog(createModalArgs({ shouldDisableOverlayClick: true }).config);
    };

    return (
      <>
        <AppModalWrapper />
        <AppButton onClick={handleOpenDialog}>Open modal</AppButton>
      </>
    );
  },
};

export const ModalStackingDemo: Story = {
  tags: ["!autodocs"],
  globals: {
    backgrounds: null,
  },
  parameters: {
    layout: "padded",
  },
  render: () => {
    const { addDialog } = useModalStore();

    const handleOpenDialog1 = () => {
      addDialog({
        id: "1",
        title: "Title 1",
        renderContent: () => (
          <AppButton onClick={handleOpenDialog2}>Open modal 2</AppButton>
        ),
      });
    };

    const handleOpenDialog2 = () => {
      addDialog({
        id: "2",
        title: "Title 2",
        renderContent: () => (
          <AppButton onClick={handleOpenDialog3}>Open modal 3</AppButton>
        ),
      });
    };

    const handleOpenDialog3 = () => {
      addDialog({
        id: "3",
        title: "Title 3",
        renderContent: () => <AppTypography>Content 3</AppTypography>,
      });
    };

    return (
      <>
        <AppModalWrapper />
        <AppButton onClick={handleOpenDialog1}>Open modal</AppButton>
      </>
    );
  },
};
