import { shortcutKeys } from "../constants";
import { BoardContext, ImageInCanvas } from "../types";

export const restrictContextMenu = (event: MouseEvent) =>
  event.preventDefault();

export const checkPressed =
  (pressedKeys: { [key: string]: boolean }) =>
  (type: keyof typeof shortcutKeys) => {
    return pressedKeys[shortcutKeys[type]];
  };

export const updateImages = (
  context: BoardContext,
  callback: (image: ImageInCanvas, index: number) => ImageInCanvas
) => {
  context.setUpdateImages(context.images.map(callback));
};

export function isEqual(prev: any, current: any) {
  if (typeof prev !== "object" || prev === null) {
    return false;
  }

  const keys = Object.keys(prev);
  // TODO: 좌표가 너무 세부적으로 저장되서 stack 다시 한 번 확인해봐야 할 듯. move에 Math.ceil은 좌표를 어긋나게 만듬
  for (const key of keys) {
    const prevValue = prev[key as keyof typeof prev];
    const currentValue = current[key as keyof typeof current];
    if (key === "props") continue;
    if (typeof prevValue === "function") continue;
    if (typeof prevValue === "undefined") continue;
    if (typeof prevValue === "object" && prevValue === null) continue;
    if (Array.isArray(prevValue) && Array.isArray(currentValue)) {
      const isSame = prevValue.every((value, index) => {
        if (typeof value === "number") {
          if (value !== currentValue[index]) return false;
        }
        if (typeof value === "object") {
          if (!isEqual(value, currentValue[index])) return false;
        }
        return true;
      });
      if (!isSame) return false;
    }

    if (typeof prevValue === "number" || typeof prevValue === "string") {
      if (prevValue !== currentValue) return false;
    }
  }
  return true;
}
