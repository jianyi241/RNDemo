import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';

const StatusBarGuide: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 正确的 StatusBar 使用方式 - 放在最外层 */}
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#f5f5f5" 
        translucent={false}
      />
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>StatusBar 使用指南</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ 正确的使用方式</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {'// 1. 放在组件最外层\n'}
              {'<SafeAreaView style={styles.container}>\n'}
              {'  <StatusBar barStyle="dark-content" />\n'}
              {'  <ScrollView>\n'}
              {'    {/* 内容 */}\n'}
              {'  </ScrollView>\n'}
              {'</SafeAreaView>'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>❌ 错误的使用方式</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {'// 2. 不要放在 ScrollView 内部\n'}
              {'<ScrollView>\n'}
              {'  <StatusBar barStyle="dark-content" /> {/* 错误 */}\n'}
              {'  {/* 内容 */}\n'}
              {'</ScrollView>'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 常用属性</Text>
          <View style={styles.propertyList}>
            <View style={styles.propertyItem}>
              <Text style={styles.propertyName}>barStyle</Text>
              <Text style={styles.propertyDesc}>状态栏文字颜色：'default' | 'light-content' | 'dark-content'</Text>
            </View>
            <View style={styles.propertyItem}>
              <Text style={styles.propertyName}>backgroundColor</Text>
              <Text style={styles.propertyDesc}>状态栏背景色（仅 Android）</Text>
            </View>
            <View style={styles.propertyItem}>
              <Text style={styles.propertyName}>translucent</Text>
              <Text style={styles.propertyDesc}>是否透明，内容可延伸到状态栏下方</Text>
            </View>
            <View style={styles.propertyItem}>
              <Text style={styles.propertyName}>hidden</Text>
              <Text style={styles.propertyDesc}>是否隐藏状态栏</Text>
            </View>
            <View style={styles.propertyItem}>
              <Text style={styles.propertyName}>animated</Text>
              <Text style={styles.propertyDesc}>是否启用动画过渡</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 使用示例</Text>
          
          <View style={styles.example}>
            <Text style={styles.exampleTitle}>浅色主题</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>
                {'<StatusBar barStyle="dark-content" backgroundColor="#fff" />'}
              </Text>
            </View>
          </View>

          <View style={styles.example}>
            <Text style={styles.exampleTitle}>深色主题</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>
                {'<StatusBar barStyle="light-content" backgroundColor="#333" />'}
              </Text>
            </View>
          </View>

          <View style={styles.example}>
            <Text style={styles.exampleTitle}>透明状态栏</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>
                {'<StatusBar barStyle="light-content" translucent={true} />'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 最佳实践</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• 始终将 StatusBar 放在组件的最外层</Text>
            <Text style={styles.tipText}>• 使用 SafeAreaView 避免内容被状态栏遮挡</Text>
            <Text style={styles.tipText}>• 在 Android 上使用 backgroundColor 属性</Text>
            <Text style={styles.tipText}>• 使用 translucent 属性实现沉浸式体验</Text>
            <Text style={styles.tipText}>• 根据页面背景色选择合适的 barStyle</Text>
          </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  section: {
    marginHorizontal: 15,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  codeBlock: {
    backgroundColor: '#2D3748',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  codeText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  propertyList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  propertyItem: {
    marginBottom: 12,
  },
  propertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 3,
  },
  propertyDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  example: {
    marginBottom: 15,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  exampleBox: {
    backgroundColor: '#E8F5E8',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  exampleText: {
    fontSize: 13,
    color: '#2E7D32',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  tipsList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default StatusBarGuide; 