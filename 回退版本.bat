@echo off
chcp 65001 >nul
cd /d "c:\Users\J.s\WorkBuddy\20260323021915"
echo 正在回退到 cc43c77...
git reset --hard cc43c775
echo.
echo 当前版本：
git log --oneline -1
pause
