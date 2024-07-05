import { useEffect, useState } from "react";

type UseLazyImage = {
  src: string;
  placeholderSrc: string;
};

export function useLazyImage({ src, placeholderSrc }: UseLazyImage) {
  const [source, setSource] = useState(placeholderSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    function handleError() {
      setHasError(true);
    }

    function handleLoad() {
      setHasError(false);
      setSource(src);
    }

    const image = new Image();
    image.src = src;
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);

    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [src]);

  const isLoading = placeholderSrc === source && !hasError;

  return [source, { isLoading, hasError }] as const;
}
