import React, { ForwardedRef, MutableRefObject, forwardRef } from "react";

type HeaderPropsType = {
  contentCopmonent: React.ReactNode;
};

const Header = forwardRef(
  (
    { contentCopmonent }: HeaderPropsType,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const el = (ref as MutableRefObject<HTMLDivElement>).current;
    return (
      <div
        ref={ref}
        style={{
          position: "fixed",
          width: el?.parentElement?.clientWidth,
          backgroundColor: "white",
          zIndex: "1",
        }}
      >
        {contentCopmonent}
      </div>
    );
  }
);

export default Header;
