import { TEXT_DEFAULT_FONT_STYLE } from "../constants";

export const createTextElement = (props?: {
  onBlur: () => void;
  onInput: (el: HTMLSpanElement) => void;
  options?: {
    styleClass: string;
    initEmpty?: string;
    top?: number;
    left?: number;
    innerText?: string;
  };
}) => {
  const spanEl = document.createElement("span");
  spanEl.contentEditable = "true";
  spanEl.dataset.ph = "Add Text";
  spanEl.style.position = "absolute";
  spanEl.style.overflow = "hidden";
  spanEl.style.outline = "none";
  spanEl.style.color = "transparent";
  spanEl.style.font = TEXT_DEFAULT_FONT_STYLE;
  spanEl.style.caretColor = "black";
  spanEl.style.cursor = "text";
  if (props?.options) {
    spanEl.dataset.empty = props.options.initEmpty || "false";
    spanEl.className = props.options.styleClass;
    spanEl.style.top = `${props.options.top}px`;
    spanEl.style.left = `${props.options.left}px`;
    spanEl.innerText = props.options.innerText
      ? `${props.options.innerText}`
      : "";
  }
  spanEl.addEventListener("pointerdown", (e) => e.stopPropagation());
  spanEl.addEventListener("blur", () => props?.onBlur());
  props?.onInput &&
    spanEl.addEventListener("input", () => {
      spanEl.dataset.empty = `${!spanEl.innerText.replaceAll("\n", "")}`;
      props.onInput(spanEl);
    });

  return spanEl;
};

export const appendTextElement = (
  wrapperComponent: HTMLDivElement,
  textComponent: HTMLSpanElement
) => {
  wrapperComponent.appendChild(textComponent);

  if (textComponent.innerText.replaceAll("\n", "")) {
    const range = document.createRange();
    const selection = window.getSelection();
    // desc: 선택할 범위를 설정
    range.selectNodeContents(textComponent);
    // desc: 현재 선택 영역을 범위로 설정
    selection?.removeAllRanges();
    selection?.addRange(range);

    return;
  }

  textComponent.focus();
};
