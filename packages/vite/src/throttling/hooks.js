import React, { useState } from "react";

export default function useThrottling({ value = "", delay = 300 }) {
  const [throttlledValue, setThrottledValue] = useState("");
  const [isThrottling, setThrottling] = useState(false);

  if (value) {
    if (isThrottling) return { throttlledValue, handleThrottling: () => {} };
    setThrottling(true);
    setTimeout(() => {
      setThrottledValue(value);
      setThrottling(false);
    }, delay);

    return { throttlledValue, handleThrottling: () => {} };
  }

  const handleThrottling = (callback) => {
    if (isThrottling) return;
    setThrottling(true);
    const test = setTimeout(() => {
      callback();
      setThrottling(false);
    }, delay);
  };

  return { throttlledValue: "", handleThrottling };
}
