import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type DebugScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Debug'>;

interface DebugScreenProps {
  navigation: DebugScreenNavigationProp;
}

const DebugScreen: React.FC<DebugScreenProps> = ({ navigation }) => {
  const testNavigation = (screenName: keyof RootStackParamList) => {
    Alert.alert('导航测试', `正在跳转到 ${screenName} 页面`);
    try {
      navigation.navigate(screenName);
    } catch (error) {
      Alert.alert('错误', `导航失败: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>导航调试页面</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>测试导航功能</Text>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => testNavigation('Home')}
          >
            <Text style={styles.buttonText}>跳转到首页</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => testNavigation('Login')}
          >
            <Text style={styles.buttonText}>跳转到登录页</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => testNavigation('StatusBarExample')}
          >
            <Text style={styles.buttonText}>跳转到 StatusBar 示例</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => testNavigation('StatusBarGuide')}
          >
            <Text style={styles.buttonText}>跳转到 StatusBar 指南</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => testNavigation('StatusBarTest')}
          >
            <Text style={styles.buttonText}>跳转到 StatusBar 测试</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => testNavigation('Test')}
          >
            <Text style={styles.buttonText}>跳转到测试页面</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>调试信息</Text>
          <Text style={styles.debugText}>• 如果按钮点击有反应，说明导航配置正确</Text>
          <Text style={styles.debugText}>• 如果页面能正常跳转，说明路由配置正确</Text>
          <Text style={styles.debugText}>• 如果出现错误，请检查控制台输出</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  debugText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default DebugScreen; 