/** @jsxImportSource @emotion/react */
import React, { Children, cloneElement, useRef } from "react";
import {
  CropType,
  DynamicBoundingBoxType,
  HandlerPositionsType,
} from "./types";
import {
  defaultCrop,
  xHandlersPosition,
  yHandlersPosition,
  xyHandlersPosition,
} from "./constants";
import {
  addEvents,
  calculateDistance,
  getContainerBoundingBox,
  removeEvents,
  restrictXYCoordinate,
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

  const resizeCrop = () => {
    const { distanceX: xDistance, distanceY: yDistance } =
      calculateDistance(dynamicBoundingBox);

    const updateBoudndingBox = { ...defaultCrop };

    // toEast
    if (xDistance > 0) {
      // toSouth
      if (yDistance > 0) {
        updateBoudndingBox.x = dynamicBoundingBox.referencePointOffsetX;
        updateBoudndingBox.y = dynamicBoundingBox.referencePointOffsetY;
        updateBoudndingBox.width = xDistance;
        updateBoudndingBox.height = yDistance;
      }
      // toNorth
      if (yDistance < 0) {
        updateBoudndingBox.x = dynamicBoundingBox.referencePointOffsetX;
        updateBoudndingBox.y =
          dynamicBoundingBox.referencePointOffsetY + yDistance;
        updateBoudndingBox.width = xDistance;
        updateBoudndingBox.height = Math.abs(yDistance);
      }
    }

    // toWest
    if (xDistance < 0) {
      // toSouth
      if (yDistance > 0) {
        updateBoudndingBox.x =
          dynamicBoundingBox.referencePointOffsetX + xDistance;
        updateBoudndingBox.y = dynamicBoundingBox.referencePointOffsetY;
        updateBoudndingBox.width = Math.abs(xDistance);
        updateBoudndingBox.height = yDistance;
      }
      // toNorth
      if (yDistance < 0) {
        updateBoudndingBox.x =
          dynamicBoundingBox.referencePointOffsetX + xDistance;
        updateBoudndingBox.y =
          dynamicBoundingBox.referencePointOffsetY + yDistance;
        updateBoudndingBox.width = Math.abs(xDistance);
        updateBoudndingBox.height = Math.abs(yDistance);
      }
    }

    const restrictBoundingBox = restrictXYCoordinate({
      boundingBox: updateBoudndingBox,
      el: containerRef.current,
    });

    const direction = dynamicBoundingBox.handlerPosition || "";
    let nextCrop = { ...defaultCrop, ...staticBoundingBox };

    if (!direction || xyHandlersPosition.includes(direction)) {
      nextCrop = restrictBoundingBox;
    }
    if (xHandlersPosition.includes(direction)) {
      nextCrop.x = restrictBoundingBox.x;
      nextCrop.width = restrictBoundingBox.width;
    }
    if (yHandlersPosition.includes(direction)) {
      nextCrop.y = restrictBoundingBox.y;
      nextCrop.height = restrictBoundingBox.height;
    }

    return nextCrop;
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

    const updateCrop = dynamicBoundingBox.isResize ? resizeCrop() : dragCrop();

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

    if (!staticBoundingBox) return;

    addEvents(handlePointerMove, handlePointerUp);

    const { x, y, width, height } = staticBoundingBox;
    const handlerPosition = (e.target as HTMLElement).dataset.position;
    const isResize = Boolean(handlerPosition);
    let pointerStaticClientX = e.clientX;
    let pointerStaticClientY = e.clientY;
    let referencePointOffsetX = x;
    let referencePointOffsetY = y;

    if (isResize) {
      const pointerOffsetX = e.clientX - container.x;
      const pointerOffsetY = e.clientY - container.y;
      let xDiffBetweenPointerAndHandler = 0;
      let yDiffBetweenPointerAndHandler = 0;

      if (handlerPosition === "ne" || handlerPosition == "e") {
        xDiffBetweenPointerAndHandler = pointerOffsetX - (x + width);
        yDiffBetweenPointerAndHandler = pointerOffsetY - y;
        referencePointOffsetX = x;
        referencePointOffsetY = y + height;
      } else if (handlerPosition === "se" || handlerPosition === "s") {
        xDiffBetweenPointerAndHandler = pointerOffsetX - (x + width);
        yDiffBetweenPointerAndHandler = pointerOffsetY - (y + height);
        referencePointOffsetX = x;
        referencePointOffsetY = y;
      } else if (handlerPosition === "sw" || handlerPosition == "w") {
        xDiffBetweenPointerAndHandler = pointerOffsetX - x;
        yDiffBetweenPointerAndHandler = pointerOffsetY - (y + height);
        referencePointOffsetX = x + width;
        referencePointOffsetY = y;
      } else if (handlerPosition === "nw" || handlerPosition == "n") {
        xDiffBetweenPointerAndHandler = pointerOffsetX - x;
        yDiffBetweenPointerAndHandler = pointerOffsetY - y;
        referencePointOffsetX = x + width;
        referencePointOffsetY = y + height;
      }

      pointerStaticClientX =
        referencePointOffsetX + container.x + xDiffBetweenPointerAndHandler;
      pointerStaticClientY =
        referencePointOffsetY + container.y + yDiffBetweenPointerAndHandler;
    }

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
