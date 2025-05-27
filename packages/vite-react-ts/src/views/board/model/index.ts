import {
  BoardProps,
  BoardTransformStyle,
  ImageInCanvas,
  TextInCanvas,
} from "../types";
import {
  initBoardTransformStyle,
  initImages,
  initLastGroupId,
  initLayerIndex,
  initTexts,
} from "../utils/initialize";
import { calculateMouseSelectionBoxCoordinate } from "../utils/point";
import { handleWheelZoom } from "../utils/wheel";
import { getDynamicCoordinate, getStaticCoordinate } from "./core/coordinate";

export class Board {
  public props: BoardProps;
  public texts: Array<TextInCanvas>;
  public images: Array<ImageInCanvas>;
  public boardTransformStyle: BoardTransformStyle;

  public layerIndex: { max: number; min: number };
  public lastGroupId: number;

  public wrapperComponent: HTMLDivElement | null = null;
  public canvasComponent: HTMLCanvasElement | null = null;
  public textComponent: HTMLSpanElement | null = null;

  public focusItemIdList: Array<string> | null = null;
  public isDragBoundingBox: boolean = false;
  public pressedKeys: { [key: string]: boolean } = {};
  public clipboard: { images: Array<ImageInCanvas>; text: any } | null = null;

  constructor(props: BoardProps) {
    this.props = props;
    this.texts = initTexts(this.props);
    this.images = initImages(this.props);
    this.layerIndex = initLayerIndex(this.props);
    this.lastGroupId = initLastGroupId(this.props);
    this.boardTransformStyle = initBoardTransformStyle(this.props);
  }

  addEvent = (wrapper: HTMLDivElement) => {
    wrapper.addEventListener("wheel", this.onWheel, { passive: false });

    document.addEventListener("pointerdown", this.onPointerDown);
    document.addEventListener("dblclick", this.onDoubleClick);
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  };

  removeEvent = (wrapper: HTMLDivElement) => {
    wrapper.removeEventListener("wheel", this.onWheel);

    document.removeEventListener("pointerdown", this.onPointerDown);
    document.removeEventListener("dblclick", this.onDoubleClick);
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  };

  init = (wrapperComponent: HTMLDivElement) => {
    this.removeEvent(wrapperComponent);
    this.addEvent(wrapperComponent);
    this.wrapperComponent = wrapperComponent;

    const resizeCallback = () => {
      if (this.canvasComponent) {
        this.canvasComponent.width = window.innerWidth;
        this.canvasComponent.height = window.innerHeight;
      }
      this.props.onInit?.(this);
    };

    const observer = new ResizeObserver(resizeCallback);
    observer.observe(this.wrapperComponent);
  };

  cleanup = (wrapperComponent: HTMLDivElement) => {
    this.removeEvent(wrapperComponent);
  };

  onWheel = (event: WheelEvent) => {
    handleWheelZoom(this, event);
  };

  onPointerDown = (event: PointerEvent) => {
    document.addEventListener("pointermove", this.onPointerMove);
    document.addEventListener("pointerup", this.onPointerUp);
    document.addEventListener("pointercancel", this.onPointerUp);

    if (this.wrapperComponent?.style.cursor === "text") {
      this.wrapperComponent.style.cursor = "default";
    }

    const pointerPosition = getStaticCoordinate({
      wrapperComponent: this.wrapperComponent,
      boardTransformStyle: this.boardTransformStyle,
      event,
    });
    this.boardTransformStyle.pointerPosition = pointerPosition;

    this.props.onPointerDown?.(this, event);
  };

  onPointerMove = (event: PointerEvent) => {
    const { wrapperComponent, boardTransformStyle } = this;

    const pointerPosition = getDynamicCoordinate({
      wrapperComponent,
      boardTransformStyle,
      event,
    });

    this.boardTransformStyle.pointerPosition = pointerPosition;

    this.props.onPointerMove?.(this, event);
  };

  onPointerUp = () => {
    document.removeEventListener("pointermove", this.onPointerMove);
    document.removeEventListener("pointerup", this.onPointerUp);
    document.removeEventListener("pointercancel", this.onPointerUp);

    this.isDragBoundingBox = false;
    this.props.onPointerUp?.(this);
  };

  // onClick = (event: MouseEvent) => {
  //   event.preventDefault();

