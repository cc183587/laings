@echo off
chcp 65001 >nul
echo ====================================
echo   工厂产量系统 - 一键启动
echo ====================================
echo.
echo 正在启动本地服务器和内网穿透...
echo.
echo [1/2] 启动本地服务器...
start "本地服务器" cmd /k "cd /d %~dp0 && python -m http.server 8080"

timeout /t 2 >nul

echo [2/2] 启动内网穿透...
start "内网穿透" cmd /k "cpolar http 8080"

timeout /t 3 >nul

echo.
echo ====================================
echo   启动完成！
echo ====================================
echo.
echo 电脑访问：http://localhost:8080/
echo 手机访问：等待 cpolar 生成 URL 后复制
echo.
echo 不要关闭任何黑色窗口！
echo ====================================
echo.
pause
