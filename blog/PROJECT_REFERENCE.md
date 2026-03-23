# 项目快速参考

## 📍 项目位置
```
c:\Users\J.s\WorkBuddy\20260323021915\blog\
```

## 🚀 快速启动

```bash
cd blog
npm install
npm run dev
```

访问：`http://localhost:5173`

## 📁 关键文件

| 文件 | 用途 |
|------|------|
| `src/data/articles.ts` | 所有文章数据 |
| `src/pages/ArticleList.tsx` | 文章列表页 |
| `src/pages/ArticleDetail.tsx` | 文章详情页 |
| `src/pages/Tags.tsx` | 标签分类页 |
| `src/pages/About.tsx` | 关于页面 |
| `src/App.tsx` | 路由配置 |
| `tailwind.config.js` | 主题配置 |

## 📝 添加新文章

在 `src/data/articles.ts` 添加：

```typescript
{
  id: '6',
  title: '标题',
  excerpt: '摘要',
  date: '2026-03-23',
  tags: ['标签1', '标签2'],
  readTime: '3 分钟',
  content: `# 标题

Markdown 内容...
`
}
```

## 🎨 常用命令

```bash
npm run dev      # 开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产版本
npm run lint     # 代码检查
```

## 🔗 页面路由

- `/` - 首页（文章列表）
- `/article/:id` - 文章详情
- `/tags` - 标签分类
- `/tags?tag=xxx` - 特定标签的文章
- `/about` - 关于页面

## 📚 相关文档

- `README.md` - 完整项目文档
- `QUICKSTART.md` - 快速启动指南
- `PROJECT_OVERVIEW.md` - 项目概览

## 💡 提示

- 所有页面支持暗黑模式
- Markdown 支持表格、代码高亮、引用
- 标签会自动统计文章数量
- 完全响应式设计
