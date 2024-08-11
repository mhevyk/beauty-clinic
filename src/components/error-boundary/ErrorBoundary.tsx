import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";

type ErrorBoundaryProps<TError extends Error> = PropsWithChildren & {
  fallback?: ReactNode | ((error: TError | null) => ReactNode);
  onError?: (error: TError, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState<TError extends Error> = {
  error: TError | null;
};

export default class ErrorBoundary<TError extends Error> extends Component<
  ErrorBoundaryProps<TError>,
  ErrorBoundaryState<TError>
> {
  constructor(props: ErrorBoundaryProps<TError>) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError<TError extends Error>(error: TError) {
    return { error };
  }

  componentDidCatch(error: TError, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
  }

  render() {
    const { fallback, children } = this.props;
    const { error } = this.state;

    if (error) {
      return typeof fallback === "function" ? fallback(error) : fallback;
    }

    return children;
  }
}
