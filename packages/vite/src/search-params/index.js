/** @jsxImportSource @emotion/react */
import { useLocation, useSearchParams } from "react-router-dom";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const handle = () => {
    setSearchParams(
      (prev) => {
        prev.set("test", 0);
        return prev;
      },
      {
        replace: false,
        state: {
          test: "1",
          // ...location.state,
          // [contextName]: state.context,
          // [historiesName]: [...(history ?? []), state],
        },
        // preventScrollReset,
        // flushSync,
        // viewTransition,
      }
    );
  };

  console.log(location.state);
  return <button onClick={handle}>test</button>;
}

export default App;
