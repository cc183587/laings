@echo off
chcp 65001 >nul
echo ====================================
echo 博客系统启动脚本
echo ====================================
echo.

echo [1/4] 检查 Node.js 环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 错误: 未检测到 Node.js，请先安装 Node.js 20+
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js 已安装
echo.

echo [2/4] 启动后端服务器...
cd blog-backend
if not exist "node_modules" (
    echo 📦 首次运行，正在安装后端依赖...
    call npm install
    echo.
    echo 📝 初始化数据库...
    call npm run init-db
    echo.
    echo 🌱 填充示例数据...
    call npm run seed-db
    echo.
)
start "Blog Backend" cmd /k "npm run dev"
echo ✅ 后端服务器已启动在 http://localhost:3001
echo.
cd ..

echo [3/4] 等待后端服务器启动...
timeout /t 3 /nobreak >nul
echo.

echo [4/4] 启动前端服务器...
cd blog
if not exist "node_modules" (
    echo 📦 首次运行，正在安装前端依赖...
    call npm install
    echo.
)
start "Blog Frontend" cmd /k "npm run dev"
echo ✅ 前端服务器已启动在 http://localhost:5173
cd ..

echo.
echo ====================================
echo 🎉 启动完成！
echo ====================================
echo.
echo 📍 前端地址: http://localhost:5173
echo 📍 后端地址: http://localhost:3001
echo 📍 API 文档: 查看 README-BACKEND.md
echo.
echo 提示:
echo - 关闭命令窗口可停止对应服务
echo - 按 Ctrl+C 可停止此脚本
echo.
pause
