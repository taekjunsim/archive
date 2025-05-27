/** @jsxImportSource @emotion/react */
import styles from "./ReactCrop.module.scss";

type SelectAreaPropsType = {
  x: number;
  y: number;
  width: number;
  height: number;
  handlePointDown: (e: React.PointerEvent) => void;
};

export default function BoundingBox({
  x,
  y,
  width: w,
  height: h,
  handlePointDown,
}: SelectAreaPropsType) {
  return (
    <>
      {/* 선택 외 영역 dimming */}
      <svg className={styles["crop-mask"]}>
        <defs>
          <mask id="hole">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={`${x}px`}
              y={`${y}px`}
              width={`${w}px`}
              height={`${h}px`}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          fill="black"
          fillOpacity={0.5}
          width="100%"
          height="100%"
          mask="url(#hole)"
        />
      </svg>
      {/* 선택 영역 */}
      <div
        style={{
          top: `${y}px`,
          left: `${x}px`,
          width: `${w}px`,
          height: `${h}px`,
        }}
        className={styles["crop-selection"]}
        onPointerDown={handlePointDown}
      >
        <div
          className={`${styles["drag-handle"]} ${styles["s"]} }`}
          data-position="s"
        />
      </div>
    </>
  );
}
