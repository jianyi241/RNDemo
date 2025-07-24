// 本模块用于获取设备屏幕的宽高。
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//示例：
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function DimensionsDemo() {
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }: { window: any; screen: any }) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription?.remove();
    };
  });

  return (
    <View style={styles.container}>
      <Text>{`Window Dimensions: height - ${dimensions.window.height}, width - ${dimensions.window.width}`}</Text>
      <Text>{`Screen Dimensions: height - ${dimensions.screen.height}, width - ${dimensions.screen.width}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
