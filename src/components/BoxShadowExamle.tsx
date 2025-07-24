import { FlatList, Text, View, StyleSheet } from 'react-native';
import DropShadow from 'react-native-drop-shadow';

export default function BoxShadowExamle() {
    return (
      <DropShadow
        style={{
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>BoxShadow 示例</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.demoText}>这是一个使用 DropShadow 实现的卡片组件</Text>
            <Text style={styles.demoText}>解决多端box shadow样式不一致的问题</Text>
          </View>
        </View>
      </DropShadow>
    );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    // 注意：这里不需要重复设置 shadow 属性，因为已经在 DropShadow 组件中设置了
    // elevation: 2, // Android 阴影 也不需要了，DropShadow 组件已经设置了
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
  demoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },
});