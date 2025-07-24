import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Platform,
  View,
  Dimensions,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

const ScrollViewExample = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
        // 统一滚动行为
        scrollIndicatorInsets={{ right: 1}}
        // 确保内容可以完全滚动
        automaticallyAdjustContentInsets={false}
      >
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <View style={{height:Platform.OS == 'ios' ? 0:20,}}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 统一状态栏处理
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    padding: 20,
    // 确保滚动区域一致
    flex:1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  text: {
    fontSize: 42,
    includeFontPadding: false
  },
});

export default ScrollViewExample;