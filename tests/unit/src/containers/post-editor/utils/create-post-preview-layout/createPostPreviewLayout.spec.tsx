import ReactDOMServer from "react-dom/server";

import createPostPreviewLayout from "@/containers/post-editor/utils/create-post-preview-layout/createPostPreviewLayout";

const testCases = [
  {
    title: "Sample Title",
    content: "<p>This is some sample content.</p>",
  },
  {
    title: "",
    content: "<p>This is some sample content.</p>",
  },
];

describe("createPostPreviewLayout()", () => {
  test.each(testCases)(
    "should render correctly with title '$title' and content '$content'",
    data => {
      const result = createPostPreviewLayout(data);

      expect(result).toBe(
        ReactDOMServer.renderToStaticMarkup(
          <>
            {data.title && <h1>{data.title}</h1>}
            <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
          </>
        )
      );
    }
  );
});
