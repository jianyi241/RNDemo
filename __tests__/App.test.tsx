/**
 * @format
 * App 组件的测试文件
 * 测试主应用组件的基本功能和渲染
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';

/**
 * App 组件的测试套件
 * 包含对主应用组件的各种测试用例
 */
describe('App', () => {
  /**
   * 测试应用能够正确渲染
   * 这是最基本的测试，确保应用不会崩溃
   */
  test('renders correctly', () => {
    // 渲染 App 组件
    const { getByTestId } = render(<App />);
    
    // 验证 getByTestId 函数存在，说明组件已成功渲染
    expect(getByTestId).toBeDefined();
  });

  /**
   * 测试应用渲染时不会崩溃
   * 这是一个额外的安全检查
   */
  test('app renders without crashing', () => {
    // 渲染 App 组件
    const { getByTestId } = render(<App />);
    
    // 验证组件能够正常渲染
    expect(getByTestId).toBeDefined();
  });

  /**
   * 测试应用包含导航结构
   * 验证 React Navigation 的堆栈导航器是否正确配置
   */
  test('app has navigation structure', () => {
    // 渲染 App 组件
    const { getByTestId } = render(<App />);
    
    // 检查是否存在堆栈导航器（在 jest.setup.js 中 mock 的 testID）
    // 如果找不到元素，getByTestId 会抛出异常，所以用 not.toThrow() 验证
    expect(() => getByTestId('stack-navigator')).not.toThrow();
  });
});
