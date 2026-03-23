# 博客系统 - 快速开始指南

## 前置要求

- Node.js 20+（下载：https://nodejs.org/）
- Windows 系统（Mac/Linux 用户请参考 README-BACKEND.md）

## 一键启动（推荐）

1. **双击运行 `start.bat`**

   这个脚本会自动完成以下操作：
   - ✅ 检查 Node.js 环境
   - ✅ 安装后端依赖（首次运行）
   - ✅ 初始化数据库
   - ✅ 填充示例数据（5 篇文章 + 7 个标签）
   - ✅ 启动后端服务器（http://localhost:3001）
   - ✅ 安装前端依赖（首次运行）
   - ✅ 启动前端服务器（http://localhost:5173）

2. **打开浏览器访问**
   ```
   http://localhost:5173
   ```

3. **开始使用！** 🎉

---

## 手动启动

如果自动启动失败，可以手动执行以下步骤：

### 1. 启动后端

打开新的终端窗口（PowerShell 或 CMD）：

```bash
cd blog-backend
npm install
npm run init-db
npm run seed-db
npm run dev
```

看到以下提示表示启动成功：
```
🚀 Blog API server running on http://localhost:3001
📝 API endpoint: http://localhost:3001/api
🔍 Health check: http://localhost:3001/health
```

### 2. 启动前端

打开另一个新的终端窗口：

```bash
cd blog
npm install
npm run dev
```

看到以下提示表示启动成功：
```
  VITE v7.2.4  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. 访问博客

打开浏览器访问 http://localhost:5173

---

## 验证运行

### 检查后端
在浏览器访问：http://localhost:3001/health

应该看到：
```json
{
  "status": "ok",
  "message": "Blog API is running"
}
```

### 检查前端
在浏览器访问：http://localhost:5173

应该看到博客首页，包含 5 篇示例文章。

---

## 停止服务

- 关闭后端终端窗口：停止后端服务器
- 关闭前端终端窗口：停止前端服务器
- 如果使用 start.bat：直接关闭对应的命令窗口

---

## 常见问题

### 1. 端口被占用

**错误**：`Error: listen EADDRINUSE: address already in use :::3001`

**解决**：
```bash
# Windows 查找占用端口的进程
netstat -ano | findstr :3001

# 结束进程（替换 PID 为实际进程 ID）
taskkill /PID <PID> /F
```

### 2. Node.js 未安装

**错误**：`node: command not found`

**解决**：
1. 访问 https://nodejs.org/
2. 下载并安装 Node.js 20 LTS 或更高版本
3. 重新打开终端窗口

### 3. 数据库初始化失败

**解决**：
```bash
cd blog-backend
# 删除现有数据库（如果有）
del database\blog.db
# 重新初始化
npm run init-db
npm run seed-db
```

### 4. 前端无法连接后端

**症状**：前端显示"加载失败"或"请确保后端服务器正在运行"

**解决**：
1. 确认后端服务器正在运行（访问 http://localhost:3001/health）
2. 检查 `blog/.env` 文件中的 `VITE_API_BASE_URL` 是否正确
3. 检查后端 `blog-backend/.env` 中的 `CORS_ORIGIN` 是否包含前端地址

### 5. 依赖安装失败

**错误**：`npm ERR!` 或 `Cannot find module`

**解决**：
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

---

## 下一步

### 添加新文章

使用 API 添加：

```bash
curl -X POST http://localhost:3001/api/articles `
  -H "Content-Type: application/json" `
  -d "{
    \"title\": \"我的新文章\",
    \"slug\": \"my-new-article\",
    \"excerpt\": \"这是文章摘要\",
    \"content\": \"# 标题\\n\\n内容...\",
    \"author\": \"作者名\",
    \"tags\": [\"react\", \"tutorial\"]
  }"
```

或使用 DB Browser for SQLite 直接编辑数据库文件：
- 位置：`blog-backend/database/blog.db`

### 修改配置

**后端端口**：编辑 `blog-backend/.env`
```
PORT=3001
```

**前端 API 地址**：编辑 `blog/.env`
```
VITE_API_BASE_URL=http://localhost:3001
```

### 查看完整文档

- **完整文档**：README-BACKEND.md
- **后端 API**：blog-backend/README.md
- **前端文档**：blog/README.md

---

## 技术支持

遇到问题？

1. 检查终端的错误信息
2. 查看浏览器的开发者工具（F12）
3. 查看 README-BACKEND.md 中的"故障排查"部分
4. 确保 Node.js 版本为 20+

---

## 功能预览

### 前端功能
- ✅ 文章列表和详情
- ✅ 标签分类和筛选
- ✅ 搜索功能
- ✅ Markdown 渲染
- ✅ 响应式设计
- ✅ 暗黑模式

### 后端功能
- ✅ RESTful API
- ✅ 文章 CRUD
- ✅ 标签管理
- ✅ 搜索和筛选
- ✅ 统计信息
- ✅ SQLite 数据库

---

## 祝使用愉快！🎉

如有问题，请查看 README-BACKEND.md 获取详细文档。
