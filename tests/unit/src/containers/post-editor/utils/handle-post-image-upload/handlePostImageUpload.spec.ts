import { Editor as TinyMCEEditor } from "tinymce";

import handlePostImageUpload, {
  FilePickerCallback,
} from "@/containers/post-editor/utils/handle-post-image-upload/handlePostImageUpload";
import { uploadFileToMemory } from "@/containers/post-editor/utils/upload-file-to-memory/uploadFileToMemory";
import extractErrorMessage from "@/utils/extract-error-message/extractErrorMessage";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

jest.mock("@/containers/post-editor/utils/upload-file-to-memory/uploadFileToMemory");
jest.mock("@/utils/extract-error-message/extractErrorMessage");
jest.mock("@/utils/show-snackbar/showSnackbar");

describe("handlePostImageUpload()", () => {
  let editor: TinyMCEEditor;
  let callback: jest.MockedFunction<FilePickerCallback>;

  beforeEach(() => {
    editor = {} as TinyMCEEditor;
    callback = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("calls callback with the correct URL and metadata when upload succeeds", async () => {
    const mockUrl = "http://example.com/image.png";
    const mockFilename = "image.png";

    (uploadFileToMemory as jest.Mock).mockResolvedValue({
      url: mockUrl,
      filename: mockFilename,
    });

    await handlePostImageUpload(editor, callback);

    expect(uploadFileToMemory).toHaveBeenCalledWith(editor);
    expect(callback).toHaveBeenCalledWith(mockUrl, { title: mockFilename });
  });

  it("shows a snackbar with an error message when upload fails", async () => {
    const mockError = new Error("Upload failed");
    const mockErrorMessage = "Failed to upload image";

    (uploadFileToMemory as jest.Mock).mockRejectedValue(mockError);
    (extractErrorMessage as jest.Mock).mockReturnValue(mockErrorMessage);

    await handlePostImageUpload(editor, callback);

    expect(uploadFileToMemory).toHaveBeenCalledWith(editor);
    expect(extractErrorMessage).toHaveBeenCalledWith(mockError);
    expect(showSnackbar).toHaveBeenCalledWith({ message: mockErrorMessage });
    expect(callback).not.toHaveBeenCalled();
  });
});
