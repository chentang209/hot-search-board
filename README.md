# 微博热搜榜 (hot-search-board)

这是一个使用 [Next.js](https://nextjs.org) 构建的微博热搜榜应用，实时展示微博热搜数据。

## 功能特点

- 实时展示微博热搜数据
- 支持分类筛选
- 自动每分钟更新
- 支持手动刷新
- 响应式设计
- 优雅的动画效果

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- 天行数据 API

## 开始使用

1. 克隆项目：

```bash
git clone https://github.com/yourusername/hot-search-board.git
cd hot-search-board
```

2. 安装依赖：

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

3. 运行开发服务器：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 环境变量

创建 `.env.local` 文件并添加以下环境变量：

```env
TIANXING_API_KEY=your_api_key_here
```

## 部署

推荐使用 [Vercel](https://vercel.com) 部署，它提供了最简单的方式来部署 Next.js 应用。

## 许可证

MIT
