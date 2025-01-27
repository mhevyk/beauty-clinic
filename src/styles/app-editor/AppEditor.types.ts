import { IEditorPropTypes } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/EditorPropTypes";
import { ReactNode } from "react";

import { Editor as TinyMCEEditor } from "tinymce";

import { AppFormControlMeta } from "@/styles/app-form-control/AppFormControl.types";

export type AppEditorProps = AppFormControlMeta &
  Omit<IEditorPropTypes, "apiKey" | "value" | "onEditorChange"> & {
    value: string;
    onChange: (value: string, editor: TinyMCEEditor) => void;
    renderPreview?: (content: string) => ReactNode;
    fullWidth?: boolean;
  };
