#!/bin/bash

# 开发环境重置脚本
# 用于在运行 bundle 命令后快速恢复到开发状态

echo "🧹 清理 bundle 文件..."
rm -rf ./build/bundle
rm -rf ./dest/bundle
rm -f android/app/src/main/assets/*.bundle

echo "🧹 清理 Android 构建缓存..."
cd android
./gradlew clean
cd ..

echo "🧹 清理 Metro 缓存..."
yarn start --reset-cache

echo "✅ 开发环境已重置！"
echo "现在可以运行: yarn android" 