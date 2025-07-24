import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type BlackLineMonitorNavigationProp = StackNavigationProp<RootStackParamList, 'BlackLineMonitor'>;

interface BlackLineMonitorProps {
  navigation: BlackLineMonitorNavigationProp;
}

const BlackLineMonitor: React.FC<BlackLineMonitorProps> = ({ navigation }) => {
  const [testCount, setTestCount] = useState(0);

  const testBlackLine = () => {
    setTestCount(prev => prev + 1);
    Alert.alert(
      '黑线测试',
      `这是第 ${testCount + 1} 次测试\n请观察是否出现黑线`,
      [
        { text: '出现黑线', onPress: () => Alert.alert('结果', '黑线问题仍然存在') },
        { text: '没有黑线', onPress: () => Alert.alert('结果', '黑线问题已解决') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* 头部区域 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>黑线问题监控</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </View>

      {/* 内容区域 */}
      <View style={styles.content}>
        <View style={styles.monitorSection}>
          <Text style={styles.sectionTitle}>黑线问题实时监控</Text>
          <Text style={styles.description}>
            此页面用于实时监控和测试黑线问题。{'\n'}
            请按照测试步骤进行操作，观察黑线是否出现。
          </Text>
        </View>

        <View style={styles.monitorSection}>
          <Text style={styles.sectionTitle}>当前配置</Text>
          <Text style={styles.configText}>
            • 转场模式: card (全屏显示){'\n'}
            • 全局动画时长: 250ms{'\n'}
            • 登录/首页动画时长: 200ms{'\n'}
            • 手势响应距离: 50px{'\n'}
            • 背景色: #fff{'\n'}
            • 缓动函数: Math.pow(t, 0.8)
          </Text>
        </View>

        <View style={styles.monitorSection}>
          <Text style={styles.sectionTitle}>测试步骤</Text>
          <Text style={styles.stepText}>
            1. 点击下方按钮进行测试{'\n'}
            2. 观察屏幕是否出现黑线{'\n'}
            3. 记录测试结果{'\n'}
            4. 重复测试确认问题
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.testButton}
          onPress={testBlackLine}
        >
          <Text style={styles.testButtonText}>开始黑线测试 ({testCount})</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.testButton, { backgroundColor: '#FF5722' }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.testButtonText}>跳转到登录页面</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.testButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.testButtonText}>跳转到首页</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>黑线问题特征</Text>
          <Text style={styles.infoText}>
            • 半透明的竖线{'\n'}
            • 位置不固定（偏左或偏右）{'\n'}
            • 只在触摸和滑动时显示{'\n'}
            • 会随着手指滑动而移动{'\n'}
            • 通常在登录进入首页时出现
          </Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>解决方案</Text>
          <Text style={styles.infoText}>
            • 使用 modal 转场模式{'\n'}
            • 缩短转场动画时长{'\n'}
            • 统一背景色设置{'\n'}
            • 使用 SafeAreaView 处理安全区域
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
  monitorSection: {
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
  configText: {
    fontSize: 14,
    color: '#4CAF50',
    lineHeight: 20,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});

export default BlackLineMonitor; 