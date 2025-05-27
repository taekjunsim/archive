import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Board } from "../model";
import testImg0 from "./test.jpg";
import testImg1 from "./test1.jpg";
import testImg2 from "./test2.jpg";
import testImg3 from "./test3.jpg";
import testImg4 from "./test4.jpg";
import testImg5 from "./test5.jpg";
import { BoardContext, BoardProps, ContextMenuCoordinate } from "../types";
import { checkPressed, restrictContextMenu } from "../utils";
import { drawImages } from "../model/canvas";

import "./font.scss";
import { HistoryStack } from "@/views/history-stack";
import { handleKeyDown } from "../utils/keyboard";
import { handlePointerDown, handlePointerMove } from "../model/point";
import {
  calculateGroupCoordinate,
  checkPointerInsideTargetCoordinate,
} from "../utils/point";

import styles from "./index.module.scss";
import { appendTextElement, createTextElement } from "../utils/text";
import { eventTriggerMouseButtons } from "../constants";

export const Context = createContext<Board>(null as any);

const ZoomBoard = (props: BoardProps) => {
  const instance = useRef(new Board(props)).current;
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapperComponent = wrapperRef.current;
    if (wrapperComponent !== null) {
      instance.init(wrapperComponent);
    }
    return () => {
      if (wrapperComponent !== null) {
        instance.cleanup(wrapperComponent);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.images]);

  return (
    <Context.Provider value={instance}>
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          overflow: "hidden",
          width: "100vw",
          height: "100vh",
        }}
        tabIndex={0}
      >
        <ZoomBoardContent>{props.children}</ZoomBoardContent>
      </div>
    </Context.Provider>
  );
};

const ZoomBoardContent = (props: BoardProps) => {
  const { children } = props;
  const boardContext = useContext(Context);
  return (
    <>{typeof children === "function" ? children(boardContext) : children}</>
  );
};

const Canvas = (props: {
  drawImages: (boardContext: BoardContext) => void;
}) => {
  const { drawImages } = props;
  const boardContext = useContext(Context);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    boardContext.setCanvasComponent(canvasRef.current);
    drawImages(boardContext);
  }, [drawImages, boardContext]);

  return <canvas ref={canvasRef} width="100%" height="100%" />;
};

