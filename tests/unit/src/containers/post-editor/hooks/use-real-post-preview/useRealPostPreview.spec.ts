import { renderHook } from "@testing-library/react";
import { RefObject } from "react";

import { Editor as TinyMCEEditor } from "tinymce";

import useRealPostPreview, {
  PostEditorPreviewData,
} from "@/containers/post-editor/hooks/use-real-post-preview/useRealPostPreview";
import createPostPreviewLayout from "@/containers/post-editor/utils/create-post-preview-layout/createPostPreviewLayout";

type EditorEvent = {
  command: "mceFocus" | "mcePreview";
};

let beforeExecCommandHandler: (editorEvent: EditorEvent) => void;

const mockEditor = {
  getContent: jest.fn(),
  setContent: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
};

const previewData: PostEditorPreviewData = { title: "Sample Title" };
const mockContent = "<p>Original Content</p>";
const previewLayout = "<div>Preview Layout</div>";

jest.mock(
  "@/containers/post-editor/utils/create-post-preview-layout/createPostPreviewLayout",
  () => ({
    __esModule: true,
    default: jest.fn(() => "<div>Preview Layout</div>"),
  })
);

const renderHookWithEditor = (editor: Partial<TinyMCEEditor> | null) => {
  mockEditor.getContent.mockReturnValue(mockContent);
  mockEditor.on.mockImplementation((event, handler) => {
    if (event === "BeforeExecCommand") {
      beforeExecCommandHandler = handler;
    }
  });

  return renderHook(() =>
    useRealPostPreview(
      { current: editor } as unknown as RefObject<TinyMCEEditor>,
      mockContent,
      previewData
    )
  );
};

describe("useRealPostPreview()", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should open and close preview correctly", () => {
    renderHookWithEditor(mockEditor);

    beforeExecCommandHandler({ command: "mcePreview" });

    expect(mockEditor.getContent).toHaveBeenCalled();
    expect(createPostPreviewLayout).toHaveBeenCalledWith({
      ...previewData,
      content: mockContent,
    });
    expect(mockEditor.setContent).toHaveBeenCalledWith(previewLayout);

    beforeExecCommandHandler({ command: "mceFocus" });
    expect(mockEditor.setContent).toHaveBeenCalledWith(mockContent);
  });

  it("should not attach BeforeExecCommand handler if editor is null", () => {
    renderHookWithEditor(null);

    expect(mockEditor.on).not.toHaveBeenCalled();
  });

  it("should do a cleanup of editor is defined", () => {
    const { unmount } = renderHookWithEditor(mockEditor);

    unmount();

    expect(mockEditor.off).toHaveBeenCalledWith(
      "BeforeExecCommand",
      expect.any(Function)
    );
  });
});
