import { FC } from 'react';

interface ToolItemProps {
  avatar: string;
  title: string;
  description: string;
}

const Card: FC<ToolItemProps> = ({ avatar, title, description }) => {
  return (
    <div className="flex items-center p-4 gap-4 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 select-none cursor-pointer animate-card-move">
      <div className="text-4xl">{avatar}</div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="text-lg font-medium truncate">{title}</div>
        <div className="text-sm text-gray-500 truncate">{description}</div>
      </div>
    </div>
  );
};

export default Card;
