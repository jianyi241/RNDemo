import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const StatusBarTest: React.FC = () => {
  const [currentConfig, setCurrentConfig] = useState(0);

  const configs = [
    {
      name: '默认样式',
      barStyle: 'default' as const,
      backgroundColor: '#fff',
      textColor: '#333',
    },
    {
      name: '深色文字',
      barStyle: 'dark-content' as const,
      backgroundColor: '#fff',
      textColor: '#333',
    },
    {
      name: '浅色文字',
      barStyle: 'light-content' as const,
      backgroundColor: '#333',
      textColor: '#fff',
    },
    {
      name: '橙色背景',
      barStyle: 'light-content' as const,
      backgroundColor: '#FF9800',
      textColor: '#fff',
    },
    {
      name: '蓝色背景',
      barStyle: 'light-content' as const,
      backgroundColor: '#2196F3',
      textColor: '#fff',
    },
  ];

  const currentConfigData = configs[currentConfig];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentConfigData.backgroundColor }]}>
      <StatusBar 
        barStyle={currentConfigData.barStyle}
        backgroundColor={currentConfigData.backgroundColor}
        animated={true}
      />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: currentConfigData.textColor }]}>
          StatusBar 测试
        </Text>
        
        <View style={styles.configInfo}>
          <Text style={[styles.configText, { color: currentConfigData.textColor }]}>
            当前配置: {currentConfigData.name}
          </Text>
          <Text style={[styles.configText, { color: currentConfigData.textColor }]}>
            barStyle: "{currentConfigData.barStyle}"
          </Text>
          <Text style={[styles.configText, { color: currentConfigData.textColor }]}>
            backgroundColor: "{currentConfigData.backgroundColor}"
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {configs.map((config, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.configButton,
                currentConfig === index && styles.activeButton
              ]}
              onPress={() => setCurrentConfig(index)}
            >
              <Text style={[
                styles.configButtonText,
                currentConfig === index && styles.activeButtonText
              ]}>
                {config.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tips}>
          <Text style={[styles.tipText, { color: currentConfigData.textColor }]}>
            💡 提示：观察状态栏的变化
          </Text>
          <Text style={[styles.tipText, { color: currentConfigData.textColor }]}>
            • 状态栏文字颜色会根据 barStyle 变化
          </Text>
          <Text style={[styles.tipText, { color: currentConfigData.textColor }]}>
            • 背景色在 Android 上会生效
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  configInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  configText: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  configButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  configButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  activeButtonText: {
    color: '#333',
  },
  tips: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 8,
  },
  tipText: {
    fontSize: 14,
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default StatusBarTest; 