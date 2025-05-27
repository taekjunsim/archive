import { useEffect, useState } from "react";

export default function useSnackbar({ open, duration = 3000, onClose }) {
  let deleteTime = 400;
  const [mount, unmount] = useState();

  const handleUnmount = () => {
    onClose();
    setTimeout(() => {
      unmount(false);
    }, deleteTime);
  };

  useEffect(() => {
    if (open) {
      unmount(true);

      const timer = setTimeout(() => {
        handleUnmount();
      }, duration);

      return () => clearTimeout(timer);
    }

    if (!open && mount) {
      handleUnmount();
      return;
    }
  }, [open, mount]);

  return { mount };
}
