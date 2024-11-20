import { CSSProperties, FC } from 'react';

export interface CardItemProps {
  id: number | string;
  width: number;
  height: number;
  title: string;
  author: string;
  bgColor: string;
  // [key: string]: any;
  style: CSSProperties;
}

const Card: FC<CardItemProps> = ({ title, author, bgColor, style }) => {
  return (
    <div className="absolute top-0 left-0 border-box" style={style}>
      <div
        style={{ backgroundColor: bgColor }}
        className="relative size-full border-box select-none overflow-hidden animate-card-move"
      >
        <div className="img">imgview</div>
        <div className="absolute bottom-0 left-0 w-full bg-neutral-800 p-1 text-white">
          <div className="title">{title}</div>
          <div className="overflow-hidden text-ellipsis">
            <span>作者：</span>
            <span>{author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
