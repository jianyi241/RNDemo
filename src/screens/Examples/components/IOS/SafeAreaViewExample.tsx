import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';

const SafeAreaViewExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Page content</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SafeAreaViewExample;