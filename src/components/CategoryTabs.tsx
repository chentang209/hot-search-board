import { Category } from '@/types';
import { motion } from 'framer-motion';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory?: string;
  onSelectCategory: (category?: string) => void;
}

const CategoryTabs = ({ categories, selectedCategory, onSelectCategory }: CategoryTabsProps) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-full shadow-sm overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 p-1 min-w-max">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap
                ${selectedCategory === category.id 
                  ? 'bg-hot-red-500 text-white shadow-sm' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs; 