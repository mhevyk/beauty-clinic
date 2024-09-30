import { isRouteErrorResponse, useRouteError } from "react-router-dom";

import AppHelmet from "@/components/app-helmet/AppHelmet";

// TODO: change UI
export default function ErrorPage() {
  const error = useRouteError();

  let pageContent;

  if (isRouteErrorResponse(error)) {
    pageContent = (
      <div>
        Route error: {error.data}, status: {error.status}
      </div>
    );
  } else if (error instanceof Error) {
    pageContent = <div>Error: {error.message}</div>;
  } else {
    pageContent = <div>Unknown error</div>;
  }

  return <AppHelmet title="Error">{pageContent}</AppHelmet>;
}
