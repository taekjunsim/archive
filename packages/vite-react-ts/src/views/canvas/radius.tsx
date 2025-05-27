/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";

import testImg from "./test.jpg";

const imagesData = [
  { src: testImg, x: 50, y: 50, width: 100, height: 100, el: null },
  { src: testImg, x: 200, y: 150, width: 150, height: 150, el: null },
  { src: testImg, x: 400, y: 100, width: 120, height: 120, el: null },
];
export default function Board() {
  const [images, setImages] = useState<
    Array<{
      src: string;
      x: number;
      y: number;
      width: number;
      height: number;
      el: HTMLImageElement | null;
    }>
  >(imagesData);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  function applyRadius(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    // 둥근 모서리 사각형 경로 설정
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();
    ctx.clip(); // 설정한 경로를 클리핑 영역으로 지정
  }

  function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y); // 좌상단에서 시작

    // 상단 라인과 우측 상단 코너
    ctx.lineTo(x + width - radius, y);
    ctx.arcTo(x + width, y, x + width, y + radius, radius);

    // 우측 라인과 우측 하단 코너
    ctx.lineTo(x + width, y + height - radius);
    ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);

    // 하단 라인과 좌측 하단 코너
    ctx.lineTo(x + radius, y + height);
    ctx.arcTo(x, y + height, x, y + height - radius, radius);

    // 좌측 라인과 좌측 상단 코너
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);

    ctx.closePath();
    ctx.stroke(); // 테두리만 그리기
    // ctx.fill(); // 내부 채우기
  }

  // desc: 이미지를 canvas에 그리는 함수
  const drawImages = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // canvas 초기화
    images.forEach((imgData, index) => {
      if (imgData.el) {
        ctx.save();
        applyRadius(
          ctx,
          imgData.x,
          imgData.y,
          imgData.width,
          imgData.height,
          10
        );
        ctx.drawImage(
          imgData.el,
          imgData.x,
          imgData.y,
          imgData.width,
          imgData.height
        );
        ctx.restore();

        if (index === selectedImageIndex) {
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.strokeRect(imgData.x, imgData.y, imgData.width, imgData.height);
          // drawRoundedRect(
          //   ctx,
          //   imgData.x,
          //   imgData.y,
          //   imgData.width,
          //   imgData.height,
          //   10
          // );
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          // drawRoundedRect(ctx, imgData.x - 5, imgData.y - 5, 10, 10, 10);
          // ctx.strokeRect(imgData.x + imgData.width - 5, imgData.y - 5, 10, 10);
          // ctx.strokeRect(imgData.x - 5, imgData.y + imgData.height - 5, 10, 10);
          // ctx.strokeRect(
          //   imgData.x + imgData.width - 5,
          //   imgData.y + imgData.height - 5,
          //   10,
          //   10
          // );
        }
      }
    });
  };

  // desc: 개별 이미지를 로드하는 함수 (Promise 사용)
  const loadImage = (src: any) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  };

  // desc: 이미지 클릭 시 크기 조절
  const handleCanvasClick = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedImageIndex = images.findIndex((imgData) => {
      return (
        x >= imgData.x &&
        x <= imgData.x + imgData.width &&
        y >= imgData.y &&
        y <= imgData.y + imgData.height
      );
    });

    if (clickedImageIndex === selectedImageIndex || clickedImageIndex === -1) {
      return setSelectedImageIndex(null);
    }

    setSelectedImageIndex(clickedImageIndex);

    // TODO: update, mousemove event 이미지 크기 증가
    // const updatedImages = images.map((imgData, index) =>
    //   index === clickedImageIndex
    //     ? {
    //         ...imgData,
    //         width: imgData.width * 1.2,
    //         height: imgData.height * 1.2,
    //       }
    //     : imgData
    // );
    // setImages(updatedImages);
  };

  // desc: 모든 이미지를 로드하고 state에 저장
  useEffect(() => {
    async function loadAllImages() {
      const loadedImages = await Promise.all(
        imagesData.map((imgData) => loadImage(imgData.src))
      );

      // desc: 로드된 이미지 객체를 기존 imagesData에 병합
      const updatedImages = imagesData.map((imgData, index) => ({
        ...imgData,
        el: loadedImages[index] as HTMLImageElement,
      }));

      setImages(updatedImages);
    }

    loadAllImages();
  }, []);

  // desc: Canvas에 그리기
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawImages(ctx);
  }, [images, selectedImageIndex]);

  // TODO: 클릭을 해서 이미지를 타겟팅했으면 그 이미지 위에서는 mousemove 이벤트가 활성화되어야 한다.
  return (
    <>
      <canvas
        ref={canvasRef}
        width="1000px"
        height="1000px"
        style={{ border: "1px solid black" }}
        onClick={handleCanvasClick}
      />
    </>
  );
}
