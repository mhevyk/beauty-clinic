import { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";

export const styleFormats = [
  {
    title: "Paragraph",
    format: "defaultText",
  },
  {
    title: "Heading 2",
    format: "heading2",
  },
  {
    title: "Heading 3",
    format: "heading3",
  },
] as const satisfies InitOptions["style_formats"];

// using attributes to replace classes as classes appends a class
export const formats: InitOptions["formats"] = {
  defaultText: {
    block: "p",
    attributes: { class: "app-typography app-typography--body" },
  },
  heading2: {
    block: "h2",
    attributes: { class: "app-typography app-typography--h2" },
  },
  heading3: {
    block: "h3",
    attributes: { class: "app-typography app-typography--h3" },
  },
  bold: {
    inline: "strong",
    attributes: { class: "app-typography app-typography--bold" },
  },
  italic: {
    inline: "em",
    attributes: { class: "app-typography app-typography--oblique" },
  },
  underline: {
    inline: "u",
    attributes: { class: "app-typography app-typography--underline" },
  },
} as const satisfies InitOptions["formats"];

export const toolbar = [
  "undo redo",
  "styles",
  "bold italic underline",
  "link",
  "blockquote",
  "preview",
].join(" | ");
