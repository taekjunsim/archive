import {
  BoardProps,
  BoardTransformStyle,
  ImageInCanvas,
  LayerIndex,
  TextInCanvas,
} from "../types";
import { initialBoardTransformStyle } from "../constants";

export const initImages = (props: BoardProps): Array<ImageInCanvas> => {
  return props.images ? props.images.map((image) => image) : [];
};

export const initTexts = (props: BoardProps): Array<TextInCanvas> => {
  return props.texts ? props.texts.map((text) => text) : [];
};

export const initLayerIndex = (props: BoardProps): LayerIndex => {
  if (!props.images) {
    return {
      max: 5001,
      min: 5000,
    };
  }

  const zIndexArray = props.images?.map(({ zIndex }) => zIndex);

  return {
    max: Math.max(...zIndexArray),
    min: Math.min(...zIndexArray),
  };
};

export const initLastGroupId = (props: BoardProps): number => {
  if (!props.images) return 0;

  const groupIds = props.images
    .map(({ groupHistory }) => {
      return groupHistory;
    })
    .flat();

  return groupIds.length ? Math.max(...groupIds) : 0;
};

export const initBoardTransformStyle = (
  props: BoardProps
): BoardTransformStyle => {
  return {
    zoom: {
      scale: props.initialScale ?? initialBoardTransformStyle.scale,
      diffX: props.initialPositionX ?? initialBoardTransformStyle.diffX,
      diffY: props.initialPositionY ?? initialBoardTransformStyle.diffY,
    },
    pointerPosition: {
      downX: initialBoardTransformStyle.downX,
      adjustedDownX: initialBoardTransformStyle.downX,
      adjustedMoveX: initialBoardTransformStyle.downX,
      diffXBeforeDrag: initialBoardTransformStyle.downX,
      downY: initialBoardTransformStyle.downY,
      adjustedDownY: initialBoardTransformStyle.downY,
      adjustedMoveY: initialBoardTransformStyle.downY,
      diffYBeforeDrag: initialBoardTransformStyle.downY,
    },
  };
};
