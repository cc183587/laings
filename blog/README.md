# 我的博客

一个现代化的个人博客网站，使用 React + TypeScript + Vite + Tailwind CSS + shadcn/ui 构建。

## 功能特性

- 📝 **文章列表**：浏览所有已发布的文章
- 📖 **文章详情**：阅读完整的文章内容，支持 Markdown 渲染
- 🏷️ **标签分类**：通过标签快速筛选相关文章
- 👤 **关于页面**：了解更多关于博主的信息
- 🌓 **暗黑模式**：支持明暗主题切换
- 📱 **响应式设计**：完美适配各种设备尺寸

## 技术栈

- **React 19** - 用户界面框架
- **TypeScript** - 类型安全的 JavaScript
- **Vite 7** - 快速的构建工具
- **Tailwind CSS 3.4** - 实用优先的 CSS 框架
- **shadcn/ui** - 精美的 UI 组件库
- **React Router 7** - 客户端路由
- **React Markdown** - Markdown 渲染支持
- **remark-gfm** - GitHub Flavored Markdown 支持

## 快速开始

### 前置要求

- Node.js 20 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 `http://localhost:5173` 查看博客。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
blog/
├── src/
│   ├── components/     # shadcn/ui 组件
│   ├── data/           # 示例数据
│   │   └── articles.ts # 文章数据
│   ├── pages/          # 页面组件
│   │   ├── About.tsx         # 关于页面
│   │   ├── ArticleDetail.tsx # 文章详情页
│   │   ├── ArticleList.tsx   # 文章列表页
│   │   └── Tags.tsx          # 标签分类页
│   ├── types/          # TypeScript 类型定义
│   │   └── blog.ts
│   ├── App.tsx         # 主应用组件（路由配置）
│   ├── main.tsx        # 应用入口
│   └── index.css       # 全局样式
├── public/             # 静态资源
├── index.html          # HTML 入口
├── tailwind.config.js  # Tailwind 配置
├── vite.config.ts      # Vite 配置
└── package.json        # 项目依赖
```

## 添加新文章

在 `src/data/articles.ts` 文件中的 `articles` 数组添加新的文章对象：

```typescript
{
  id: '6',
  title: '文章标题',
  excerpt: '文章摘要',
  date: '2026-03-23',
  tags: ['标签1', '标签2'],
  readTime: '5 分钟',
  content: `# 文章标题

使用 Markdown 语法编写文章内容...

## 二级标题

### 三级标题

- 列表项 1
- 列表项 2

**粗体** 和 *斜体*

\`\`\`javascript
// 代码示例
function hello() {
  console.log('Hello, World!');
}
\`\`\`
`
}
```

## 自定义配置

### 修改主题颜色

在 `tailwind.config.js` 中自定义主题颜色：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          // ...
        },
      },
    },
  },
}
```

### 修改网站信息

- 网站标题：编辑 `index.html` 中的 `<title>` 标签
- 博客信息：编辑 `src/pages/About.tsx` 中的个人资料

## 部署

### Vercel

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署

### Netlify

1. 推送代码到 GitHub
2. 在 Netlify 中导入项目
3. 构建命令：`npm run build`
4. 发布目录：`dist`

### 自定义服务器

1. 运行 `npm run build`
2. 将 `dist` 目录上传到服务器
3. 配置 Nginx 或其他服务器

## 开发建议

- 使用 VS Code 配合 ESLint 插件
- 遵循 React 最佳实践
- 保持组件单一职责
- 使用 TypeScript 类型检查
- 编写可维护的代码

## License

MIT
