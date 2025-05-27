/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";

export default function MarqueeSection() {
  return (
    <div css={container}>
      <div css={slidePosition} className="toRight">
        <div css={marquee} className="toRight main">
          <p css={text}>
            START MAKING YOUR SHOES SINPLE * START MAKING YOUR SHOES SINPLE *
            START MAKING YOUR SHOES SINPLE *
          </p>
        </div>
        <div css={marquee} className="toRight backup">
          <p css={text}>
            START MAKING YOUR SHOES SINPLE * START MAKING YOUR SHOES SINPLE *
            START MAKING YOUR SHOES SINPLE *
          </p>
        </div>
      </div>
      <div css={slidePosition} className="toLeft">
        <div css={marquee} className="toLeft main">
          <p css={text}>
            START MAKING YOUR SHOES SINPLE * START MAKING YOUR SHOES SINPLE *
          </p>
        </div>
        <div css={marquee} className="toLeft backup">
          <p css={text}>
            START MAKING YOUR SHOES SINPLE * START MAKING YOUR SHOES SINPLE *
          </p>
        </div>
      </div>
    </div>
  );
}

const toLeftMain = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-2400px);
  }
`;

const toLeftBackup = keyframes`
  from {
    transform: translateX(2400px);
  }

  to {
    transform: translateX(0);
  }
`;

const toRightMain = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(2700px);
  }
`;

const toRightBackup = keyframes`
  from {
    transform: translateX(-2700px);
  }

  to {
    transform: translateX(0);
  }
`;

const container = {
  position: "relative" as const,
  width: "100%",
  height: "635px",
  overflow: "hidden",
};

const slidePosition = {
  position: "absolute" as const,
  boxShadow: "0px 6px 20px 0px rgba(0, 0, 0, 0.06)",

  "&.toLeft": {
    top: "180px",
    left: "-98.31px",
    width: "2400px",
    height: "120px",
    transform: "rotate(-12.83deg)",
  },

  "&.toRight": {
    top: "250px",
    left: "-437.82px",
    width: "2700px",
    height: "88px",
    transform: "rotate(5.33deg)",
  },
};

const marquee = {
  position: "absolute" as const,
  display: "inline-flex",
  alignItems: "center",
  animation: "13s linear infinite",
  backgroundColor: "white",

  "&.toLeft": {
    width: "2400px",
    height: "120px",
    fontSize: "64px",
    lineHeight: "83.2px",

    "&.main": {
      animationName: toLeftMain,
    },

    "&.backup": {
      animationName: toLeftBackup,
    },
  },

  "&.toRight": {
    width: "2700px",
    height: "88px",
    fontSize: "48px",
    lineHeight: "62.4px",
    opacity: "80%",

    "&.main": {
      animationName: toRightMain,
    },

    "&.backup": {
      animationName: toRightBackup,
    },
  },
};

const text = {
  color: "transparent",
  fontWeight: "900",
  backgroundImage:
    "linear-gradient(to right, rgba(62, 94, 224, 1), rgba(30, 183, 232, 1))",
  backgroundRepeat: "no-repeat",
  backgroundClip: "text",
};
