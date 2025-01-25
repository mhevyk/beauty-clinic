import { Icon } from "@iconify/react";
import { Meta, StoryObj } from "@storybook/react";

import AppButton from "@/styles/app-button/AppButton";
import AppDialog from "@/styles/app-modal/AppDialog";
import {
  AppDialogConfig,
  AppDialogProps,
} from "@/styles/app-modal/AppModal.types";
import AppModalWrapper from "@/styles/app-modal/AppModalWrapper";
import { useModalStore } from "@/styles/app-modal/useModal";
import AppTypography from "@/styles/app-typography/AppTypography";

const meta: Meta<AppDialogProps> = {
  title: "AppModal",
  beforeEach: () => useModalStore.getState().closeAllModals(),
  component: AppDialog,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Demos are not included in the docs, see them separately",
      },
      story: {
        height: "300px",
      },
    },
  },
};

export default meta;

type Story = StoryObj<AppDialogProps>;

const createModalArgs = (
  overrideArgs?: Partial<AppDialogConfig>
): AppDialogProps => {
  return {
    modal: {
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
    },
  };
};

export const Default: Story = {
  args: createModalArgs(),
};

export const DefaultDemo: Story = {
  tags: ["!autodocs"],
  render: () => {
    const { addDialog } = useModalStore();

    const handleOpenModal = () => {
      addDialog(createModalArgs().modal);
    };

    return (
      <>
        <AppModalWrapper />
        <AppButton onClick={handleOpenModal}>Open modal</AppButton>
      </>
    );
  },
};

export const WithDefaultSubmitButton: Story = {
  args: createModalArgs({ submitButton: true }),
};

export const WithDefaultCancelButton: Story = {
  args: createModalArgs({ cancelButton: true }),
};

export const WithBothDefaultButtons: Story = {
  args: createModalArgs({ submitButton: true, cancelButton: true }),
};

export const WithCustomisedCancelButton: Story = {
  args: createModalArgs({
    cancelButton: { label: "Custom cancel", disabled: true },
  }),
};

// @TODO: add danger variant for button
export const WithCustomizedSubmitButton: Story = {
  args: createModalArgs({
    submitButton: {
      label: "Delete",
      endAdornment: <Icon icon="mdi:trash" width="24" height="24" />,
    },
  }),
};

export const WithBothButtonsCustomized: Story = {
  args: createModalArgs({
    cancelButton: {
      label: "Reset",
    },
    submitButton: {
      isLoading: true,
    },
  }),
};

export const FullScreen: Story = {
  args: createModalArgs({ isFullscreen: true }),
};

export const Small: Story = {
  args: createModalArgs({ size: "sm" }),
};

export const Medium: Story = {
  args: createModalArgs({ size: "md" }),
};

export const Large: Story = {
  args: createModalArgs({ size: "lg" }),
};

export const DisabledOverlayClickDemo: Story = {
  tags: ["!autodocs"],
  render: () => {
    const { addDialog } = useModalStore();

    const handleOpenModal = () => {
      addDialog(createModalArgs({ shouldDisableOverlayClick: true }).modal);
    };

    return (
      <>
        <AppModalWrapper />
        <AppButton onClick={handleOpenModal}>Open modal</AppButton>
      </>
    );
  },
};

export const ModalStackingDemo: Story = {
  tags: ["!autodocs"],
  render: () => {
    const { addDialog } = useModalStore();

    const handleOpenModal1 = () => {
      addDialog({
        id: "1",
        title: "Title 1",
        renderContent: () => (
          <AppButton onClick={handleOpenModal2}>Open modal 2</AppButton>
        ),
      });
    };

    const handleOpenModal2 = () => {
      addDialog({
        id: "2",
        title: "Title 2",
        renderContent: () => (
          <AppButton onClick={handleOpenModal3}>Open modal 3</AppButton>
        ),
      });
    };

    const handleOpenModal3 = () => {
      addDialog({
        id: "3",
        title: "Title 3",
        renderContent: () => <AppTypography>Content 3</AppTypography>,
      });
    };

    return (
      <>
        <AppModalWrapper />
        <AppButton onClick={handleOpenModal1}>Open modal</AppButton>
      </>
    );
  },
};
