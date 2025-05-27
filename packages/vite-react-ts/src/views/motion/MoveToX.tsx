/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { useState } from "react";

export default function Motion() {
  const [click, setClick] = useState("");
  const [isRight, setDirection] = useState(false);

  const animateDurationSecond = 0.4;

  return (
    <div
      css={{
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        width: "500px",
        height: "500px",
        padding: "100px",
        border: "1px solid red",
      }}
    >
      <div
        css={{
          width: "100px",
          height: "100px",
          backgroundColor: "gray",
          borderRadius: "20px",

          animationName: click,
          animationDuration: `${animateDurationSecond}s`,
          animationFillMode: "forwards",
        }}
        onClick={() => {
          setClick(isRight ? toLeft : toRight);
          setDirection((prev) => !prev);
        }}
      />
    </div>
  );
}

const toRight = keyframes`
0% {
	transform: translateX(0)
}

80% {
	transform: translateX(220px)
}

100% {
	transform: translateX(200px)
}

`;

const toLeft = keyframes`
0% {
	transform: translateX(200px)
}

80% {
	transform: translateX(-20px)
}

100% {
	transform: translateX(0)
}
`;

// const scaleUpAndDown = keyframes`
// 0% {
// 	transform: scale(1.2)
// }

// 50% {
// 	transform: scale(0.9)
// }

// 100% {
// 	transform: scale(1.2)
// }
// `;
