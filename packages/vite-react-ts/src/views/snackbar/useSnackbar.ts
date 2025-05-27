import { useEffect, useState } from "react";

type PropTypes = {
  open: boolean | null;
  duration: number;
  onClose: () => void;
};

export default function useSnackbar({ open, duration, onClose }: PropTypes) {
  let deleteTime = 400;
  const [mount, unmount] = useState<boolean>();

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
