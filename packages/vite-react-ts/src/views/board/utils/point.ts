import {
  BoardContext,
  BoardTransformStyle,
  ImageInCanvas,
  Position,
  TextInCanvas,
  ZoomStyle,
} from "../types";

const extraSelectArea = 5;

export const getClickedItemId = (
  items: Array<ImageInCanvas | TextInCanvas>,
  adjustedDownX: number,
  adjustedDownY: number
) => {
  const clickedImages = items.filter((target) => {
    return checkPointerInsideTargetCoordinate(
      adjustedDownX,
      adjustedDownY,
      target
    );
  });
  switch (clickedImages.length) {
    case 0:
      return null;
    case 1:
      return clickedImages[0].id;
    default:
      return clickedImages.sort((a, b) => b.zIndex - a.zIndex)[0].id;
  }
};

export const getAdjustedPointerPosition = (props: {
  clientX: number;
  clientY: number;
  zoom: ZoomStyle;
  wrapper: HTMLDivElement;
}) => {
  const adjustPosition = (mouse: number, diff: number, scale: number) => {
    return (mouse - diff) / scale;
  };

  const { clientX, clientY, zoom, wrapper } = props;
  const rect = wrapper.getBoundingClientRect();
  const adjustedDownX = adjustPosition(
    clientX - rect.left,
    zoom.diffX,
    zoom.scale
  );
  const adjustedDownY = adjustPosition(
    clientY - rect.top,
    zoom.diffY,
    zoom.scale
  );

  return [Math.floor(adjustedDownX), Math.floor(adjustedDownY)];
};

export const checkPointerInsideTargetCoordinate = (
  pointerX: number,
  pointerY: number,
  itemPosition: Position
) => {
  return (
    pointerX >= itemPosition.x - extraSelectArea &&
    pointerX <= itemPosition.x + itemPosition.width + extraSelectArea &&
    pointerY >= itemPosition.y - extraSelectArea &&
    pointerY <= itemPosition.y + itemPosition.height + extraSelectArea
  );
};

export const calculateViewportPosition = (
  boardTransformStyle: BoardTransformStyle,
  pointerX: number,
  pointerY: number
) => {
  const { zoom, pointerPosition } = boardTransformStyle;
  const { downX, downY, diffXBeforeDrag, diffYBeforeDrag } = pointerPosition;

  const dx = pointerX - downX;
  const dy = pointerY - downY;

  // TODO: 이동 범위 제한
  zoom.diffX = diffXBeforeDrag + dx;
  zoom.diffY = diffYBeforeDrag + dy;
};

export const calculateGroupCoordinate = (
  images: Array<ImageInCanvas | TextInCanvas>
) => {
  const { x, y, width, height } = images.reduce((acc, cur) => {
    if (!Object.hasOwn(acc, "x")) {
      return {
        x: cur.x,
        y: cur.y,
        width: cur.x + cur.width,
        height: cur.y + cur.height,
      };
    }

    return {
      x: Math.min(acc.x, cur.x),
      y: Math.min(acc.y, cur.y),
      width: Math.max(acc.width, cur.x + cur.width),
      height: Math.max(acc.height, cur.y + cur.height),
    };
  }, {} as { x: number; y: number; width: number; height: number });

  return { x, y, width: width - x, height: height - y };
};

export const calculateMouseSelectionBoxCoordinate = (
  downX: number,
  downY: number,
  moveX: number,
  moveY: number
) => {
  return {
    x: Math.min(moveX, downX),
    y: Math.min(moveY, downY),
    width: Math.abs(moveX - downX),
    height: Math.abs(moveY - downY),
  };
};
