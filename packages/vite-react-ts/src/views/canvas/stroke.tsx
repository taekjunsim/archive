import { useEffect, useRef } from "react";
import testImg from "./test.jpg";

// 이미지끼리 스트로크를 연결하고 스트로크가 꺾이는 부분에 radius 적용
export default function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = `${testImg}`;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 500, 500);
      ctx.drawImage(img, 500, 500, 500, 500);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(500, 250);
      ctx.lineTo(700, 250);
      ctx.arcTo(750, 250, 750, 260, 10);
      ctx.lineTo(750, 500);
      ctx.stroke();
    };

    img.addEventListener("mousemove", () => {
      console.log(img.getBoundingClientRect());
      // console.log()
    });
  }, []);
  return (
    <>
      <canvas ref={canvasRef} width="1000px" height="1000px"></canvas>
    </>
  );
}
