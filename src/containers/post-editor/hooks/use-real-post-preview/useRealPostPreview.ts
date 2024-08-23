import { RefObject, useEffect, useRef } from "react";

import { EditorEvent, Editor as TinyMCEEditor } from "tinymce";

import createPostPreviewLayout from "@/containers/post-editor/utils/create-post-preview-layout/createPostPreviewLayout";

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

export default function useRealPostPreview(
  editorRef: RefObject<TinyMCEEditor>,
  value: string,
  previewData: PostEditorPreviewData
) {
  const previousCommandRef = useRef(EDITOR_COMMANDS.FOCUS);
  const prevContentRef = useRef(value);

  const handleOpenPreview = (
    editor: TinyMCEEditor,
    previewData: PostEditorPreviewData
  ) => {
    const content = editor.getContent();
    prevContentRef.current = content;
    editor.setContent(createPostPreviewLayout({ ...previewData, content }));
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
        handleOpenPreview(editor, previewData);
      } else if (isPreviewCloseCommand) {
        handleClosePreview(editor);
      }

      previousCommandRef.current = editorEvent.command;
    };

    editor.on("BeforeExecCommand", handleBeforeExecCommand);

    return () => {
      if (editor) {
        editor.off("BeforeExecCommand", handleBeforeExecCommand);
      }
    };
  }, [previewData.title, editorRef.current]);
}
