import { render, screen } from "@testing-library/react";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";

import PostEditor from "@/containers/post-editor/PostEditor";
import { PostEditorPreviewData } from "@/containers/post-editor/hooks/use-real-post-preview/useRealPostPreview";
import handlePostImageUpload, {
  FilePickerCallback,
} from "@/containers/post-editor/utils/handle-post-image-upload/handlePostImageUpload";

const mockSetIsLoading = jest.fn();
const mockOnChange = jest.fn();
const mockFilePickerCallback = jest.fn();
const previewData = {} as PostEditorPreviewData;

const mockEditor = {
  on: jest.fn(),
};

jest.mock(
  "@/containers/post-editor/utils/handle-post-image-upload/handlePostImageUpload"
);

jest.mock(
  "@/containers/post-editor/hooks/use-real-post-preview/useRealPostPreview"
);

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn().mockImplementation(jest.requireActual("react").useState),
}));

jest.mock("@tinymce/tinymce-react", () => ({
  Editor: jest.fn(),
}));

let handleFileUpload: (callback: FilePickerCallback) => void;

type RenderAndMock = {
  isEditorLoading: boolean;
};

const renderAndMock = ({
  isEditorLoading = false,
}: Partial<RenderAndMock> = {}) => {
  (Editor as unknown as jest.Mock).mockImplementation(({ onInit, init }) => {
    if (isEditorLoading) {
      return null;
    }

    handleFileUpload = init.file_picker_callback;

    onInit({ target: {} }, mockEditor);
    return <div data-testid="editor"></div>;
  });

  render(
    <PostEditor value="" onChange={mockOnChange} previewData={previewData} />
  );
};

describe("<PostEditor />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the editor skeleton while loading", () => {
    renderAndMock({ isEditorLoading: true });

    const editorSkeleton = screen.getByTestId("editor-skeleton");
    expect(editorSkeleton).toBeInTheDocument();
  });

  it("should run onInit callback correctly", () => {
    (useState as jest.Mock).mockReturnValue([true, mockSetIsLoading]);
    renderAndMock();
    expect(mockSetIsLoading).toHaveBeenCalledWith(false);
  });

  it("should handle file upload correctly", () => {
    renderAndMock();

    handleFileUpload(mockFilePickerCallback);

    expect(handlePostImageUpload).toHaveBeenCalledWith(
      mockEditor,
      mockFilePickerCallback
    );
  });
});
