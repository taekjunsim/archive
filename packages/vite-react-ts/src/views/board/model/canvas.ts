import { BoardContext } from "../types";
import {
  drawBorderHighlight,
  initializeCanvas,
  injectImgElementToContext,
} from "../utils/canvas";
import {
  calculateGroupCoordinate,
  calculateMouseSelectionBoxCoordinate,
} from "../utils/point";
import { drawText } from "./text";

export const drawImages = async (context: BoardContext) => {
  const { zoom } = context.boardTransformStyle;

  const injectedImgElementContext = await injectImgElementToContext(
    context.images
  );
  // desc: canvas는 layer가 쌓이는 구조라서 z-index와 무관하게 나중에 그려진 이미지의 layer가 가장 높음
  const imagesArrangedAscending = [...injectedImgElementContext].sort(
    (a, b) => a.zIndex - b.zIndex
  );

  context.images = imagesArrangedAscending;
  const ctx = initializeCanvas(context.canvasComponent, zoom);

  drawText(context, ctx);

  imagesArrangedAscending.forEach((imgData) => {
    if (!imgData.el) return;

    ctx.font = "4px Pretendard";
    ctx.fillText(imgData.name, imgData.x, imgData.y - 4);
    ctx.drawImage(
      imgData.el,
      imgData.x,
      imgData.y,
      imgData.width,
      imgData.height
    );

    if (context.focusItemIdList?.includes(imgData.id)) {
      drawBorderHighlight(ctx, imgData);
    }
  });

  // TODO: text도 그룹화에 추가하기
  const imagesInGroup = imagesArrangedAscending.filter(({ id }) =>
    context.focusItemIdList?.includes(id)
  );

  const borderCoordinate = calculateGroupCoordinate(imagesInGroup);
  drawBorderHighlight(ctx, borderCoordinate);

  if (context.isDragBoundingBox) {
    const { adjustedDownX, adjustedDownY, adjustedMoveX, adjustedMoveY } =
      context.boardTransformStyle.pointerPosition;
    const boundingBoxPosition = calculateMouseSelectionBoxCoordinate(
      adjustedDownX,
      adjustedDownY,
      adjustedMoveX,
      adjustedMoveY
    );
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "#EAEAF7";
    ctx.fillRect(
      boundingBoxPosition.x,
      boundingBoxPosition.y,
      boundingBoxPosition.width,
      boundingBoxPosition.height
    );
    ctx.strokeStyle = "blue";
    ctx.strokeRect(
      boundingBoxPosition.x,
      boundingBoxPosition.y,
      boundingBoxPosition.width,
      boundingBoxPosition.height
    );
    ctx.globalCompositeOperation = "source-over";
  }

  // ctx.restore();
};
