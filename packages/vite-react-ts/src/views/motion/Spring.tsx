/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";

// TODO: 미완성 (https://www.framer.com/motion/transition/#spring)
export default function Spring() {
  const ref = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ x: 0, y: 0 });
  const [reverseDimension, setReverseDimension] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({
      clientX: pointerX,
      clientY: pointerY,
    }: MouseEvent) => {
      const element = ref.current;

      if (!element) return;

      setDimension({
        x:
          pointerX -
          (element.firstElementChild?.getBoundingClientRect().width || 0) / 2,
        y: pointerY - element.offsetHeight / 2,
      });
      setReverseDimension({
        x: pointerX - element.offsetLeft + element.offsetWidth / 2,
        y: pointerY - element.offsetHeight / 2,
      });
      // frame.read(() => {
      //   xPoint.set(pointerX: - element.offsetLeft - element.offsetWidth / 4);
      //   yPoint.set(pointerY - element.offsetTop - element.offsetHeight / 4);
      // });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // return <div>Spring</div>;
  return (
    <div>
      <div
        css={{
          display: "inline-block",
          transform: `translate(${dimension.x}px, ${dimension.y}px)`,
          transition: "transform 0.3s",
        }}
        ref={ref}
      >
        <span
          css={{
            display: "inline-block",
            width: "100px",
            height: "100px",
            backgroundColor: "black",
            borderRadius: "100%",
          }}
        />
      </div>
      {/* <div
        style={{
          transform: `translate(${reverseDimension.x}px, ${reverseDimension.y}px)`,
        }}
      >
        <span>Spring</span>
      </div> */}
    </div>
  );
}
