import React from "react";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function Bomb({ username }: any) {
  if (username === "bomb") {
    throw new Error("💥 CABOOM 💥");
  }
  return `Hi ${username}`;
}

export default function ErrorBoundaryDemo() {
  const [username, setUsername] = React.useState("");
  const usernameRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <label>
        {`Username (don't type "bomb"): `}
        <input
          placeholder={`type "bomb"`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          ref={usernameRef}
        />
      </label>
      <div>
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => {
            setUsername("");
            usernameRef.current?.focus();
          }}
          resetKeys={[username]}
        >
          <Bomb username={username} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
