import { useState, useCallback } from "react";

const useLoadOptions = (
  loadMoreOptions?: () => Promise<void>,
  isFetchingOptions?: boolean,
  height?: string
) => {
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(async () => {
    if (isFetchingOptions && !isLoading) {
      setIsLoading(true);
      await loadMoreOptions?.();
      setIsLoading(false);
    }
  }, [isFetchingOptions, isLoading, loadMoreOptions]);

  const handleScroll = useCallback(
    ({ scrollOffset, scrollHeight }: { scrollOffset: number; scrollHeight: number }) => {
      if (scrollOffset + Number(height) >= scrollHeight) {
        loadMore();
      }
    },
    [height, loadMore]
  );

  return { isLoading, handleScroll };
};

export default useLoadOptions;