const ContextMenu = ({
  contextMenuCoordinate,
  resetContextMenuCoordinate,
}: {
  contextMenuCoordinate: ContextMenuCoordinate;
  resetContextMenuCoordinate: () => void;
}) => {
  const boardContext = useContext(Context);
  const { focusItemIdList, clipboard } = boardContext;
  if (focusItemIdList || !contextMenuCoordinate) return null;

  return (
    <div
      className={styles["context-menu"]}
      style={{
        top: contextMenuCoordinate?.y,
        left: contextMenuCoordinate?.x,
        display: "flex",
        justifyContent: "space-between",
        width: "160px",
        height: "32px",
        padding: "8px 16px",
        border: "1px solid gray",
        cursor: "pointer",
        fontSize: "12px",
        color: clipboard ? "black" : "gray", // disabled
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div>Paste</div>
      <div>Ctrl+V</div>
    </div>
  );
};

function FloatingToolbar(props: {
  boardContext: BoardContext;
  floatingToolbarId: string | null;
}) {
  const { boardContext, floatingToolbarId } = props;

  if (!floatingToolbarId) return null;

  const test = boardContext.images[Number(floatingToolbarId)];

  return (
    <div
      style={{
        position: "absolute",
        top: `${test.y + test.height + 8}px`,
        left: `${test.x + test.width / 2 - 100}px`,
        width: "200px",
        height: "50px",
        border: "1px solid black",
        zIndex: "3",
      }}
      onPointerDown={(e) => {
        e.stopPropagation();

        console.log("check");
      }}
    >
      control box
    </div>
  );
}

// 선언된 메소드들은 feature에서 선언
export default function GenerationBoard({
  images: imageList = MOCK.images,
}: Pick<BoardProps, "images">) {
  const [contextMenuCoordinate, setContextMenuCoordinate] =
    useState<ContextMenuCoordinate>(null);
  const [floatingToolbarId, setFloatingToolbar] = useState<string | null>(null);

  const snapshotStack = useRef(new HistoryStack<BoardContext>()).current;
  const handleChange = (
    boardContext: BoardContext,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;
    const urls = [...e.target.files].map((file) => {
      const url = URL.createObjectURL(file); // TODO: update, s3 url
      return { id: Math.random().toString(), url };
    });

    // [{id: 'uuid', url: 'url' }, {id: 'uuid', url: 'url' }]
    boardContext.addImageItems(urls);
    drawImages(boardContext);

    e.target.value = "";
  };

  const handleAddTextItem = (boardContext: BoardContext) => {
    if (!boardContext.wrapperComponent) {
      throw Error("not rendered wrapper component");
    }
    boardContext.wrapperComponent.style.cursor = "text";

    const spanEl = createTextElement({
      onInput: (el) => {
        boardContext.texts[0].value = el.innerText;
        drawImages(boardContext);
      },
      onBlur: () => {
        boardContext.wrapperComponent?.removeChild(boardContext.textComponent!);
        boardContext.textComponent = null;
      },
      options: {
        initEmpty: "true",
        styleClass: styles["test"],
      },
    });
    boardContext.textComponent = spanEl;
  };

  const resetContextMenuCoordinate = () => {
    setContextMenuCoordinate(null);
  };

  const onPointerDown = (boardContext: BoardContext, event: PointerEvent) => {
    // setFloatingToolbar(null);
    resetContextMenuCoordinate();
    handlePointerDown(boardContext);

    if (event.button === eventTriggerMouseButtons.left) {
      boardContext.focusItemIdList &&
        setFloatingToolbar(boardContext.focusItemIdList?.[0] ?? null);
    }

    if (event.button === eventTriggerMouseButtons.right) {
      document.addEventListener("contextmenu", restrictContextMenu);
      if (!boardContext.focusItemIdList) {
        setContextMenuCoordinate({ x: event.clientX, y: event.clientY });
      }
    }

    if (boardContext.textComponent) {
      boardContext.addTextItems();
    }

    snapshotStack.set(boardContext);

    drawImages(boardContext);
  };

  const onPointerMove = (boardContext: BoardContext, event: PointerEvent) => {
    handlePointerMove(boardContext, event);
    drawImages(boardContext);
  };

  const onPointerUp = (boardContext: BoardContext) => {
    const { wrapperComponent, textComponent } = boardContext;
    snapshotStack.set(boardContext);
    document.removeEventListener("contextmenu", restrictContextMenu);

    if (wrapperComponent && textComponent) {
      appendTextElement(wrapperComponent, textComponent);
    }

    drawImages(boardContext);
  };

  const onKeyUp = (boardContext: BoardContext) => {
    const isPressed = checkPressed(boardContext.pressedKeys);
    if (isPressed("ctrl") && isPressed("g")) {
      snapshotStack.set(boardContext);
    }
  };

  const onKeyDown = (boardContext: BoardContext, event: KeyboardEvent) => {
    handleKeyDown(boardContext, event, snapshotStack);
    drawImages(boardContext);
  };

  const onDoubleClick = (boardContext: BoardContext) => {
    // updateText
    const { texts, focusItemIdList, boardTransformStyle } = boardContext;
    const { adjustedDownX, adjustedDownY } =
      boardTransformStyle.pointerPosition;

    const textBoxInGroup = texts.filter(({ id }) =>
      focusItemIdList?.includes(id)
    );
    const isInsideGroupArea = checkPointerInsideTargetCoordinate(
      adjustedDownX,
      adjustedDownY,
      calculateGroupCoordinate(textBoxInGroup)
    );

    if (!isInsideGroupArea) return;
    const textBoxIndex = texts.findIndex(({ id }) =>
      focusItemIdList?.includes(id)
    );

    const spanEl = createTextElement({
      onInput: (el) => {
        boardContext.texts[textBoxIndex].value = el.innerText;
        drawImages(boardContext);
      },
      onBlur: () => {
        boardContext.wrapperComponent?.removeChild(boardContext.textComponent!);
        boardContext.textComponent = null;
      },
      options: {
        styleClass: styles["test"],
        top: boardContext.texts[textBoxIndex].y,
        left: boardContext.texts[textBoxIndex].x,
        innerText: boardContext.texts[textBoxIndex].value,
      },
    });
    boardContext.textComponent = spanEl;
    if (boardContext.wrapperComponent && boardContext.textComponent) {
      appendTextElement(
        boardContext.wrapperComponent,
        boardContext.textComponent
      );
    }
  };

  // 버튼을 클릭했을 때 특정 좌표를 중심으로 화면을 이동하려면 diffX와 diffY를 수정해야한다.
  return (
    <ZoomBoard
      images={imageList}
      onInit={drawImages}
      onWheel={drawImages}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={onDoubleClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {(boardContext) => (
        <>
          <input
            style={{ position: "absolute", zIndex: "1" }}
            type="file"
            multiple
            onChange={(e) => handleChange(boardContext, e)}
            onPointerDown={(e) => e.stopPropagation()}
          />
          <Canvas drawImages={drawImages} />
          {/* <div
            style={{
              position: "absolute",
              top: "0",
              right: "100px",
              zIndex: "99999",
              border: "1px solid black",
              width: "100px",
            }}
            onPointerDown={(e) => e.stopPropagation()}
            contentEditable={true}
          ></div> */}
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "100px",
              zIndex: "999999",
            }}
            onClick={() => handleAddTextItem(boardContext)}
          >
            text
          </button>
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "999999",
            }}
          >
            {/* jump to 할 이미지를 저장하고 좌표를 계산해서 쓰든 좌표를 저장하고 쓰든지 해야겠네 */}
            relocate
          </button>
          {/* <FloatingToolbar
            boardContext={boardContext}
            floatingToolbarId={floatingToolbarId}
          /> */}
          <ContextMenu
            contextMenuCoordinate={contextMenuCoordinate}
            resetContextMenuCoordinate={resetContextMenuCoordinate}
          />
        </>
      )}
    </ZoomBoard>
  );
}

