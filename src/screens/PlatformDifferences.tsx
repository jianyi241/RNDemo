import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { getFontFamily } from '../utils/fonts';

const { width, height } = Dimensions.get('window');

const PlatformDifferences: React.FC = () => {
  const [shadowOpacity, setShadowOpacity] = useState(0.3);
  const [elevationValue, setElevationValue] = useState(5);
  const [textScale, setTextScale] = useState(1);

  // 1. 阴影差异
  const ShadowDifferences = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>1. 阴影效果差异</Text>
      <Text style={styles.description}>
        Android 使用 elevation，iOS 使用 shadowColor/shadowOffset/shadowOpacity
      </Text>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>Android 阴影 (elevation)</Text>
        <View style={[styles.shadowBox, { elevation: elevationValue }]}>
          <Text style={styles.boxText}>Android 阴影效果</Text>
          <Text style={styles.boxSubText}>elevation: {elevationValue}</Text>
        </View>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setElevationValue(prev => prev === 5 ? 10 : 5)}
        >
          <Text style={styles.controlButtonText}>切换 Elevation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>iOS 阴影 (shadowColor/shadowOffset)</Text>
        <View style={[styles.shadowBox, { 
          shadowOpacity: shadowOpacity,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 4,
        }]}>
          <Text style={styles.boxText}>iOS 阴影效果</Text>
          <Text style={styles.boxSubText}>shadowOpacity: {shadowOpacity.toFixed(1)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={() => setShadowOpacity(prev => prev === 0.3 ? 0.6 : 0.3)}
        >
          <Text style={styles.controlButtonText}>切换 ShadowOpacity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  //2字渲染差异
  const TextRenderingDifferences = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>2. 文字渲染差异</Text>
      <Text style={styles.description}>
        Android 和 iOS 在文字渲染、基线对齐、字体内边距方面有差异
      </Text>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>Android 文字特性</Text>
        <View style={styles.textBox}>
          <Text style={styles.androidText}>Android 文字渲染</Text>
          <Text style={styles.androidText}>includeFontPadding: false</Text>
          <Text style={styles.androidText}>textAlignVertical: 'center'</Text>
        </View>
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>iOS 文字特性</Text>
        <View style={styles.textBox}>
          <Text style={styles.iosText}>iOS 文字渲染</Text>
          <Text style={styles.iosText}>自动基线对齐</Text>
          <Text style={styles.iosText}>字体渲染更精确</Text>
        </View>
      </View>
    </View>
  );

  //3式差异
  const ButtonDifferences = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>3. 按钮样式差异</Text>
      <Text style={styles.description}>
        Android 和 iOS 的按钮默认样式、点击效果、文字对齐方式不同
      </Text>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>Android 按钮特性</Text>
        <TouchableOpacity style={styles.androidButton}>
          <Text style={styles.androidButtonText}>Android 按钮</Text>
        </TouchableOpacity>
        <Text style={styles.detailText}>• 默认有 Material Design 效果</Text>
        <Text style={styles.detailText}>• 文字需要额外处理才能居中</Text>
        <Text style={styles.detailText}>• 需要设置 minHeight 确保文字显示</Text>
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>iOS 按钮特性</Text>
        <TouchableOpacity style={styles.iosButton}>
          <Text style={styles.iosButtonText}>iOS 按钮</Text>
        </TouchableOpacity>
        <Text style={styles.detailText}>• 默认文字居中效果更好</Text>
        <Text style={styles.detailText}>• 字体渲染更自然</Text>
        <Text style={styles.detailText}>• 不需要额外的文字处理</Text>
      </View>
    </View>
  );

  //4全区域差异
  const SafeAreaDifferences = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>4. 安全区域差异</Text>
      <Text style={styles.description}>
        iOS 有刘海屏、底部指示器等，Android 的处理方式不同
      </Text>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>iOS SafeAreaView</Text>
        <View style={styles.safeAreaBox}>
          <Text style={styles.safeAreaText}>iOS 需要处理安全区域</Text>
          <Text style={styles.safeAreaText}>• 顶部状态栏</Text>
          <Text style={styles.safeAreaText}>• 底部 Home Indicator</Text>
          <Text style={styles.safeAreaText}>• 刘海屏区域</Text>
        </View>
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>Android 状态栏</Text>
        <View style={styles.safeAreaBox}>
          <Text style={styles.safeAreaText}>Android 状态栏处理</Text>
          <Text style={styles.safeAreaText}>• StatusBar.currentHeight</Text>
          <Text style={styles.safeAreaText}>• 透明状态栏</Text>
          <Text style={styles.safeAreaText}>• 沉浸式状态栏</Text>
        </View>
      </View>
    </View>
  );

  //5
  const AnimationDifferences = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>5. 动画性能差异</Text>
      <Text style={styles.description}>
        Android 和 iOS 在动画性能、原生驱动支持方面有差异
      </Text>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>useNativeDriver 支持</Text>
        <View style={styles.animationBox}>
          <Text style={styles.animationText}>Android: 部分动画支持原生驱动</Text>
          <Text style={styles.animationText}>iOS: 更多动画支持原生驱动</Text>
          <Text style={styles.animationText}>• transform: 两端都支持</Text>
          <Text style={styles.animationText}>• opacity: 两端都支持</Text>
          <Text style={styles.animationText}>• width/height: iOS 支持，Android 不支持</Text>
        </View>
      </View>
    </View>
  );

  //6件
  const PlatformSpecificComponents = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>6. 平台特定组件</Text>
      <Text style={styles.description}>
        某些组件只在特定平台可用，或在不同平台表现不同
      </Text>
      
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>iOS 特有组件</Text>
        <View style={styles.platformBox}>
          <Text style={styles.platformText}>• InputAccessoryView</Text>
          <Text style={styles.platformText}>• SafeAreaView (iOS 优化)</Text>
          <Text style={styles.platformText}>• ActionSheetIOS</Text>
        </View>
      </View>

      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>Android 特有组件</Text>
        <View style={styles.platformBox}>
          <Text style={styles.platformText}>• DrawerLayoutAndroid</Text>
          <Text style={styles.platformText}>• TouchableNativeFeedback</Text>
          <Text style={styles.platformText}>• BackHandler</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.mainTitle}>Android vs iOS 样式差异</Text>
        
        <ShadowDifferences />
        <TextRenderingDifferences />
        <ButtonDifferences />
        <SafeAreaDifferences />
        <AnimationDifferences />
        <PlatformSpecificComponents />
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>开发建议：</Text>
          <Text style={styles.tipsText}>• 使用 Platform.select() 处理平台差异</Text>
          <Text style={styles.tipsText}>• 测试时要在真机上验证效果</Text>
          <Text style={styles.tipsText}>• 注意 Android 和 iOS 的默认行为差异</Text>
          <Text style={styles.tipsText}>• 使用 Platform.OS 进行条件渲染</Text>
          <Text style={styles.tipsText}>• 考虑使用 react-native-vector-icons 等跨平台库</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
    ...Platform.select({
      android: { fontFamily: getFontFamily('bold') },
    }),
  },
  section: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    ...Platform.select({
      android: { fontFamily: getFontFamily('bold') },
    }),
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
    ...Platform.select({
      android: { fontFamily: getFontFamily('regular') },
    }),
  },
  exampleContainer: {
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    color: '#333',
    ...Platform.select({
      android: { fontFamily: getFontFamily('medium') },
    }),
  },
  shadowBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  androidShadow: {
    // Android 阴影通过 elevation 实现
  },
  iosShadow: {
    shadowColor: '#000', // shadowOffset 和 shadowOpacity 在组件中动态设置
  },
  boxText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#333',
    marginBottom: 5,
  },
  boxSubText: {
    fontSize: 14,
    color: '#666',
  },
  controlButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 500,
  },
  textBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  androidText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  iosText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  androidButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    minHeight: 50,
    justifyContent: 'center',
    
  },
  androidButtonText: {
    width: '100%',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...Platform.select({
      android: { fontFamily: getFontFamily('medium') },
    }),
  },
  iosButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  iosButtonText: {
    width: '100%',
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...Platform.select({
      android: { fontFamily: getFontFamily('medium') },
    }),
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  safeAreaBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  safeAreaText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  animationBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  animationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  platformBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  platformText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 3,
  },
  tipsContainer: {
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    color: '#1976D2',
  },
  tipsText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
});

export default PlatformDifferences; 