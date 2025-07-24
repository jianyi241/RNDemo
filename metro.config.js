// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resetCache: true,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
        nonInlinedRequires: [
          "@react-native-async-storage/async-storage",
          'React',
          'react',
          'react-native',
        ],
      },
    }),
  },
  server: {
    port: 8081,
    host: '0.0.0.0', // 允许所有网络接口
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // 解决跨域问题
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return middleware(req, res, next);
      };
    }
  }
};

module.exports = mergeConfig(defaultConfig, config);