import { NextResponse } from 'next/server';
import { HotItem } from '@/types';

// 天行数据API接口信息
const API_URL = 'https://apis.tianapi.com/weibobot/index';
const API_KEY = 'c43c3de733aef4c2f8bcfffd4eca9340'; // 实际应用中应使用环境变量存储

// 缓存数据和上次更新时间
let cachedData: HotItem[] = [];
let lastUpdated = 0;
const CACHE_DURATION = 60 * 1000; // 1分钟缓存

// 备用数据，当API请求失败时使用
const fallbackData: HotItem[] = [
  {
    id: '1',
    title: '微博热搜数据加载失败',
    hotValue: 1234567,
    trend: 'stable',
    category: '系统',
    description: '请稍后再试...',
    updatedAt: new Date().toISOString(),
  },
];

// 从天行数据API获取微博热搜
async function fetchWeiboHotSearch(): Promise<HotItem[]> {
  try {
    // 构建请求URL
    const url = `${API_URL}?key=${API_KEY}`;
    
    // 发送请求
    const response = await fetch(url, { 
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // 60秒缓存
    });
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }
    
    // 解析响应
    const data = await response.json();
    
    // 检查API返回状态
    if (data.code !== 200) {
      throw new Error(`API返回错误: ${data.msg}`);
    }
    
    // 转换数据格式
    const hotTopics: HotItem[] = data.result.list.map((item: any, index: number) => {
      // 根据热度变化判断趋势
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (item.hotword_tag) {
        trend = item.hotword_tag.includes('新') ? 'up' : 'stable';
      }
      
      // 确定分类
      let category = '社会';
      if (item.label) {
        category = item.label;
      } else if (item.hotword_tag) {
        if (item.hotword_tag.includes('影视')) category = '娱乐';
        else if (item.hotword_tag.includes('体育')) category = '体育';
        else if (item.hotword_tag.includes('财经')) category = '财经';
      }
      
      // 构建热搜项
      return {
        id: (index + 1).toString(),
        title: item.hotword,
        hotValue: parseInt(item.hotwordnum.replace(/,/g, '')) || 10000 - index * 500,
        trend,
        category,
        description: item.description || `关于"${item.hotword}"的热搜话题`,
        url: item.url,
        updatedAt: new Date().toISOString(),
      };
    });
    
    return hotTopics;
  } catch (error) {
    console.error(`获取微博热搜失败: ${error}`);
    return fallbackData;
  }
}

export async function GET() {
  const now = Date.now();
  
  // 如果缓存过期，则更新数据
  if (now - lastUpdated > CACHE_DURATION || cachedData.length === 0) {
    try {
      const freshData = await fetchWeiboHotSearch();
      if (freshData.length > 0) {
        cachedData = freshData;
        lastUpdated = now;
      }
    } catch (error) {
      console.error('更新热搜缓存失败:', error);
      // 如果没有缓存数据，使用备用数据
      if (cachedData.length === 0) {
        cachedData = fallbackData;
      }
    }
  }
  
  return NextResponse.json(cachedData);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTopic: HotItem = {
      id: Date.now().toString(),
      updatedAt: new Date().toISOString(),
      ...body,
    };
    
    cachedData.push(newTopic);
    cachedData.sort((a, b) => b.hotValue - a.hotValue);
    
    return NextResponse.json(newTopic);
  } catch (error) {
    return NextResponse.json(
      { error: '创建热搜失败' },
      { status: 400 }
    );
  }
} 