import { FC } from 'react';

import Card from './components/card';
import mockTools from './datamock';

const ToolsList: FC = () => {
  return (
    <div className="size-full overflow-auto scrollbar-hide">
      <div className="grid grid-cols-2 gap-4 p-4">
        {mockTools.map((tool) => (
          <Card key={tool.id} {...tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolsList;
