module.exports = {
  presets: [
    ['module:@react-native/babel-preset', {
      // 启用 tree shaking 和按需转换
      useBuiltIns: 'usage',
      corejs: 3,
    }]
  ],
  plugins: [
    'react-native-reanimated/plugin',
    
    // lodash 按需引用 - 只打包使用的方法
    ['lodash', {
      id: ['lodash', 'lodash/fp']
    }],
    
    // 环境变量按需加载
    ["module:react-native-dotenv", {
      "moduleName": "@env",
      "path": process.env.NODE_ENV === 'production' ? '.env.production' : 
              process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": true
    }],
    
    // 生产环境优化
    ...(process.env.NODE_ENV === 'production' ? [
      // 移除 console.log
      'transform-remove-console',
      // 移除 debugger 语句
      'transform-remove-debugger',
    ] : []),
  ],
};
