import { ForwardedRef, forwardRef } from "react";

type ViewportPropsType = {
  viewportHeight: number;
  scrollHeight: number;
  children: React.ReactNode;
  headerHeight?: number;
};

const CustomViewport = forwardRef(
  (
    { viewportHeight, scrollHeight, headerHeight, children }: ViewportPropsType,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref} // customViewportRef
        style={{
          flex: "1",
          overflowY: "auto",
          height: viewportHeight,
          position: "relative",
          border: `1px solid black`,
        }}
      >
        <div // 아이템 총 높이
          style={{
            height: scrollHeight,
            transform: `translateY(${headerHeight}px)`,
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default CustomViewport;
