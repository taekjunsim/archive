import { BoardContext, ImageInCanvas, TextInCanvas } from "../types";
import { checkPressed } from "../utils";
import {
  calculateMouseSelectionBoxCoordinate,
  calculateGroupCoordinate,
  calculateViewportPosition,
  checkPointerInsideTargetCoordinate,
  getClickedItemId,
} from "../utils/point";
import {
  extractIds,
  filterFocusedItem,
  filterGroupedItem,
  findItemsWithId,
  pipe,
} from "../utils/hocs";
import { updateCoordinate } from "./core/coordinate";
import { eventTriggerMouseButtons } from "../constants";

export const handlePointerDown = (context: BoardContext) => {
  const { textComponent: blockClickItem, updateFocusItemList } = context;
  if (blockClickItem) return;
  const { images, texts, pressedKeys, boardTransformStyle } = context;
  const isPressed = checkPressed(pressedKeys);
  const { adjustedDownX, adjustedDownY } = boardTransformStyle.pointerPosition;
  const items = [...images, ...texts];
  const clickedItemId = getClickedItemId(items, adjustedDownX, adjustedDownY);
  const clickedItem = findItemsWithId(clickedItemId)(items);
  const clickedItemGroupId = clickedItem ? clickedItem.groupId : null;

  if (clickedItemGroupId) {
    updateFocusItemList({
      idList: pipe(filterGroupedItem(clickedItemGroupId), extractIds)(items),
      isStack: Boolean(isPressed("shift")),
    });
  }

  if (!clickedItemGroupId && clickedItemId) {
    updateFocusItemList({
      idList: [clickedItemId],
      isStack: Boolean(isPressed("shift")),
    });
  }

  if (!clickedItemGroupId && !clickedItemId) {
    const focusedItems = filterFocusedItem(context.focusItemIdList)(items);
    const isInsideGroupArea = checkPointerInsideTargetCoordinate(
      adjustedDownX,
      adjustedDownY,
      calculateGroupCoordinate(focusedItems)
    );
    if (!isInsideGroupArea) {
      updateFocusItemList();
    }
  }
};

export const handlePointerMove = (
  context: BoardContext,
  event: PointerEvent
) => {
  if (event.buttons !== eventTriggerMouseButtons.left)
    return context.onPointerUp();

  const { images, texts, focusItemIdList, boardTransformStyle } = context;
  const { pointerPosition } = boardTransformStyle;
  const { adjustedDownX, adjustedDownY, adjustedMoveX, adjustedMoveY } =
    pointerPosition;

  const isPressed = checkPressed(context.pressedKeys);

  // TODO: 텍스트 사이즈 조절
  if (isPressed("space") || isPressed("h")) {
    // TODO: 커서 변경
    return calculateViewportPosition(
      context.boardTransformStyle,
      event.clientX,
      event.clientY
    );
  }

  if (context.textComponent) return;

  if (!context.isDragBoundingBox && focusItemIdList) {
    focusItemIdList.forEach((focusItemId) => {
      let focusItemIndex = images.findIndex(({ id }) => id === focusItemId);
      if (images[focusItemIndex]) {
        context.images[focusItemIndex] = {
          ...images[focusItemIndex],
          x: images[focusItemIndex].x + (adjustedMoveX - adjustedDownX),
          y: images[focusItemIndex].y + (adjustedMoveY - adjustedDownY),
        };
      }

      focusItemIndex = context.texts.findIndex(({ id }) => id === focusItemId);
      if (texts[focusItemIndex]) {
        context.texts[focusItemIndex] = {
          ...texts[focusItemIndex],
          x: texts[focusItemIndex].x + (adjustedMoveX - adjustedDownX),
          y: texts[focusItemIndex].y + (adjustedMoveY - adjustedDownY),
        };
      }
    });

    updateCoordinate(context, {
      adjustedDownX: adjustedMoveX,
      adjustedDownY: adjustedMoveY,
    });
  } else {
    context.isDragBoundingBox = true;

    const boundingBoxPosition = calculateMouseSelectionBoxCoordinate(
      adjustedDownX,
      adjustedDownY,
      adjustedMoveX,
      adjustedMoveY
    );

    const checkInsideBoungingBox = (item: ImageInCanvas | TextInCanvas) => {
      return (
        item.x + item.width >= boundingBoxPosition.x &&
        item.x <= boundingBoxPosition.x + boundingBoxPosition.width &&
        item.y + item.height >= boundingBoxPosition.y &&
        item.y <= boundingBoxPosition.y + boundingBoxPosition.height
      );
    };

    const selectedItemIdList = [...images, ...texts].reduce(
      (acc: string[], item) => {
        const isInside = checkInsideBoungingBox(item);
        if (!isInside) return acc;
        return acc ? [...acc, item.id] : [item.id];
      },
      []
    );

    context.updateFocusItemList({ idList: selectedItemIdList });
  }
};
