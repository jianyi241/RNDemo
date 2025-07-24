import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

/**
 * React Native 中 computed 用法的示例组件
 * 展示如何使用 useMemo 和 useCallback 实现类似 Vue computed 的功能
 */
const ComputedExample = () => {
  // 基础状态
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(100);
  const [taxRate, setTaxRate] = useState(0.1);
  const [user, setUser] = useState({ name: 'John', age: 25 });

  // 1. 简单的 computed - 使用 useMemo
  const computedValue = useMemo(() => {
    return count * 2;
  }, [count]);

  // 2. 复杂的 computed - 价格计算
  const totalPrice = useMemo(() => {
    return price * (1 + taxRate);
  }, [price, taxRate]);

  const formattedPrice = useMemo(() => {
    return `$${totalPrice.toFixed(2)}`;
  }, [totalPrice]);

  // 3. 条件 computed
  const isAdult = useMemo(() => {
    return user.age >= 18;
  }, [user.age]);

  const userStatus = useMemo(() => {
    if (user.age < 18) return 'Minor';
    if (user.age < 65) return 'Adult';
    return 'Senior';
  }, [user.age]);

  // 4. 使用 useCallback 缓存计算函数
  const getDisplayName = useCallback(() => {
    return `${user.name} (${user.age})`;
  }, [user.name, user.age]);

  const getPriceBreakdown = useCallback(() => {
    const tax = price * taxRate;
    return {
      subtotal: price,
      tax: tax,
      total: totalPrice,
    };
  }, [price, taxRate, totalPrice]);

  // 5. 依赖其他 computed 的 computed
  const expensiveComputation = useMemo(() => {
    let result = 0;
    for (let i = 0; i < count; i++) {
      result += i * computedValue;
    }
    return result;
  }, [count, computedValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Computed 示例</Text>
      
      {/* 基础状态显示 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>基础状态</Text>
        <Text>Count: {count}</Text>
        <Text>Price: ${price}</Text>
        <Text>Tax Rate: {taxRate * 100}%</Text>
        <Text>User: {user.name}, Age: {user.age}</Text>
      </View>

      {/* 简单 computed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>简单 Computed</Text>
        <Text>Count * 2: {computedValue}</Text>
        <Text>Is Adult: {isAdult ? 'Yes' : 'No'}</Text>
        <Text>User Status: {userStatus}</Text>
        <Text>Display Name: {getDisplayName()}</Text>
      </View>

      {/* 价格计算 computed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>价格计算</Text>
        <Text>Total Price: {formattedPrice}</Text>
        <Text>Subtotal: ${getPriceBreakdown().subtotal}</Text>
        <Text>Tax: ${getPriceBreakdown().tax.toFixed(2)}</Text>
        <Text>Total: ${getPriceBreakdown().total.toFixed(2)}</Text>
      </View>

      {/* 复杂 computed */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>复杂计算</Text>
        <Text>Expensive Result: {expensiveComputation}</Text>
      </View>

      {/* 操作按钮 */}
      <View style={styles.buttonContainer}>
        <Button title="Increment Count" onPress={() => setCount(c => c + 1)} />
        <Button title="Increase Price" onPress={() => setPrice(p => p + 10)} />
        <Button title="Increase Age" onPress={() => setUser(u => ({ ...u, age: u.age + 1 }))} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ComputedExample; 