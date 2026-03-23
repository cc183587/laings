# Blog Backend API

基于 SQLite 和 Node.js (Express) 的博客后端 API 服务。

## 技术栈

- **Node.js** + **Express** - Web 服务器框架
- **better-sqlite3** - SQLite 数据库驱动
- **CORS** - 跨域资源共享支持
- **ES Modules** - 现代化模块系统

## 快速开始

### 1. 安装依赖

```bash
cd blog-backend
npm install
```

### 2. 初始化数据库

```bash
npm run init-db
```

### 3. 填充示例数据

```bash
npm run seed-db
```

### 4. 启动服务器

```bash
# 开发模式（支持热重载）
npm run dev

# 生产模式
npm start
```

服务器将在 http://localhost:3001 启动

## API 端点

### 文章 API

#### 获取所有文章
```
GET /api/articles
```

查询参数：
- `tag` - 按标签筛选
- `search` - 搜索关键词
- `limit` - 每页数量（默认 20）
- `offset` - 偏移量（默认 0）

示例：
```bash
GET /api/articles?tag=react&limit=10
GET /api/articles?search=typescript
```

#### 获取单篇文章
```
GET /api/articles/:slug
```

示例：
```bash
GET /api/articles/react-19-new-features
```

#### 创建文章
```
POST /api/articles
```

请求体：
```json
{
  "title": "文章标题",
  "slug": "article-slug",
  "excerpt": "文章摘要",
  "content": "文章内容",
  "cover_image": "封面图片 URL",
  "author": "作者",
  "tags": ["react", "frontend"]
}
```

#### 更新文章
```
PUT /api/articles/:id
```

#### 删除文章
```
DELETE /api/articles/:id
```

#### 获取统计信息
```
GET /api/articles/stats/overview
```

响应：
```json
{
  "total_articles": 5,
  "total_views": 123,
  "total_tags": 7,
  "popular_articles": [...]
}
```

### 标签 API

#### 获取所有标签
```
GET /api/tags
```

#### 获取单个标签
```
GET /api/tags/:slug
```

#### 创建标签
```
POST /api/tags
```

请求体：
```json
{
  "name": "React",
  "slug": "react"
}
```

#### 删除标签
```
DELETE /api/tags/:id
```

### 健康检查
```
GET /health
```

## 数据库结构

### articles 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| title | TEXT | 文章标题 |
| slug | TEXT | URL 友好标识 |
| excerpt | TEXT | 文章摘要 |
| content | TEXT | 文章内容（Markdown） |
| cover_image | TEXT | 封面图片 URL |
| author | TEXT | 作者 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |
| views | INTEGER | 阅读量 |

### tags 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 主键 |
| name | TEXT | 标签名称 |
| slug | TEXT | URL 友好标识 |

### article_tags 表

| 字段 | 类型 | 说明 |
|------|------|------|
| article_id | INTEGER | 文章 ID（外键） |
| tag_id | INTEGER | 标签 ID（外键） |

## 环境变量

在 `.env` 文件中配置：

```
PORT=3001
DATABASE_PATH=./database/blog.db
CORS_ORIGIN=http://localhost:5173
```

## 前端集成

前端使用 `fetch` 或 `axios` 调用 API：

```javascript
// 获取文章列表
fetch('http://localhost:3001/api/articles')
  .then(res => res.json())
  .then(data => console.log(data));

// 获取单篇文章
fetch('http://localhost:3001/api/articles/react-19-new-features')
  .then(res => res.json())
  .then(data => console.log(data));
```

## 开发说明

### 数据库管理

- 数据库文件位置：`./database/blog.db`
- 使用 SQLite 客户端工具（如 DB Browser for SQLite）可以直接查看数据库

### 添加新 API

1. 在 `routes/` 目录创建路由文件
2. 在 `server.js` 中导入并注册路由

### 示例数据

运行 `npm run seed-db` 会填充 5 篇示例文章和 7 个标签。

## 部署

### 部署到 Vercel

1. 安装 `vercel` CLI
2. 运行 `vercel`
3. 配置环境变量

### 部署到自己的服务器

1. 使用 PM2 管理进程
2. 配置 Nginx 反向代理
3. 使用 HTTPS

## 许可证

MIT
