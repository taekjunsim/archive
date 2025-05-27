/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Crop from "./Crop";

const defaultCrop = { x: 324, y: 441, width: 561, height: 140 };
// const defaultCrop = {
//   x: 0,
//   y: 0,
//   width: 0,
//   height: 0,
// };

type CropDemoTypes = {
  cropProps?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export default function CropDemo({ cropProps = defaultCrop }: CropDemoTypes) {
  const [imgPath, setImgPath] = useState("");
  const [crop, setCrop] = useState(cropProps);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.addEventListener("load", ({ target }) => {
        // target?.result === reader.result
        setImgPath(target?.result?.toString() || "");
      });
    }
  };

  const minHeight = cropProps.height / 2;
  const maxHeight = cropProps.height * 2;

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFile} />
      <button onClick={() => setCrop(defaultCrop)}>reset</button>
      {imgPath && (
        <Crop
          crop={crop}
          onCrop={(cropImg) => setCrop(cropImg)}
          minHeight={minHeight}
          maxHeight={maxHeight}
        >
          <img src={imgPath} />
        </Crop>
      )}
    </div>
  );
}
