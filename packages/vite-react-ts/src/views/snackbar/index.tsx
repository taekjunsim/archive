/** @jsxImportSource @emotion/react */
import React from "react";
import Slide from "./atom/Slide";
import useSnackbar from "./useSnackbar";

type PropTypes = {
  open: boolean | null;
  onClose: () => void;
  duration?: number;
  message?: string;
  children?: React.ReactNode;
  TransitionComponent?: ({
    open,
    children,
  }: {
    open: boolean | null;
    children: React.ReactNode;
  }) => JSX.Element;
};

export default function Snackbar({
  open,
  onClose,
  duration = 3000,
  message,
  children,
  TransitionComponent = Slide,
}: PropTypes) {
  const { mount } = useSnackbar({
    open,
    onClose,
    duration,
  });

  if (!mount) return null;

  return (
    <SnackbarContainer>
      <TransitionComponent open={open}>
        {children || <DefaultSnackbarContent message={message} />}
      </TransitionComponent>
    </SnackbarContainer>
  );
}

function SnackbarContainer({ children }: { children: React.ReactNode }) {
  return <div css={snackbarContainer}>{children}</div>;
}

function DefaultSnackbarContent({ message }: { message?: string }) {
  if (!message) {
    console.error("need message");
    return null;
  }

  return (
    <div
      css={{
        backgroundColor: "#333",
        color: "#fff",
        borderRadius: "5px",
        opacity: "1",
        padding: "10px 50px",
      }}
    >
      {message}
    </div>
  );
}

const snackbarContainer = {
  position: "fixed" as const,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  bottom: "50px",
};
