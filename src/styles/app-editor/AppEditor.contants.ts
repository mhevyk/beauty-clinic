import { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";

export const styleFormats = [
  {
    title: "Paragraph",
    format: "defaultText",
  },
  {
    title: "Heading",
    format: "heading",
  },
] as const satisfies InitOptions["style_formats"];

// using attributes to replace classes as classes appends a class
export const formats: InitOptions["formats"] = {
  defaultText: {
    block: "p",
    attributes: { "data-element": "paragraph" },
  },
  heading: {
    block: "h2",
    attributes: { "data-element": "heading" },
  },
  blockquote: {
    block: "blockquote",
    attributes: { "data-element": "blockquote" },
  },
  bold: {
    block: "p",
    attributes: { "data-bold": "true" },
  },
  italic: {
    block: "p",
    attributes: { "data-oblique": "true" },
  },
  underline: {
    block: "p",
    attributes: { "data-underline": "true" },
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
