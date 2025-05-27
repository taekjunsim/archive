/** @jsxImportSource @emotion/react */
import { keyframes } from "@emotion/react";

type PropTypes = {
  open: boolean | null;
  children: React.ReactNode;
};

export default function Slide({ open, children }: PropTypes) {
  return <div css={slideTransition(open)}>{children}</div>;
}

const slideTransition = (isOpen: boolean | null) => ({
  animation: `${isOpen ? snackbarInRight : snackbarInBottom} 0.5s`,
  transition: "animation 0.5s cubic-bezier(0.0, 0, 0.2, 1)",
});

const snackbarInRight = keyframes`
  from {
    transform: translateY(300%);
  }

  to {
    transform: translateY(0);
  }
`;

const snackbarInBottom = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(300%);
  }
`;
