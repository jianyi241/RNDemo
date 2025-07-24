import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { getFontFamily } from '../utils/fonts';

const { width: screenWidth } = Dimensions.get('window');

const FlexLayoutExample: React.FC = () => {
  const [activeSection, setActiveSection] = useState('basic');

  // 基础 Flex 布局示例
  const BasicFlexExamples = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>1. 基础 Flex 布局</Text>

      {/* flex: 1 - 等分空间 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>flex: 1 - 等分空间</Text>
        <View style={styles.flexRow}>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>flex: 1</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>flex: 1</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>flex: 1</Text>
          </View>
        </View>
      </View>

      {/* flex: 2, 1, 1 - 不同比例 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>flex: 2, 1, 1 - 不同比例</Text>
        <View style={styles.flexRow}>
          <View style={[styles.flexBox, { flex: 2, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>flex: 2</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>flex: 1</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>flex: 1</Text>
          </View>
        </View>
      </View>

      {/* 固定宽度 + flex */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>固定宽度 + flex</Text>
        <View style={styles.flexRow}>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>80px</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>flex: 1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>60px</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Flex Direction 示例
  const FlexDirectionExamples = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>2. Flex Direction</Text>

      {/* row - 水平排列 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>flexDirection: 'row' (默认)</Text>
        <View style={[styles.flexRow, { height: 60 }]}>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      {/* column - 垂直排列 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>flexDirection: 'column'</Text>
        <View style={[styles.flexColumn, { height: 180 }]}>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      {/* row-reverse - 水平反向 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>flexDirection: 'row-reverse'</Text>
        <View style={[styles.flexRow, { height: 60, flexDirection: 'row-reverse' }]}>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      {/* column-reverse - 垂直反向 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>flexDirection: 'column-reverse'</Text>
        <View style={[styles.flexColumn, { height: 180, flexDirection: 'column-reverse' }]}>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Justify Content 示例
  const JustifyContentExamples = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>3. Justify Content</Text>

      {/* flex-start */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>justifyContent: 'flex-start' (默认)</Text>
        <View style={[styles.flexRow, { height: 80, justifyContent: 'flex-start' }]}>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
        </View>
      </View>

      {/* center */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>justifyContent: 'center'</Text>
        <View style={[styles.flexRow, { height: 80, justifyContent: 'center' }]}>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
        </View>
      </View>

      {/* flex-end */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>justifyContent: 'flex-end'</Text>
        <View style={[styles.flexRow, { height: 80, justifyContent: 'flex-end' }]}>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
        </View>
      </View>

      {/* space-between */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>justifyContent: 'space-between'</Text>
        <View style={[styles.flexRow, { height: 80, justifyContent: 'space-between' }]}>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      {/* space-around */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>justifyContent: 'space-around'</Text>
        <View style={[styles.flexRow, { height: 80, justifyContent: 'space-around' }]}>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      {/* space-evenly */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>justifyContent: 'space-evenly'</Text>
        <View style={[styles.flexRow, { height: 80, justifyContent: 'space-evenly' }]}>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Align Items 示例
  const AlignItemsExamples = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>4. Align Items</Text>

      {/* stretch */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>alignItems: 'stretch' (默认)</Text>
        <View style={[styles.flexRow, { height: 100, alignItems: 'stretch' }]}>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { flex: 1, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      {/* flex-start */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>alignItems: 'flex-start'</Text>
        <View style={[styles.flexRow, { height: 100, alignItems: 'flex-start' }]}>
          <View style={[styles.flexBox, { width: 60, height: 40, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, height: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, height: 80, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      {/* center */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>alignItems: 'center'</Text>
        <View style={[styles.flexRow, { height: 100, alignItems: 'center' }]}>
          <View style={[styles.flexBox, { width: 60, height: 40, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, height: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, height: 80, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      {/* flex-end */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>alignItems: 'flex-end'</Text>
        <View style={[styles.flexRow, { height: 100, alignItems: 'flex-end' }]}>
          <View style={[styles.flexBox, { width: 60, height: 40, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, height: 60, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, height: 80, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Align Self 示例
  const AlignSelfExamples = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>5. Align Self</Text>

      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>alignSelf 覆盖父容器的 alignItems</Text>
        <View style={[styles.flexRow, { height: 100, alignItems: 'center' }]}>
          <View style={[styles.flexBox, { width: 60, height: 40, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, height: 60, backgroundColor: '#4ECDC4', alignSelf: 'flex-start' }]}>
            <Text style={styles.boxText}>2 (flex-start)</Text>
          </View>
          <View style={[styles.flexBox, { width: 60, height: 80, backgroundColor: '#45B7D1', alignSelf: 'flex-end' }]}>
            <Text style={styles.boxText}>3 (flex-end)</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // Flex Wrap 示例
  const FlexWrapExamples = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>6. Flex Wrap</Text>

      {/* nowrap */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>flexWrap: 'nowrap' (默认)</Text>
        <View style={[styles.flexRow, { height: 60, flexWrap: 'nowrap' }]}>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#96CEB4' }]}>
            <Text style={styles.boxText}>4</Text>
          </View>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#FFEAA7' }]}>
            <Text style={styles.boxText}>5</Text>
          </View>
        </View>
      </View>

      {/* wrap */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>flexWrap: 'wrap'</Text>
        <View style={[styles.flexRow, { height: 120, flexWrap: 'wrap' }]}>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#96CEB4' }]}>
            <Text style={styles.boxText}>4</Text>
          </View>
          <View style={[styles.flexBox, { width: 80, backgroundColor: '#FFEAA7' }]}>
            <Text style={styles.boxText}>5</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // 实际应用示例
  const PracticalExamples = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>7. 实际应用示例</Text>

      {/* 卡片布局 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>卡片布局</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>卡片标题</Text>
            <Text style={styles.cardSubtitle}>副标题</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>这是卡片的内容区域，展示了 flex 布局的实际应用。</Text>
          </View>
          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.buttonText}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cardButton, { backgroundColor: '#2196F3' }]}>
              <Text style={styles.buttonText}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 导航栏布局 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>导航栏布局</Text>
        <View style={styles.navbar}>
          <View style={styles.navLeft}>
            <Text style={styles.navText}>返回</Text>
          </View>
          <View style={styles.navCenter}>
            <Text style={styles.navTitle}>页面标题</Text>
          </View>
          <View style={styles.navRight}>
            <Text style={styles.navText}>菜单</Text>
          </View>
        </View>
      </View>

      {/* 列表项布局 */}
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleTitle}>列表项布局</Text>
        <View style={styles.listItem}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.listContent}>
            <Text style={styles.listTitle}>列表项标题</Text>
            <Text style={styles.listSubtitle}>列表项描述信息</Text>
          </View>
          <View style={styles.listAction}>
            <Text style={styles.actionText}>{'>'}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* 导航按钮 */}
      <View style={styles.navContainer}>
        <ScrollView
          style={[styles.horizontalScrollView, {width: screenWidth}]}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
          nestedScrollEnabled={true}
          // 优化手势响应，减少与页面转场的冲突
          scrollEventThrottle={16}
        >
          <TouchableOpacity
            style={[styles.navButton, activeSection === 'basic' && styles.activeNavButton]}
            onPress={() => setActiveSection('basic')}
          >
            <Text style={[styles.navButtonText, activeSection === 'basic' && styles.activeNavButtonText]}>
              基础布局
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, activeSection === 'direction' && styles.activeNavButton]}
            onPress={() => setActiveSection('direction')}
          >
            <Text style={[styles.navButtonText, activeSection === 'direction' && styles.activeNavButtonText]}>
              Flex Direction
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, activeSection === 'justify' && styles.activeNavButton]}
            onPress={() => setActiveSection('justify')}
          >
            <Text style={[styles.navButtonText, activeSection === 'justify' && styles.activeNavButtonText]}>
              Justify Content
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, activeSection === 'align' && styles.activeNavButton]}
            onPress={() => setActiveSection('align')}
          >
            <Text style={[styles.navButtonText, activeSection === 'align' && styles.activeNavButtonText]}>
              Align Items
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, activeSection === 'self' && styles.activeNavButton]}
            onPress={() => setActiveSection('self')}
          >
            <Text style={[styles.navButtonText, activeSection === 'self' && styles.activeNavButtonText]}>
              Align Self
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, activeSection === 'wrap' && styles.activeNavButton]}
            onPress={() => setActiveSection('wrap')}
          >
            <Text style={[styles.navButtonText, activeSection === 'wrap' && styles.activeNavButtonText]}>
              Flex Wrap
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, activeSection === 'practical' && styles.activeNavButton]}
            onPress={() => setActiveSection('practical')}
          >
            <Text style={[styles.navButtonText, activeSection === 'practical' && styles.activeNavButtonText]}>
              实际应用
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* 内容区域 */}
      <ScrollView style={styles.content}>
        {activeSection === 'basic' && <BasicFlexExamples />}
        {activeSection === 'direction' && <FlexDirectionExamples />}
        {activeSection === 'justify' && <JustifyContentExamples />}
        {activeSection === 'align' && <AlignItemsExamples />}
        {activeSection === 'self' && <AlignSelfExamples />}
        {activeSection === 'wrap' && <FlexWrapExamples />}
        {activeSection === 'practical' && <PracticalExamples />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  horizontalScrollView: {
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  activeNavButton: {
    backgroundColor: '#2196F3',
  },
  navButtonText: {
    fontSize: 14,
    color: '#666',
    ...Platform.select({
      android: {
        fontFamily: getFontFamily('medium')
      }
    })
  },
  activeNavButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  exampleContainer: {
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  flexRow: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  flexColumn: {
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  flexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginHorizontal: 2,
  },
  boxText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  // 实际应用样式
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  cardContent: {
    marginBottom: 15,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButton: {
    backgroundColor: '#666',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 0.48,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 8,
  },
  navLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  navCenter: {
    flex: 2,
    alignItems: 'center',
  },
  navRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  navText: {
    fontSize: 14,
    color: '#666',
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  listSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  listAction: {
    marginLeft: 15,
  },
  actionText: {
    fontSize: 18,
    color: '#999',
  },
});

export default FlexLayoutExample; 