import { ReactNode, RefObject, useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { EditorEvent, Editor as TinyMCEEditor } from "tinymce";

export type PostEditorPreviewData = {
  title: string;
};

const EDITOR_COMMANDS = {
  FOCUS: "mceFocus",
  PREVIEW: "mcePreview",
};

type EventWithCommand = EditorEvent<{
  command: string;
}>;

type UseEditorPreview = {
  editorRef: RefObject<TinyMCEEditor>;
  value: string;
  renderPreview?: (content: string) => ReactNode;
};

export default function useEditorPreview({
  editorRef,
  value,
  renderPreview,
}: UseEditorPreview) {
  const previousCommandRef = useRef(EDITOR_COMMANDS.FOCUS);
  const prevContentRef = useRef(value);

  const handleOpenPreview = (editor: TinyMCEEditor) => {
    const content = editor.getContent();
    prevContentRef.current = content;

    if (renderPreview) {
      const previewJSX = renderPreview(content);
      editor.setContent(renderToStaticMarkup(previewJSX));
    }
  };

  const handleClosePreview = (editor: TinyMCEEditor) => {
    editor.setContent(prevContentRef.current);
  };

  useEffect(() => {
    const editor = editorRef.current;

    if (!editor) {
      return;
    }

    const handleBeforeExecCommand = (editorEvent: EventWithCommand) => {
      const isPreviewOpenCommand =
        editorEvent.command == EDITOR_COMMANDS.PREVIEW;

      const isPreviewCloseCommand =
        editorEvent.command === EDITOR_COMMANDS.FOCUS &&
        previousCommandRef.current === EDITOR_COMMANDS.PREVIEW;

      if (isPreviewOpenCommand) {
        handleOpenPreview(editor);
      } else if (isPreviewCloseCommand) {
        handleClosePreview(editor);
      }

      previousCommandRef.current = editorEvent.command;
    };

    editor.on("BeforeExecCommand", handleBeforeExecCommand);

    return () => {
      editor?.off("BeforeExecCommand", handleBeforeExecCommand);
    };
  }, []);
}
