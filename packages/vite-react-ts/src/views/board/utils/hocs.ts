import { ImageInCanvas, TextInCanvas } from "../types";

type Last<T extends unknown[]> = T extends [...unknown[], infer L] ? L : never;

type PipeFunctions<T, R> = [
  (arg: T) => any,
  ...Array<(arg: any) => any>,
  (arg: any) => R
];

export function pipe<Fns extends PipeFunctions<unknown, unknown>>(
  ...fns: Fns
): (baseProps: Parameters<Fns[0]>[0]) => ReturnType<Last<Fns>>;

export function pipe<Fns extends PipeFunctions<unknown, unknown>>(...fns: Fns) {
  return (baseProps: Parameters<Fns[0]>[0]): ReturnType<Last<Fns>> => {
    return fns.reduce((acc, fn) => {
      return fn(acc);
    }, baseProps) as ReturnType<Last<Fns>>;
  };
}

export const findItemsWithId =
  (clickedItemId: string | null) => (arr: unknown) => {
    const canvasItems = arr as Array<ImageInCanvas | TextInCanvas>;
    return canvasItems.find(({ id }) => id === clickedItemId);
  };

export const filterGroupedItem =
  (clickedItemGroupId: number | null) => (arr: unknown) => {
    const canvasItems = arr as Array<ImageInCanvas | TextInCanvas>;
    return canvasItems.filter(({ groupId }) => groupId === clickedItemGroupId);
  };

export const filterFocusedItem =
  (focusItemIdList: string[] | null) => (arr: unknown) => {
    const canvasItems = arr as Array<ImageInCanvas | TextInCanvas>;
    if (!focusItemIdList) return [];
    return canvasItems.filter(({ id }) => focusItemIdList.includes(id));
  };

export const extractIds = (arr: unknown) => {
  const canvasItems = arr as Array<ImageInCanvas | TextInCanvas>;
  return canvasItems.map(({ id }) => id);
};
