import { AppEditorProps } from "@/styles/app-editor/AppEditor.types";

type GetEditorPlugins = Pick<AppEditorProps, "renderPreview">;

export const getEditorPlugins = ({ renderPreview }: GetEditorPlugins) => {
  return [
    "paste",
    "textcolor",
    "lists",
    "style",
    ...(renderPreview ? ["preview"] : []),
  ];
};
