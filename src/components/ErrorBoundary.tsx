import { Component, ErrorInfo, PropsWithChildren, ReactNode } from "react";

interface ErrorBoundaryProps<TError extends Error> extends PropsWithChildren {
  fallback: ReactNode | ((error: TError | null) => ReactNode);
  onError?: (error: TError, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState<TError extends Error> {
  error: TError | null;
}

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
