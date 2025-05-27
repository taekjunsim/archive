/** @jsxImportSource @emotion/react */
import { useState } from "react";
import useQueue from "./use-queue";
import Queue from "./Queue";

/**
 * TODO
 *  1. Queue 줄바꿈 적용 및 마우스 이벤트 추가
 *  2. 이벤트 트리거를 보다 인터렉티브하고 재밌는 방법으로 변경하기
 *
 * 참고
 *  브라우저 기본 동작으로 인해 mobile device에서 pointer move 이벤트가 강제로 취소되어 pointer cancel 이벤트가 발생
 *  이를 해결하기 위해서는 touch-action css 프로퍼티 설정 필요 (자료 추가 조사 필요)
 */
export default function Pointer() {
  const [throttle, setThrottle] = useState(false);
  const { queue, handleQueue, handleRunQueue } = useQueue();
  // - pointercancel

  const handlePointerOver = () => {
    handleQueue("pointer over");
  };

  const handlePointerDown = () => {
    handleQueue("pointer down");
  };
  const handlePointerUp = () => {
    handleQueue("pointer up");
  };

  const handlePointerMove = () => {
    if (throttle) return;
    setThrottle(true);
    handleQueue("pointer move");

    setTimeout(() => {
      setThrottle(false);
    }, 1000);
  };

  const handlePointerEnter = () => {
    handleQueue("pointer enter");
  };

  const handlePointerOut = () => {
    handleQueue("pointer out");
  };

  const handlePointerLeave = () => {
    handleQueue("pointer leave");
  };

  const handleClick = () => {
    handleQueue("click");
  };

  const handleMouseOver = () => {
    handleQueue("mouse over");
  };

  const handleMouseDown = () => {
    handleQueue("mouse down");
  };

  // - mouseup
  // - mouseenter
  // - mouseleave
  // - mousemove
  // - mouseout
  return (
    <div>
      <h3>Pointer Event</h3>
      <button
        css={button}
        onMouseOver={handleMouseOver}
        onMouseDown={handleMouseDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerOut={handlePointerOut}
        onPointerOver={handlePointerOver}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
      >
        Event
      </button>
      <button onClick={() => handleRunQueue(true)}>Start Queue</button>
      <button onClick={() => handleRunQueue(false)}>Stop Queue</button>
      <button onClick={() => handleQueue()}>Empty Queue</button>
      <Queue queue={queue} />
    </div>
  );
}

const button = {
  width: "100px",
  height: "30px",
  margin: "0 20px 20px 0",
  backgroundColor: "transparent",
  border: "1px solid black",
  borderRadius: "20px",
};
