# 快速启动指南

## 📦 安装步骤

### 1. 进入项目目录

```bash
cd blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

### 4. 在浏览器中打开

访问 `http://localhost:5173` 查看你的博客！

## 🎨 功能展示

你的博客包含以下页面：

- **首页 (`/`)**：文章列表
- **文章详情 (`/article/:id`)**：完整的 Markdown 文章
- **标签分类 (`/tags`)**：按标签筛选文章
- **关于页面 (`/about`)**：个人信息

## 📝 添加文章

编辑 `src/data/articles.ts` 文件，在 `articles` 数组中添加新文章：

```typescript
{
  id: '6',
  title: '你的文章标题',
  excerpt: '文章摘要，会显示在文章列表中',
  date: '2026-03-23',
  tags: ['标签1', '标签2'],
  readTime: '3 分钟',
  content: `# 文章标题

使用 Markdown 语法编写内容...

## 内容示例

- 列表项 1
- 列表项 2

**粗体** 和 *斜体*

\`\`\`javascript
// 代码示例
const example = 'Hello, World!';
\`\`\`
`
}
```

## 🏗️ 构建生产版本

```bash
npm run build
```

构建产物将在 `dist` 目录中。

## 🚀 预览生产版本

```bash
npm run preview
```

## 💡 提示

- 博客支持暗黑模式，根据系统设置自动切换
- 所有页面都支持响应式设计
- Markdown 支持表格、代码高亮、引用等语法
- 标签会自动统计并显示文章数量

## 🔧 自定义

### 修改网站标题

编辑 `index.html` 中的 `<title>` 标签

### 修改个人资料

编辑 `src/pages/About.tsx` 文件

### 修改主题颜色

编辑 `tailwind.config.js` 文件

享受你的博客吧！🎉
