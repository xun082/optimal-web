import { FileText, ImagePlay, Image, Video, Bot, FileMusic, FileType2 } from 'lucide-react';

interface NavMain {
  title: string;
  url: string;
  icon: any;
  isActive?: boolean;
  childTools?: Array<{
    title: string;
    url?: string;
  }>;
}

const navMain: Array<NavMain> = [
  {
    title: '图片工具',
    url: '#',
    icon: Image,
    isActive: true,
    childTools: [
      {
        title: '格式转换',
      },
      {
        title: '图片编辑',
      },
      {
        title: '消除水印',
      },
    ],
  },
  {
    title: '视频工具',
    url: '#',
    icon: Video,
    childTools: [
      {
        title: '视频压缩',
      },
      {
        title: '视频编辑',
      },
      {
        title: '格式转换',
      },
    ],
  },
  {
    title: '音频工具',
    url: '#',
    icon: FileMusic,
    childTools: [
      {
        title: '视频压缩',
      },
      {
        title: '视频编辑',
      },
      {
        title: '格式转换',
      },
    ],
  },
  {
    title: 'GIF工具',
    url: '#',
    icon: ImagePlay,
    childTools: [
      {
        title: 'GIF制作',
      },
      {
        title: 'GIF编辑',
      },
    ],
  },
  {
    title: 'PDF工具',
    url: '#',
    icon: FileText,
    childTools: [
      {
        title: 'PDF转换工具',
      },
      {
        title: 'PDF编辑工具',
      },
      {
        title: 'PDF内容处理工具',
      },
    ],
  },
  {
    title: 'AI图像工具',
    url: '#',
    icon: Bot,
    childTools: [
      {
        title: '图像生成工具',
      },
    ],
  },
  {
    title: '文本处理工具',
    url: '#',
    icon: FileType2,
    childTools: [
      {
        title: '文本转语音工具',
      },
    ],
  },
];

export default navMain;
