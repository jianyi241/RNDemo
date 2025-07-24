/**
 * @format
 * 组件测试示例文件
 * 展示如何测试 React Native 组件的各种场景
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';

/**
 * 示例组件：包含标题和按钮的简单组件
 * 用于演示基本的组件测试
 */
const ExampleComponent = ({ onPress, title }: { onPress: () => void; title: string }) => (
  <View testID="example-component">
    <Text testID="title">{title}</Text>
    <TouchableOpacity testID="button" onPress={onPress}>
      <Text>Click me</Text>
    </TouchableOpacity>
  </View>
);

/**
 * 异步组件示例：模拟数据加载的组件
 * 用于演示异步组件和 useEffect 的测试
 */
const AsyncComponent = ({ onLoad }: { onLoad: (data: string) => void }) => {
  React.useEffect(() => {
    // 模拟异步数据加载
    setTimeout(() => {
      onLoad('loaded data');
    }, 100);
  }, [onLoad]);

  return (
    <View testID="async-component">
      <Text>Loading...</Text>
    </View>
  );
};

/**
 * 组件测试示例的测试套件
 * 展示不同类型的组件测试方法
 */
describe('Component Testing Examples', () => {
  /**
   * ExampleComponent 的测试套件
   * 演示基本组件的测试方法
   */
  describe('ExampleComponent', () => {
    /**
     * 测试组件是否正确渲染标题
     * 验证 props 传递和文本显示
     */
    test('renders with correct title', () => {
      // 创建 mock 函数，用于验证回调是否被调用
      const mockOnPress = jest.fn();
      
      // 渲染组件，传入测试 props
      const { getByTestId } = render(
        <ExampleComponent onPress={mockOnPress} title="Test Title" />
      );

      // 验证标题文本是否正确显示
      expect(getByTestId('title')).toHaveTextContent('Test Title');
    });

    /**
     * 测试按钮点击事件
     * 验证用户交互和回调函数调用
     */
    test('calls onPress when button is pressed', () => {
      // 创建 mock 函数
      const mockOnPress = jest.fn();
      
      // 渲染组件
      const { getByTestId } = render(
        <ExampleComponent onPress={mockOnPress} title="Test Title" />
      );

      // 模拟用户点击按钮
      fireEvent.press(getByTestId('button'));
      
      // 验证回调函数被调用了一次
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    /**
     * 测试组件结构
     * 验证所有必要的元素都存在
     */
    test('renders component structure correctly', () => {
      const mockOnPress = jest.fn();
      
      // 渲染组件
      const { getByTestId } = render(
        <ExampleComponent onPress={mockOnPress} title="Test Title" />
      );

      // 验证所有必要的元素都存在
      expect(getByTestId('example-component')).toBeTruthy();  // 根容器
      expect(getByTestId('title')).toBeTruthy();              // 标题元素
      expect(getByTestId('button')).toBeTruthy();             // 按钮元素
    });
  });

  /**
   * AsyncComponent 的测试套件
   * 演示异步组件和 useEffect 的测试方法
   */
  describe('AsyncComponent', () => {
    /**
     * 测试异步数据加载
     * 验证 useEffect 和异步操作
     */
    test('calls onLoad after component mounts', async () => {
      // 创建 mock 函数
      const mockOnLoad = jest.fn();
      
      // 渲染组件
      render(<AsyncComponent onLoad={mockOnLoad} />);

      // 等待异步操作完成，验证回调被正确调用
      await waitFor(() => {
        expect(mockOnLoad).toHaveBeenCalledWith('loaded data');
      });
    });

    /**
     * 测试初始渲染状态
     * 验证组件在数据加载前显示正确的加载文本
     */
    test('renders loading text initially', () => {
      const mockOnLoad = jest.fn();
      
      // 渲染组件
      const { getByText } = render(<AsyncComponent onLoad={mockOnLoad} />);

      // 验证初始状态显示加载文本
      expect(getByText('Loading...')).toBeTruthy();
    });
  });
});
