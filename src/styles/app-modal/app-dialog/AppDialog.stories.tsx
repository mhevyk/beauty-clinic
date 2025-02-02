import { Icon } from "@iconify/react";
import { Meta, StoryObj } from "@storybook/react";

import AppButton from "@/styles/app-button/AppButton";
import AppModalWrapper from "@/styles/app-modal/AppModalWrapper";
import OverlayDecorator from "@/styles/app-modal/OverlayDecorator";
import AppDialog from "@/styles/app-modal/app-dialog/AppDialog";
import {
  AppDialogConfig,
  AppDialogProps,
} from "@/styles/app-modal/app-dialog/AppDialog.types";
import { useModalStore } from "@/styles/app-modal/hooks/use-modal/useModal";
import AppTypography from "@/styles/app-typography/AppTypography";

const meta: Meta<AppDialogProps> = {
  title: "modals/AppDialog",
  component: AppDialog,
  tags: ["autodocs"],
  beforeEach: () => useModalStore.getState().closeAllModals(),
  parameters: {
    docs: {
      description: {
        component:
          "Some stories are not included in the docs, see them separately",
      },
      story: {
        height: "500px",
      },
    },
  },
};

export default meta;

type Story = StoryObj<AppDialogProps>;

const getRequiredDialogConfig = () => {
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
  overrideConfig: Partial<AppDialogConfig> = {}
): Partial<Story> => {
  return {
    args: {
      config: {
        ...getRequiredDialogConfig(),
        ...overrideConfig,
      },
    },
    decorators: [OverlayDecorator],
  };
};

const createDemoStory = (render: Story["render"]): Partial<Story> => {
  return {
    tags: ["!autodocs"],
    render,
  };
};

export const Default: Story = createOverlayStory();

// @TODO: add AppTooltip for long title
export const WithLongTitle: Story = createOverlayStory({
  title: "This is a very long title that should be truncated",
});

export const DefaultDemo: Story = createDemoStory(() => {
  const { addDialog } = useModalStore();

  const handleOpenDialog = () => {
    addDialog(getRequiredDialogConfig());
  };

  return (
    <>
      <AppModalWrapper />
      <AppButton onClick={handleOpenDialog}>Open modal</AppButton>
    </>
  );
});

export const CustomizedDemo: Story = createDemoStory(() => {
  const { addDialog, closeModalById } = useModalStore();

  const requiredDialogConfig = getRequiredDialogConfig();

  const handleOpenDialog = () => {
    addDialog({
      ...requiredDialogConfig,
      size: "md",
      shouldDisableOverlayClick: true,
      submitButton: {
        label: "Save",
        onClick: () => closeModalById(requiredDialogConfig.id),
      },
      cancelButton: true,
    });
  };

  return (
    <>
      <AppModalWrapper />
      <AppButton onClick={handleOpenDialog}>Open modal</AppButton>
    </>
  );
});

export const WithDefaultSubmitButton: Story = createOverlayStory({
  submitButton: true,
});

export const WithDefaultCancelButton: Story = createOverlayStory({
  cancelButton: true,
});

export const WithBothDefaultButtons: Story = createOverlayStory({
  submitButton: true,
  cancelButton: true,
});

export const WithCustomisedCancelButton: Story = createOverlayStory({
  cancelButton: { label: "Custom cancel", disabled: true },
});

// @TODO: add danger variant for button
export const WithCustomizedSubmitButton: Story = createOverlayStory({
  submitButton: {
    label: "Delete",
    endAdornment: <Icon icon="mdi:trash" width="24" height="24" />,
  },
});

export const WithBothButtonsCustomized: Story = createOverlayStory({
  cancelButton: {
    label: "Reset",
  },
  submitButton: {
    isLoading: true,
  },
});

export const FullScreen: Story = {
  ...createOverlayStory({ isFullscreen: true }),
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export const Small: Story = createOverlayStory({ size: "sm" });
export const Medium: Story = createOverlayStory({ size: "md" });
export const Large: Story = createOverlayStory({ size: "lg" });

export const DisabledOverlayClickDemo: Story = createDemoStory(() => {
  const { addDialog } = useModalStore();

  const handleOpenDialog = () => {
    addDialog({
      ...getRequiredDialogConfig(),
      shouldDisableOverlayClick: true,
    });
  };

  return (
    <>
      <AppModalWrapper />
      <AppButton onClick={handleOpenDialog}>Open modal</AppButton>
    </>
  );
});

export const ModalStackingDemo: Story = createDemoStory(() => {
  const { addDialog } = useModalStore();

  const handleOpenDialog1 = () => {
    addDialog({
      ...getRequiredDialogConfig(),
      title: "Modal lg",
      size: "lg",
      submitButton: {
        label: "Open next modal",
        onClick: handleOpenDialog2,
      },
    });
  };

  const handleOpenDialog2 = () => {
    addDialog({
      ...getRequiredDialogConfig(),
      size: "md",
      title: "Modal md",
      submitButton: {
        label: "Open next modal",
        onClick: handleOpenDialog3,
      },
    });
  };

  const handleOpenDialog3 = () => {
    addDialog({
      ...getRequiredDialogConfig(),
      title: "Modal sm",
      size: "sm",
    });
  };

  return (
    <>
      <AppModalWrapper />
      <AppButton onClick={handleOpenDialog1}>Open modal</AppButton>
    </>
  );
});
