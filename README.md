# RN Demo 应用

这是一个简单的 React Native 演示应用，包含登录页面和首页。

## 功能特性

- 登录页面：用户名/密码验证
- 首页：展示用户信息和应用数据
- 页面导航

## 安装与运行

### 前提条件

- Node.js 18 或更高版本
- React Native 开发环境

### 安装步骤

1. 克隆项目到本地

```bash
git clone <项目地址>
cd RNDemo
```

2. 安装依赖

```bash
yarn install
```

3. 安装导航相关依赖

```bash
yarn add @react-navigation/native @react-navigation/stack react-native-screens react-native-safe-area-context
```

4. 启用完整导航功能

编辑 `App.tsx` 文件，取消注释以下部分：

```javascript
// 导入AppNavigator（注释掉，直到安装依赖）
import AppNavigator from './src/navigation/AppNavigator';

// ...

// 完整导航方案
return (
  <SafeAreaProvider>
    <AppNavigator />
  </SafeAreaProvider>
);
```

5. 运行应用

```bash
# iOS
yarn ios

# Android
yarn android
```

## 登录信息

- 用户名: admin
- 密码: 123123

## 项目结构

```
src/
  ├── components/     # 可复用组件
  ├── navigation/     # 导航配置
  └── screens/        # 页面组件
      ├── LoginScreen.tsx  # 登录页面
      └── HomeScreen.tsx   # 首页
```

## 注意事项

- 本项目需要 Node.js 18+ 版本
- 如果遇到 Metro 服务器启动问题，可以尝试 `yarn start --reset-cache`
# RNDemo
