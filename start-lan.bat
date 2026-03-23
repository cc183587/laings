@echo off
chcp 65001 >nul
echo ========================================
echo   博客系统 - 局域网访问启动脚本
echo ========================================
echo.

REM 获取本机 IP 地址
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
  set IP=%%a
  goto :found_ip
)
:found_ip
set IP=%IP: =%
echo [1/5] 本机 IP 地址: %IP%
echo.

echo [2/5] 启动后端服务器...
cd /d "%~dp0blog-backend"
start "Blog Backend" cmd /k "npm run dev"
timeout /t 3 >nul

echo [3/5] 启动前端服务器...
cd /d "%~dp0blog"
start "Blog Frontend" cmd /k "npm run dev"
timeout /t 3 >nul

echo.
echo ========================================
echo   启动完成!
echo ========================================
echo.
echo 访问地址:
echo   本机访问: http://localhost:5173
echo   局域网访问: http://%IP%:5173
echo.
echo 后端 API:
echo   本机访问: http://localhost:3001
echo   局域网访问: http://%IP%:3001
echo.
echo 重要提示:
echo 1. 确保手机和电脑连接同一个 WiFi/路由器
echo 2. Windows 防火墙可能需要允许 Node.js 访问
echo 3. 保持电脑开机,不要关闭这些黑框框
echo.
echo 按任意键关闭此窗口...
pause >nul
