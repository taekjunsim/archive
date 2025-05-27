import { HistoryStack } from "@/views/history-stack";
import { checkPressed, updateImages } from ".";
import { BoardContext, ImageInCanvas } from "../types";
import { calculateGroupCoordinate } from "./point";

export const handleKeyDown = (
  context: BoardContext,
  event: KeyboardEvent,
  snapshotStack: HistoryStack<BoardContext>
) => {
  const { pressedKeys, focusItemIdList } = context;

  const isPressed = checkPressed(pressedKeys);

  // 그룹
  if (isPressed("ctrl") && isPressed("g")) {
    snapshotStack.resetNextSnapshotStack();
    let groupId = context.lastGroupId;
    if (isPressed("shift")) {
      updateImages(context, (image) => {
        const newGroupHistory = [...image.groupHistory];
        newGroupHistory.pop();
        groupId = newGroupHistory[newGroupHistory.length - 1] ?? 0;
        return {
          ...image,
          groupId,
          groupHistory: newGroupHistory,
        };
      });
    }

    if (!isPressed("shift")) {
      if (!focusItemIdList) return;
      groupId += 1;
      context.lastGroupId = groupId;
      updateImages(context, (image) => {
        if (!focusItemIdList.includes(image.id)) {
          return image;
        }
        return {
          ...image,
          groupId,
          groupHistory: [...image.groupHistory, groupId],
        };
      });
    }
  }

  // 실행 취소
  if (isPressed("ctrl") && isPressed("z")) {
    snapshotStack[isPressed("shift") ? "redo" : "undo"]();
    if (snapshotStack.currentSnapshot) {
      context.images = snapshotStack.currentSnapshot.images;
      context.layerIndex = snapshotStack.currentSnapshot.layerIndex;
      context.lastGroupId = snapshotStack.currentSnapshot.lastGroupId;
      context.focusItemIdList = snapshotStack.currentSnapshot.focusItemIdList;
    }
  }

  // 복사 붙여넣기
  if (isPressed("ctrl") && isPressed("c")) {
    const clipedImages = context.images.filter(({ id }) =>
      context.focusItemIdList?.includes(id)
    );

    // const clipedText =
    // const clipedGroupText =
    context.clipboard = {
      images: clipedImages,
      // text:
    };
  }

  if (isPressed("ctrl") && isPressed("v")) {
    // // TODO: context.clipboard.images => response로 교체
    const imageClipboard = context.clipboard.images;
    if (!imageClipboard) return;
    const groupIdList = imageClipboard.reduce(
      (acc: number[], { groupId }) =>
        acc.includes(groupId) ? acc : [...acc, groupId],
      []
    );
    console.log(groupIdList);
    const updatedGroupIdImages = groupIdList.map((clipedGroupId) => {
      const imageList = imageClipboard.filter(({ groupId }) =>
        clipedGroupId ? groupId === clipedGroupId : !groupId
      );
      if (!clipedGroupId) return imageList;
      context.lastGroupId += 1;
      return imageList.map((image) => {
        const groupIdIndex = image.groupHistory.findIndex(
          (groupId) => groupId === image.groupId
        );
        const newGroupHistory = image.groupHistory.toSpliced(
          groupIdIndex,
          1,
          context.lastGroupId
        );
        return {
          ...image,
          groupId: context.lastGroupId,
          groupHistory: newGroupHistory,
        };
      });
    });
    const images = updatedGroupIdImages.flat();
    const { adjustedDownX, adjustedDownY } =
      context.boardTransformStyle.pointerPosition;
    const updatedCoordinateImages = images.map((image) => {
      context.layerIndex.max += 1;
      return {
        ...image,
        id: Math.random().toString(), // TODO: response로 교체하면 삭제하기
        x: adjustedDownX,
        y: adjustedDownY,
        zIndex: context.layerIndex.max,
      };
    });
    context.focusItemIdList = updatedCoordinateImages.map(({ id }) => id);
    context.images = [...context.images, ...updatedCoordinateImages];
    snapshotStack.set(context);
  }

  // TODO: 그룹 복제 기능
  if (isPressed("ctrl") && isPressed("d")) {
    const gap = 16;
    const target = context.images.find(
      ({ id }) => id === context.focusItemIdList?.[0]
    );
    if (!target) return;
    const rowImages = context.images.filter((el) => {
      return el.y === target.y;
    });

    let leftOrder = 0;
    while (leftOrder < 4) {
      leftOrder++;
      const image = rowImages.find(({ x, width }) => {
        return target.x === x + (width + gap) * leftOrder;
      });
      if (!image) break;
    }

    let rightOrder = 0;
    while (rightOrder < 4) {
      rightOrder++;
      const image = rowImages.find(({ x, width }) => {
        return target.x === x - (width + gap) * rightOrder;
      });
      if (!image) break;
    }

    if (leftOrder + rightOrder - 1 !== 4) {
      context.layerIndex.max += 1;
      const updatedCoordinateImages: ImageInCanvas = {
        ...target,
        id: Math.random().toString(), // TODO: response로 교체하면 삭제하기
        x: target.x + (target.width + gap) * rightOrder,
        y: target.y,
        zIndex: context.layerIndex.max,
      };
      context.images = [...context.images, updatedCoordinateImages];
    } else {
      let row = 0;
      let columnCount = 0;
      while (row >= 0) {
        row++;
        const rowImages = context.images.filter((el) => {
          return el.y === target.y + (target.height + gap) * row;
        });
        if (rowImages.length !== 4) {
          columnCount = rowImages.length;
          break;
        }
      }
      const updatedCoordinateImages: ImageInCanvas = {
        ...target,
        id: Math.random().toString(), // TODO: response로 교체하면 삭제하기
        x: target.x + (target.width + gap) * (columnCount - leftOrder + 1),
        y: target.y + (target.height + gap) * row,
        zIndex: context.layerIndex.max,
      };
      context.images = [...context.images, updatedCoordinateImages];
    }

    snapshotStack.set(context);
  }

  if (event.key === "=" || event.key === "-") {
    if (pressedKeys.Control) {
      event.preventDefault();
      // zoomin - viewport의 center를 기준으로 scale
      // zoomout - viewport의 center를 기준으로 scale
    }
  }
};

