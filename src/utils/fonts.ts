import { Platform } from 'react-native';

// 字体配置
export const fonts = {
  // Android 字体配置
  android: {
    regular: 'DroidSansFallback',
    bold: 'DroidSansFallback',
    light: 'DroidSansFallback',
    medium: 'DroidSansFallback',
    thin: 'DroidSansFallback',
  },
  // iOS 字体配置（保持系统默认）
  ios: {
    regular: undefined,
    bold: undefined,
    light: undefined,
    medium: undefined,
    thin: undefined,
  },
};

// 获取当前平台的字体
export const getFontFamily = (weight: keyof typeof fonts.android = 'regular') => {
  return Platform.select({
    android: fonts.android[weight],
    ios: fonts.ios[weight],
  });
};

// 创建字体样式
export const createFontStyle = (weight: keyof typeof fonts.android = 'regular') => ({
  fontFamily: getFontFamily(weight),
});

// 常用字体样式
export const fontStyles = {
  regular: createFontStyle('regular'),  bold: createFontStyle('bold'),
  light: createFontStyle('light'),
  medium: createFontStyle('medium'),  thin: createFontStyle('thin'),
}; 