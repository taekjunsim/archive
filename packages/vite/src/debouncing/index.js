import React, { useEffect, useState } from "react";
import useDebounce from "./hooks";

export default function Debouncing() {
  const [count, setCount] = useState(0);
  const [isDebounce, setDebounce] = useState(false);

  const handleButton = () => {
    if (isDebounce) return;

    setCount((prev) => (prev += 1));
  };

  return (
    <div>
      <p>디바운싱 적용된 값: {count}</p>
      <button onClick={handleButton}>디바운싱</button>
    </div>
  );
}
