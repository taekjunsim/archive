/** @jsxImportSource @emotion/react */
import { useState } from "react";
import Snackbar from ".";
import Slide from "./atom/Slide";

export default function SnackbarTestPage() {
  let duration = 3000;
  const [open, setOpen] = useState<boolean | null>(null);

  const handleButton = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={handleButton}>active toast</button>
      <Snackbar
        open={open}
        onClose={handleClose}
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
