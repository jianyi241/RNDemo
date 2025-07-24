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

const ModalGuide: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Modal 组件使用指南</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 基本属性</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>
              {'<Modal\n'}
              {'  visible={boolean}           // 控制显示/隐藏\n'}
              {'  transparent={boolean}       // 背景是否透明\n'}
              {'  animationType="slide"       // 动画类型\n'}
              {'  onRequestClose={function}   // Android 返回键回调\n'}
              {'  onShow={function}           // 显示时回调\n'}
              {'  onDismiss={function}        // 隐藏时回调\n'}
              {'/>'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎬 动画类型</Text>
          <View style={styles.propertyList}>
            <View style={styles.propertyItem}>
              <Text style={styles.propertyName}>none</Text>
              <Text style={styles.propertyDesc}>无动画效果</Text>
            </View>
            <View style={styles.propertyItem}>
              <Text style={styles.propertyName}>slide</Text>
              <Text style={styles.propertyDesc}>从底部滑入滑出</Text>
            </View>
            <View style={styles.propertyItem}>
              <Text style={styles.propertyName}>fade</Text>
              <Text style={styles.propertyDesc}>淡入淡出效果</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 使用场景</Text>
          <View style={styles.scenarioList}>
            <View style={styles.scenarioItem}>
              <Text style={styles.scenarioTitle}>• 弹窗提示</Text>
              <Text style={styles.scenarioDesc}>显示确认对话框、警告信息等</Text>
            </View>
            <View style={styles.scenarioItem}>
              <Text style={styles.scenarioTitle}>• 表单输入</Text>
              <Text style={styles.scenarioDesc}>用户信息编辑、设置配置等</Text>
            </View>
            <View style={styles.scenarioItem}>
              <Text style={styles.scenarioTitle}>• 全屏展示</Text>
              <Text style={styles.scenarioDesc}>图片查看、视频播放等</Text>
            </View>
            <View style={styles.scenarioItem}>
              <Text style={styles.scenarioTitle}>• 底部菜单</Text>
              <Text style={styles.scenarioDesc}>操作选项、分享菜单等</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ 最佳实践</Text>
          <View style={styles.bestPractices}>
            <Text style={styles.practiceText}>• 使用 transparent={true} 实现弹窗效果</Text>
            <Text style={styles.practiceText}>• 使用 transparent={false} 实现全屏效果</Text>
            <Text style={styles.practiceText}>• 合理选择动画类型提升用户体验</Text>
            <Text style={styles.practiceText}>• 提供多种关闭方式（按钮、返回键、点击外部）</Text>
            <Text style={styles.practiceText}>• 注意 Modal 内的键盘处理</Text>
            <Text style={styles.practiceText}>• 避免在 Modal 内嵌套过多内容</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ 注意事项</Text>
          <View style={styles.warningList}>
            <Text style={styles.warningText}>• Modal 会覆盖整个屏幕，包括状态栏</Text>
            <Text style={styles.warningText}>• 在 Android 上需要处理返回键事件</Text>
            <Text style={styles.warningText}>• 避免在 Modal 内使用复杂的导航</Text>
            <Text style={styles.warningText}>• 注意内存泄漏，及时清理事件监听</Text>
            <Text style={styles.warningText}>• 在 iOS 上注意安全区域的处理</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 代码示例</Text>
          
          <View style={styles.example}>
            <Text style={styles.exampleTitle}>基础弹窗</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>
                {'const [modalVisible, setModalVisible] = useState(false);\n\n'}
                {'<Modal\n'}
                {'  visible={modalVisible}\n'}
                {'  transparent={true}\n'}
                {'  animationType="slide"\n'}
                {'  onRequestClose={() => setModalVisible(false)}\n'}
                {'>\n'}
                {'  <View style={styles.overlay}>\n'}
                {'    <View style={styles.modal}>\n'}
                {'      <Text>弹窗内容</Text>\n'}
                {'      <Button onPress={() => setModalVisible(false)} />\n'}
                {'    </View>\n'}
                {'  </View>\n'}
                {'</Modal>'}
              </Text>
            </View>
          </View>

          <View style={styles.example}>
            <Text style={styles.exampleTitle}>全屏展示</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>
                {'<Modal\n'}
                {'  visible={fullScreenVisible}\n'}
                {'  transparent={false}\n'}
                {'  animationType="fade"\n'}
                {'>\n'}
                {'  <SafeAreaView style={styles.fullScreen}>\n'}
                {'    <StatusBar barStyle="light-content" />\n'}
                {'    <View style={styles.content}>\n'}
                {'      {/* 全屏内容 */}\n'}
                {'    </View>\n'}
                {'  </SafeAreaView>\n'}
                {'</Modal>'}
              </Text>
            </View>
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
  scenarioList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  scenarioItem: {
    marginBottom: 15,
  },
  scenarioTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 5,
  },
  scenarioDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  bestPractices: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  practiceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  warningList: {
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    padding: 15,
  },
  warningText: {
    fontSize: 14,
    color: '#E65100',
    marginBottom: 8,
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
    fontSize: 12,
    color: '#2E7D32',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
});

export default ModalGuide; 