import { ReactNode } from "react";

import { EditorEvent, Editor as TinyMCEEditor } from "tinymce";

import { AppFormControlMeta } from "@/styles/app-form-control/AppFormControl.types";

export type AppEditorHandler<T = object> = (
  event: EditorEvent<T>,
  editor: TinyMCEEditor
) => void;

export type AppEditorProps = AppFormControlMeta & {
  value: string;
  onChange: (value: string, editor: TinyMCEEditor) => void;
  renderPreview?: (content: string) => ReactNode;
  fullWidth?: boolean;
};
