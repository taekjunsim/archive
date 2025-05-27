/** @jsxImportSource @emotion/react */
// input을 입력 후 enter를 클릭하면 뒤에 다른 글자가 생기고 뒤의 input에 focus가 가는 기능
// e.g. the type is sneakers. the upper type is [input]

import { useRef, useState } from "react";

// 뒤의 input에서 뒤로가기 누르면 앞의 input으로 focus 이동하는 기능 구현하기

// Previous needs
//  1. focus 이동은 change가 아니라 click이나 enter로 이루어져야겠네.
//  2. focus는 한 군데서 핸들링해야 중첩되지 않겠네
//  3. 뒤로 가기를 했을 때 focus만 넘어가고 글자가 지워지진 않았으면 좋겠는데.
//  4. soleType까지 모두 입력되었을 때 렌더링되며 focus이동
const typeList = ["sneakers"];
const upperTypeList = ["leather"];
const colorList = ["black"];
const soleTypeList = ["sharksole"];

export default function InputFocus() {
  const typeInputRef = useRef<HTMLInputElement>(null);
  const upperTypeInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);
  const soleTypeInputRef = useRef<HTMLInputElement>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
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

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAdditionalInfo(e.target.value);
  };

  const isType = typeList.includes(
    inputValue["type"]!?.toLowerCase().replace(" ", "")
  );
  const isUpperType = upperTypeList.includes(
    inputValue["upperType"]!?.toLowerCase().replace(" ", "")
  );
  const isColor = colorList.includes(
    inputValue["color"]!?.toLowerCase().replace(" ", "")
  );
  const isSoleType = soleTypeList.includes(
    inputValue["soleType"]!?.toLowerCase().replace(" ", "")
  );

  const handleFocusToNextInput = () => {
    if (isColor) {
      soleTypeInputRef.current?.focus();
      return;
    }
    if (isUpperType) {
      colorInputRef.current?.focus();
      return;
    }
    if (isType) {
      upperTypeInputRef.current?.focus();
      return;
    }
  };

  // enter와 click이 옵션 확정의 느낌
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
      handleFocusToNextInput();
    }
  };

  const handleClick = () => [];

  return (
    <div
      css={{
        padding: "20px",
        border: "1px solid black",
      }}
    >
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
        {isType && (
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
            {isColor && (
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

      {isSoleType && (
        <textarea
          css={{
            width: "100%",
            marginTop: "20px",
            border: "none",
            resize: "none",
            outline: "none",
          }}
          value={additionalInfo}
          onChange={handleTextarea}
        />
      )}
    </div>
  );
}

/**
 * TODO
 *  1. 슬기님이나 선희님께 물어보기 (앞에 내용을 지우면 뒤의 내용은 삭제되어야 하는가? 유지되어야 하는가?)
 *  2. 물어보기 (추가 입력이 활성화되는 시점은 sole type을 모두 입력했을 때? 아니면 추가 인터렉션이 있나?)
 *  3. 썸네일 호버 시 표출되는 데이터가 제각각인데 이걸 어떻게 컴포넌트화 시킬까?
 *  4. 띄어쓰기 및 대소문자 구분 여부 확인하기
 */
