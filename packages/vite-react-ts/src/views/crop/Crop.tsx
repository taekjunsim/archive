/** @jsxImportSource @emotion/react */
import React, { Children, cloneElement, useRef } from "react";
import {
  CropType,
  DynamicBoundingBoxType,
  HandlerPositionsType,
} from "./types";
import {
  addEvents,
  calculateDistance,
  getContainerBoundingBox,
  removeEvents,
} from "./utils";
import styles from "./ReactCrop.module.scss";
import BoundingBox from "./BoundingBox";

type CropPropsType = {
  onCrop: (cropImg: CropType) => void;
  crop: CropType;
  children: React.ReactNode;
  minHeight: number;
  maxHeight: number;
};

export default function Crop({
  crop: staticBoundingBox,
  onCrop,
  children,
  minHeight,
  maxHeight,
}: CropPropsType) {
  let dynamicBoundingBox: DynamicBoundingBoxType = {
    pointerStaticClientX: 0,
    pointerStaticClientY: 0,
    pointerDynamicClientX: 0,
    pointerDynamicClientY: 0,
    referencePointOffsetX: 0,
    referencePointOffsetY: 0,
    isResize: true,
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const resizeCrop = () => {
    const { distanceY: yDistance } = calculateDistance(dynamicBoundingBox);

    return {
      ...staticBoundingBox,
      height:
        yDistance >= maxHeight
          ? maxHeight
          : yDistance <= minHeight
          ? minHeight
          : yDistance,
    };
  };

  const handlePointerMove = (e: PointerEvent) => {
    dynamicBoundingBox.pointerDynamicClientY = e.clientY;

    const updateCrop = dynamicBoundingBox.isResize
      ? resizeCrop()
      : staticBoundingBox;

    onCrop(updateCrop);
    // if (equal(staticBoundingBox, updateCrop)) [
    // 	onCrop(updateCrop);
    // ]
  };

  const handlePointerUp = () => {
    removeEvents(handlePointerMove, handlePointerUp);
  };

  const handlePointerDownToUpdateCrop = (e: React.PointerEvent) => {
    const container = getContainerBoundingBox(containerRef.current);

    addEvents(handlePointerMove, handlePointerUp);

    const { y, height } = staticBoundingBox;
    const pointerOffsetY = e.clientY - container.y;
    const handlerPosition = (e.target as HTMLElement).dataset.position;
    let yDiffBetweenPointerAndHandler = pointerOffsetY - (y + height);

    dynamicBoundingBox = {
      ...dynamicBoundingBox,
      pointerStaticClientY: y + container.y + yDiffBetweenPointerAndHandler,
      referencePointOffsetY: y,
      pointerDynamicClientY: e.clientY,
      isResize: Boolean(handlerPosition),
      handlerPosition: handlerPosition as HandlerPositionsType,
    };
  };

  return (
    <div className={styles.ReactCrop}>
      <div ref={containerRef} className={styles["child-wrapper"]}>
        {Children.map(children, (child) => {
          return cloneElement(child as React.ReactElement, {
            draggable: false,
          });
        })}
      </div>
      {staticBoundingBox && (
        <BoundingBox
          handlePointDown={handlePointerDownToUpdateCrop}
          {...staticBoundingBox}
        />
      )}
    </div>
  );
}
