# 产量登记系统 - Android APP

## 构建方法

### 方法一：使用 Android Studio（推荐）

1. 安装 [Android Studio](https://developer.android.com/studio)
2. 打开本项目文件夹 `android-app`
3. 等待 Gradle 同步完成
4. 点击 `Build` -> `Build Bundle(s) / APK(s)` -> `Build APK(s)`
5. APK 文件会生成在 `app/build/outputs/apk/debug/app-debug.apk`

### 方法二：使用命令行（需要配置 Android SDK）

```bash
# 进入项目目录
cd android-app

# Linux/Mac
./gradlew assembleDebug

# Windows
gradlew.bat assembleDebug
```

生成的 APK 位置：`app/build/outputs/apk/debug/app-debug.apk`

## APP 说明

- **包名**: com.factory.app
- **应用名称**: 产量登记系统
- **目标网址**: https://cc183587.github.io/xiaos/redirect-page/
- **最低 Android 版本**: Android 5.0 (API 21)

## 功能

- WebView 加载产量登记系统网页
- 支持返回键返回上一页
- 支持缩放
- 支持本地存储
