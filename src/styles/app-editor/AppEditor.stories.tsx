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

export const WithLabel: Story = {
  args: {
    label: "Label",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const WithPreviewMode: Story = {
  args: {
    fullWidth: true,
    renderPreview: content => {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    },
    init: {
      //   content_style: "body { background: red; }",
      //   icons: "material",
      //   block_formats: "Paragraph=p;Heading 2=h2;Heading 3=h3",
      //   formats: {
      //     paragraph: {
      //       selector: "p",
      //       classes: "app-typography app-typography--body",
      //     },
      //     heading2: {
      //       block: "h2",
      //       classes: "app-typography app-typography--h2",
      //     },
      //     heading3: {
      //       block: "h3",
      //       classes: "app-typography app-typography--h3",
      //     },
      //   },
      //   style_formats: [
      //     {
      //       title: "Paragraph",
      //       format: "paragraph",
      //     },
      //     {
      //       title: "Heading 2",
      //       format: "heading2",
      //     },
      //     { title: "Heading 3", format: "heading3" },
      //   ],
      //   menubar: false,
      //   statusbar: true,
      //   branding: false,
      //   elementpath: false,
      //   plugins: ["paste", "textcolor", "lists", "style"],
      //   toolbar: [
      //     "undo redo",
      //     "blocks",
      //     "removeformat",
      //     "bold italic underline",
      //     "link",
      //     "blockquote",
      //     "preview",
      //   ].join(" | "),
    },
  },
  render: args => {
    const [value, setValue] = useState("");

    const handleValueChange = (value: string, editor: any) => {
      //   console.log(value);
      setValue(value);
    };

    return <AppEditor {...args} value={value} onChange={handleValueChange} />;
  },
};
