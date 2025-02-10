import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

import classNames from "classnames";
import { Editor as TinyMCEEditor } from "tinymce";

import {
  formats,
  styleFormats,
  toolbar,
} from "@/styles/app-editor/AppEditor.contants";
import "@/styles/app-editor/AppEditor.scss";
import { AppEditorProps } from "@/styles/app-editor/AppEditor.types";
import { getEditorPlugins } from "@/styles/app-editor/AppEditor.utils";
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
  fullWidth,
  renderPreview,
}: AppEditorProps) => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const handleEditorSetup = (editor: TinyMCEEditor) => {
    editorRef.current = editor;

    editor.on("init", () => {
      editor.formatter.apply(styleFormats[0].format);
    });

    editor.on("NodeChange", event => {
      const element = event.element;

      if (
        element.nodeName === "P" &&
        !element.classList.contains("app-typography")
      ) {
        element.className = "app-typography app-typography--body";
      }
    });
  };

  useEditorPreview({
    editorRef,
    value,
    renderPreview,
  });

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
            forced_root_block: "p",
            plugins: getEditorPlugins({ renderPreview }),
            toolbar,
            formats,
            style_formats: styleFormats,
            menubar: false,
            statusbar: true,
            branding: false,
            elementpath: false,
          }}
        />
      }
      errorMessage={errorMessage}
      helperText={helperText}
      label={label}
    />
  );
};

export default AppEditor;
