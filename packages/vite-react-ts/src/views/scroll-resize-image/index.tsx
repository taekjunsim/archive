/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import logo from "./logo.png";

export default function Scroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [resizeX, setResizeX] = useState(0);

  const handleScroll = () => {
    if (window.scrollY < 1184) return;
    if (resizeX > 240) return;

    setResizeX((prev) => {
      return prev + 5;
    });

    window.scrollTo(0, 1184);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [resizeX]);

  return (
    <div css={{ height: "4000px", backgroundColor: "black" }}>
      <div
        css={{
          width: "1920px",
          height: "1184px",
          margin: "0 auto",
          backgroundColor: "darkGreen",
        }}
      />
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "1920px",
          height: "1184px",
          margin: "0 auto",
          backgroundColor: "rgba(242, 244, 247, 1)",
        }}
        ref={sectionRef}
      >
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: `calc(100% - ${resizeX}px)`, // 60px씩
            // width: "calc(100% - 60px)", // 60px씩
            padding: "104px 0",
            backgroundColor: "white",
            borderRadius: "32px",
          }}
        >
          <p
            css={{
              margin: "0 0 56px",
              fontSize: "48px",
              fontWeight: "800",
              lineHeight: "62.4px",
              letterSpacing: "-0.02em",
            }}
          >
            OUR PARTNERS
          </p>
          <img src={logo} />
        </div>
      </div>
    </div>
  );
}
