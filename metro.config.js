// metro.config.js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resetCache: true,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'json', 'cjs'],
        getSourceMap: true,
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