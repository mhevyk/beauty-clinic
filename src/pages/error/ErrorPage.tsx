import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import PageContent from "@/pages/error/components/page-content/PageContent.tsx";

export default function ErrorPage() {
  const error = useRouteError();

  let pageContent;
  let errorMessage;

  if (isRouteErrorResponse(error)) {
    errorMessage = (
      <span>
        Route error: {error.data}, status: {error.status}
      </span>
    );
    pageContent = <PageContent errorInformation={errorMessage} />;
  } else if (error instanceof Error) {
    errorMessage = <span>{error.message}</span>;
    pageContent = <PageContent errorInformation={errorMessage} />;
  } else {
    pageContent = <PageContent />;
  }

  return <AppHelmet title="Error">{pageContent}</AppHelmet>;
}
