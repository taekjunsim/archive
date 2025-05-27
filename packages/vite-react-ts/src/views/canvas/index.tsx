/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";

import testImg from "./test.jpg";

const imagesData = [
  {
    el: null,
    src: testImg,
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    handlers: {
      leftop: { x: 0, y: 0 },
      rightTop: { x: 0, y: 0 },
      leftBottom: { x: 0, y: 0 },
      rightBottom: { x: 0, y: 0 },
    },
  },
  {
    src: testImg,
    x: 200,
    y: 150,
    width: 150,
    height: 150,
    el: null,
    handlers: {
      leftop: { x: 0, y: 0 },
      rightTop: { x: 0, y: 0 },
      leftBottom: { x: 0, y: 0 },
      rightBottom: { x: 0, y: 0 },
    },
  },
  {
    src: testImg,
    x: 400,
    y: 100,
    width: 120,
    height: 120,
    el: null,
    handlers: {
      leftop: { x: 0, y: 0 },
      rightTop: { x: 0, y: 0 },
      leftBottom: { x: 0, y: 0 },
      rightBottom: { x: 0, y: 0 },
    },
  },
];

const handlerSize = 10;
let selectedImageFixedCoordinate = { x: 0, y: 0, width: 0, height: 0 };
export default function Board() {
  const [images, setImages] = useState<
    Array<{
      src: string;
      x: number;
      y: number;
      width: number;
      height: number;
      el: HTMLImageElement | null;
      handlers: {
        leftop: {
          x: number;
          y: number;
        };
        rightTop: {
          x: number;
          y: number;
        };
        leftBottom: {
          x: number;
          y: number;
        };
        rightBottom: {
          x: number;
          y: number;
        };
      };
    }>
  >(imagesData);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.stroke(); // 테두리만 그리기
    ctx.fill(); // 내부 채우기
  }

  // desc: 이미지를 canvas에 그리는 함수
  const drawImages = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // canvas 초기화
    images.forEach((imgData, index) => {
      if (imgData.el) {
        ctx.drawImage(
          imgData.el,
          imgData.x,
          imgData.y,
          imgData.width,
          imgData.height
        );

        if (index === selectedImageIndex) {
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          ctx.strokeRect(imgData.x, imgData.y, imgData.width, imgData.height);
          ctx.strokeStyle = "blue";
          ctx.lineWidth = 2;
          drawRoundedRect(
            ctx,
            imgData.handlers.leftop.x,
            imgData.handlers.leftop.y,
            handlerSize,
            handlerSize,
            1
          );
          drawRoundedRect(
            ctx,
            imgData.handlers.rightTop.x,
            imgData.handlers.rightTop.y,
            handlerSize,
            handlerSize,
            1
          );
          drawRoundedRect(
            ctx,
            imgData.handlers.leftBottom.x,
            imgData.handlers.leftBottom.y,
            handlerSize,
            handlerSize,
            1
          );
          drawRoundedRect(
            ctx,
            imgData.handlers.rightBottom.x,
            imgData.handlers.rightBottom.y,
            handlerSize,
            handlerSize,
            1
          );
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

  // pointermove 이벤트 핸들러
  const handlePointerMove = (event: PointerEvent) => {
    // console.log(selectedImageIndex);
    if (selectedImageIndex === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const imgData = images[selectedImageIndex];

    const dx =
      x - (selectedImageFixedCoordinate.x + selectedImageFixedCoordinate.width);

    const dy =
      y -
      (selectedImageFixedCoordinate.y + selectedImageFixedCoordinate.height);

    if (
      x >= imgData.x + handlerSize + dx &&
      x <= imgData.x + imgData.width + handlerSize + dx &&
      y >= imgData.y + handlerSize + dy &&
      y <= imgData.y + imgData.height + handlerSize + dy
    ) {
      console.log(imgData.handlers.rightBottom.x);
      if (
        // rightBottom 핸들러 좌표 x, y, w, h
        x >= imgData.handlers.rightBottom.x + dx &&
        x <= imgData.handlers.rightBottom.x + handlerSize + dx &&
        y >= imgData.handlers.rightBottom.y + dy &&
        y <= imgData.handlers.rightBottom.y + handlerSize + dy
      ) {
        const updatedImages = images.map((imgData, index) =>
          index === selectedImageIndex
            ? {
                ...imgData,
                width: imgData.width + dx,
                height: imgData.height + dy,
                handlers: {
                  ...imgData.handlers,
                  rightTop: {
                    x: imgData.handlers.rightTop.x + dx,
                    y: imgData.handlers.rightTop.y,
                  },
                  leftBottom: {
                    x: imgData.handlers.leftBottom.x,
                    y: imgData.handlers.leftBottom.y + dy,
                  },
                  rightBottom: {
                    x: imgData.handlers.rightBottom.x + dx,
                    y: imgData.handlers.rightBottom.y + dy,
                  },
                },
              }
            : imgData
        );
        setImages(updatedImages);
      }
    }
  };

  const handlePointerUp = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
  };

  // desc: 이미지 클릭 시 크기 조절
  const handlePointerDown = (event: React.MouseEvent) => {
    console.log("check");
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedImageIndex = images.findIndex((imgData) => {
      return (
        x >= imgData.x + handlerSize &&
        x <= imgData.x + imgData.width + handlerSize &&
        y >= imgData.y + handlerSize &&
        y <= imgData.y + imgData.height + handlerSize
      );
    });
    console.log(clickedImageIndex);
    if (clickedImageIndex === -1) {
      return setSelectedImageIndex(null);
    }
    // if (clickedImageIndex === selectedImageIndex || clickedImageIndex === -1) {
    //   return setSelectedImageIndex(null);
    // }

    selectedImageFixedCoordinate = {
      x: images[clickedImageIndex].x,
      y: images[clickedImageIndex].y,
      width: images[clickedImageIndex].width,
      height: images[clickedImageIndex].height,
    };
    setSelectedImageIndex(clickedImageIndex);

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
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
        handlers: {
          leftop: {
            x: imgData.x - 5,
            y: imgData.y - 5,
          },
          rightTop: { x: imgData.x + imgData.width - 5, y: imgData.y - 5 },
          leftBottom: { x: imgData.x - 5, y: imgData.y + imgData.height - 5 },
          rightBottom: {
            x: imgData.x + imgData.width - 5,
            y: imgData.y + imgData.height - 5,
          },
        },
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
      <div>
        <input type="file" />
      </div>
      <canvas
        ref={canvasRef}
        width="1000px"
        height="1000px"
        style={{ border: "1px solid black" }}
        onPointerDown={handlePointerDown}
        // onPointerMove={
        //   selectedImageIndex !== null ? handlePointerMove : undefined
        // }
      />
    </>
  );
}
