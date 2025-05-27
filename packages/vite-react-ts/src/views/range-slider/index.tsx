/** @jsxImportSource @emotion/react */
import { useState } from "react";
import styles from "./rangeSlider.module.scss";

// range tick의 label은 각각의 위치값을 잡아서 지정해줘야 할 듯
export default function RangeSlider() {
  const [selectRatio, setSelectRatio] = useState<number>(0);
  const ratio = ["1 : 1", "4 : 3", "3 : 2", "16 : 9"];
  const maxRange = ratio.length - 1;

  return (
    <div className={styles.container}>
      <div className={styles.rail} />
      <div
        className={styles.track}
        style={{
          width: `calc(${selectRatio / maxRange} * 200px - 2px )`,
        }}
      />
      <input
        className={styles.thumb}
        type="range"
        min="0"
        max={maxRange}
        value={selectRatio}
        onChange={(e) => {
          setSelectRatio(Number(e.target.value));
        }}
      />
    </div>
  );
}
