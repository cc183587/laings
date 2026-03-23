import db, { dbRun } from '../config/database.js';

// 示例文章数据
const articlesData = [
  {
    title: 'React 19 新特性全面解析',
    slug: 'react-19-new-features',
    excerpt: 'React 19 带来了许多令人兴奋的新特性，包括并发渲染、自动批处理、新的 Hooks 等。让我们深入探讨这些变化如何改善开发体验。',
    content: `# React 19 新特性全面解析

React 19 带来了许多令人兴奋的新特性，让我们一一了解。

## 并发渲染

并发渲染是 React 19 的核心特性之一...

## 自动批处理

自动批处理自动将多个状态更新批处理...

## 新的 Hooks

### useTransition

用于非紧急状态更新...

### useDeferredValue

用于延迟更新部分 UI...

## 总结

React 19 的新特性让我们的应用更快、更流畅。`,
    cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    author: '张三'
  },
  {
    title: 'TypeScript 最佳实践指南',
    slug: 'typescript-best-practices',
    excerpt: 'TypeScript 已经成为现代前端开发的标准。本文总结了多年 TypeScript 开发经验，分享了实用的最佳实践。',
    content: `# TypeScript 最佳实践指南

TypeScript 已经成为现代前端开发的标准。

## 类型定义

### 接口 vs 类型

接口和类型有什么区别...

### 泛型

如何正确使用泛型...

## 配置优化

tsconfig.json 最佳配置...

## 实用技巧

1. 类型守卫
2. 映射类型
3. 条件类型

## 总结

遵循这些最佳实践可以让你的 TypeScript 代码更加健壮。`,
    cover_image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    author: '李四'
  },
  {
    title: 'Tailwind CSS 深度使用技巧',
    slug: 'tailwind-css-advanced-tips',
    excerpt: 'Tailwind CSS 已经成为最流行的原子化 CSS 框架。本文分享一些高级使用技巧，让你更高效地使用 Tailwind。',
    content: `# Tailwind CSS 深度使用技巧

Tailwind CSS 已经成为最流行的原子化 CSS 框架。

## 自定义配置

tailwind.config.js 高级配置...

## 响应式设计

移动优先策略...

## 动画和过渡

实用的动画技巧...

## 性能优化

如何减少 CSS 体积...

## 总结

掌握这些技巧，你将成为 Tailwind 高手。`,
    cover_image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800',
    author: '王五'
  },
  {
    title: 'Vite 为什么比 Webpack 快？',
    slug: 'why-vite-is-faster-than-webpack',
    excerpt: 'Vite 凭借极快的开发服务器和优化的构建速度，迅速成为前端开发的热门选择。本文深入分析其性能优势。',
    content: `# Vite 为什么比 Webpack 快？

Vite 凭借极快的开发服务器速度迅速流行。

## 开发服务器

ES 原生模块...

## 构建优化

Rollup 的优势...

## 热更新

极速的热更新机制...

## 对比测试

性能数据对比...

## 总结

Vite 的优势明显，值得尝试。`,
    cover_image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
    author: '赵六'
  },
  {
    title: '前端性能优化完整指南',
    slug: 'frontend-performance-optimization-guide',
    excerpt: '性能优化是前端开发的重要话题。本文从加载性能、渲染性能、网络优化等多个维度，提供完整的优化方案。',
    content: `# 前端性能优化完整指南

性能优化是前端开发的重要话题。

## 加载性能

### 代码分割

路由级别的代码分割...

### 懒加载

图片懒加载、组件懒加载...

## 渲染性能

### 虚拟列表

长列表性能优化...

### 防抖和节流

合理使用防抖和节流...

## 网络优化

### CDN 加速

静态资源优化...

### HTTP 缓存

缓存策略设计...

## 监控和分析

Lighthouse、Performance API...

## 总结

性能优化需要持续关注和改进。`,
    cover_image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800',
    author: '孙七'
  }
];

// 标签数据
const tagsData = [
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Tailwind CSS', slug: 'tailwind-css' },
  { name: 'Vite', slug: 'vite' },
  { name: '性能优化', slug: 'performance' },
  { name: '前端开发', slug: 'frontend' },
  { name: '最佳实践', slug: 'best-practices' }
];

// 文章和标签的关联关系
const articleTagsData = [
  { articleSlug: 'react-19-new-features', tagSlug: 'react' },
  { articleSlug: 'react-19-new-features', tagSlug: 'frontend' },
  { articleSlug: 'typescript-best-practices', tagSlug: 'typescript' },
  { articleSlug: 'typescript-best-practices', tagSlug: 'best-practices' },
  { articleSlug: 'tailwind-css-advanced-tips', tagSlug: 'tailwind-css' },
  { articleSlug: 'tailwind-css-advanced-tips', tagSlug: 'best-practices' },
  { articleSlug: 'why-vite-is-faster-than-webpack', tagSlug: 'vite' },
  { articleSlug: 'why-vite-is-faster-than-webpack', tagSlug: 'performance' },
  { articleSlug: 'frontend-performance-optimization-guide', tagSlug: 'performance' },
  { articleSlug: 'frontend-performance-optimization-guide', tagSlug: 'frontend' }
];

async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...');

  try {
    // 清空现有数据
    await dbRun('DELETE FROM article_tags');
    await dbRun('DELETE FROM tags');
    await dbRun('DELETE FROM articles');
    console.log('🧹 Cleared existing data');

    // 插入标签
    const tagIds = {};
    for (const tag of tagsData) {
      const result = await dbRun('INSERT INTO tags (name, slug) VALUES (?, ?)', [tag.name, tag.slug]);
      tagIds[tag.slug] = result.id;
    }
    console.log(`✅ Inserted ${tagsData.length} tags`);

    // 插入文章
    const articleIds = {};
    for (const article of articlesData) {
      const result = await dbRun(
        `INSERT INTO articles (title, slug, excerpt, content, cover_image, author)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [article.title, article.slug, article.excerpt, article.content, article.cover_image, article.author]
      );
      articleIds[article.slug] = result.id;
    }
    console.log(`✅ Inserted ${articlesData.length} articles`);

    // 插入文章标签关联
    for (const relation of articleTagsData) {
      await dbRun(
        'INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)',
        [articleIds[relation.articleSlug], tagIds[relation.tagSlug]]
      );
    }
    console.log(`✅ Inserted ${articleTagsData.length} article-tag relations`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   - Articles: ${articlesData.length}`);
    console.log(`   - Tags: ${tagsData.length}`);
    console.log(`   - Relations: ${articleTagsData.length}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
seedDatabase()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

export default seedDatabase;
