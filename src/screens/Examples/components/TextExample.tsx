import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const TextExample = () => {
  const [titleText, setTitleText] = useState("Bird's Nest");
  const bodyText = 'This is not really a bird nest.';

  const onPressTitle = () => {
    setTitleText("Bird's Nest [pressed]");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.baseText}>
        <Text style={styles.titleText} onPress={onPressTitle}>
          {titleText}
          {'\n'}
          {'\n'}
        </Text>
        <Text numberOfLines={5}>{bodyText}</Text>
      </Text>
      <Text style={styles.baseText1}>
        I am bold
        <Text style={styles.innerText}> and red</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  baseText: {
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  baseText1: {
    fontWeight: 'bold',
    fontFamily: 'Cochin',
  },
  innerText: {
    fontFamily: 'Cochin',
    color: 'red'
  }
});

export default TextExample; 