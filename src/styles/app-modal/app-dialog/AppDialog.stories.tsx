import { Icon } from "@iconify/react";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { fn } from "@storybook/test";

import AppButton from "@/styles/app-button/AppButton";
import AppDialog from "@/styles/app-modal/app-dialog/AppDialog";
import { AppDialogProps } from "@/styles/app-modal/app-dialog/AppDialog.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const defaultContent = (
  <AppTypography>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eligendi
    suscipit accusamus veritatis ullam in doloremque dolor voluptate, facilis,
    nam voluptatem sapiente repellendus vero culpa nemo officia quia? Non, iste?
  </AppTypography>
);

const meta: Meta<AppDialogProps> = {
  title: "modals/AppDialog",
  component: AppDialog,
  args: {
    title: "Title",
    children: defaultContent,
    isOpen: true,
    onClose: fn(),
  },
};

export default meta;

type Story = StoryObj<AppDialogProps>;

const getDefaultArgs = () => {
  return {
    title: "Title",
    children: defaultContent,
    isOpen: true,
    onClose: fn(),
  };
};

export const Default: Story = {
  args: getDefaultArgs(),
};

export const WithLongTitle: Story = {
  args: {
    title: "This is a very long title that should be truncated",
  },
};

export const DefaultDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <AppButton onClick={() => setIsOpen(true)}>Open dialog</AppButton>
        <AppDialog
          title="Title"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          {defaultContent}
        </AppDialog>
      </>
    );
  },
};

export const FullyCustomizedDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <AppButton onClick={() => setIsOpen(true)}>Open dialog</AppButton>
        <AppDialog
          title="This is a very long title that should be truncated"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="sm"
          shouldDisableOverlayClick
          titleTooltipConfig={{
            width: "md",
            position: "left",
          }}
          submitButton={{
            label: "Save",
            disabled: true,
            onClick: fn(),
          }}
          cancelButton={{
            label: "Discard",
            onClick: fn(),
          }}
        >
          {defaultContent}
        </AppDialog>
      </>
    );
  },
};

export const WithDefaultSubmitButton: Story = {
  args: {
    submitButton: true,
  },
};

export const WithDefaultCancelButton: Story = {
  args: {
    cancelButton: true,
  },
};

export const WithBothDefaultButtons: Story = {
  args: {
    submitButton: true,
    cancelButton: true,
  },
};

export const WithCustomisedCancelButton: Story = {
  args: {
    cancelButton: {
      label: "Custom cancel",
      disabled: true,
    },
  },
};

export const WithCustomizedSubmitButton: Story = {
  args: {
    submitButton: {
      label: "Delete",
      endAdornment: <Icon icon="mdi:trash" width="24" height="24" />,
    },
  },
};

export const WithBothButtonsCustomized: Story = {
  args: {
    cancelButton: {
      label: "Reset",
    },
    submitButton: {
      isLoading: true,
    },
  },
};

export const FullScreen: Story = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isFullscreen: true,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    submitButton: true,
    cancelButton: true,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    submitButton: true,
    cancelButton: true,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    submitButton: true,
    cancelButton: true,
  },
};

export const DisabledOverlayClickDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <AppButton onClick={() => setIsOpen(true)}>Open dialog</AppButton>
        <AppDialog
          title="Title"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          shouldDisableOverlayClick
        >
          {defaultContent}
        </AppDialog>
      </>
    );
  },
};

export const DialogStackingDemo: Story = {
  render: () => {
    const [isLargeDialogOpen, setIsLargeDialogOpen] = useState(false);
    const [isMediumDialogOpen, setIsMediumDialogOpen] = useState(false);
    const [isSmallDialogOpen, setIsSmallDialogOpen] = useState(false);

    return (
      <>
        <AppButton onClick={() => setIsLargeDialogOpen(true)}>
          Open dialog 1
        </AppButton>
        <AppDialog
          title="Dialog 1"
          size="lg"
          isOpen={isLargeDialogOpen}
          onClose={() => setIsLargeDialogOpen(false)}
          submitButton={{
            label: "Open dialog 2",
            onClick: () => setIsMediumDialogOpen(true),
          }}
        >
          {defaultContent}
        </AppDialog>
        <AppDialog
          title="Dialog 2"
          size="md"
          isOpen={isMediumDialogOpen}
          onClose={() => setIsMediumDialogOpen(false)}
          submitButton={{
            label: "Open dialog 3",
            onClick: () => setIsSmallDialogOpen(true),
          }}
        >
          {defaultContent}
        </AppDialog>
        <AppDialog
          title="Dialog 3"
          size="sm"
          isOpen={isSmallDialogOpen}
          onClose={() => setIsSmallDialogOpen(false)}
        >
          {defaultContent}
        </AppDialog>
      </>
    );
  },
};
