# 项目概览

## 📋 项目信息

**项目名称**: 个人博客网站
**创建时间**: 2026-03-23
**技术栈**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui

## 🎯 项目目标

创建一个现代化的个人博客网站，包含以下核心功能：

1. ✅ **文章列表**：展示所有已发布的文章
2. ✅ **文章详情**：支持 Markdown 渲染的完整文章阅读
3. ✅ **标签分类**：通过标签筛选和管理文章
4. ✅ **关于页面**：展示博主个人信息和技能

## 📁 项目结构

```
blog/
├── src/
│   ├── components/     # shadcn/ui 组件库 (53 个组件)
│   ├── data/           # 示例文章数据
│   │   └── articles.ts # 5 篇示例文章
│   ├── pages/          # 页面组件
│   │   ├── About.tsx         # 关于页面
│   │   ├── ArticleDetail.tsx # 文章详情（Markdown 渲染）
│   │   ├── ArticleList.tsx   # 文章列表
│   │   └── Tags.tsx          # 标签分类
│   ├── types/          # TypeScript 类型定义
│   │   └── blog.ts
│   ├── App.tsx         # 主应用（路由配置）
│   ├── App.css         # 应用样式
│   ├── index.css       # 全局样式（Tailwind）
│   └── main.tsx        # 应用入口
├── index.html          # HTML 入口
├── package.json        # 项目依赖
├── vite.config.ts      # Vite 配置
├── tailwind.config.js  # Tailwind 配置
└── tsconfig.json       # TypeScript 配置
```

## 🔧 技术栈详情

### 核心框架
- **React 19.2.0** - 用户界面框架
- **TypeScript 5.9.3** - 类型安全
- **Vite 7.2.4** - 快速的构建工具

### 样式和 UI
- **Tailwind CSS 3.4.19** - 实用优先的 CSS 框架
- **shadcn/ui** - 精美的 UI 组件库（40+ 组件）
- **lucide-react 0.562.0** - 图标库

### 功能库
- **React Router 7.1.5** - 客户端路由
- **React Markdown 9.0.1** - Markdown 渲染
- **remark-gfm 4.0.0** - GitHub Flavored Markdown 支持
- **date-fns 4.1.0** - 日期处理

## 📦 主要依赖

### 新增的博客相关依赖
- `react-router-dom`: 页面路由
- `react-markdown`: Markdown 渲染
- `remark-gfm`: Markdown 扩展语法支持

### 已有的 UI 组件依赖
- 40+ shadcn/ui 组件（Button, Card, Badge, Separator 等）
- Radix UI 基础组件
- 动画和过渡效果库

## 📝 示例内容

博客包含 5 篇示例文章：

1. **欢迎来到我的博客** - 博客功能介绍
2. **如何使用 React 构建现代网站** - React 教程
3. **TypeScript 入门指南** - TypeScript 教程
4. **Tailwind CSS 实用技巧** - CSS 教程
5. **Markdown 写作技巧** - 写作技巧

每篇文章都包含：
- 标题和摘要
- 发布日期
- 阅读时间
- 标签分类
- 完整的 Markdown 内容

## 🎨 设计特点

1. **响应式设计**：完美适配手机、平板和桌面
2. **暗黑模式**：支持明暗主题切换
3. **渐变背景**：现代感的渐变色背景
4. **卡片布局**：清晰的文章卡片设计
5. **流畅动画**：悬停效果和页面过渡
6. **Lucide 图标**：统一的图标系统

## 🚀 启动方式

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 构建生产版本
npm run build

# 4. 预览生产版本
npm run preview
```

## 📖 页面路由

- `/` - 文章列表页（首页）
- `/article/:id` - 文章详情页
- `/tags` - 标签分类页
- `/tags?tag=xxx` - 特定标签的文章列表
- `/about` - 关于页面

## 🎯 功能亮点

### 文章列表
- 卡片式布局展示文章
- 显示标签、日期、阅读时间
- 悬停效果和点击跳转
- 渐变色网站标题

### 文章详情
- 完整的 Markdown 渲染
- 语法高亮的代码块
- 支持表格、引用、列表等
- 分享功能（原生分享 API）
- 返回按钮和面包屑导航

### 标签分类
- 标签云展示所有标签
- 显示每个标签的文章数量
- 点击标签查看相关文章
- 支持返回标签列表

### 关于页面
- 个人头像和简介
- 技能标签展示
- 社交媒体链接
- 博客技术栈说明

## 🔨 自定义指南

### 添加新文章
编辑 `src/data/articles.ts`，在 `articles` 数组添加新对象

### 修改网站信息
- 标题：`index.html` 中的 `<title>`
- 个人资料：`src/pages/About.tsx`
- 文章内容：`src/data/articles.ts`

### 修改主题
- 颜色：`tailwind.config.js`
- 组件样式：`src/components/ui/`
- 全局样式：`src/index.css`

## 📝 注意事项

1. **依赖安装**：首次运行需要执行 `npm install`
2. **TypeScript 错误**：构建前安装依赖可解决类型定义问题
3. **Markdown 语法**：使用标准 Markdown 语法，支持 GFM 扩展
4. **图片资源**：如需添加图片，放在 `public/` 目录

## 🎉 项目完成状态

✅ 项目结构创建完成
✅ 核心页面组件开发完成
✅ 示例数据添加完成
✅ 路由配置完成
✅ Markdown 渲染功能完成
✅ 响应式设计完成
✅ 文档编写完成

## 📞 获取帮助

- 查看 `README.md` 了解详细说明
- 查看 `QUICKSTART.md` 快速上手
- 查看 `src/data/articles.ts` 了解数据结构
- 查看 `src/pages/` 了解页面实现

---

**项目创建时间**: 2026-03-23
**当前状态**: 可以直接使用
