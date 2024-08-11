import { isRouteErrorResponse, useRouteError } from "react-router-dom";

// TODO: change UI
export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        Route error: {error.data}, status: {error.status}
      </div>
    );
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>Unknown error</div>;
}
