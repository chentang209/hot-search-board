import { HotItem as HotItemType } from '@/types';
import HotItem from './HotItem';
import { AnimatePresence, motion } from 'framer-motion';

interface HotListProps {
  items: HotItemType[];
  selectedCategory?: string;
  lastUpdated?: string;
}

const HotList = ({ items, selectedCategory, lastUpdated = '刚刚' }: HotListProps) => {
  // 过滤数据（如果需要的话）
  const filteredItems = selectedCategory && selectedCategory !== 'all'
    ? items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase())
    : items;

  return (
    <div className="relative">
      {/* 头部信息 */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-white">
        <div className="text-sm font-bold">实时热点，每分钟更新一次</div>
        <div className="text-xs text-gray-500">更新于: {lastUpdated}</div>
      </div>
      
      {/* 列表内容 */}
      <AnimatePresence>
        {filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center text-gray-500"
          >
            未找到相关内容
          </motion.div>
        ) : (
          <div>
            {filteredItems.map((item, index) => (
              <HotItem key={item.id} item={item} rank={index + 1} />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      {/* 底部查看更多 */}
      {filteredItems.length > 0 && (
        <div className="text-center py-4 border-t border-gray-100">
          <div className="text-orange-500 text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity">
            查看更多热搜
          </div>
        </div>
      )}
    </div>
  );
};

export default HotList; 