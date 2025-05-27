import { useState, useEffect, useRef } from "react";

type UseVirtualizedPropsType = {
  items: any[];
};

function itemsPerRow(viewportWidth: number, itemWidth: number) {
  if (!itemWidth) return 0;
  return Math.max(1, Math.floor(viewportWidth / Math.floor(itemWidth)));
}

function useVirtualized(items: any[]) {
  const headerRef = useRef<HTMLDivElement | null>(null); // TODO: delete
  const gridTemplateRef = useRef<HTMLDivElement | null>(null);
  const customViewportRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [itemDimension, setItemDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: 1000,
    height: 1000,
  });
  const [viewportHeight, setViewportHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0); // TODO: delete

  const itemWidth = itemDimension.width;
  const itemHeight = itemDimension.height;

  useEffect(() => {
    const handleScroll = () => {
      if (customViewportRef.current) {
        setScrollTop(customViewportRef.current.scrollTop);
      }
    };

    const handleViewPortHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    if (!viewportHeight) {
      handleViewPortHeight();
    }

    if (customViewportRef.current) {
      customViewportRef.current.addEventListener("scroll", handleScroll);
    }

    const ro = new ResizeObserver((entry: any) => {
      const childDimension = entry[0].target.firstChild.getBoundingClientRect();

      setItemDimension(childDimension);
    });

    if (gridTemplateRef.current) {
      ro.observe(gridTemplateRef.current);
    }

    if (headerRef.current) {
      setHeaderHeight(headerRef.current?.getBoundingClientRect().height);
    }

    window.addEventListener("resize", handleViewPortHeight);

    return () => {
      customViewportRef.current?.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleViewPortHeight);
    };
  }, []);

  const perRow = itemsPerRow(
    gridTemplateRef.current?.getBoundingClientRect().width || 0,
    itemWidth
  );

  const startIndex = itemHeight ? Math.floor(scrollTop / itemHeight) : 0;
  const endIndex = itemHeight
    ? Math.min(
        items.length - 1,
        Math.ceil((scrollTop + viewportHeight) / itemHeight)
      )
    : 0;

  const visibleItems = items.slice(startIndex * perRow, endIndex * perRow);

  const rowCount = perRow ? Math.ceil(items.length / perRow) : 0;

  const totalScrollHeight = rowCount * itemHeight;

  const scrolledHeight = itemHeight
    ? startIndex * itemHeight + headerHeight
    : 0;

  return {
    customViewportRef,
    gridTemplateRef,
    headerRef,
    headerHeight,
    viewportHeight,
    totalScrollHeight,
    scrolledHeight,
    visibleItems,
  };
}

export default useVirtualized;
