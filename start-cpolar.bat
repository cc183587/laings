@echo off
chcp 65001 >nul
echo ====================================
echo   内网穿透启动 - cpolar
echo ====================================
echo.
echo 启动内网穿透前，请确保：
echo 1. 已安装 cpolar
echo 2. 已登录 cpolar（cpolar authtoken 你的token）
echo 3. 本地服务器已启动（python -m http.server 8080）
echo.
echo ====================================
echo.

cpolar http 8080

pause
