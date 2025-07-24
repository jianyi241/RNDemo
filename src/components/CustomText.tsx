import React from 'react';
import { Text, TextProps, Platform } from 'react-native';
import { getFontFamily } from '../utils/fonts.ts'; // 导入字体工具函数

interface CustomTextProps extends TextProps {
  weight?: 'regular' | 'bold' | 'light' | 'medium' | 'thin';
}

const CustomText: React.FC<CustomTextProps> = ({ 
  children, 
  style, 
  weight = 'regular',
  ...props 
}) => {
  const fontFamily = getFontFamily(weight);
  
  return (
    <Text
      {...props}
      style={
        Platform.OS === 'android' && fontFamily ? { fontFamily } : style
      }
    >
      {children}
    </Text>
  );
};

export default CustomText; 