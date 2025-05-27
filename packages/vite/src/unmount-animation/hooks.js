import { useEffect, useState } from "react";

export default function useAnimation(isOpen) {
  const [isTransition, setTransition] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTransition(true);
    }
  }, [isOpen]);

  const isRender = isOpen || isTransition;
  const isAnimationActive = isOpen && isTransition;
  const handleUnmountTransition = () => {
    if (!isOpen) setTransition(false);
  };

  return { isRender, handleUnmountTransition, isAnimationActive };
}
