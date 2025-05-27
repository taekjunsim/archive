import React, { useEffect, useState } from "react";
import useThrottling from "./hooks";

export default function Throttling() {
  const [count, setCount] = useState(0);
  const [dependencyCount, setDependencyCount] = useState(0);
  const { throttlledValue } = useThrottling({
    value: dependencyCount,
    delay: 1000,
  });
  const { handleThrottling } = useThrottling({ delay: 1000 });

  const handleButton = () => {
    setCount((prev) => (prev += 1));
    handleThrottling(() => console.log(count)); // api 콜백 함수
  };

  const handleDependencyButton = () => {
    setDependencyCount((prev) => (prev += 1));
  };

  useEffect(() => {
    console.log(throttlledValue); // api 콜백 함수
  }, [throttlledValue]);

  return (
    <>
      <div>{count}</div>

      <button onClick={handleButton}>쓰로틀링</button>
      <div>{dependencyCount}</div>
      <div>
        <button onClick={handleDependencyButton}>Value 쓰로틀링</button>
      </div>
    </>
  );
}
