//模拟数据
import data1 from './data1.json';
import data2 from './data2.json';
import { CardItemProps } from '../components/card';

export interface SourceDataList {
  data: {
    items: CardItemProps[];
  };
}

const colorArr = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399'];

function formatData(dataList: SourceDataList): CardItemProps[] {
  return dataList.data.items.map((item) => ({
    id: item.id,
    width: item.note_card.cover.width,
    height: item.note_card.cover.height,
    title: item.note_card.display_title,
    author: item.note_card.user.nick_name,
  }));
}

const mockData: CardItemProps[] = [data1, data2]
  .map((item: any) => {
    const formattedData = formatData(item);

    return formattedData.map((data, dataIndex: number) => ({
      ...data,
      bgColor: colorArr[dataIndex % (colorArr.length - 1)],
    }));
  })
  .flat();

export default mockData;
