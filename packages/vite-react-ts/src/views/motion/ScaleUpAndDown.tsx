/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";
import { useState } from "react";

export default function Motion() {
  const [animation, setAnimation] = useState("");
  const [click, setClick] = useState("");

  const animateDurationSecond = 0.2;

  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "500px",
        height: "500px",
        border: "1px solid red",
      }}
    >
      <div
        css={{
          width: "100px",
          height: "100px",
          backgroundColor: "gray",
          borderRadius: "20px",

          animationName: `${click || animation}`,
          animationDuration: `${animateDurationSecond}s`,
          animationFillMode: "forwards",
        }}
        onMouseOver={() => {
          setAnimation(`${scaleUp}`);
        }}
        onMouseOut={() => setAnimation(`${scaleDown}`)}
        onClick={() => {
          setClick(`${scaleUp}, ${scaleUpAndDown}`);

          setTimeout(() => {
            setClick("");
          }, animateDurationSecond * 1000);
        }}
      />
    </div>
  );
}

const scaleUp = keyframes`
0% {
	transform: scale(1)
}
100% {
	transform: scale(1.2)
}

`;

const scaleDown = keyframes`
0% {
	transform: scale(1.2)
}
100% {
	transform: scale(1)
}
`;

const scaleUpAndDown = keyframes`
0% {
	transform: scale(1.2)
}

50% {
	transform: scale(0.9)
}

100% {
	transform: scale(1.2)
}
`;
