/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { ReactComponent as Svg } from "../assets/info-circle.svg";

const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

export default function CircularProgress() {
  const size = { width: "200px", height: "200px" };
  const strokeWidth = 7;

  return (
    <>
      <span
        css={{
          display: "inline-block",
          width: size.width,
          height: size.height,
          animation: `${circularRotateKeyframe} 1.4s linear infinite`,
        }}
      >
        <svg viewBox={`${50 / 2} ${50 / 2} ${50} ${50}`}>
          <circle
            css={{
              animation: `${circularDashKeyframe} 1.4s ease-in-out infinite`,
            }}
            cx={50}
            cy={50}
            r={(50 - strokeWidth) / 2}
            fill="none"
            stroke="black"
            strokeWidth={strokeWidth}
            strokeDasharray="80px, 200px"
            strokeDashoffset={0}
            strokeLinecap="round"
          />
        </svg>
      </span>
      {/* <img src={svg} /> */}
      <Svg />
    </>
  );
}
