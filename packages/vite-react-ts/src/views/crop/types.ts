type XOrds = "e" | "w";
type YOrds = "n" | "s";
type XYOrds = "nw" | "ne" | "se" | "sw";
export type HandlerPositionsType = XOrds | YOrds | XYOrds;

export type CropType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DynamicBoundingBoxType = {
  pointerStaticClientX: number;
  pointerStaticClientY: number;
  pointerDynamicClientX: number;
  pointerDynamicClientY: number;
  referencePointOffsetX: number;
  referencePointOffsetY: number;
  isResize: boolean;
  handlerPosition?: HandlerPositionsType;
};
