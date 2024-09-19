export default function removeTrailingSlashes(text: string) {
  let end = text.length;

  while (end > 0 && text[end - 1] === "/") {
    end--;
  }

  return text.substring(0, end);
}
