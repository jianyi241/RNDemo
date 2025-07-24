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

type SimpleHomeTestNavigationProp = StackNavigationProp<RootStackParamList, 'SimpleHomeTest'>;

interface SimpleHomeTestProps {
  navigation: SimpleHomeTestNavigationProp;
}

const SimpleHomeTest: React.FC<SimpleHomeTestProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 头部区域 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>简化首页测试</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </View>

      {/* 内容区域 */}
      <View style={styles.content}>
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>黑线问题测试</Text>
          <Text style={styles.description}>
            这是一个简化的首页测试页面，用于验证黑线问题是否解决。{'\n'}
            请观察屏幕是否出现半透明的竖线。
          </Text>
        </View>

        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>测试说明</Text>
          <Text style={styles.stepText}>
            • 如果出现黑线，说明问题仍然存在{'\n'}
            • 如果黑线消失，说明问题已解决{'\n'}
            • 黑线通常出现在屏幕中间偏右侧{'\n'}
            • 黑线是半透明的竖线{'\n'}
            • 黑线会随着手指滑动而移动
          </Text>
        </View>

        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>修复措施</Text>
          <Text style={styles.fixText}>
            • 使用 SafeAreaView 替代手动计算状态栏高度{'\n'}
            • 完全禁用 React Navigation 转场动画{'\n'}
            • 统一背景色设置{'\n'}
            • 优化布局结构
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.testButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.testButtonText}>跳转到真实首页</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.testButton, { backgroundColor: '#FF5722' }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.testButtonText}>跳转到登录页面</Text>
        </TouchableOpacity>
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
  fixText: {
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
});

export default SimpleHomeTest; 