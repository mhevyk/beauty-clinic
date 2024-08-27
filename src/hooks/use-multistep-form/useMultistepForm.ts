import { ReactNode, useState } from "react";

type UseMultistepForm = {
  pages: ReactNode[];
};

export function useMultistepForm({ pages }: UseMultistepForm) {
  const [pageIndex, setPageIndex] = useState(0);

  const hasPreviousPage = pageIndex > 0;
  const hasNextPage = pageIndex < pages.length - 1;

  function nextPage() {
    if (!hasNextPage) {
      return;
    }

    setPageIndex(page => page + 1);
  }

  function previousPage() {
    if (!hasPreviousPage) {
      return;
    }

    setPageIndex(page => page - 1);
  }

  return {
    page: pages[pageIndex],
    hasNextPage,
    hasPreviousPage,
    controls: { nextPage, previousPage },
  } as const;
}
