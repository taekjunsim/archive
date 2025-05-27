import { DynamicBoundingBoxType } from "./types";

const addEvents = (
  pointermoveCallback: (e: PointerEvent) => void,
  pointerupCallback: () => void
) => {
  document?.addEventListener("pointermove", pointermoveCallback);
  document?.addEventListener("pointerup", pointerupCallback);
  document?.addEventListener("pointercancel", pointerupCallback);
};

const removeEvents = (
  pointermoveCallback: (e: PointerEvent) => void,
  pointerupCallback: () => void
) => {
  document?.removeEventListener("pointermove", pointermoveCallback);
  document?.removeEventListener("pointerup", pointerupCallback);
  document?.removeEventListener("pointercancel", pointerupCallback);
};

const getContainerBoundingBox = (el?: HTMLDivElement | null) => {
  if (!el) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  const { x, y, width, height } = el.getBoundingClientRect();
  return { x, y, width, height };
};

const calculateDistance = (dynamicSelectArea: DynamicBoundingBoxType) => {
  const distanceX =
    dynamicSelectArea.pointerDynamicClientX -
    dynamicSelectArea.pointerStaticClientX;
  const distanceY =
    dynamicSelectArea.pointerDynamicClientY -
    dynamicSelectArea.pointerStaticClientY;

  return { distanceX, distanceY };
};

export { addEvents, removeEvents, getContainerBoundingBox, calculateDistance };

// startX
// mouseX
