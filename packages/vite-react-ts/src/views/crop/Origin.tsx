/** @jsxImportSource @emotion/react */
import React, { Children, cloneElement, useRef } from "react";
import {
  CropType,
  DynamicBoundingBoxType,
  HandlerPositionsType,
} from "./types";
import { defaultCrop } from "./constants";
import {
  addEvents,
  calculateDistance,
  getContainerBoundingBox,
  removeEvents,
  // restrictXYCoordinate,
} from "./utils";
import styles from "./ReactCrop.module.scss";
import BoundingBox from "./BoundingBox";

type CropPropsType = {
  onCrop: (cropImg: CropType) => void;
  crop?: CropType;
  children: React.ReactNode;
};

export default function Crop({
  crop: staticBoundingBox,
  onCrop,
  children,
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

  const handlePointerDown = (e: React.PointerEvent) => {
    const container = getContainerBoundingBox(containerRef.current);

    addEvents(handlePointerMove, handlePointerUp);

    const pointerOffsetX = e.clientX - container.x;
    const pointerOffsetY = e.clientY - container.y;

    dynamicBoundingBox = {
      pointerStaticClientX: e.clientX,
      pointerStaticClientY: e.clientY,
      referencePointOffsetX: pointerOffsetX,
      referencePointOffsetY: pointerOffsetY,
      pointerDynamicClientX: e.clientX,
      pointerDynamicClientY: e.clientY,
      isResize: true,
    };

    onCrop({
      ...defaultCrop,
      x: pointerOffsetX,
      y: pointerOffsetY,
    });
  };

  const dragCrop = () => {
    const container = getContainerBoundingBox(containerRef.current);
    const { distanceX, distanceY } = calculateDistance(dynamicBoundingBox);

    const updateBoudndingBox = { ...defaultCrop, ...staticBoundingBox };
    const limitX = container.width - updateBoudndingBox.width;
    const limitY = container.height - updateBoudndingBox.height;
    updateBoudndingBox.x = Math.min(
      Math.max(dynamicBoundingBox.referencePointOffsetX + distanceX, 0),
      limitX
    );
    updateBoudndingBox.y = Math.min(
      Math.max(dynamicBoundingBox.referencePointOffsetY + distanceY, 0),
      limitY
    );

    return updateBoudndingBox;
  };

  const handlePointerMove = (e: PointerEvent) => {
    dynamicBoundingBox.pointerDynamicClientX = e.clientX;
    dynamicBoundingBox.pointerDynamicClientY = e.clientY;

    const updateCrop = dragCrop();

    onCrop(updateCrop);
    // if (equal(staticBoundingBox, updateCrop)) [
    // 	onCrop(updateCrop);
    // ]
  };

  const handlePointerUp = () => {
    removeEvents(handlePointerMove, handlePointerUp);
  };

  const handlePointerDownToUpdateCrop = (e: React.PointerEvent) => {
    if (!staticBoundingBox) return;

    addEvents(handlePointerMove, handlePointerUp);

    const { x, y } = staticBoundingBox;
    const handlerPosition = (e.target as HTMLElement).dataset.position;
    const isResize = Boolean(handlerPosition);
    let pointerStaticClientX = e.clientX;
    let pointerStaticClientY = e.clientY;
    let referencePointOffsetX = x;
    let referencePointOffsetY = y;

    dynamicBoundingBox = {
      pointerStaticClientX,
      pointerStaticClientY,
      referencePointOffsetX,
      referencePointOffsetY,
      pointerDynamicClientX: e.clientX,
      pointerDynamicClientY: e.clientY,
      isResize,
      handlerPosition: handlerPosition as HandlerPositionsType,
    };
  };

  return (
    <div className={styles.ReactCrop}>
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className={styles["child-wrapper"]}
      >
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
