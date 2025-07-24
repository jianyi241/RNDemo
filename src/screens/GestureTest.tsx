import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type GestureTestNavigationProp = StackNavigationProp<RootStackParamList, 'GestureTest'>;

interface GestureTestProps {
  navigation: GestureTestNavigationProp;
}

const GestureTest: React.FC<GestureTestProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 头部区域 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>手势功能测试</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </View>

      {/* 内容区域 */}
      <View style={styles.content}>
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>手势导航测试</Text>
          <Text style={styles.description}>
            此页面用于测试手势导航功能是否正常工作。{'\n'}
            请尝试从屏幕左边缘向右滑动来返回上一页。
          </Text>
        </View>

        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>测试步骤</Text>
          <Text style={styles.stepText}>
            1. 从屏幕左边缘向右滑动{'\n'}
            2. 观察是否能够返回上一页{'\n'}
            3. 尝试不同的滑动速度和距离{'\n'}
            4. 检查手势响应是否流畅
          </Text>
        </View>

        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>手势配置</Text>
          <Text style={styles.configText}>
            • gestureEnabled: true{'\n'}
            • gestureResponseDistance: 50{'\n'}
            • 支持水平方向滑动{'\n'}
            • 转场动画时长: 250ms (全局) / 200ms (登录/首页){'\n'}
            • 转场模式: card (全屏显示){'\n'}
            • 缓动函数: Math.pow(t, 0.8)
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.testButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.testButtonText}>跳转到首页</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.testButton, { backgroundColor: '#FF5722' }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.testButtonText}>跳转到登录页面</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.testButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('WebViewExample')}
        >
          <Text style={styles.testButtonText}>跳转到 WebView 示例</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>手势导航说明</Text>
          <Text style={styles.infoText}>
            • 从屏幕左边缘向右滑动可以返回上一页{'\n'}
            • 手势必须在屏幕左边缘开始{'\n'}
            • 滑动距离需要超过阈值才能触发{'\n'}
            • 支持取消手势（反向滑动）
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  backText: {
    fontSize: 14,
    color: '#2196F3',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  testSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  configText: {
    fontSize: 14,
    color: '#4CAF50',
    lineHeight: 20,
  },
  testButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});

export default GestureTest; 