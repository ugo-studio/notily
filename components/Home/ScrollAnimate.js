import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Animated from "react-native-reanimated";

const ScrollAnimate = ({
  btnStyle,
  bigStyle,
  smallStyle,
  openEditor,
  setAtHome,
}) => {
  return (
    <TouchableOpacity onPress={() => openEditor()}>
      <Animated.View style={[styles.view, btnStyle]}>
        <Animated.Text style={[styles.text, bigStyle]}>
          + Create new
        </Animated.Text>
        <Animated.Text style={[styles.text, smallStyle]}>+</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScrollAnimate;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#0080ff",
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 50,
    minWidth: 50,
    overflow: "hidden",
    borderRadius: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    height: 30,
    minWidth: 50,
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    position: "absolute",
  },
});
