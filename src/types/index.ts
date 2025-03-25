export interface HotItem {
  id: string;
  title: string;
  hotValue: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  description?: string;
  url?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export type TrendType = 'up' | 'down' | 'stable'; 