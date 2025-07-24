/**
 * Jest 配置文件
 * 用于配置 React Native 项目的测试环境
 */

module.exports = {
  // 使用 React Native 预设，包含基本的 React Native 测试配置
  preset: 'react-native',
  
  // 指定 Jest 可以处理的文件扩展名
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
  // 配置哪些 node_modules 需要被 Babel 转换
  // 默认情况下，node_modules 中的文件不会被转换
  // 这里指定需要转换的 React Native 相关包
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-gesture-handler|react-native-reanimated|react-native-screens|react-native-safe-area-context|react-native-webview)/)',
  ],
  
  // 在测试环境设置后运行的额外设置文件
  // 用于配置 @testing-library/jest-native 的扩展匹配器
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  
  // 指定测试环境为 node（而不是 jsdom）
  // 这对于 React Native 测试是必需的
  testEnvironment: 'node',
  
  // 模块名称映射，用于处理静态资源文件
  moduleNameMapper: {
    // 将所有静态资源文件（图片、字体、音频等）映射到 mock 文件
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    // 将 CSS 相关文件映射到 identity-obj-proxy（返回文件路径作为类名）
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  
  // 指定要忽略的测试路径
  testPathIgnorePatterns: [
    '/node_modules/',  // 忽略 node_modules 目录
    '/android/',       // 忽略 Android 相关文件
    '/ios/',          // 忽略 iOS 相关文件
  ],
  
  // 指定要收集覆盖率信息的文件
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',  // src 目录下的所有 TypeScript 文件
    '!src/**/*.d.ts',     // 排除类型声明文件
    '!src/**/index.ts',   // 排除 index.ts 文件
  ],
  
  // 指定在测试运行前执行的设置文件
  // 用于 mock 原生模块和设置全局测试环境
  setupFiles: ['<rootDir>/jest.setup.js'],
};
