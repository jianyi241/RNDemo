import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert,
  Button,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUserInfo, logout } from '../services/api';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getFontFamily } from '../utils/fonts';
import ComputedExample from '../components/ComputedExample';
import BoxShadowExamle from '../components/BoxShadowExamle';
import { BUNDLE_VERSION } from '@env';
interface UserInfo {
  id: string;
  userName: string;
  avatar?: string;
  role?: string;
  email?: string;
  phone?: string;
  lastLogin?: string;
  [key: string]: any;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [switchValue, setSwitchValue] = useState(false);
  const [showDevToolsAlert, setShowDevToolsAlert] = useState(false);
  useEffect(() => {
    fetchUserInfo();

    // 启动模拟检测
  }, [showDevToolsAlert]);

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await getUserInfo();
      if (response && response.code === 200 && response.data) {
        setUserInfo(response.data);
      } else {
        Alert.alert('提示', '获取用户信息失败，请重新登录');
        handleLogout();
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
      Alert.alert('错误', '网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.navigate('Login');
    } catch (error) {
      console.error('退出登录失败:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]} edges={['top']}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={Platform.OS === 'ios' ? [] : ['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>首页</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>退出登录</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}
      scrollIndicatorInsets={{ right: 1}}
      >
        <View style={styles.welcomeSection}>
          <Image
            source={{
              uri: 'https://img2.baidu.com/it/u=3222848515,3281662512&fm=253&fmt=auto&app=138&f=PNG?w=260&h=260'
            }}
            style={styles.welcomeImage}
          />
          <Text style={styles.welcomeText}>欢迎回来，{userInfo?.userName || '用户'}</Text>
          <Text style={styles.welcomeSubText}>您已成功登录系统</Text>
          <Text style={styles.welcomeSubText}>{Platform.OS}{Platform.Version}</Text>
          <Text style={styles.welcomeSubText}>版本: {BUNDLE_VERSION}</Text>
        </View>

        <View style={styles.cardContainer}>
          {/* StatusBar 示例导航 */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>StatusBar 组件示例</Text>
            </View>
            <View style={styles.cardBody}>
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => {
                  console.log('点击了 Examples 按钮');
                  Alert.alert('提示', '正在跳转到 Examples 示例页面');
                  navigation.navigate('Examples');
                }}
              >
                <Text style={styles.navButtonText}>查看 Examples 示例 </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => {
                  console.log('点击了 StatusBarExample 按钮');
                  Alert.alert('提示', '正在跳转到 StatusBar 示例页面');
                  navigation.navigate('StatusBarExample');
                }}
              >
                <Text style={styles.navButtonText}>查看 StatusBar 示例 </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => {
                  console.log('点击了 StatusBarGuide 按钮');
                  Alert.alert('提示', '正在跳转到 StatusBar 指南页面');
                  navigation.navigate('StatusBarGuide');
                }}
              >
                <Text style={styles.navButtonText}>查看 StatusBar 指南 </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.navButton}
                onPress={() => {
                  console.log('点击了 StatusBarTest 按钮');
                  Alert.alert('提示', '正在跳转到 StatusBar 测试页面');
                  navigation.navigate('StatusBarTest');
                }}
              >
                <Text style={styles.navButtonText}>StatusBar 快速测试</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#FF9800' }]}
                onPress={() => {
                  console.log('点击了 Test 按钮');
                  Alert.alert('提示', '正在跳转到测试页面');
                  navigation.navigate('Test');
                }}
              >
                <Text style={styles.navButtonText}>测试导航功能</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#E91E63' }]}
                onPress={() => {
                  console.log('点击了 Debug 按钮');
                  Alert.alert('提示', '正在跳转到调试页面');
                  navigation.navigate('Debug');
                }}
              >
                <Text style={styles.navButtonText}>导航调试页面</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#9C27B0' }]}
                onPress={() => {
                  console.log('点击了 ModalExample 按钮');
                  Alert.alert('提示', '正在跳转到 Modal 示例页面');
                  navigation.navigate('ModalExample');
                }}
              >
                <Text style={styles.navButtonText}>Modal 组件示例 </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#607D8B' }]}
                onPress={() => {
                  console.log('点击了 ModalGuide 按钮');
                  Alert.alert('提示', '正在跳转到 Modal 指南页面');
                  navigation.navigate('ModalGuide');
                }}
              >
                <Text style={styles.navButtonText}>Modal 使用指南 </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#607D8B' }]}
                onPress={() => {
                  console.log('点击了 FlexLayoutExample 按钮');
                  Alert.alert('提示', '正在跳转到 Flex 布局示例页面');
                  navigation.navigate('FlexLayoutExample');
                }}
              >
                <Text style={styles.navButtonText}>Flex 布局示例</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#607D8B' }]}
                onPress={() => {
                  console.log('点击了 SafeViewDemo 按钮');
                  Alert.alert('提示', '正在跳转到 SafeViewDemo 示例页面');
                  navigation.navigate('SafeViewDemo');
                }}
              >
                <Text style={styles.navButtonText}>SafeViewDemo</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#607D8B' }]}
                onPress={() => {
                  console.log('点击了 SectionList 按钮');
                  Alert.alert('提示', '正在跳转到 SectionList 示例页面');
                  navigation.navigate('SectionList');
                }}
              >
                <Text style={styles.navButtonText}>SectionList</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#607D8B' }]}
                onPress={() => {
                  console.log('点击了 FlatList 按钮');
                  Alert.alert('提示', '正在跳转到 FlatList 示例页面');
                  navigation.navigate('FlatList');
                }}
              >
                <Text style={styles.navButtonText}>FlatList</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#FF5722' }]}
                onPress={() => {
                  console.log('点击了 AnimatedExample 按钮');
                  Alert.alert('提示', '正在跳转到 Animated 动画示例页面');
                  navigation.navigate('AnimatedExample');
                }}
              >
                <Text style={styles.navButtonText}>Animated 动画示例</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#9C27B0' }]}
                onPress={() => {
                  console.log('点击了 Examples 按钮');
                  Alert.alert('提示', '正在跳转到组件示例集合页面');
                  navigation.navigate('Examples');
                }}
              >
                <Text style={styles.navButtonText}>组件示例集合</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#607D8B' }]}
                onPress={() => {
                  console.log('点击了 Dimensions 按钮');
                  Alert.alert('提示', '正在跳转到 Dimensions 示例页面');
                  navigation.navigate('Dimensions');
                }}
              >
                <Text style={styles.navButtonText}>Dimensions</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#4CAF50' }]}
                onPress={() => {
                  console.log('点击了 WebViewExample 按钮');
                  Alert.alert('提示', '正在跳转到 WebView 示例页面');
                  navigation.navigate('WebViewExample');
                }}
              >
                <Text style={styles.navButtonText}>WebView 示例</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#FF5722' }]}
                onPress={() => {
                  console.log('点击了 BlackLineTest 按钮');
                  Alert.alert('提示', '正在跳转到黑线问题测试页面');
                  navigation.navigate('BlackLineTest');
                }}
              >
                <Text style={styles.navButtonText}>黑线问题测试</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#795548' }]}
                onPress={() => {
                  console.log('点击了 SimpleHomeTest 按钮');
                  Alert.alert('提示', '正在跳转到简化首页测试页面');
                  navigation.navigate('SimpleHomeTest');
                }}
              >
                <Text style={styles.navButtonText}>简化首页测试</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#9C27B0' }]}
                onPress={() => {
                  console.log('点击了 GestureTest 按钮');
                  Alert.alert('提示', '正在跳转到手势功能测试页面');
                  navigation.navigate('GestureTest');
                }}
              >
                <Text style={styles.navButtonText}>手势功能测试</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#FF9800' }]}
                onPress={() => {
                  console.log('点击了 BlackLineMonitor 按钮');
                  Alert.alert('提示', '正在跳转到黑线问题监控页面');
                  navigation.navigate('BlackLineMonitor');
                }}
              >
                <Text style={styles.navButtonText}>黑线问题监控</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#E91E63' }]}
                onPress={() => {
                  console.log('点击了 ImageUploadExample 按钮');
                  Alert.alert('提示', '正在跳转到图片上传示例页面');
                  navigation.navigate('ImageUploadExample');
                }}
              >
                <Text style={styles.navButtonText}>图片上传示例</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#795548' }]}
                onPress={() => {
                  console.log('点击了 PlatformDifferences 按钮');
                  Alert.alert('提示', '正在跳转到平台差异页面');
                  navigation.navigate('PlatformDifferences');
                }}
              >
                <Text style={styles.navButtonText}>平台差异对比</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.navButton, { backgroundColor: '#2196F3' }]}
                onPress={() => {
                  console.log('点击了 PhotoList 按钮');
                  Alert.alert('提示', '正在跳转到 Unsplash 照片列表页面');
                  navigation.navigate('PhotoList');
                }}
              >
                <Text style={styles.navButtonText}>Unsplash 照片列表</Text>
              </TouchableOpacity>
            </View>
          </View> 

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>用户信息</Text>
            </View>
            <View style={styles.cardBody}>
              {userInfo && Object.entries(userInfo).map(([key, value]) => {
                // 过滤掉不需要显示的字段
                if (key === 'avatar' || key === 'password' || value === null || value === undefined) {
                  return null;
                }
                
                return (
                  <View key={key} style={styles.infoItem}>
                    <Text style={styles.infoLabel}>{formatKeyName(key)}:</Text>
                    <Text style={styles.infoValue}>{String(value)}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <ScrollView style={[styles.card, {height: 200}]}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={true}
            // 统一滚动行为
            scrollIndicatorInsets={{ right: 1}}
            // 确保内容可以完全滚动
            automaticallyAdjustContentInsets={false}
            nestedScrollEnabled={true} // 允许嵌套滚动
            removeClippedSubviews={false} // 防止Android裁剪内容
          >
            {
              Array.from({ length: 10 }).map((_, index) => (
                <View key={index} style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>系统公告{index}</Text>
                </View>
              ))
            }
          </ScrollView>

          <ScrollView style={[styles.card]}>
            <Button title='123' color="#f194ff" onPress={() => {
              Alert.alert('123');
            }}></Button>

            <Switch value={switchValue} onValueChange={() => {
              setSwitchValue(!switchValue);
            }}></Switch>

            <View style={styles.statusBarDemo}>
              <Text style={styles.demoText}>StatusBar 演示区域</Text>
              <Text style={styles.demoText}>注意：StatusBar 不应该放在 ScrollView 内部</Text>
            </View>

          </ScrollView>

          <View style={styles.card}>
            <ComputedExample /> 
          </View>

          <BoxShadowExamle />

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>系统公告111</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.noticeItem}>
                • 系统将于本周日进行维护升级，请提前做好准备
              </Text>
              <Text style={styles.noticeItem}>
                • 新版本功能已上线，欢迎体验并提供反馈
              </Text>
              <Text style={styles.noticeItem}>
                • 请定期修改密码，保障账号安全
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// 格式化字段名称
const formatKeyName = (key: string): string => {
  const keyMap: Record<string, string> = {
    id: 'ID',
    userName: '用户名',
    role: '角色',
    email: '邮箱',
    phone: '手机号',
    lastLogin: '上次登录',
  };
  
  return keyMap[key] || key;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
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
    ...Platform.select({
      android: { fontFamily: getFontFamily('bold') },
    }),
  },
  logoutText: {
    fontSize: 14,
    color: '#2196F3',
    ...Platform.select({
      android: { fontFamily: getFontFamily('regular') },
    }),
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  welcomeImage: {
    width: 80,
    height: 80,
    marginBottom: 15,
    borderRadius: 40,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    ...Platform.select({
      android: { fontFamily: getFontFamily('bold') },
    }),
  },
  welcomeSubText: {
    fontSize: 14,
    color: '#666',
    ...Platform.select({
      android: { fontFamily: getFontFamily('regular') },
    }),
  },
  devToolsSection: {
    marginTop: 20,
    width: '100%',
  },
  devToolsButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15, // 增加垂直内边距
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 50, // 设置最小高度
    justifyContent: 'center', // 确保文字居中
  },
  devToolsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // 确保文字居中
    includeFontPadding: false, // Android 特有属性，移除字体额外内边距
    textAlignVertical: 'center', // Android 特有属性，垂直居中
    ...Platform.select({
      android: { fontFamily: getFontFamily('medium') },
    }),
  },
  cardContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contentContainer: {
  },
  cardHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardBody: {
    padding: 15,
  },
  infoItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    width: 100,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  statItem: {
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  noticeItem: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
    marginBottom: 8,
  },
  statusBarDemo: {
    padding: 15,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    marginTop: 10,
  },
  demoText: {
    fontSize: 14,
    color: '#E65100',
    marginBottom: 5,
  },
  navButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15, // 增加垂直内边距
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    minHeight: 50, // 设置最小高度
    justifyContent: 'center', // 确保文字居中
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center', // 确保文字居中
    includeFontPadding: false, // Android 特有属性，移除字体额外内边距
    textAlignVertical: 'center', // Android 特有属性，垂直居中
    ...Platform.select({
      android: { fontFamily: getFontFamily('medium') },
    }),
  },
});

export default HomeScreen; 