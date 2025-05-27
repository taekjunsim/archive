/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";

export default function Motion() {
  const ref = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({
      clientX: pointerX,
      clientY: pointerY,
    }: any) => {
      const element = ref.current;

      if (!element) return;

      setDimension({
        x:
          pointerX -
          (element.firstElementChild?.getBoundingClientRect().width || 0) / 2,
        y: pointerY - element.offsetHeight / 2,
      });
    };

    window.addEventListener("pointermove", ({ clientX, clientY }) => {
      requestAnimationFrame(() => handlePointerMove({ clientX, clientY }));
    });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // requestAnimationFrame

  return (
    <div>
      <div
        css={{
          // transform: `translate(${dimension.x}px, ${dimension.y}px)`,
          // transition: "transform 0.3s ease-out",
          // animationName: test,
          // animationName: spring(dimension.x, dimension.y),
          animationDuration: `${3}s`,
          animationTimingFunction: "ease-out",
          animationFillMode: "forwards",
          // border: "1px solid red",

          // animation: `${spring(dimension.x, dimension.y)} 0.3s ease-out`,
        }}
        ref={ref}
      >
        <div
          css={{
            width: "100px",
            height: "100px",
            backgroundColor: "black",
            borderRadius: "100%",
            // transform: "translateX(1000px)",
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

const spring = (x: number, y: number) => {
  console.log(x, y);
  return keyframes`
	0% {
		transform: translate(${x}px, ${y}px)  // 이전의 좌표
	}


	100% {
		transform: translate(${x + 200}px, ${y + 200}px) // 나아간 좌표
	}
`;
};

const test = keyframes`
	0% {
		transform: translate(${0}px, ${0}px)
	}


	100% {
		transform: translate(${1000}px, ${2000}px)
	}
`;
