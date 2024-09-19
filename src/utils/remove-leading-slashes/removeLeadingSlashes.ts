export default function removeLeadingSlashes(text: string) {
  let start = 0;

  while (start < text.length && text[start] === "/") {
    start++;
  }

  return text.substring(start);
}
