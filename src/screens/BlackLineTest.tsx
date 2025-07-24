import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type BlackLineTestNavigationProp = StackNavigationProp<RootStackParamList, 'BlackLineTest'>;

interface BlackLineTestProps {
  navigation: BlackLineTestNavigationProp;
}

const BlackLineTest: React.FC<BlackLineTestProps> = ({ navigation }) => {
  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 头部区域 */}
      <View style={[styles.header, { paddingTop: statusBarHeight }]}>
        <Text style={styles.headerTitle}>黑线问题测试</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </View>

      {/* 内容区域 */}
      <View style={styles.content}>
        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>测试说明</Text>
          <Text style={styles.description}>
            此页面用于测试 iOS 真机上的黑线问题。{'\n'}
            请观察屏幕中间偏右侧是否出现竖线。{'\n'}
            如果出现黑线，说明问题仍然存在。{'\n'}
            如果黑线消失，说明问题已解决。
          </Text>
        </View>

        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>测试步骤</Text>
          <Text style={styles.stepText}>1. 从登录页面跳转到首页</Text>
          <Text style={styles.stepText}>2. 观察是否出现黑线</Text>
          <Text style={styles.stepText}>3. 等待1秒后黑线是否消失</Text>
          <Text style={styles.stepText}>4. 跳转到其他页面再返回</Text>
          <Text style={styles.stepText}>5. 检查黑线是否重新出现</Text>
        </View>

        <View style={styles.testSection}>
          <Text style={styles.sectionTitle}>修复措施</Text>
          <Text style={styles.fixText}>
            • 移除了容器的 paddingTop 设置{'\n'}
            • 将状态栏高度应用到头部组件{'\n'}
            • 优化了导航转场配置{'\n'}
            • 确保背景色一致性
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.testButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.testButtonText}>跳转到首页测试</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.testButton, { backgroundColor: '#FF5722' }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.testButtonText}>跳转到登录页面</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    marginBottom: 5,
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

export default BlackLineTest; 