"use client";
import React from "react";
import { toast } from "react-toastify";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }

    // Show user-friendly error message
    toast.error("Something went wrong. Please try refreshing the page.");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[100dvh] w-full flex items-center justify-center bg-(--bg-main)">
          <div className="text-center p-8 bg-(--bg-card) rounded-lg border border-(--border)">
            <h2 className="text-xl font-semibold text-(--text-main) mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-(--text-muted) mb-6">
              We encountered an unexpected error. Please try refreshing the
              page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-(--accent) text-(--accent-text) rounded-md hover:opacity-90 transition-opacity"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === "development" && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-(--text-muted)">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs bg-(--bg-side) p-2 rounded overflow-auto max-w-md">
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
