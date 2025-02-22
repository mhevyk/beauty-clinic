import {
  formats,
  styleFormats,
  toolbar,
} from "@/styles/app-editor/AppEditor.contants";
import { AppEditorProps } from "@/styles/app-editor/AppEditor.types";

type GetEditorPlugins = Pick<AppEditorProps, "renderPreview">;

export const getEditorPlugins = ({ renderPreview }: GetEditorPlugins) => {
  return [
    "paste",
    "textcolor",
    "lists",
    "style",
    "link",
    // TODO: configure styles for preview
    ...(renderPreview ? ["preview"] : []),
  ];
};

type GetAppEditorOptions = Pick<AppEditorProps, "fullWidth" | "renderPreview">;

export const getAppEditorOptions = ({
  fullWidth,
  renderPreview,
}: GetAppEditorOptions) => {
  return {
    formats,
    style_formats: styleFormats,
    menubar: false,
    statusbar: true,
    branding: false,
    elementpath: false,
    resize: false,
    merge_siblings: true,
    max_height: fullWidth ? 350 : 250,
    toolbar,
    plugins: getEditorPlugins({ renderPreview }),
  };
};
