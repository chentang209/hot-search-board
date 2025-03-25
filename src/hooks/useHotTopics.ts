import { useState, useEffect } from 'react';
import { HotItem } from '@/types';

export function useHotTopics() {
  const [topics, setTopics] = useState<HotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hot-topics');
        if (!response.ok) {
          throw new Error('获取热搜数据失败');
        }
        const data = await response.json();
        setTopics(data);
        setLastUpdated(new Date());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '获取数据时发生错误');
        console.error('获取热搜失败:', err);
      } finally {
        setLoading(false);
      }
    };

    // 初始加载
    fetchTopics();

    // 设置定时刷新 - 一分钟刷新一次
    const intervalId = setInterval(fetchTopics, 60000);

    // 清理函数
    return () => clearInterval(intervalId);
  }, []);

  // 手动刷新数据
  const refreshTopics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/hot-topics?refresh=true');
      if (!response.ok) {
        throw new Error('刷新热搜数据失败');
      }
      const data = await response.json();
      setTopics(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '刷新数据时发生错误');
    } finally {
      setLoading(false);
    }
  };

  // 格式化最后更新时间
  const getFormattedLastUpdated = () => {
    if (!lastUpdated) return '暂无数据';
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000); // 秒数差
    
    if (diff < 60) {
      return `${diff}秒前`;
    } else if (diff < 3600) {
      return `${Math.floor(diff / 60)}分钟前`;
    } else {
      return lastUpdated.toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    }
  };

  // 添加话题的功能将保留但不鼓励使用，因为我们现在使用真实API
  const addTopic = async (topic: Omit<HotItem, 'id' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/hot-topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(topic),
      });

      if (!response.ok) {
        throw new Error('添加话题失败');
      }

      const newTopic = await response.json();
      setTopics(prev => [...prev, newTopic].sort((a, b) => b.hotValue - a.hotValue));
      return newTopic;
    } catch (err) {
      setError(err instanceof Error ? err.message : '添加话题失败');
      throw err;
    }
  };

  return {
    topics,
    loading,
    error,
    addTopic,
    refreshTopics,
    lastUpdated: getFormattedLastUpdated()
  };
} 