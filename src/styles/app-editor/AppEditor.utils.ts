import {
  formats,
  styleFormats,
  toolbar,
} from "@/styles/app-editor/AppEditor.contants";
import { AppEditorProps } from "@/styles/app-editor/AppEditor.types";
import rawStyles from "@/styles/app-editor/style.css?raw";

type GetEditorPlugins = Pick<AppEditorProps, "renderPreview">;

export const getEditorPlugins = ({ renderPreview }: GetEditorPlugins) => {
  return [
    "paste",
    "textcolor",
    "lists",
    "style",
    // "link",
    ...(renderPreview ? ["preview"] : []),
  ];
};

type GetAppEditorOptions = Pick<AppEditorProps, "fullWidth" | "renderPreview">;

export const getAppEditorOptions = ({
  fullWidth,
  renderPreview,
}: GetAppEditorOptions) => {
  return {
    content_style: rawStyles,
    forced_root_block: "p",
    formats,
    extended_valid_elements: "[*]",
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
