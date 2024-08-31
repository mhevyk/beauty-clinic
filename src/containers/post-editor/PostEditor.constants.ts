import { InitOptions } from "@tinymce/tinymce-react/lib/cjs/main/ts/components/Editor";

import rawEditorContentStyles from "@/containers/post-editor/PostEditor.content.css?raw";

export const plugins = [
  "image",
  "lists",
  "searchreplace",
  "preview",
  "link",
  "autoresize",
  "wordcount",
];

export const toolbarSections = [
  "undo redo",
  "blocks",
  "removeformat",
  "bold italic underline",
  "link image",
  "blockquote",
  "alignleft aligncenter alignright alignjustify",
  "bullist numlist",
  "preview",
  "searchreplace",
];

export const postEditorConfig: InitOptions = {
  menubar: false,
  statusbar: true,
  branding: false,
  elementpath: false,
  plugins,
  toolbar: toolbarSections.join(" | "),
  autoresize_bottom_margin: 50,
  min_height: 400,
  content_style: rawEditorContentStyles,
  block_formats: "Paragraph=p;Heading 2=h2;Heading 3=h3",
};
