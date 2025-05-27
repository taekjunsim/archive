import { TEXT_DEFAULT_FONT_STYLE } from "../constants";
import { BoardContext } from "../types";

export const drawText = (
  context: BoardContext,
  ctx: CanvasRenderingContext2D
) => {
  ctx.font = TEXT_DEFAULT_FONT_STYLE;

  const updateTexts = context.texts
    .map((text) => {
      const span = document.createElement("span");
      span.contentEditable = "true";
      span.style.font = ctx.font; // 캔버스와 동일한 폰트 스타일 설정
      span.style.visibility = "hidden";
      span.innerText = text.value;
      document.body.appendChild(span);
      const textBoxWidth = span.offsetWidth;
      const textBoxHeight = span.offsetHeight;
      document.body.removeChild(span);

      return { ...text, width: textBoxWidth, height: textBoxHeight };
    })
    .sort((a, b) => a.zIndex - b.zIndex);
  console.log(updateTexts);
  updateTexts.forEach((text) => {
    ctx.strokeStyle = "blue";
    ctx.strokeRect(text.x, text.y, text.width, text.height);

    const fontAttr = ctx.font.split(" ");
    const fontSizeAttrIndex = fontAttr.findIndex((el) => el.includes("px"));
    const fontSize = Number(fontAttr[fontSizeAttrIndex].slice(0, -2));
    const lineBrokenText = text.value.split("\n");

    lineBrokenText.forEach((rowText, index) => {
      ctx.fillText(rowText, text.x, text.y + fontSize + 19 * index);
    });
  });

  context.texts = updateTexts;

  return updateTexts;
};
