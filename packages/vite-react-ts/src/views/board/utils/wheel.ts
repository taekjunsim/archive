import { BoardContext } from "../types";

export const handleWheelZoom = (
  boardContext: BoardContext,
  event: WheelEvent
) => {
  const {
    props: { onWheel },
    boardTransformStyle: { zoom },
  } = boardContext;

  event.preventDefault();

  const zoomFactor = 0.1;
  const delta =
    "deltaY" in event
      ? event.deltaY < 0
        ? 1 + zoomFactor
        : 1 - zoomFactor
      : 1;
  const newScale = Math.min(Math.max(0.1, zoom.scale * delta), 100);
  // const canvas = canvasRef.current;
  // if (!canvas) return;
  // const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX; // event.clientX - rect.left;
  const mouseY = event.clientY; // event.clientY - rect.top;

  // TODO: scale 제한
  zoom.diffX = mouseX - (mouseX - zoom.diffX) * (newScale / zoom.scale);
  zoom.diffY = mouseY - (mouseY - zoom.diffY) * (newScale / zoom.scale);
  zoom.scale = newScale;
  // zoom.scale = newScale >= 2 ? zoom.scale : newScale;
  onWheel?.(boardContext, event);
};
