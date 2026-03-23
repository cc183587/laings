import { Article } from '../types/blog';

export const articles: Article[] = [
  {
    id: '1',
    title: '欢迎来到我的博客',
    excerpt: '这是我的第一篇博客文章，介绍博客的基本功能和使用方法。',
    date: '2026-03-23',
    tags: ['欢迎', '介绍'],
    readTime: '2 分钟',
    content: `# 欢迎来到我的博客

这是我的第一篇博客文章！在这里我将分享我的想法、经验和学习心得。

## 博客功能

本博客包含以下功能：

- 📝 **文章列表**：浏览所有已发布的文章
- 📖 **文章详情**：阅读完整的文章内容，支持 Markdown 渲染
- 🏷️ **标签分类**：通过标签快速筛选相关文章
- 👤 **关于页面**：了解更多关于博主的信息

## Markdown 支持

本博客完全支持 Markdown 语法，你可以使用：

- **粗体** 和 *斜体*
- [链接](https://example.com)
- 代码块
- 列表
- 引用

## 未来计划

我计划在这个博客上分享：

1. 技术教程和最佳实践
2. 项目经验总结
3. 学习笔记
4. 生活感悟

感谢你的访问！
`
  },
  {
    id: '2',
    title: '如何使用 React 构建现代网站',
    excerpt: 'React 是一个强大的前端框架，本文将介绍如何使用 React 和相关工具链构建现代化的网站。',
    date: '2026-03-20',
    tags: ['React', '前端', '教程'],
    readTime: '5 分钟',
    content: `# 如何使用 React 构建现代网站

React 是目前最受欢迎的前端框架之一，它提供了一种声明式、组件化的方式来构建用户界面。

## 为什么选择 React？

React 有以下优势：

1. **组件化**：将 UI 拆分为可复用的组件
2. **虚拟 DOM**：提高渲染性能
3. **生态系统丰富**：大量现成的库和工具
4. **社区活跃**：容易找到解决方案和资源

## 技术栈

一个现代化的 React 项目通常包括：

- **Vite**：快速的开发服务器和构建工具
- **TypeScript**：类型安全
- **Tailwind CSS**：实用优先的 CSS 框架
- **shadcn/ui**：精美的 UI 组件库

## 代码示例

\`\`\`jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return (
    <div>
      <Welcome name="World" />
    </div>
  );
}
\`\`\`

## 最佳实践

- 使用函数组件和 Hooks
- 保持组件单一职责
- 合理使用状态管理
- 编写可测试的代码

希望这篇文章对你有所帮助！
`
  },
  {
    id: '3',
    title: 'TypeScript 入门指南',
    excerpt: 'TypeScript 为 JavaScript 添加了静态类型检查，让代码更加健壮和易于维护。',
    date: '2026-03-18',
    tags: ['TypeScript', 'JavaScript', '教程'],
    readTime: '4 分钟',
    content: `# TypeScript 入门指南

TypeScript 是 JavaScript 的超集，添加了静态类型检查功能，能够帮助开发者提前发现错误。

## 基础类型

TypeScript 支持以下基本类型：

- \`string\`：字符串
- \`number\`：数字
- \`boolean\`：布尔值
- \`array\`：数组
- \`object\`：对象
- \`tuple\`：元组
- \`enum\`：枚举

## 类型定义示例

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

## 为什么使用 TypeScript？

1. **类型安全**：在编译时发现错误
2. **更好的 IDE 支持**：自动补全和提示
3. **代码文档**：类型即文档
4. **重构友好**：类型检查确保重构安全

## 学习建议

- 从简单的类型开始
- 逐步引入高级类型
- 多使用 \`interface\` 和 \`type\`
- 利用 VS Code 的类型提示

继续学习，你会发现 TypeScript 让编程更加高效而愉快！
`
  },
  {
    id: '4',
    title: 'Tailwind CSS 实用技巧',
    excerpt: 'Tailwind CSS 是一个实用优先的 CSS 框架，本文分享一些使用技巧和最佳实践。',
    date: '2026-03-15',
    tags: ['CSS', 'Tailwind', '前端'],
    readTime: '3 分钟',
    content: `# Tailwind CSS 实用技巧

Tailwind CSS 提供了一套强大的实用类，可以快速构建美观的界面。

## 常用工具类

### 间距
- \`p-4\`：padding: 1rem
- \`m-2\`：margin: 0.5rem
- \`px-6\`：padding-left/right: 1.5rem

### 颜色
- \`bg-blue-500\`：背景色
- \`text-white\`：文字颜色
- \`border-gray-200\`：边框颜色

### 布局
- \`flex\`：flexbox 布局
- \`grid\`：grid 布局
- \`gap-4\`：间距

### 响应式
Tailwind 支持响应式设计：

\`\`\`html
<div class="p-4 md:p-8 lg:p-12">
  响应式内边距
</div>
\`\`\`

## 自定义配置

在 \`tailwind.config.js\` 中可以自定义主题：

\`\`\`javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
      },
    },
  },
}
\`\`\`

## 最佳实践

1. **使用组件类**：将重复的类组合成组件
2. **保持一致性**：遵循设计系统
3. **使用 @apply**：在 CSS 文件中提取公共样式
4. **合理使用 hover/focus 状态**

Tailwind CSS 让样式开发变得快速而有趣！
`
  },
  {
    id: '5',
    title: 'Markdown 写作技巧',
    excerpt: '掌握 Markdown 语法，让你的写作更加高效和专业。',
    date: '2026-03-10',
    tags: ['写作', 'Markdown', '技巧'],
    readTime: '3 分钟',
    content: `# Markdown 写作技巧

Markdown 是一种轻量级标记语言，让写作变得简单而强大。

## 基础语法

### 标题
\`\`\`
# 一级标题
## 二级标题
### 三级标题
\`\`\`

### 强调
- **粗体**：\`**文字**\`
- *斜体*：\`*文字*\`
- ~~删除线~~：\`~~文字~~\`

### 列表
无序列表：
\`\`\`
- 项目 1
- 项目 2
  - 子项目 2.1
\`\`\`

有序列表：
\`\`\`
1. 第一步
2. 第二步
3. 第三步
\`\`\`

## 进阶语法

### 代码
行内代码：\`const x = 1;\`

代码块：
\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### 引用
> 这是一段引用文字。
> 可以是多行。

### 链接和图片
[链接文字](https://example.com)

![图片描述](image-url.jpg)

### 表格
\`\`\`
| 列 1 | 列 2 | 列 3 |
|------|------|------|
| 数据 1 | 数据 2 | 数据 3 |
\`\`\`

## 写作建议

1. **结构清晰**：使用标题组织内容
2. **段落适中**：避免过长的段落
3. **适当留白**：使用空行分隔内容
4. **善用列表**：让要点更突出

## 工具推荐

- **Typora**：所见即所得的 Markdown 编辑器
- **VS Code**：强大的代码编辑器，支持 Markdown 预览
- **Obsidian**：知识管理工具

享受 Markdown 写作带来的便利吧！
`
  }
];

export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();
  
  articles.forEach(article => {
    article.tags.forEach(tag => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter(article => 
    article.tags.includes(tag)
  );
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}
