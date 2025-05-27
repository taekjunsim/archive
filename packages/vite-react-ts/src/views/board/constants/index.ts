import { BoardTransformStyle } from "../types";

export const eventTriggerMouseButtons = {
  nothing: 0,
  left: 1,
  right: 2,
  both: 3,
};

export const initialBoardTransformStyle: BoardTransformStyle["zoom"] &
  Omit<
    BoardTransformStyle["pointerPosition"],
    | "adjustedDownX"
    | "adjustedMoveX"
    | "diffXBeforeDrag"
    | "adjustedDownY"
    | "adjustedMoveY"
    | "diffYBeforeDrag"
  > = {
  scale: 1,
  diffX: 0,
  diffY: 0,
  downX: 0,
  downY: 0,
};

export const shortcutKeys = {
  ctrl: "control",
  alt: "alt",
  delete: "delete",
  backspace: "backspace",
  enter: "enter",
  esc: "escape",
  shift: "shift",
  space: " ",
  "[": "[",
  "]": "]",
  c: "c",
  d: "d",
  h: "h",
  g: "g",
  t: "t",
  v: "v",
  z: "z",
};

export const TEXT_DEFAULT_FONT_STYLE = "16px Pretendard";
