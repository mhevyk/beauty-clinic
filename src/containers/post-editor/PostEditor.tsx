import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";

import { EditorEvent, Editor as TinyMCEEditor } from "tinymce";

import { postEditorConfig } from "@/containers/post-editor/PostEditor.constants";
import {
  EditorSkeleton,
  EditorWrapper,
} from "@/containers/post-editor/PostEditor.styles";
import useRealPostPreview, {
  PostEditorPreviewData,
} from "@/containers/post-editor/hooks/use-real-post-preview/useRealPostPreview";
import handlePostImageUpload, {
  FilePickerCallback,
} from "@/containers/post-editor/utils/handle-post-image-upload/handlePostImageUpload";

type InitEditorEvent = EditorEvent<{}>;

type PostEditorProps = {
  value: string;
  onChange: (value: string) => void;
  previewData: PostEditorPreviewData;
};

export default function PostEditor({
  value,
  onChange,
  previewData,
}: PostEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const [isEditorLoading, setIsEditorLoading] = useState(true);

  useRealPostPreview(editorRef, value, previewData);

  const handleEditorInit = (_: InitEditorEvent, editor: TinyMCEEditor) => {
    editorRef.current = editor;
    setIsEditorLoading(false);
  };

  const handleFileUpload = (callback: FilePickerCallback) => {
    handlePostImageUpload(editorRef.current!, callback);
  };

  return (
    <>
      {isEditorLoading && <EditorSkeleton data-testid="editor-skeleton" />}
      <EditorWrapper isEditorLoading={isEditorLoading}>
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          value={value}
          onEditorChange={onChange}
          onInit={handleEditorInit}
          init={{
            ...postEditorConfig,
            file_picker_callback: handleFileUpload,
          }}
          
        />
      </EditorWrapper>
    </>
  );
}
