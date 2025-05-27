import { useCallback, useEffect } from "react";
import {
  unstable_useBlocker as useBlocker,
  unstable_BlockerFunction as BlockFunction,
} from "react-router-dom";
import { Action } from "@remix-run/router";

export default function useBlockingNavigation() {
  const isBlock = useCallback<BlockFunction>(
    ({ historyAction }: { historyAction: Action }) => {
      if (historyAction === "POP") {
        return false;
      }

      return true;
    },
    []
  );

  const blocker = useBlocker(isBlock);

  useEffect(() => {
    if (blocker.state === "blocked") {
      const isConfirm = window.confirm(
        `지금까지 작성 중이던 내용은 저장되지 않습니다.\n페이지를 벗어나시겠습니까?`
      );

      if (isConfirm) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);
}
