import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import AppEditor from "@/styles/app-editor/AppEditor";
import { AppEditorProps } from "@/styles/app-editor/AppEditor.types";

const meta: Meta<AppEditorProps> = {
  title: "AppEditor",
  component: AppEditor,
  tags: ["autodocs"],
  parameters: {
    docs: {
      story: {
        height: "60px",
      },
    },
  },
};

export default meta;

type Story = StoryObj<AppEditorProps>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Label",
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Helper text",
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: "Error message",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const WithPreviewMode: Story = {
  render: () => {
    const [value, setValue] = useState("");

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
    };

    const renderPreview = (content: string) => {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    };

    return (
      <AppEditor
        fullWidth
        value={value}
        onChange={handleValueChange}
        renderPreview={renderPreview}
      />
    );
  },
};
