# 博客项目 - SQLite + Node.js 后端方案

这是一个完整的个人博客系统，包含前端（React + TypeScript + Vite）和后端（Node.js + Express + SQLite）。

## 项目结构

```
workbuddy/
├── blog/                    # 前端项目
│   ├── src/
│   │   ├── components/     # UI 组件（shadcn/ui）
│   │   ├── pages/          # 页面组件
│   │   ├── services/       # API 服务层
│   │   ├── types/          # TypeScript 类型定义
│   │   └── data/           # 静态数据（已弃用，现使用 API）
│   └── package.json
│
├── blog-backend/            # 后端项目
│   ├── config/
│   │   └── database.js     # 数据库配置
│   ├── routes/
│   │   ├── articles.js     # 文章 API 路由
│   │   └── tags.js         # 标签 API 路由
│   ├── scripts/
│   │   ├── initDb.js       # 数据库初始化
│   │   └── seedDb.js       # 填充示例数据
│   ├── database/           # SQLite 数据库文件（运行后生成）
│   └── package.json
│
└── README-BACKEND.md       # 本文档
```

## 技术栈

### 前端
- **React 19.2.0** + **TypeScript 5.9.3**
- **Vite 7.2.4** - 构建工具
- **Tailwind CSS 3.4.19** - 样式框架
- **shadcn/ui** - UI 组件库
- **React Router 7.1.5** - 路由
- **React Markdown** - Markdown 渲染

### 后端
- **Node.js** + **Express 4.18.2**
- **better-sqlite3 9.2.2** - SQLite 数据库驱动
- **CORS** - 跨域支持
- **ES Modules** - 现代化模块系统

## 快速开始

### 前置要求

- Node.js 20+
- npm 或 yarn

### 1. 启动后端

```bash
cd blog-backend

# 安装依赖
npm install

# 初始化数据库
npm run init-db

# 填充示例数据
npm run seed-db

# 启动开发服务器
npm run dev
```

后端将在 http://localhost:3001 启动

### 2. 启动前端

```bash
cd blog

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端将在 http://localhost:5173 启动

### 3. 访问博客

打开浏览器访问 http://localhost:5173

## API 文档

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

#### 获取单篇文章
```
GET /api/articles/:slug
```

#### 创建文章
```
POST /api/articles
Content-Type: application/json

{
  "title": "文章标题",
  "slug": "article-slug",
  "excerpt": "文章摘要",
  "content": "文章内容（Markdown）",
  "cover_image": "封面图片 URL",
  "author": "作者",
  "tags": ["react", "frontend"]
}
```

#### 更新文章
```
PUT /api/articles/:id
Content-Type: application/json

{
  "title": "更新后的标题",
  ...
}
```

#### 删除文章
```
DELETE /api/articles/:id
```

#### 获取统计信息
```
GET /api/articles/stats/overview

Response:
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

Response:
[
  {
    "id": 1,
    "name": "React",
    "slug": "react",
    "article_count": 10
  }
]
```

#### 获取单个标签
```
GET /api/tags/:slug
```

#### 创建标签
```
POST /api/tags
Content-Type: application/json

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

Response:
{
  "status": "ok",
  "message": "Blog API is running"
}
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

## 功能特性

### 前端
- ✅ 响应式设计（移动端友好）
- ✅ 暗黑模式支持
- ✅ 文章列表和详情页
- ✅ 标签分类和筛选
- ✅ Markdown 渲染（支持代码高亮）
- ✅ 搜索功能
- ✅ 加载状态和错误处理
- ✅ 分享功能

### 后端
- ✅ RESTful API 设计
- ✅ SQLite 数据库（轻量级、易部署）
- ✅ 文章 CRUD 操作
- ✅ 标签管理
- ✅ 文章标签关联
- ✅ 搜索功能
- ✅ 阅读量统计
- ✅ CORS 支持

## 自定义配置

### 修改后端端口

编辑 `blog-backend/.env`:
```
PORT=3001
```

### 修改前端 API 地址

编辑 `blog/.env`:
```
VITE_API_BASE_URL=http://localhost:3001
```

### 添加新文章

通过 API 添加：

```bash
curl -X POST http://localhost:3001/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新文章标题",
    "slug": "new-article",
    "excerpt": "文章摘要",
    "content": "# 标题\n\n内容...",
    "author": "作者名",
    "tags": ["react", "tutorial"]
  }'
```

或直接在数据库中插入：

```bash
sqlite3 blog-backend/database/blog.db
```

## 部署

### 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

### 部署到自己的服务器

1. 使用 PM2 管理进程：
```bash
npm install -g pm2
pm2 start blog-backend/server.js --name blog-api
pm2 save
pm2 startup
```

2. 使用 Nginx 反向代理
3. 配置 HTTPS（Let's Encrypt）

### Docker 部署（可选）

创建 `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# 复制后端文件
COPY blog-backend/package*.json ./
RUN npm install --production
COPY blog-backend/ .

EXPOSE 3001

CMD ["node", "server.js"]
```

## 故障排查

### 后端启动失败

1. 检查端口是否被占用：
```bash
netstat -ano | findstr :3001
```

2. 检查数据库是否已初始化：
```bash
npm run init-db
```

### 前端无法连接后端

1. 确保后端服务器正在运行
2. 检查 CORS 配置
3. 检查 API 地址是否正确

### 数据库锁定

SQLite 可能会在并发写入时锁定。确保：
- 使用 better-sqlite3（已配置）
- 避免多个进程同时写入

## 开发建议

### 前端开发

1. 使用 TypeScript 提供的类型安全
2. 遵循 React Hooks 最佳实践
3. 组件化设计，保持单一职责

### 后端开发

1. 使用环境变量管理配置
2. 实现适当的错误处理
3. 考虑添加 API 文档（Swagger）
4. 添加日志记录

### 数据库管理

1. 定期备份数据库文件
2. 考虑使用 DB Browser for SQLite 查看数据
3. 生产环境考虑 PostgreSQL 或 MySQL

## 扩展功能建议

- [ ] 用户认证和授权
- [ ] 评论系统
- [ ] 图片上传功能
- [ ] SEO 优化
- [ ] RSS 订阅
- [ ] 文章草稿功能
- [ ] 管理后台
- [ ] 数据分析仪表板

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！
