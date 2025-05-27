/** @jsxImportSource @emotion/react */
import { cloneElement, Children } from "react";
import useAnimation from "./hooks";

export default function SlideAnimation({
  isOpen,
  tabTitle,
  tabStyle,
  transitionStyle,
  children,
  handleOpen,
}) {
  const { isRender, isAnimationActive } = useAnimation(isOpen);

  return (
    <div css={wrapper}>
      <div css={tabStyle} onClick={handleOpen}>
        {tabTitle}
      </div>
      {isRender &&
        Children.map(children, (child) => {
          return cloneElement(child, {
            style: transitionStyle(isAnimationActive),
            // onAnimationEnd
            // onTransitionEnd: handleUnmountTransition,
          });
        })}
    </div>
  );
}

const wrapper = {
  overflow: "hidden",
  boxSizing: "border-box",
};
