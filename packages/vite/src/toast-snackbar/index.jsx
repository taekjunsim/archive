/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { keyframes } from "@emotion/react";
import useSnackbar from "./use-snackbar";
import { useNavigate } from "react-router-dom";
// import { ReactComponent as Svg } from "../assets/info-circle.svg";

export default function ToastTestPage() {
  let duration = 3000;
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/test");
    // setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Svg /> */}
      {/* <img src={svg} /> */}
      <button onClick={handleButton}>active toast</button>
      <Snackbar
        open={open} // 필수
        onClose={handleClose} // 필수
        duration={duration}
        message="testestsets"
        TransitionComponent={Slide}
      >
        <div
          css={{
            display: "flex",
            alignItems: "center",
            width: "588px",
            height: "48px",
            padding: "0 16px",
            backgroundColor: "#2c2c2c", // gray.extraDark
            color: "#fff",
            borderRadius: "5px",
            opacity: "1",
            boxSizing: "border-box", // TODO: delete
          }}
        >
          공장 등록이 완료되었습니다.
        </div>
      </Snackbar>
    </>
  );
}

function Snackbar({
  open,
  onClose,
  duration,
  message,
  children,
  TransitionComponent = Slide,
}) {
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

function SnackbarContainer({ children }) {
  return <div css={snackbarContainer}>{children}</div>;
}

function Slide({ open, children }) {
  return <div css={slideTransition(open)}>{children}</div>;
}

function DefaultSnackbarContent({ message }) {
  if (!message) return console.error("need message");

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
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  bottom: "50px",
};

const slideTransition = (isOpen) => ({
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
