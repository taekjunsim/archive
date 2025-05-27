import { Board } from "../model";

export type ZoomStyle = {
  scale: number;
  diffX: number;
  diffY: number;
};

export type PointerPosition = {
  downX: number;
  adjustedDownX: number;
  adjustedMoveX: number;
  diffXBeforeDrag: number;
  downY: number;
  adjustedDownY: number;
  adjustedMoveY: number;
  diffYBeforeDrag: number;
};

export type BoardTransformStyle = {
  zoom: ZoomStyle;
  pointerPosition: PointerPosition;
};

export type ImageInCanvas = {
  id: string;
  el: HTMLImageElement | null;
  name: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  groupId: number;
  groupHistory: Array<number>;
};

export type TextInCanvas = {
  id: string;
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  groupId: number;
  groupHistory: Array<number>;
};

export type LayerIndex = {
  max: number;
  min: number;
};

export type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ContextMenuCoordinate = {
  x: number;
  y: number;
} | null;

export type BoardProps = {
  images?: Array<ImageInCanvas>;
  texts?: Array<TextInCanvas>;
  children?: ((context: BoardContext) => React.ReactNode) | React.ReactNode;
  initialScale?: number;
  initialPositionX?: number;
  initialPositionY?: number;
  initialPointerDownMouseX?: 0;
  initialPrevPositionX?: 0;
  initialPointerDownMouseY?: 0;
  initialPrevPositionY?: 0;
  disabled?: boolean;
  minPositionX?: null | number;
  maxPositionX?: null | number;
  minPositionY?: null | number;
  maxPositionY?: null | number;
  minScale?: number;
  maxScale?: number;
  onInit?: (boardContext: BoardContext) => void;
  onWheel?: (boardContext: BoardContext, event: WheelEvent) => void;
  onPointerDown?: (boardContext: BoardContext, event: PointerEvent) => void;
  onPointerMove?: (boardContext: BoardContext, event: PointerEvent) => void;
  onPointerUp?: (boardContext: BoardContext) => void;
  onClick?: (boardContext: BoardContext, event: MouseEvent) => void;
  onDoubleClick?: (boardContext: BoardContext, event: MouseEvent) => void;
  onKeyDown?: (boardContext: BoardContext, event: KeyboardEvent) => void;
  onKeyUp?: (boardContext: BoardContext, event: KeyboardEvent) => void;
};

export type BoardContext = typeof Board.prototype;
