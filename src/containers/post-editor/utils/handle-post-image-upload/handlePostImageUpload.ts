import { Editor as TinyMCEEditor } from "tinymce";

import { uploadFileToMemory } from "@/containers/post-editor/utils/upload-file-to-memory/uploadFileToMemory";
import extractErrorMessage from "@/utils/extract-error-message/extractErrorMessage";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

export type FilePickerCallback = (
  value: string,
  meta?: Record<string, unknown>
) => void;

export default async function handlePostImageUpload(
  editor: TinyMCEEditor,
  callback: FilePickerCallback
) {
  try {
    const { url, filename } = await uploadFileToMemory(editor);
    callback(url, { title: filename });
  } catch (error) {
    showSnackbar({ message: extractErrorMessage(error) });
  }
}
