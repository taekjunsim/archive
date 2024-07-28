import { BrowserRouter } from "react-router-dom";
import Router from "./pages/Router";

function App() {
  const test = `5 5
  5 7
  7 5`;

  const [a, b, c] = test
    .trim()
    .split("\n")
    .map((dimension) => {
      return dimension.trim().split(" ").map(Number);
    });

  let x = 0;
  let y = 0;
  let w;
  let h;

  [a, b, c].forEach((dimension) => {
    const [xDimension, yDimension] = dimension;

    if (!x) {
      x = xDimension;
    }

    if (!y) {
      y = yDimension;
    }

    if (xDimension > x) {
      w = xDimension - x;
    }

    if (xDimension < x) {
      w = x - xDimension;
      x = xDimension;
    }

    if (yDimension > y) {
      h = yDimension - y;
    }

    if (yDimension < y) {
      h = y - yDimension;
      y = yDimension;
    }
  });

  const squreDimension = [
    [x, y],
    [x + w, y],
    [x, y + h],
    [x + w, y + h],
  ];

  let result = "";

  // squreDimension과 a, b, c 비교
  squreDimension.forEach((dimension) => {
    const [x, y] = dimension;

    [a, b, c].forEach((el) => {
      const [_x, _y] = a;
    });
  });

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
