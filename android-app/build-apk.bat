@echo off
chcp 65001 >nul
title 构建 Android APK

echo ==========================================
echo   产量登记系统 - Android APK 构建工具
echo ==========================================
echo.

:: 检查 Java
java -version >nul 2>&1
if errorlevel 1 (
    echo [错误] 未找到 Java，请先安装 JDK 17
    echo 下载地址: https://adoptium.net/
    pause
    exit /b 1
)

:: 检查 Android SDK
if not defined ANDROID_SDK_ROOT (
    if exist "%LOCALAPPDATA%\Android\Sdk" (
        set ANDROID_SDK_ROOT=%LOCALAPPDATA%\Android\Sdk
    ) else (
        echo [错误] 未找到 Android SDK
        echo 请先安装 Android Studio: https://developer.android.com/studio
        pause
        exit /b 1
    )
)

echo [1/3] 正在构建 APK...
cd /d "%~dp0"

:: 使用 Gradle Wrapper 或本地 Gradle
if exist "gradlew.bat" (
    call gradlew.bat assembleDebug
) else (
    gradle assembleDebug
)

if errorlevel 1 (
    echo.
    echo [错误] 构建失败！
    pause
    exit /b 1
)

echo.
echo [2/3] 构建成功！
echo.

:: 复制 APK 到根目录
set APK_SOURCE=app\build\outputs\apk\debug\app-debug.apk
set APK_TARGET=..\产量登记系统.apk

if exist "%APK_SOURCE%" (
    copy /Y "%APK_SOURCE%" "%APK_TARGET%" >nul
    echo [3/3] APK 已复制到: %APK_TARGET%
    echo.
    echo ==========================================
    echo   构建完成！
    echo   文件: 产量登记系统.apk
    echo ==========================================
    echo.
    echo 安装方法:
    echo 1. 将 APK 文件传输到手机
    echo 2. 在手机上点击安装
    echo 3. 如提示未知来源，请允许安装
    echo.
) else (
    echo [错误] 未找到生成的 APK 文件
)

pause
