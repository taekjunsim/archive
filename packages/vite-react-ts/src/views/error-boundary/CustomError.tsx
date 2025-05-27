import React from "react";

class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    // 상태 update
    return { hasError: true, error };
  }

  render() {
    const { fallback: Fallback, children } = this.props;
    const { error } = this.state;

    if (this.state.hasError) {
      return (
        <Fallback
          error={error}
          resetErrorBoundary={() => {
            return;
          }}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
