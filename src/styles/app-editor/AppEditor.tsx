import { Editor } from "@tinymce/tinymce-react";
import { useMemo, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import classNames from "classnames";

import { styleFormats } from "@/styles/app-editor/AppEditor.contants";
import "@/styles/app-editor/AppEditor.scss";
import {
  AppEditorHandler,
  AppEditorProps,
} from "@/styles/app-editor/AppEditor.types";
import { getAppEditorOptions } from "@/styles/app-editor/AppEditor.utils";
import AppFormControl from "@/styles/app-form-control/AppFormControl";

type NodeChangeHandler = AppEditorHandler<{ element: Element }>;
type ExecCommandHandler = AppEditorHandler<{ command: string }>;

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
  const previousContentRef = useRef(value);

  const handleEditorInit: AppEditorHandler = (_, editor) => () => {
    editor.formatter.apply(styleFormats[0].format);
  };

  const handleNodeChange: NodeChangeHandler = event => {
    const element = event.element;

    if (element.nodeName === "P" && !element.hasAttribute("paragraph")) {
      element.setAttribute("data-element", "paragraph");
    }
  };

  const handleBeforeExecCommand: ExecCommandHandler = (event, editor) => {
    if (event.command == "mcePreview") {
      const content = editor.getContent();
      previousContentRef.current = content;

      if (renderPreview) {
        const previewJSX = renderPreview(content);
        const previewContent = renderToStaticMarkup(previewJSX);
        editor.setContent(previewContent);
      }
    }
  };

  const handleExecCommand: ExecCommandHandler = (event, editor) => {
    if (event.command == "mcePreview") {
      editor.setContent(previousContentRef.current);
    }
  };

  const initOptions = useMemo(
    () => getAppEditorOptions({ fullWidth, renderPreview }),
    [fullWidth, renderPreview]
  );

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
          onInit={handleEditorInit}
          onNodeChange={handleNodeChange}
          onBeforeExecCommand={handleBeforeExecCommand}
          onExecCommand={handleExecCommand}
          init={initOptions}
        />
      }
      errorMessage={errorMessage}
      helperText={helperText}
      label={label}
    />
  );
};

export default AppEditor;
