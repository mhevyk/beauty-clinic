import ReactDOMServer from "react-dom/server";

import { PostEditorPreviewData } from "@/containers/post-editor/hooks/use-real-post-preview/useRealPostPreview";

type CreatePreviewLayout = PostEditorPreviewData & {
  content: string;
};

export default function createPostPreviewLayout({
  title,
  content,
}: CreatePreviewLayout) {
  // use jsx to make conditional rendering easier for developer
  const jsx = (
    <>
      {title && <h1>{title}</h1>}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );

  return ReactDOMServer.renderToStaticMarkup(jsx);
}
