import data1 from './data1.json';
import data2 from './data2.json';
import { CardItemProps } from '../components/card';

export interface NoteCard {
  display_title: string;
  cover: {
    width: number;
    height: number;
  };
  user: {
    nick_name: string;
  };
}

export interface SourceDataList {
  data: {
    items: {
      id: string;
      note_card: NoteCard;
    }[];
  };
}

// 模拟颜色数组
const colorArr = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399'];

// 格式化数据函数
function formatData(dataList: SourceDataList): CardItemProps[] {
  return dataList.data.items.map((item, index) => ({
    id: item.id,
    width: item.note_card.cover.width,
    height: item.note_card.cover.height,
    title: item.note_card.display_title,
    author: item.note_card.user.nick_name,
    bgColor: colorArr[index % colorArr.length], // 直接设置默认颜色，确保为 string 类型
    style: {}, // 初始化为空对象，符合 CSSProperties 类型
  }));
}

// 格式化并合并数据
const mockData: CardItemProps[] = [data1, data2].flatMap((item: SourceDataList) =>
  formatData(item),
);

export default mockData;
