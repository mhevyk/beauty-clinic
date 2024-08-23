import { Editor as TinyMCEEditor } from "tinymce";

import { uploadFileToMemory } from "@/containers/post-editor/utils/upload-file-to-memory/uploadFileToMemory";

describe("uploadFileToMemory()", () => {
  let editor: TinyMCEEditor;
  let inputElement: HTMLInputElement;

  beforeEach(() => {
    editor = {
      editorUpload: {
        blobCache: {
          create: jest.fn(),
          add: jest.fn(),
        },
      },
    } as unknown as TinyMCEEditor;

    inputElement = document.createElement("input");
    jest.spyOn(document, "createElement").mockReturnValue(inputElement);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with URL and filename when a valid image is uploaded", async () => {
    const file = new File(["dummy content"], "test-image.png", {
      type: "image/png",
    });
    const base64Image = "data:image/png;base64,dummycontent";

    const mockBlobInfo = {
      blobUri: jest.fn().mockReturnValue("blob:http://example.com/image"),
    };

    (editor.editorUpload.blobCache.create as jest.Mock).mockReturnValue(
      mockBlobInfo
    );

    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      result: base64Image,
      onload: null as any,
      onerror: null as any,
    };

    jest.spyOn(window, "FileReader").mockReturnValue(fileReaderMock as any);

    const promise = uploadFileToMemory(editor);

    Object.defineProperty(inputElement, "files", {
      value: [file],
    });

    inputElement.dispatchEvent(new Event("change"));

    (fileReaderMock.onload as EventListener)(new Event("load"));

    const result = await promise;

    expect(editor.editorUpload.blobCache.create).toHaveBeenCalledWith(
      expect.any(String),
      file,
      "dummycontent"
    );
    expect(editor.editorUpload.blobCache.add).toHaveBeenCalledWith(
      mockBlobInfo
    );
    expect(result).toEqual({
      url: "blob:http://example.com/image",
      filename: "test-image.png",
    });
  });

  it("should reject with an error if no file is selected", async () => {
    const promise = uploadFileToMemory(editor);

    Object.defineProperty(inputElement, "files", {
      value: null,
    });

    inputElement.dispatchEvent(new Event("change"));

    await expect(promise).rejects.toThrow("File is not uploaded");
  });

  it("should reject with an error if a non-image file is selected", async () => {
    const file = new File(["dummy content"], "test-file.txt", {
      type: "text/plain",
    });

    const promise = uploadFileToMemory(editor);

    Object.defineProperty(inputElement, "files", {
      value: [file],
    });

    inputElement.dispatchEvent(new Event("change"));

    await expect(promise).rejects.toThrow("Only images are allowed");
  });

  it("should reject with an error if FileReader encounters an error", async () => {
    const file = new File(["dummy content"], "test-image.png", {
      type: "image/png",
    });

    const fileReaderMock = {
      readAsDataURL: jest.fn(),
      onload: null as any,
      onerror: null as any,
    };

    jest.spyOn(window, "FileReader").mockReturnValue(fileReaderMock as any);

    const promise = uploadFileToMemory(editor);

    Object.defineProperty(inputElement, "files", {
      value: [file],
    });

    inputElement.dispatchEvent(new Event("change"));

    (fileReaderMock.onerror as EventListener)(new Event("error"));

    await expect(promise).rejects.toThrow("Error reading file");
  });
});
