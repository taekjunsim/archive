// input을 입력 후 enter를 클릭하면 뒤에 다른 글자가 생기고 뒤의 input에 focus가 가는 기능
// e.g. the type is sneakers. the upper type is [input]

import { useEffect, useRef, useState } from "react";

// 뒤의 input에서 뒤로가기 누르면 앞의 input으로 focus 이동하는 기능 구현하기

// focus 이동은 change가 아니라 click이나 enter로 이루어져야겠네.
// focus는 한 군데서 핸들링해야 중첩되지 않겠네

const typeList = ["sneakers"];
const upperTypeList = ["leather"];
const colorList = ["black"];
const soleTypeList = [];

export default function InputFocus() {
  const typeInputRef = useRef<HTMLInputElement>(null);
  const upperTypeInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const soleTypeInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<{
    type?: string;
    upperType?: string;
    color?: string;
    soleType?: string;
  }>({});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setInputValue((prev) => {
      return {
        ...prev,
        [id]: value || undefined,
      };
    });
  };

  const handleFocus = () => {
    if (colorList.includes(inputValue["color"]!)) {
      soleTypeInputRef.current?.focus();
      return;
    }
    if (upperTypeList.includes(inputValue["upperType"]!)) {
      colorInputRef.current?.focus();
      return;
    }
    if (typeList.includes(inputValue["type"]!)) {
      upperTypeInputRef.current?.focus();
      return;
    }
  };

  // 뒤로 가기를 했을 때 focus만 넘어가고 글자가 지워지진 않았으면 좋겠는데.
  const handleKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      if (!e.currentTarget.value) {
        e.preventDefault();
        const { id } = e.currentTarget;

        switch (id) {
          case "upperType":
            return typeInputRef.current?.focus();
          case "color":
            return upperTypeInputRef.current?.focus();
          case "soleType":
            return colorInputRef.current?.focus();
        }
      }
    }

    if (e.key === "Enter") {
      handleFocus();
    }
  };

  const handleClick = () => [];

  return (
    <div>
      The type is{" "}
      <input
        ref={typeInputRef}
        id="type"
        value={inputValue["type"]! || ""}
        onChange={handleInput}
        onKeyDown={handleKeyboard}
      />
      .{" "}
      {typeList.includes(inputValue["type"]!) && (
        <>
          The upper type is made of{" "}
          <input
            ref={upperTypeInputRef}
            id="upperType"
            value={inputValue["upperType"]! || ""}
            onChange={handleInput}
            onKeyDown={handleKeyboard}
          />{" "}
          and its color is{" "}
          <input
            ref={colorInputRef}
            id="color"
            value={inputValue["color"]! || ""}
            onChange={handleInput}
            onKeyDown={handleKeyboard}
          />
          .{" "}
          {colorList.includes(inputValue["color"]!) && (
            <>
              The sole type is{" "}
              <input
                ref={soleTypeInputRef}
                id="soleType"
                onChange={handleInput}
                onKeyDown={handleKeyboard}
              />
              .
            </>
          )}
        </>
      )}
    </div>
  );
}

// 앞에 내용을 지우면 뒤의 내용은 삭제되어야 하는가? 유지되어야 하는가?
