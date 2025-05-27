export class HistoryStack<T> {
  public prevSnapshotStack: Array<T> = [];
  public nextSnapshotStack: Array<T> = [];
  public currentSnapshot: T | null = null;

  set = (snapshot: T) => {
    const prevSnapshotStack = this.prevSnapshotStack;
    const prevSnapshot = prevSnapshotStack[prevSnapshotStack.length - 1];

    function isEqual(prev: any, current: any) {
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
          if (prevValue.length !== currentValue.length) return false;
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

    if (prevSnapshot && isEqual(prevSnapshot, snapshot)) return;

    this.prevSnapshotStack = [...this.prevSnapshotStack, { ...snapshot }];
  };

  undo = () => {
    if (this.prevSnapshotStack.length === 1) return;
    const prevSnapshot = this.prevSnapshotStack.pop();
    if (!prevSnapshot) return;
    this.nextSnapshotStack = [...this.nextSnapshotStack, prevSnapshot];
    this.currentSnapshot = this.prevSnapshotStack.length
      ? this.prevSnapshotStack[this.prevSnapshotStack.length - 1]
      : prevSnapshot;
  };

  redo = () => {
    if (!this.nextSnapshotStack.length) return;
    const nextSnapshot = this.nextSnapshotStack.pop();
    if (!nextSnapshot) return;
    this.prevSnapshotStack = [...this.prevSnapshotStack, nextSnapshot];
    this.currentSnapshot = nextSnapshot;
  };

  resetNextSnapshotStack = () => {
    this.nextSnapshotStack = [];
  };
}
