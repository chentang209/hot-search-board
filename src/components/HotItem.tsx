import { HotItem as HotItemType } from '@/types';
import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HotItemProps {
  item: HotItemType;
  rank: number;
}

const HotItem: FC<HotItemProps> = ({ item, rank }) => {
  const { id, title, hotValue, trend, category, url } = item;

  // 微博式特殊标签
  const getSpecialTag = () => {
    if (rank <= 3) return { text: '热', className: 'weibo-tag-hot' };
    if (trend === 'up' && rank <= 10) return { text: '新', className: 'weibo-tag-new' };
    // 随机添加荐标签
    if (Math.random() > 0.85) return { text: '荐', className: 'weibo-tag-rec' };
    return null;
  };

  const tag = getSpecialTag();

  // 数量单位转换（微博式）
  const formatNumber = (num: number) => {
    if (num >= 100000000) {
      return (num / 100000000).toFixed(1) + '亿';
    } else if (num >= 10000) {
      return (num / 10000).toFixed(0) + '万';
    } else {
      return num.toString();
    }
  };

  // 如果有URL，使用外部链接，否则使用内部链接
  const ItemWrapper = ({ children }: { children: React.ReactNode }) => {
    if (url) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="block">
          {children}
        </a>
      );
    }
    
    return (
      <Link href={`/topic/${id}`} className="block">
        {children}
      </Link>
    );
  };

  return (
    <ItemWrapper>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: rank * 0.03 }}
        className="flex items-center p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        {/* 排名 */}
        <div className="flex-shrink-0 w-6 mr-3 text-center">
          <span className={`text-base font-bold ${
            rank <= 3 
              ? rank === 1 ? 'text-red-500' : rank === 2 ? 'text-orange-500' : 'text-amber-500' 
              : 'text-gray-400'
          }`}>
            {rank}
          </span>
        </div>
        
        {/* 内容区域 */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center">
            <h3 className="text-base text-gray-900 truncate mr-1.5">
              {title}
            </h3>
            
            {/* 特殊标签 */}
            {tag && (
              <span className={`weibo-tag ${tag.className}`}>
                {tag.text}
              </span>
            )}
          </div>
          
          {/* 热度 */}
          <div className="mt-1 text-xs text-gray-400 flex items-center">
            <span>{formatNumber(hotValue)}</span>
            
            {/* 趋势图标 */}
            {trend === 'up' && (
              <span className="ml-1 text-red-500">
                <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
                  <path d="M873.6 441.6l-355.2-361.6c-9.6-9.6-22.4-9.6-32 0l-355.2 361.6c-9.6 9.6-9.6 25.6 0 35.2 9.6 9.6 22.4 9.6 32 0l316.8-323.2 316.8 323.2c9.6 9.6 22.4 9.6 32 0C883.2 464 883.2 451.2 873.6 441.6z" />
                </svg>
              </span>
            )}
            {trend === 'down' && (
              <span className="ml-1 text-green-500">
                <svg viewBox="0 0 1024 1024" width="12" height="12" fill="currentColor">
                  <path d="M873.6 441.6l-355.2 361.6c-9.6 9.6-22.4 9.6-32 0l-355.2-361.6c-9.6-9.6-9.6-25.6 0-35.2 9.6-9.6 22.4-9.6 32 0l316.8 323.2 316.8-323.2c9.6-9.6 22.4-9.6 32 0C883.2 464 883.2 451.2 873.6 441.6z" />
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* 分类标签 - 只有部分热搜显示 */}
        {category && Math.random() > 0.7 && (
          <div className="flex-shrink-0 px-1.5 py-0.5 bg-orange-50 text-orange-600 text-xs rounded mr-2">
            {category}
          </div>
        )}
      </motion.div>
    </ItemWrapper>
  );
};

export default HotItem; 