// DO NOT DELETE!!! 이미지 생성했을 때 생성 이미지 위치 배치 로직
// function locateImage(
//   context: BoardContext,
//   snapshotStack: HistoryStack<BoardContext>
// ) {
//   const dummy = context.images[4];
//   const drawingImageList2 = [dummy, dummy, dummy, dummy, dummy, dummy, dummy]; // resposne
//   const response = [...drawingImageList2];

//   // 기준이 되는 좌표는 수정 여지 존재
//   const { x, y, width, height } = context.images[4];
//   const columnCount = 4;
//   const gap = 10;
//   const areaMinX = x + width + gap;
//   const areaMaxX = areaMinX * 4;
//   let areaMinY = y;
//   let areaMaxY = areaMinY + height + gap;
//   let imagesInRow: ImageInCanvas[] = [];
//   const imagesInColumn = context.images.filter((image) => {
//     return image.x + image.width + gap > areaMinX && image.x < areaMaxX;
//   });

//   if (!imagesInColumn.length) {
//     const updatedCoordinateImages = response.map((image, index) => {
//       context.layerIndex.max += 1;
//       return {
//         ...image,
//         id: Math.random().toString(), // TODO: response로 교체하면 삭제하기
//         x: areaMinX + (image.width + gap) * (index % 4),
//         y: areaMinY + (image.height + gap) * Math.floor(index / 4),
//         zIndex: context.layerIndex.max,
//       };
//     });
//     context.images = [...context.images, ...updatedCoordinateImages];
//   }

//   while (imagesInColumn.length) {
//     const imageListInRow = imagesInColumn.filter((image) => {
//       return image.y + image.height + gap > areaMinY && image.y < areaMaxY;
//     });

//     if (!imageListInRow.length) {
//       const deleteCount =
//         response.length >= columnCount ? columnCount : response.length;
//       const drawingImageList = response.splice(0, deleteCount);

//       drawingImageList.forEach((image, index) => {
//         context.layerIndex.max += 1;
//         context.images = [
//           ...context.images,
//           {
//             ...image,
//             id: Math.random().toString(), // TODO: response로 교체하면 삭제하기
//             x: areaMinX + (image.width + gap) * (index % 4),
//             y: areaMinY,
//             zIndex: context.layerIndex.max,
//           },
//         ];
//       });

//       if (!response.length) break;
//     }

//     areaMinY = imagesInRow.reduce((acc, cur) => {
//       const maxY = cur.y + cur.height + gap;
//       return Math.max(acc, maxY);
//     }, 0);
//     areaMaxY = areaMinY + height + gap;
//     imagesInRow = imageListInRow;
//   }

//   snapshotStack.set(context);
// }
