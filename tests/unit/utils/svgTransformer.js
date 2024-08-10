import path from "path";

export default {
  process(src, filename) {
    // Check if the file is an SVG and has the '?url' query parameter
    if (filename.endsWith("?url")) {
      const svgFilename = path.basename(filename, ".svg");
      return `module.exports = '${svgFilename}.svg';`;
    }
    return src;
  },
};
