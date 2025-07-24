#!/bin/bash

echo "🧹 彻底重置 Android 环境..."

# 1. 停止所有相关进程
echo "🛑 停止所有相关进程..."
pkill -f "react-native start" 2>/dev/null
pkill -f "metro" 2>/dev/null
pkill -f "gradle" 2>/dev/null

# 2. 删除所有构建产物
echo "🗑️  删除构建产物..."
rm -rf android/build 2>/dev/null
rm -rf android/app/build 2>/dev/null
rm -rf android/.gradle 2>/dev/null
find android -name "*.bundle" -delete 2>/dev/null
find android -name "*.apk" -delete 2>/dev/null
find android -name "*.aab" -delete 2>/dev/null

# 3. 清理全局缓存
echo "🧹 清理全局缓存..."
rm -rf ~/.gradle/caches/ 2>/dev/null
rm -rf ~/.android/build-cache/ 2>/dev/null
rm -rf ~/.m2/repository/ 2>/dev/null

# 4. 重新安装依赖
echo "📦 重新安装依赖..."
rm -rf node_modules
yarn install

# 5. 清理 Android Studio 缓存
echo "🧹 清理 Android Studio 缓存..."
rm -rf ~/Library/Caches/AndroidStudio* 2>/dev/null
rm -rf ~/Library/Application\ Support/AndroidStudio*/caches 2>/dev/null

# 6. 重新构建 Android
echo "🔨 重新构建 Android..."
cd android
./gradlew clean
./gradlew assembleDebug
cd ..

echo "✅ Android 环境已彻底重置！"
echo "现在可以运行: yarn android"
echo "或者在 Android Studio 中运行项目" 