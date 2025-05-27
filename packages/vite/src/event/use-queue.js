import { useEffect, useState } from "react";

export default function useQueue() {
  const [queue, setQueue] = useState([]);
  const [activeQueue, setActiveQueue] = useState(false);

  const handleQueue = (task) => {
    setQueue((prev) => {
      return task ? [...prev, task] : [];
    });
  };

  const handleRunQueue = (isActive) => {
    setActiveQueue(isActive);
  };

  useEffect(() => {
    if (!queue.length) return;
    if (!activeQueue) return;

    const interval = setInterval(() => {
      setQueue((prev) => {
        const arr = [...prev];
        return arr.slice(1, prev.length);
      });
    }, 500);

    return () => {
      clearInterval(interval);
    }; // strictMode에서는 cleanup 함수가 필요한거구나.
  }, [activeQueue]);

  return { queue, handleQueue, handleRunQueue };
}
