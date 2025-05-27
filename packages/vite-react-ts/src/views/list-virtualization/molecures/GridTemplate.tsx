import { ForwardedRef, forwardRef } from "react";

type GridTemplatePropsType = {
  scrolledHeight: number;
  gridGap: number;
  columnCount: number;
  visibleItems: string[];
  itemComponent: (item: any) => React.ReactNode;
};

const GridTemplate = forwardRef(
  (
    {
      scrolledHeight,
      gridGap,
      columnCount,
      visibleItems,
      itemComponent,
    }: GridTemplatePropsType,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    // const width =
    //   ((gridTemplateRef.current?.getBoundingClientRect().width || 0) -
    //     (columnCount - 1) * gridGap) /
    //   columnCount;
    return (
      <div
        ref={ref}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: gridGap,
          transform: `translateY(${scrolledHeight}px)`,
          willChange: "transform",
        }}
      >
        {visibleItems.map((item, index) => {
          return (
            <div
              style={{
                width: `calc(calc(100% - ${
                  (columnCount - 1) * gridGap
                }px) / ${columnCount})`,
              }}
              key={index}
            >
              {itemComponent(item)}
            </div>
          );
        })}
      </div>
    );
  }
);

export default GridTemplate;
