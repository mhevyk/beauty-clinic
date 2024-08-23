import { Editor as TinyMCEEditor } from "tinymce";

type UploadFileToMemoryReturnType = {
  url: string;
  filename: string;
};

export function uploadFileToMemory(
  editor: TinyMCEEditor
): Promise<UploadFileToMemoryReturnType> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handleInputChange = () => {
      const file = input.files?.[0];

      if (!file) {
        reject(new Error("File is not uploaded"));
        return;
      }

      if (!file.type.startsWith("image")) {
        reject(new Error("Only images are allowed"));
        return;
      }

      const reader = new FileReader();

      const cleanup = () => {
        reader.onload = null;
        reader.onerror = null;
        input.value = "";
      };

      const handleFileLoad = () => {
        const id = Date.now().toString();
        const blobCache = editor.editorUpload.blobCache;
        const result = reader.result as string;
        const base64 = result.split(",")[1]!;
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        cleanup();

        resolve({ url: blobInfo.blobUri(), filename: file.name });
      };

      const handleFileLoadError = () => {
        cleanup();
        reject(new Error("Error reading file"));
      };

      reader.onload = handleFileLoad;
      reader.onerror = handleFileLoadError;
      reader.readAsDataURL(file);
    };

    input.addEventListener("change", handleInputChange);

    input.click();
  });
}
