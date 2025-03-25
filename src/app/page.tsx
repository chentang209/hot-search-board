'use client';

import { useState } from 'react';
import { useHotTopics } from '@/hooks/useHotTopics';
import HotList from '@/components/HotList';
import CategoryTabs from '@/components/CategoryTabs';
import { Category } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

// 分类数据
const categories: Category[] = [
  { id: 'all', name: '热搜', color: '#FF8200' },
  { id: 'social', name: '时事', color: '#FF8200' },
  { id: 'entertainment', name: '娱乐', color: '#FF8200' },
  { id: 'sports', name: '体育', color: '#FF8200' },
  { id: 'finance', name: '财经', color: '#FF8200' },
];

// 底部导航
const navItems = [
  { name: '我的', active: false },
  { name: '热搜', active: true },
  { name: '发现', active: false },
  { name: '推荐', active: false },
  { name: '更多', active: false },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>('all');
  const { topics, loading, error, refreshTopics, lastUpdated } = useHotTopics();

  const filteredTopics = selectedCategory && selectedCategory !== 'all'
    ? topics.filter(topic => topic.category.toLowerCase() === selectedCategory)
    : topics;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 微博热搜头部 */}
      <div className="weibo-header">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-white text-lg font-bold">
              <div className="flex items-end">
                <div className="text-2xl font-bold">微博热搜</div>
                <div className="ml-2 text-sm opacity-90">新鲜·热门·有料</div>
              </div>
            </div>
            {/* 刷新按钮 */}
            <button
              onClick={refreshTopics}
              disabled={loading}
              className="text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className={loading ? 'animate-spin' : ''}>
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 10h4V3l-1.35 3.35z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 导航标签 */}
      <div className="weibo-tabs mb-2">
        {navItems.map((item, index) => (
          <div key={index} className={`weibo-tab ${item.active ? 'active' : ''}`}>
            {item.name}
          </div>
        ))}
      </div>

      <div className="pt-2 pb-12 px-4">
        <AnimatePresence mode="wait">
          {loading && topics.length === 0 ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
            </motion.div>
          ) : error && topics.length === 0 ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 bg-white rounded-lg shadow-sm text-center"
            >
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button 
                onClick={refreshTopics}
                className="px-6 py-3 bg-gradient-to-r from-weibo-red to-weibo-orange text-white rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                重新加载
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* 实时热点标题 */}
              <div className="flex items-center justify-between mb-1 px-2">
                <div className="text-base font-bold">实时热点</div>
                <div className="text-xs text-gray-500">每分钟更新一次</div>
              </div>
              
              {/* 热搜榜单 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <HotList
                  items={filteredTopics}
                  selectedCategory={selectedCategory}
                  lastUpdated={lastUpdated}
                />
              </div>
              
              {/* 底部提示 */}
              <div className="text-center text-xs text-gray-400 mt-4 pb-4">
                <p className="mb-1">数据来源于微博官方</p>
                <p>© 2023 微博热搜榜 - 非官方</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
