/** @jsxImportSource @emotion/react */
import { useReducer } from "react";
import SlideAnimation from "./SlideAnimation";

export default function UnmountAnimation() {
  const [isOpen, handleOpen] = useReducer((prev) => !prev, false);
  return (
    <SlideAnimation
      tabTitle="탭 버튼"
      tabStyle={tabStyle}
      transitionStyle={transitionStyle}
      isOpen={isOpen}
      handleOpen={handleOpen}
    >
      <div css={styledContent}>test</div>
    </SlideAnimation>
  );
}

const tabStyle = {
  width: "100px",
  margin: "0",
  backgroundColor: "black",
  border: "1px solid black",
  borderRadius: "5px",
  boxSizing: "border-box",
  color: "red",
  overflow: "hidden",
};

const transitionStyle = (isOpen) => ({
  opacity: !isOpen ? "0" : "1",
  transform: !isOpen && "translateY(calc(-50% - 10px))",
  transition: "all 1000ms ease",
});

const styledContent = {
  position: "relative",
  zIndex: "-1",
  width: "110px",
  height: "50px",
  marginTop: "10px",
  color: "red",

  boxSizing: "border-box",
  border: "1px solid black",
  borderRadius: "5px",
};
