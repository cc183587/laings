@echo off
chcp 65001 >nul
echo ====================================
echo    工厂产量系统 - 本地服务器
echo ====================================
echo.
echo 正在启动服务器...
echo.
echo 电脑访问地址：http://localhost:8080/factory.html
echo.
echo 手机访问地址（手机和电脑需连同一 Wi-Fi）：
echo 1. 先查电脑 IP：在黑色窗口输入 ipconfig 后回车
echo 2. 找到"IPv4 地址"（如 192.168.1.100）
echo 3. 手机访问：http://192.168.31.194:8080/factory.html
echo.
echo 按 Ctrl+C 可停止服务器
echo ====================================
echo.

python -m http.server 8080

pause
