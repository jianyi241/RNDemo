import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';

const StatusBarExample: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState<'light' | 'dark'>('dark');
  const [currentBackground, setCurrentBackground] = useState<string>('#fff');

  // 示例1：基础用法 - 在页面顶部
  const BasicStatusBar = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>示例1：基础用法</Text>
      {/* <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#fff" 
        translucent={false}
      /> */}
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>这是基础的状态栏设置</Text>
        <Text style={styles.contentText}>barStyle: "dark-content"</Text>
        <Text style={styles.contentText}>backgroundColor: "#fff"</Text>
      </View>
    </View>
  );

  // 示例2：透明状态栏
  const TransparentStatusBar = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>示例2：透明状态栏</Text>
      {/* <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent={true}
      /> */}
      <View style={[styles.contentBox, { backgroundColor: '#2196F3' }]}>
        <Text style={[styles.contentText, { color: '#fff' }]}>
          透明状态栏，内容延伸到状态栏下方
        </Text>
        <Text style={[styles.contentText, { color: '#fff' }]}>
          translucent: true
        </Text>
      </View>
    </View>
  );

  // 示例3：动态状态栏
  const DynamicStatusBar = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>示例3：动态状态栏</Text>
      {/* <StatusBar 
        barStyle={currentStyle === 'light' ? 'light-content' : 'dark-content'} 
        backgroundColor={currentBackground}
      /> */}
      <View style={[styles.contentBox, { backgroundColor: currentBackground }]}>
        <Text style={[styles.contentText, { 
          color: currentStyle === 'light' ? '#fff' : '#333' 
        }]}>
          当前样式: {currentStyle === 'light' ? '浅色' : '深色'}
        </Text>
        <Text style={[styles.contentText, { 
          color: currentStyle === 'light' ? '#fff' : '#333' 
        }]}>
          背景色: {currentBackground}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              setCurrentStyle('light');
              setCurrentBackground('#333');
            }}
          >
            <Text style={styles.buttonText}>深色主题</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => {
              setCurrentStyle('dark');
              setCurrentBackground('#fff');
            }}
          >
            <Text style={styles.buttonText}>浅色主题</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // 示例4：彩色状态栏
  const ColoredStatusBar = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>示例4：彩色状态栏</Text>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#FF6B6B" 
      />
      <View style={[styles.contentBox, { backgroundColor: '#FF6B6B' }]}>
        <Text style={[styles.contentText, { color: '#fff' }]}>
          彩色状态栏示例
        </Text>
        <Text style={[styles.contentText, { color: '#fff' }]}>
          backgroundColor: "#FF6B6B"
        </Text>
      </View>
    </View>
  );

  // 示例5：隐藏状态栏
  const HiddenStatusBar = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>示例5：隐藏状态栏</Text>
      <StatusBar hidden={true} />
      <View style={styles.contentBox}>
        <Text style={styles.contentText}>状态栏已隐藏</Text>
        <Text style={styles.contentText}>hidden: true</Text>
      </View>
    </View>
  );

  // 示例6：动画状态栏
  const AnimatedStatusBar = () => {
    const [isVisible, setIsVisible] = useState(true);
    
    return (
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>示例6：动画状态栏</Text>
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor="#fff"
          animated={true}
          hidden={!isVisible}
        />
        <View style={styles.contentBox}>
          <Text style={styles.contentText}>
            状态栏: {isVisible ? '显示' : '隐藏'}
          </Text>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => setIsVisible(!isVisible)}
          >
            <Text style={styles.buttonText}>
              {isVisible ? '隐藏状态栏' : '显示状态栏'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#f5f5f5" 
      />
      <ScrollView style={styles.scrollView} scrollIndicatorInsets={{ right: 1}}>
        <Text style={styles.mainTitle}>StatusBar 组件使用示例</Text>
        
        <BasicStatusBar />
        <TransparentStatusBar />
        <DynamicStatusBar />
        <ColoredStatusBar />
        <HiddenStatusBar />
        <AnimatedStatusBar />
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>使用提示：</Text>
          <Text style={styles.tipsText}>• StatusBar 应该放在组件的最外层</Text>
          <Text style={styles.tipsText}>• 不要在 ScrollView 内部使用 StatusBar</Text>
          <Text style={styles.tipsText}>• 使用 SafeAreaView 可以避免状态栏遮挡</Text>
          <Text style={styles.tipsText}>• translucent 属性在 Android 上更有效</Text>
          <Text style={styles.tipsText}>• animated 属性可以添加过渡动画</Text>
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
  },
  exampleContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  contentBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
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
    fontWeight: '600',
    marginBottom: 10,
    color: '#1976D2',
  },
  tipsText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
});

export default StatusBarExample; 