  //   const mouseX = event.clientX;
  //   const mouseY = event.clientY;

  //   if (this.pressedKeys.z) {
  //     if (this.pressedKeys.alt) {
  //       // zoomout - click한 pointer의 좌표를 기준으로 scale
  //     } else {
  //       // zoomin - click한 pointer의 좌표를 기준으로 scale
  //     }
  //   }
  // };

  onDoubleClick = (event: MouseEvent) => {
    this.props.onDoubleClick?.(this, event);
  };

  onKeyDown = (event: KeyboardEvent) => {
    this.pressedKeys[event.key.toLocaleLowerCase()] = true;
    this.props.onKeyDown?.(this, event);
  };

  onKeyUp = (event: KeyboardEvent) => {
    if (this.pressedKeys["escape"]) {
      this.pressedKeys = {};
    }

    if (this.pressedKeys["h"]) {
      // h는 escape 또는 다른 단축키를 누르지 않는 이상 고정
      return;
    }

    this.props.onKeyUp?.(this, event);
    this.pressedKeys[event.key.toLocaleLowerCase()] = false;
  };

  setCanvasComponent = (canvas: HTMLCanvasElement) => {
    this.canvasComponent = canvas;
  };

  setUpdateImages = (images: Array<ImageInCanvas>) => {
    this.images = images;
  };

  addImageItems = (images: Array<{ id: string; url: string }>) => {
    const addedImages = images.map(({ id, url }) => {
      return {
        id,
        el: null,
        name: "unknown",
        src: url,
        x: window.innerWidth / 2 - 100,
        y: window.innerHeight / 2 - 100,
        width: 200,
        height: 200,
        zIndex: this.layerIndex.max + 1,
        groupId: 0,
        groupHistory: [],
      };
    });

    const removeDuplicate = new Set([...this.images, ...addedImages]);
    this.images = [...removeDuplicate];
    this.updateLayerIndex();
  };

  addTextItems = () => {
    if (!this.textComponent) return;
    const { adjustedDownX, adjustedDownY, adjustedMoveX, adjustedMoveY } =
      this.boardTransformStyle.pointerPosition;
    const boundingBoxPosition = calculateMouseSelectionBoxCoordinate(
      adjustedDownX,
      adjustedDownY,
      adjustedMoveX,
      adjustedMoveY
    );

    this.textComponent.style.top = `${boundingBoxPosition.y}px`;
    this.textComponent.style.left = `${boundingBoxPosition.x}px`;
    this.textComponent.style.maxHeight = `calc(100vh - ${boundingBoxPosition.y}px)`;

    const addedTextItem = {
      id: Math.random().toString(),
      value: "",
      x: boundingBoxPosition.x,
      y: boundingBoxPosition.y,
      width: 0,
      height: 0,
      zIndex: this.layerIndex.max + 1,
      groupId: 0,
      groupHistory: [],
    };
    this.texts = [...this.texts, addedTextItem];
    console.log(this.texts);
    this.updateLayerIndex();
  };

  updateItemsLayer = (imgIds: Array<string>, direction: "front" | "back") => {
    imgIds.forEach((imgId) => {
      const imgIndex = this.images.findIndex(({ id }) => imgId === id);
      this.images[imgIndex].zIndex =
        direction === "front"
          ? this.layerIndex.max + 1
          : this.layerIndex.min - 1;
    });

    this.updateLayerIndex();
  };

  updateLayerIndex = () => {
    const { images, texts } = this;
    const zIndexArray = [...images, ...texts].map(({ zIndex }) => {
      return zIndex;
    });

    this.layerIndex = {
      max: Math.max(...zIndexArray),
      min: Math.min(...zIndexArray),
    };
  };

  updateFocusItemList = (props?: { idList?: string[]; isStack?: boolean }) => {
    const { focusItemIdList } = this;
    if (!props?.idList) return (this.focusItemIdList = null);

    if (focusItemIdList === null) {
      return (this.focusItemIdList = props.idList);
    }

    if (props?.isStack !== undefined) {
      return (this.focusItemIdList = props.isStack
        ? [...new Set([...focusItemIdList, ...props.idList])]
        : props.idList);
    }

    return (this.focusItemIdList = [
      ...new Set([...focusItemIdList, ...props.idList]),
    ]);
  };
}
