/**
 * Jest 设置文件
 * 用于 Mock React Native 原生模块，使其能在 Node.js 测试环境中正常工作
 */

// Mock react-native-gesture-handler 手势处理库
// 这个库提供了各种手势识别功能，但在测试环境中无法正常工作
jest.mock('react-native-gesture-handler', () => {
  // 使用 React Native 的 View 组件作为替代
  const View = require('react-native/Libraries/Components/View/View');
  
  return {
    // 各种手势组件，全部替换为 View
    Swipeable: View,                    // 滑动组件
    DrawerLayout: View,                 // 抽屉布局
    State: {},                          // 手势状态常量
    ScrollView: View,                   // 滚动视图
    Slider: View,                       // 滑块组件
    Switch: View,                       // 开关组件
    TextInput: View,                    // 文本输入
    ToolbarAndroid: View,               // Android 工具栏
    ViewPagerAndroid: View,             // Android 页面视图
    DrawerLayoutAndroid: View,          // Android 抽屉布局
    WebView: View,                      // Web 视图
    
    // 各种手势处理器，全部替换为 View
    NativeViewGestureHandler: View,     // 原生视图手势处理器
    TapGestureHandler: View,            // 点击手势处理器
    FlingGestureHandler: View,          // 轻扫手势处理器
    ForceTouchGestureHandler: View,     // 压力触摸手势处理器
    LongPressGestureHandler: View,      // 长按手势处理器
    PanGestureHandler: View,            // 平移手势处理器
    PinchGestureHandler: View,          // 捏合手势处理器
    RotationGestureHandler: View,       // 旋转手势处理器
    
    State: {},                          // 手势状态
    Directions: {},                     // 手势方向
    
    // 高阶组件，用于包装需要手势功能的组件
    // 这里 mock 为直接返回原组件
    gestureHandlerRootHOC: jest.fn((el) => el),
    
    // 手势处理器根视图
    GestureHandlerRootView: View,
  };
});

// Mock react-native-reanimated 动画库
// 这个库提供了高性能的动画功能，但在测试环境中无法正常工作
jest.mock('react-native-reanimated', () => {
  // 使用 React Native 内置的动画辅助器作为替代
  const Reanimated = require('react-native/Libraries/Animated/NativeAnimatedHelper');
  
  // 禁用复杂的动画调用，避免测试环境中的错误
  Reanimated.default.call = () => {};
  
  return Reanimated;
});

// Mock react-native-screens 屏幕管理库
// 这个库用于优化 React Navigation 的性能，但在测试环境中无法正常工作
jest.mock('react-native-screens', () => {
  // 使用 React Native 的 View 组件作为替代
  const RNScreens = require('react-native/Libraries/Components/View/View');
  const { ScreenContainer } = RNScreens;
  
  return {
    // 屏幕容器和屏幕组件
    ScreenContainer,                      // 屏幕容器
    Screen: RNScreens,                   // 单个屏幕
    ScreenStack: RNScreens,              // 屏幕栈
    
    // 屏幕栈头部配置组件
    ScreenStackHeaderConfig: RNScreens,  // 头部配置
    ScreenStackHeaderSubview: RNScreens, // 头部子视图
    ScreenStackHeaderRightView: RNScreens, // 头部右侧视图
    ScreenStackHeaderLeftView: RNScreens,  // 头部左侧视图
    ScreenStackHeaderCenterView: RNScreens, // 头部中心视图
    ScreenStackHeaderSearchBarView: RNScreens, // 头部搜索栏视图
    ScreenStackHeaderBackButtonImage: RNScreens, // 头部返回按钮图片
    ScreenStackHeaderCustomView: RNScreens, // 头部自定义视图
    
    // 配置函数，mock 为空函数
    enableScreens: jest.fn(),            // 启用屏幕优化
    disableScreens: jest.fn(),           // 禁用屏幕优化
  };
});

// Mock @react-navigation/stack 堆栈导航器
// 这个库提供了堆栈导航功能，但在测试环境中需要特殊处理
jest.mock('@react-navigation/stack', () => {
  const React = require('react');
  const { View } = require('react-native');
  
  // 创建堆栈导航器的 mock 对象
  const Stack = {
    // 导航器组件，添加 testID 便于测试中查找
    Navigator: ({ children }) => React.createElement(View, { testID: 'stack-navigator' }, children),
    // 屏幕组件，添加 testID 便于测试中查找
    Screen: ({ children }) => React.createElement(View, { testID: 'stack-screen' }, children),
  };
  
  return {
    // 创建堆栈导航器的工厂函数
    createStackNavigator: () => Stack,
    
    // 过渡效果预设，用于配置屏幕切换动画
    TransitionPresets: {
      DefaultTransition: {},           // 默认过渡效果
      ModalTransition: {},             // 模态过渡效果
      ModalPresentationIOS: {},        // iOS 模态展示效果
      SlideFromRightIOS: {},          // iOS 从右侧滑入
      SlideFromBottomIOS: {},         // iOS 从底部滑入
      SlideFromBottomAndroid: {},     // Android 从底部滑入
      FadeTransition: {},             // 淡入淡出效果
      NoTransition: {},               // 无过渡效果
    },
  };
});

// Mock react-native-safe-area-context 安全区域上下文
// 这个库用于处理设备安全区域（如刘海屏、底部指示器等），在测试环境中需要 mock
jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  
  // 创建安全区域视图组件，将 props 传递给 View
  const SafeAreaView = ({ children, ...rest }) => React.createElement(View, rest, children);
  
  return {
    // 安全区域提供者，直接返回子组件
    SafeAreaProvider: ({ children }) => children,
    
    // 安全区域视图组件
    SafeAreaView,
    
    // Hook：获取安全区域的内边距
    // 返回模拟的安全区域值（顶部、右侧、底部、左侧都为 0）
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    
    // Hook：获取安全区域的框架信息
    // 返回模拟的屏幕尺寸（iPhone 12 的尺寸）
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 390, height: 844 }),
  };
});

// Mock react-native-webview Web 视图组件
// 这个库用于在应用中显示网页内容，在测试环境中替换为普通 View
jest.mock('react-native-webview', () => {
  const { View } = require('react-native');
  
  return {
    WebView: View,  // 将 WebView 替换为普通的 View 组件
  };
});

// Mock @react-native-async-storage/async-storage 异步存储
// 这个库用于本地数据存储，使用官方提供的测试 mock
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-image-picker 图片选择器
// 这个库用于从相机或图库选择图片，在测试环境中 mock 相关函数
jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),        // 启动相机功能，mock 为空函数
  launchImageLibrary: jest.fn(),  // 启动图库功能，mock 为空函数
}));

// Mock console 方法以减少测试中的噪音输出
// 在测试过程中，console 输出可能会干扰测试结果的查看
global.console = {
  ...console,           // 保留原有的 console 对象结构
  log: jest.fn(),      // Mock log 方法
  debug: jest.fn(),    // Mock debug 方法
  info: jest.fn(),     // Mock info 方法
  warn: jest.fn(),     // Mock warn 方法
  error: jest.fn(),    // Mock error 方法
};
