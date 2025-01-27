import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

import classNames from "classnames";
import { Editor as TinyMCEEditor } from "tinymce";

import "@/styles/app-editor/AppEditor.scss";
import { AppEditorProps } from "@/styles/app-editor/AppEditor.types";
import rawStyles from "@/styles/app-editor/style.css?raw";
import useEditorPreview from "@/styles/app-editor/useEditorPreview";
import AppFormControl from "@/styles/app-form-control/AppFormControl";

const AppEditor = ({
  value,
  onChange,
  controlRef,
  errorMessage,
  helperText,
  label,
  init,
  fullWidth,
  renderPreview,
  ...editorProps
}: AppEditorProps) => {
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const [isEditorError, setIsEditorError] = useState(false);

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const { setup, ...restInitOptions } = init ?? {};

  const handleEditorSetup = (editor: TinyMCEEditor) => {
    setup?.(editor);

    editorRef.current = editor;
    editor.on("init", handleEditorInit);
    editor.on("error", handleEditorError);
  };

  const handleEditorInit = () => {
    setIsEditorLoading(false);
  };

  const handleEditorError = () => {
    setIsEditorLoading(false);
    setIsEditorError(true);
  };

  useEditorPreview({
    editorRef,
    value,
    renderPreview,
  });

  //   console.log(rawStyles);

  // TODO: fix switching formats behaviour

  return (
    <AppFormControl
      ref={controlRef}
      className={classNames("app-editor", {
        "app-editor--full-width": fullWidth,
      })}
      control={
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          value={value}
          onEditorChange={onChange}
          init={{
            setup: handleEditorSetup,
            content_style: rawStyles,
            forced_root_block: "p", // Default block is <p>
            formats: {
              defaultText: {
                block: "p",
                classes: "app-typography app-typography--body", // Default paragraph format
              },
              heading2: {
                block: "h2",
                classes: "app-typography app-typography--h2",
              },
              heading3: {
                block: "h3",
                classes: "app-typography app-typography--h3",
              },
            },
            style_formats: [
              {
                title: "Paragraph",
                format: "defaultText", // Maps to the formats.defaultText configuration
              },
              {
                title: "Paragraph",
                format: "paragraph",
              },
              {
                title: "Heading 2",
                format: "heading2",
              },
              { title: "Heading 3", format: "heading3" },
            ],
            ...restInitOptions,
          }}
          {...editorProps}
        />
      }
      errorMessage={errorMessage}
      helperText={helperText}
      label={label}
    />
  );
};

export default AppEditor;
