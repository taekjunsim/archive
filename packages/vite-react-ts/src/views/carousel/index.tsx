/** @jsxImportSource @emotion/react */
import image1 from "@/shared/assets/images/1.png";
import image2 from "@/shared/assets/images/2.png";
import image3 from "@/shared/assets/images/3.png";
import image4 from "@/shared/assets/images/4.png";
import image5 from "@/shared/assets/images/5.png";
import image6 from "@/shared/assets/images/6.png";
import image7 from "@/shared/assets/images/7.png";
import image8 from "@/shared/assets/images/8.png";
import image9 from "@/shared/assets/images/9.png";
import image10 from "@/shared/assets/images/10.png";
import image11 from "@/shared/assets/images/11.png";
import image12 from "@/shared/assets/images/12.png";
import image13 from "@/shared/assets/images/13.png";
import image14 from "@/shared/assets/images/14.png";
import image15 from "@/shared/assets/images/15.png";
import image16 from "@/shared/assets/images/16.png";
import image17 from "@/shared/assets/images/17.png";
import image18 from "@/shared/assets/images/18.png";
import image19 from "@/shared/assets/images/19.png";
import { useState } from "react";

const props = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
];

// TODO: progress indicator 구현하기
export default function Slide() {
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(4);
  const [array, setArray] = useState(props);
  const slideCount = 5;
  const list = array.slice(startIndex, lastIndex + 1);

  const handleNext = () => {
    if (props.length - startIndex <= slideCount) {
      setArray((prev) => {
        return [...prev, props[slideCount - (props.length - startIndex)]];
      });
    }

    if (startIndex === props.length - 1) {
      setArray(props);
      setStartIndex(0);
      setLastIndex(4);
      return;
    }

    setStartIndex((prev) => prev + 1);
    setLastIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (lastIndex <= 4 && props.length + slideCount > array.length) {
      setArray((prev) => {
        return [
          props[props.length - 1 - (array.length - props.length)],
          ...prev,
        ];
      });

      return;
    }

    if (props.length + slideCount === array.length) {
      setArray(props);
      setStartIndex(14);
      setLastIndex(18);
      return;
    }

    setStartIndex((prev) => prev - 1);
    setLastIndex((prev) => prev - 1);
  };

  return (
    <div>
      <div>
        <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button>
      </div>
      <div
        css={{
          width: "2154px",
          translate: "-114px",

          "img:not(:last-of-type)": {
            marginRight: "16px",
          },

          "img:nth-of-type(odd)": {
            paddingTop: "80px",
          },

          "img:nth-of-type(even)": {
            translate: "0px -80px",
          },
        }}
      >
        {list.map((el) => {
          return <img key={el} src={el} width={418} height={516} />;
        })}
      </div>
    </div>
  );
}
