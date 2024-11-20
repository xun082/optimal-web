'use client';

import { FC, Fragment, useRef, UIEvent, useState, useMemo, CSSProperties, useEffect } from 'react';

import { CardItemProps } from './components/card';
import Card from './components/card';

interface VirtualwaterfallProps {
  source: CardItemProps[];
  gap: number;
  column: number;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
}

//竖队列
interface ColumnQueue {
  height: number;
  list: RenderItem[];
}

export interface RenderItem {
  item: CardItemProps; //数据源
  y: number; //卡片距离列表顶部的距离
  h: number; //卡片自身高度
  style: CSSProperties; //用于渲染视图上的样式(宽、高、偏移量)
}

const Virtualwaterfall: FC<VirtualwaterfallProps> = ({ source, gap, column, onScroll }) => {
  // console.log('source', source);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scrollState, setScrollState] = useState({
    viewWidth: 0,
    viewHeight: 0,
    start: 0, //startIndex
  });
  useEffect(() => {
    console.log('scrollState', scrollState);
  }, [scrollState]);

  //endIndex
  const end = useMemo(() => scrollState.viewHeight + scrollState.start, [scrollState]);
  const queueState = useRef<{ queue: ColumnQueue[]; len: number }>({
    queue: Array(column)
      .fill(0)
      .map<ColumnQueue>(() => ({ list: [], height: 0 })), //存储item的二维数组
    len: 0, //视图上显示的item数量
  });
  const computedHeight = useRef({
    minIndex: 0,
    minHeight: Infinity,
    maxHeight: -Infinity,
  });
  const updatedHeight = () => {
    let minIndex = 0,
      minHeight = Infinity,
      maxHeight = -Infinity;
    queueState.current.queue.forEach(({ height }, index) => {
      if (height < minHeight) {
        minHeight = height;
        minIndex = index;
      }

      if (height > maxHeight) {
        maxHeight = height;
      }
    });
    computedHeight.current = { maxHeight, minHeight, minIndex };
  };
  //计算列表高度
  const listStyle = useMemo<CSSProperties>(
    () => ({ height: `${computedHeight.current.maxHeight}px` }),
    [computedHeight.current.maxHeight],
  );
  const cardList = useRef<RenderItem[]>([]);
  const [listTem, setListTem] = useState(cardList.current);
  const updatedCardList = () => {
    cardList.current = queueState.current.queue.reduce<RenderItem[]>(
      (pre, { list }) => pre.concat(list),
      [],
    );
    setListTem(() => cardList.current);
  };
  //需要被渲染的items
  const renderList = useMemo(
    () => cardList.current.filter((i: RenderItem) => i.h + i.y > scrollState.start && i.y < end),
    [listTem, scrollState.start, end],
  );
  useEffect(() => {
    console.log('renderList', renderList);
  }, [renderList]);

  const addInQueue = (size: number) => {
    for (let i = 0; i < size; i++) {
      let minIndex = computedHeight.current.minIndex;
      const currentColumn = queueState.current.queue[minIndex];
      const before = currentColumn.list[currentColumn.list.length - 1] || null;
      const dataItem = source[queueState.current.len];
      if (!dataItem) continue;

      const newItem = generatorItem(dataItem, before, minIndex);
      const updatedQueue = queueState.current.queue.map((currentQueueItem, index) => {
        if (index === minIndex) {
          return {
            list: [...currentQueueItem.list, newItem],
            height: currentQueueItem.height + newItem.h,
          };
        } else {
          return currentQueueItem;
        }
      });
      queueState.current = {
        queue: updatedQueue,
        len: queueState.current.len + 1,
      };
      updatedCardList();
      updatedHeight();
    }
  };
  //计算卡片宽高
  const itemSizeInfo = useMemo(() => {
    const map = source.reduce<Map<CardItemProps['id'], { width: number; height: number }>>(
      (pre, current) => {
        const itemWidth = Math.floor((scrollState.viewWidth - (column - 1) * gap) / column);
        pre.set(current.id, {
          width: itemWidth,
          height: Math.floor((itemWidth * current.height) / current.width),
        });

        return pre;
      },
      new Map(),
    );

    return map;
  }, [scrollState.viewWidth, source, column, gap]);
  //生成一个item
  const generatorItem = (
    item: CardItemProps,
    before: RenderItem | null,
    index: number,
  ): RenderItem => {
    const rect = itemSizeInfo.get(item.id);
    const width = rect!.width;
    const height = rect!.height;
    let y = 0;
    if (before) y = before.y + before.h + gap;

    return {
      item,
      y,
      h: height,
      style: {
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate3d(${index === 0 ? 0 : (width + gap) * index}px,${y}px,0)`,
      },
    };
  };

  const initScrollState = () => {
    if (containerRef.current) {
      setScrollState(() => ({
        viewWidth: containerRef.current!.clientWidth,
        viewHeight: containerRef.current!.clientHeight,
        start: containerRef.current!.scrollTop,
      }));
    }
  };

  useEffect(() => {
    initScrollState();
  }, []);
  useEffect(() => {
    if (source.length > 0) {
      addInQueue(source.length);
    }
  }, [source]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    console.log('handleScroll');
    setScrollState(() => ({
      viewWidth: containerRef.current!.clientWidth,
      viewHeight: containerRef.current!.clientHeight,
      start: containerRef.current!.scrollTop,
    }));
    onScroll?.(e);
  };

  return (
    <Fragment>
      <div className="size-full border-box">
        <div
          className="size-full overflow-y-scroll overflow-x-hidden"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {/* 容器 */}
          <div className="relative w-full" style={listStyle}>
            {/* 列表 */}
            {renderList.length > 0 ? (
              renderList.map(({ item, style }) => <Card {...item} key={item.id} style={style} />)
            ) : (
              <div className="my-1 mx-auto">没数据啊</div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Virtualwaterfall;
