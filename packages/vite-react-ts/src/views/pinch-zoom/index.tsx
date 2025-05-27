/** @jsxImportSource @emotion/react */

import { useCallback, useEffect, useRef, useState } from "react";
import img from "././testimg.jpg";
import styles from "./index.module.scss";

export default function PinchZoom() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  let transformState = {
    scale: 1,
    positionX: 0,
    positionY: 0,
  };

  // TODO: 변수명 정리, 코드 분할(zoom, 화면이동, canvas), canvas 작업
  let dragCoordinate = {
    startX: 0,
    x: 0,
    startY: 0,
    y: 0,
  };

  const handleWheel = useCallback(
    (e: WheelEvent | MouseEvent) => {
      e.preventDefault();

      if (!e.ctrlKey) return;
      const zoomFactor = 0.1;
      const delta =
        "deltaY" in e ? (e.deltaY < 0 ? 1 + zoomFactor : 1 - zoomFactor) : 1;
      const newScale = Math.min(
        Math.max(0.1, transformState.scale * delta),
        100
      );
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      transformState.scale = newScale;
      transformState.positionX =
        mouseX -
        (mouseX - transformState.positionX) * (newScale / transformState.scale);
      transformState.positionY =
        mouseY -
        (mouseY - transformState.positionY) * (newScale / transformState.scale);

      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      console.log(transformState.positionX);
      // Canvas 초기화 및 변환
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(transformState.positionX, transformState.positionY);
      ctx.scale(transformState.scale, transformState.scale);

      ctx.fillStyle = "blue";
      ctx.fillRect(50, 50, 200, 200);
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(300, 300, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    },
    [transformState]
  );

  const handleKeydown = (e: KeyboardEvent) => {
    (e.key === "=" || e.key === "-") && e.preventDefault();
    if (e.code === "Space") {
      setIsSpacePressed(true);
    }
  };
  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      setIsSpacePressed(false);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isSpacePressed) return;

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerUp);
    setIsDragging(true);

    dragCoordinate = {
      startX: e.clientX, // pointerDownMouseX
      x: transformState.positionX, // prevPositionX
      startY: e.clientY, // pointerDownMouseY
      y: transformState.positionY, // prevPositionY
    };
  };

  const handlePointerMove = (e: PointerEvent) => {
    const mouseLeftButton = 1;
    if (e.buttons !== mouseLeftButton) {
      return handlePointerUp();
    }

    const dx = e.clientX - dragCoordinate.startX; // mouseX
    const dy = e.clientY - dragCoordinate.startY; // mouseY

    transformState.positionX = dragCoordinate.x + dx; // diffX
    transformState.positionY = dragCoordinate.y + dy; // diffY

    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(transformState.positionX, transformState.positionY);
    ctx.scale(transformState.scale, transformState.scale);

    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 200, 200);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(300, 300, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  const handlePointerUp = () => {
    setIsDragging(false);

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointercancel", handlePointerUp);
  };

  useEffect(() => {
    if (!wrapperRef.current) return;
    const wrapperComponent = wrapperRef.current;

    document.addEventListener("keydown", handleKeydown, { passive: false });
    document.addEventListener("keyup", handleKeyUp, { passive: false });
    // desc: 브라우저의 휠 동작을 제어하기 위해 passive의 값으로 false 전달
    wrapperComponent.addEventListener("wheel", handleWheel, { passive: false });
    // desc: ctrl + leftClick = rightClick, rightClick을 제어하는 코드
    wrapperComponent.addEventListener("contextmenu", handleWheel);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyUp);
      wrapperComponent.removeEventListener("wheel", handleWheel);
    };
  }, [handleWheel]);

  // canvas에 그리기
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    // Canvas 크기와 위치 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 예시: Canvas에 그림 그리기
    ctx.fillStyle = "blue";
    ctx.fillRect(50, 50, 200, 200);
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(300, 300, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        overflow: "hidden",
        width: "100vw",
        height: "100vh",
        cursor: isSpacePressed ? (isDragging ? "grabbing" : "grab") : "default",
      }}
      onPointerDown={handlePointerDown}
      tabIndex={0}
      // onClick={handleWheel}
    >
      <div>
        <canvas
          ref={canvasRef}
          style={{
            width: window.innerWidth,
            height: window.innerHeight,
            border: "1px solid black",
          }}
        />
      </div>
    </div>
  );
}
