const queue: Array<() => void> = [];

export const observe = (target: () => void) => {
  target();
  queue.push(target);
};

export const useState = <T>(initialValue?: T) => {
  let state = initialValue;

  const getState = (): T => {
    return state!;
  };

  const setState = (newValue?: T) => {
    state = newValue;
    queue.forEach((el) => el());
  };

  return [getState, setState] as const;
};
