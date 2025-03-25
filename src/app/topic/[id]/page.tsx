'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { HotItem } from '@/types';

export default function TopicDetail({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [topic, setTopic] = useState<HotItem | null>(null);

  useEffect(() => {
    // 模拟API调用
    const fetchTopic = async () => {
      try {
        setLoading(true);
        // 这里应该是实际的API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟数据
        setTopic({
          id: params.id,
          title: "示例热搜话题",
          hotValue: 1234567,
          trend: "up",
          category: "社会",
          description: "这是一个示例热搜话题的详细描述。这里可以包含更多的信息，例如话题的背景、发展过程等。",
          url: "https://example.com/topic"
        });
      } catch (err) {
        setError('加载失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-hot-red-50 to-hot-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <motion.div
                animate={{
                  rotate: 360,
                  borderRadius: ["25%", "50%", "25%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="w-16 h-16 border-4 border-hot-red-500 border-t-transparent"
              />
              <p className="text-hot-red-500 font-medium">加载中...</p>
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="glassmorphism p-8 rounded-2xl">
                <p className="text-hot-red-500 text-lg mb-4">{error}</p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-hot-red-500 to-hot-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow duration-300"
                >
                  返回首页
                </Link>
              </div>
            </motion.div>
          ) : topic ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="glassmorphism p-8 rounded-2xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-6 bg-gradient-to-r from-hot-red-500 to-hot-pink-500 bg-clip-text text-transparent"
              >
                {topic.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-4 mb-6"
              >
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-hot-red-100 to-hot-pink-100 text-hot-red-500 font-medium">
                  {topic.category}
                </span>
                <div className="flex items-center text-hot-red-500">
                  <span className="mr-2">
                    {topic.trend === 'up' ? '↑' : topic.trend === 'down' ? '↓' : '–'}
                  </span>
                  <span className="font-semibold">{topic.hotValue.toLocaleString()}</span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 leading-relaxed mb-8"
              >
                {topic.description}
              </motion.p>

              {topic.url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <a
                    href={topic.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-hot-red-500 to-hot-pink-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    查看更多
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </motion.div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
} 