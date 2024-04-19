export default function extractErrorMessage(error: unknown) {
  if (error instanceof Error && error.message.length > 0) {
    return error.message;
  }

  return "Unknown error occured";
}
