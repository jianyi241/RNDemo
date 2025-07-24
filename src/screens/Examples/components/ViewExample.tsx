import React from "react";
import { View, Text } from "react-native";

const ViewExample = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 100,
        padding: 20,
        marginTop: 20,
        gap: 20
      }}
    >
      <View style={{ backgroundColor: "blue", flex: 0.3, height: 100 }} />
      <View style={{ backgroundColor: "red", flex: 0.5, height: 100 }} />
      <Text>Hello World!</Text>
    </View>
  );
};

export default ViewExample;