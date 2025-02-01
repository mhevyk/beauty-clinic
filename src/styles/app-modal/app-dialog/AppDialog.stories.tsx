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
import { useModalStore } from "@/styles/app-modal/useModal";
import AppTypography from "@/styles/app-typography/AppTypography";

const meta: Meta<AppDialogProps> = {
  title: "modals/AppDialog",
  beforeEach: () => useModalStore.getState().closeAllModals(),
  component: AppDialog,
  tags: ["autodocs"],
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

const demoStoryBaseProps: Partial<Story> = {
  tags: ["!autodocs"],
  globals: {
    backgrounds: null,
  },
  parameters: {
    layout: "padded",
  },
};

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
  ...demoStoryBaseProps,
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

export const CustomizedDemo: Story = {
  ...demoStoryBaseProps,
  render: () => {
    const { addDialog } = useModalStore();

    const handleOpenModal = () => {
      addDialog(
        createModalArgs({
          size: "md",
          shouldDisableOverlayClick: true,
          submitButton: { label: "Save", disabled: true },
          cancelButton: true,
        }).modal
      );
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
  tags: ["!autodocs"],
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
  ...demoStoryBaseProps,
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
  ...demoStoryBaseProps,
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
