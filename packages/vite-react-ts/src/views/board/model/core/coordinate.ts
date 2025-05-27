import { BoardContext } from "../../types";
import { getAdjustedPointerPosition } from "../../utils/point";

export const getStaticCoordinate = (
  updateCoordinate: Pick<
    BoardContext,
    "wrapperComponent" | "boardTransformStyle"
  > & {
    event: PointerEvent;
  }
) => {
  const { wrapperComponent, boardTransformStyle, event } = updateCoordinate;
  const { zoom } = boardTransformStyle;
  if (!wrapperComponent) throw Error("Component not mounted");
  const [adjustedDownX, adjustedDownY] = getAdjustedPointerPosition({
    clientX: event.clientX,
    clientY: event.clientY,
    zoom,
    wrapper: wrapperComponent,
  });
  return {
    downX: Math.floor(event.clientX),
    adjustedDownX,
    adjustedMoveX: adjustedDownX,
    diffXBeforeDrag: zoom.diffX,
    downY: Math.floor(event.clientY),
    adjustedDownY,
    adjustedMoveY: adjustedDownY,
    diffYBeforeDrag: zoom.diffY,
  };
};

export const getDynamicCoordinate = (
  updateCoordinate: Pick<
    BoardContext,
    "wrapperComponent" | "boardTransformStyle"
  > & {
    event: PointerEvent;
  }
) => {
  const { wrapperComponent, boardTransformStyle, event } = updateCoordinate;
  const { zoom, pointerPosition } = boardTransformStyle;
  if (!wrapperComponent) throw Error("Component not mounted");
  const [adjustedMoveX, adjustedMoveY] = getAdjustedPointerPosition({
    clientX: event.clientX,
    clientY: event.clientY,
    zoom,
    wrapper: wrapperComponent,
  });
  return {
    ...pointerPosition,
    adjustedMoveX,
    adjustedMoveY,
  };
};

export const updateCoordinate = (
  context: BoardContext,
  updateCoordinate: Partial<
    BoardContext["boardTransformStyle"]["pointerPosition"]
  >
) => {
  context.boardTransformStyle.pointerPosition = {
    ...context.boardTransformStyle.pointerPosition,
    ...updateCoordinate,
  };
};
