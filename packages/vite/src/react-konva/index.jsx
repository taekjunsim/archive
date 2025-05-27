import { useState } from "react";
import { Stage, Layer, Line } from "react-konva";

export default function Konva() {
  const [points, setPoints] = useState([]); // 다각형의 점 좌표 배열
  const [isDrawing, setIsDrawing] = useState(false);

  // 캔버스 클릭 핸들러
  const handleStageClick = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    if (!pointerPosition) return;

    const { x, y } = pointerPosition;

    setPoints((prevPoints) => [...prevPoints, x, y]);

    if (!isDrawing) setIsDrawing(true); // 그리기 시작
  };

  // 그리기 완료
  const handleComplete = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <button onClick={handleComplete}>완료</button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleStageClick}
        style={{ border: "1px solid black" }}
      >
        <Layer>
          <Line
            points={points}
            closed={isDrawing ? false : true} // 그리는 중에는 열려 있고 완료되면 닫힘
            fill={isDrawing ? "rgba(0,0,0,0)" : "rgba(0, 128, 255, 0.4)"}
            stroke="blue"
            strokeWidth={2}
          />
        </Layer>
      </Stage>
    </div>
  );
}
