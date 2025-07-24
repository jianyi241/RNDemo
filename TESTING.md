# React Native 测试指南

## 概述

这个项目使用 Jest 和 @testing-library/react-native 进行测试。

## 运行测试

```bash
# 运行所有测试
yarn test

# 运行测试并监听文件变化
yarn test --watch

# 运行特定测试文件
yarn test App.test.tsx

# 生成覆盖率报告
yarn test --coverage
```

## 测试文件结构

```
__tests__/
├── App.test.tsx          # 主应用测试
├── components.test.tsx    # 组件测试示例
└── ...
```

## 编写测试

### 基本组件测试

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, TouchableOpacity, View } from 'react-native';

const MyComponent = ({ onPress, title }: { onPress: () => void; title: string }) => (
  <View testID="my-component">
    <Text testID="title">{title}</Text>
    <TouchableOpacity testID="button" onPress={onPress}>
      <Text>Click me</Text>
    </TouchableOpacity>
  </View>
);

describe('MyComponent', () => {
  test('renders with correct title', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <MyComponent onPress={mockOnPress} title="Test Title" />
    );

    expect(getByTestId('title')).toHaveTextContent('Test Title');
  });

  test('calls onPress when button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <MyComponent onPress={mockOnPress} title="Test Title" />
    );

    fireEvent.press(getByTestId('button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

### 异步组件测试

```typescript
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';

const AsyncComponent = ({ onLoad }: { onLoad: (data: string) => void }) => {
  React.useEffect(() => {
    setTimeout(() => {
      onLoad('loaded data');
    }, 100);
  }, [onLoad]);

  return <View><Text>Loading...</Text></View>;
};

test('calls onLoad after component mounts', async () => {
  const mockOnLoad = jest.fn();
  render(<AsyncComponent onLoad={mockOnLoad} />);

  await waitFor(() => {
    expect(mockOnLoad).toHaveBeenCalledWith('loaded data');
  });
});
```

## 测试工具函数

### render
渲染组件并返回测试工具函数。

### fireEvent
模拟用户交互事件：
- `fireEvent.press(element)` - 点击事件
- `fireEvent.changeText(element, text)` - 文本输入
- `fireEvent.scroll(element, eventData)` - 滚动事件

### waitFor
等待异步操作完成。

### 查询函数
- `getByTestId(testId)` - 通过 testID 查找元素
- `getByText(text)` - 通过文本内容查找元素
- `getByPlaceholderText(text)` - 通过占位符文本查找元素
- `queryByTestId(testId)` - 类似 getByTestId，但找不到时返回 null
- `findByTestId(testId)` - 异步查找元素

## 最佳实践

1. **使用 testID**：为重要元素添加 testID 属性
2. **Mock 原生模块**：在 jest.setup.js 中 mock 原生模块
3. **测试用户行为**：测试用户如何与组件交互
4. **避免测试实现细节**：关注组件的行为而不是内部实现
5. **使用描述性的测试名称**：让测试名称清楚地描述测试内容

## 配置

测试配置在以下文件中：
- `jest.config.js` - Jest 主配置
- `jest.setup.js` - 测试环境设置和 mock

## 常见问题

### 原生模块错误
如果遇到原生模块错误，确保在 `jest.setup.js` 中添加了相应的 mock。

### 导航测试
对于 React Navigation 组件，使用提供的 mock 配置。

### 异步测试
使用 `waitFor` 来处理异步操作，避免使用 `setTimeout`。