const MOCK = {
  images: [
    {
      id: "0",
      el: null,
      name: "unknown",
      src: testImg0,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      zIndex: 1,
      groupId: 0,
      groupHistory: [],
    },
    {
      id: "1",
      el: null,
      name: "unknown",
      src: testImg1,
      x: 50,
      y: 200,
      width: 100,
      height: 100,
      zIndex: 2,
      groupId: 0,
      groupHistory: [],
    },
    {
      id: "2",
      el: null,
      name: "unknown",
      src: testImg2,
      x: 200,
      y: 400,
      width: 100,
      height: 100,
      zIndex: 3,
      groupId: 0,
      groupHistory: [],
    },
    {
      id: "3",
      el: null,
      name: "unknown",
      src: testImg3,
      x: 400,
      y: 400,
      width: 200,
      height: 200,
      zIndex: 4,
      groupId: 0,
      groupHistory: [],
    },
    {
      id: "4",
      el: null,
      name: "unknown",
      src: testImg4,
      x: 200,
      y: 150,
      width: 150,
      height: 150,
      zIndex: 5,
      groupId: 0,
      groupHistory: [],
    },
    {
      id: "5",
      el: null,
      name: "unknown",
      src: testImg5,
      x: 400,
      y: 100,
      width: 120,
      height: 120,
      zIndex: 6,
      groupId: 0,
      groupHistory: [],
    },
  ],
};

// const ContextMenu = ({
//   snapshotStack,
//   contextMenuCoordinate,
//   resetContextMenuCoordinate,
// }: {
//   snapshotStack: HistoryStack<Board>;
//   contextMenuCoordinate: ContextMenuCoordinate;
//   resetContextMenuCoordinate: () => void;
// }) => {
//   const boardContext = useContext(Context);
//   const { layerIndex, focusItemIdList, updateItemsLayer } = boardContext;
//   if (focusItemIdList === null) return null;
//   if (!contextMenuCoordinate) return null;

//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: contextMenuCoordinate?.y,
//         left: contextMenuCoordinate?.x,
//         display: "flex",
//         flexDirection: "column",
//         gap: "20px",
//         // width: "100px",
//         // height: "100px",
//         border: "1px solid red",
//         color: "blue",
//         cursor: "pointer",
//       }}
//       onPointerDown={(e) => {
//         e.stopPropagation();
//       }}
//       onContextMenu={(e) => e.preventDefault()}
//     >
//       <div
//         onPointerDown={(e) => {
//           e.stopPropagation();
//           updateItemsLayer(focusItemIdList, "front");
//           drawImages(boardContext);
//           resetContextMenuCoordinate();
//         }}
//       >
//         Bring to Front
//       </div>
//       <div
//         onPointerDown={(e) => {
//           e.stopPropagation();
//           updateItemsLayer(focusItemIdList, "back");
//           drawImages(boardContext);
//           resetContextMenuCoordinate();
//         }}
//       >
//         Send To Back
//       </div>
//       <div
//         onPointerDown={(e) => {
//           e.stopPropagation();
//           const index = boardContext.images.findIndex(
//             ({ id }) => id === boardContext.focusItemIdList?.[0]
//           );
//           const imgUrl = boardContext.images[index].src;
//           const aEl = document.createElement("a");
//           aEl.href = imgUrl;
//           aEl.download = "unknown";
//           aEl.target = "_blank";
//           aEl.click();
//         }}
//       >
//         download
//       </div>
//       <div
//         onPointerDown={(e) => {
//           e.stopPropagation();
//           const index = boardContext.images.findIndex(
//             ({ id }) => id === boardContext.focusItemIdList?.[0]
//           );
//           const images = [...boardContext.images];
//           images.splice(index, 1);
//           boardContext.images = images;
//           snapshotStack.set(boardContext);
//           drawImages(boardContext);
//           resetContextMenuCoordinate();
//         }}
//       >
//         delete
//       </div>
//     </div>
//   );
// };
