import { isPlainObject } from "@apollo/client/utilities";

import { RoutePaths } from "@/constants/routePaths";
import removeLeadingSlashes from "@/utils/remove-leading-slashes/removeLeadingSlashes";
import removeTrailingSlashes from "@/utils/remove-trailing-slashes/removeTrailingSlashes";

const initialParentPath = "";

export default function createFullRoutePaths(
  obj: RoutePaths,
  parentPath = initialParentPath
) {
  return new Proxy(obj, {
    get(target, prop: string) {
      if (prop in target) {
        const value = target[prop];

        if (isPlainObject(value)) {
          let newPath = removeTrailingSlashes(parentPath);

          if (typeof target.path === "string") {
            newPath += "/" + removeLeadingSlashes(target.path);
          }

          return createFullRoutePaths(value, newPath);
        } else if (prop === "path") {
          return (
            removeTrailingSlashes(parentPath) +
            (parentPath === initialParentPath ? "" : "/") +
            value
          );
        }
      }

      return "*";
    },
  });
}
