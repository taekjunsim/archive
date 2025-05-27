import { ImageInCanvas, ZoomStyle } from "../types";

export const initializeCanvas = (
  canvasComponent: HTMLCanvasElement | null,
  zoom: ZoomStyle
): CanvasRenderingContext2D => {
  const canvas = canvasComponent;
  if (!canvas) throw Error("not rendered canvasComponent");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw Error("not rendered canvasComponent");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas 초기화
  // ctx.save();
  ctx.translate(zoom.diffX, zoom.diffY);
  ctx.scale(zoom.scale, zoom.scale);

  return ctx;
};

export const injectImgElementToContext = async (
  images: Array<ImageInCanvas>
) => {
  const loadedImgComponents = await Promise.all(
    images.map((imgData) => {
      if (imgData.el) return imgData.el;
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imgData.src;
        img.onload = () => resolve(img);
      });
    })
  );

  return images.map((imgData, index) => ({
    ...imgData,
    el: loadedImgComponents[index] as HTMLImageElement,
  }));
};

// TODO: border Width 및 색상 조절
export const drawBorderHighlight = (
  ctx: CanvasRenderingContext2D,
  coordinate: {
    x: number;
    y: number;
    width: number;
    height: number;
  }
) => {
  const { x, y, width, height } = coordinate;
  ctx.strokeStyle = "blue";
  ctx.strokeRect(x, y, width, height);
};
