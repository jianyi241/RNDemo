import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import StatusBarExample from '../screens/StatusBarExample';
import StatusBarGuide from '../components/StatusBarGuide';
import StatusBarTest from '../components/StatusBarTest';
import TestScreen from '../screens/TestScreen';
import DebugScreen from '../screens/DebugScreen';
import ModalExample from '../screens/ModalExample';
import ModalGuide from '../components/ModalGuide';
import FlexLayoutExample from '../screens/FlexLayoutExample';
import SafeViewDemo from '../screens/SafeViewDemo'
import SectionList from '../screens/SectionList'
import FlatList from '../screens/FlatList'
import AnimatedExample from '../screens/AnimatedExample'
import Examples from '../screens/Examples/Examples'
import Dimensions from '../screens/Dimensions'
import WebViewExample from '../screens/WebViewExample'
import BlackLineTest from '../screens/BlackLineTest'
import SimpleHomeTest from '../screens/SimpleHomeTest'
import GestureTest from '../screens/GestureTest'
import BlackLineMonitor from '../screens/BlackLineMonitor'
import ImageUploadExample from '../screens/ImageUploadExample'
import PlatformDifferences from '../screens/PlatformDifferences'
import { forceTouchGestureHandlerProps } from 'react-native-gesture-handler/lib/typescript/handlers/ForceTouchGestureHandler';


export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  StatusBarExample: undefined;
  StatusBarGuide: undefined;
  StatusBarTest: undefined;
  Test: undefined;
  Debug: undefined;
  ModalExample: undefined;
  ModalGuide: undefined;
  FlexLayoutExample: undefined;
  SafeViewDemo: undefined;
  SectionList: undefined;
  FlatList: undefined;
  AnimatedExample: undefined;
  Examples: undefined;
  Dimensions: undefined;
  WebViewExample: undefined;
  BlackLineTest: undefined;
  SimpleHomeTest: undefined;
  GestureTest: undefined;
  BlackLineMonitor: undefined;
  ImageUploadExample: undefined;
  PlatformDifferences: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          // 启用手势导航
          gestureEnabled: true,
          // 设置转场模式，使用 card 模式保持全屏和手势
          presentation: 'card',
          // 设置整体白色背景色
          cardStyle: { backgroundColor: '#fff' },
          // 设置头部样式
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // 使用优化的转场动画
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 200,
                easing: (t: number) => Math.pow(t, 0.8), // 使用幂函数，避免抖动
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 200,
                easing: (t: number) => Math.pow(t, 0.8), // 使用幂函数，避免抖动
              },
            },
          },
          // 设置手势响应距离
          gestureResponseDistance: 50,
          // 使用优化的卡片样式插值器
          // cardStyleInterpolator: ({ current, layouts }) => ({
          //   cardStyle: {
          //     transform: [
          //       {
          //         translateX: current.progress.interpolate({
          //           inputRange: [0, 1],
          //           outputRange: [layouts.screen.width, 0],
          //         }),
          //       },
          //     ],
          //     opacity: current.progress.interpolate({
          //       inputRange: [0, 1],
          //       outputRange: [0, 1],
          //     }),
          //   },
          //   overlayStyle: {
          //     opacity: current.progress.interpolate({
          //       inputRange: [0, 1],
          //       outputRange: [0, 0.5],
          //     }),
          //   },
          // }),
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            // 禁用手势导航
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            // 禁用手势导航
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="StatusBarExample"
          component={StatusBarExample}
          options={{
            title: 'StatusBar 示例',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="StatusBarGuide"
          component={StatusBarGuide}
          options={{
            title: 'StatusBar 指南',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="StatusBarTest"
          component={StatusBarTest}
          options={{
            title: 'StatusBar 测试',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Test"
          component={TestScreen}
          options={{
            title: '测试页面',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Debug"
          component={DebugScreen}
          options={{
            title: '调试页面',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="ModalExample"
          component={ModalExample}
          options={{
            title: 'Modal 示例',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="ModalGuide"
          component={ModalGuide}
          options={{
            title: 'Modal 指南',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="FlexLayoutExample"
          component={FlexLayoutExample}
          options={{
            title: 'Flex 布局示例',
            headerShown: true,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SafeViewDemo"
          component={SafeViewDemo}
          options={{
            title: 'SafeViewDemo',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="SectionList"
          component={SectionList}
          options={{
            title: 'SectionList',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="FlatList"
          component={FlatList}
          options={{
            title: 'FlatList',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="AnimatedExample"
          component={AnimatedExample}
          options={{
            title: 'Animated 动画示例',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Dimensions"
          component={Dimensions}
          options={{
            title: 'Dimensions',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="Examples"
          component={Examples}
          options={{
            title: '组件示例集合',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="WebViewExample"
          component={WebViewExample}
          options={{
            title: 'WebView 示例',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="BlackLineTest"
          component={BlackLineTest}
          options={{
            title: '黑线问题测试',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="SimpleHomeTest"
          component={SimpleHomeTest}
          options={{
            title: '简化首页测试',
            headerShown: true
          }}
        />
        <Stack.Screen
          name="GestureTest"
          component={GestureTest}
          options={{
            title: '手势功能测试',
            headerShown: true
          }}
        />
              <Stack.Screen
        name="BlackLineMonitor" 
        component={BlackLineMonitor} 
        options={{ 
          title: '黑线问题监控',
          headerShown: true 
        }} 
      />
      <Stack.Screen
        name="ImageUploadExample" 
        component={ImageUploadExample} 
        options={{ 
          title: '图片上传示例',
          headerShown: true 
        }} 
      />
      <Stack.Screen
        name="PlatformDifferences" 
        component={PlatformDifferences} 
        options={{ 
          title: '平台差异',
          headerShown: true 
        }} 
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 