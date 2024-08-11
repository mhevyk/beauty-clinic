export default function concatUrls(baseUrl: string, path: string) {
  return new URL(path, baseUrl).href;
}
