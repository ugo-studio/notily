import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState, useReducer } from "react";
import { MotiView, useAnimationState, MotiText, AnimatePresence } from "moti";

const Test = () => {
  const [hide, show] = useState(null);
  const [curr, setCurr] = useState(null);
  const animationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0,
    },
    to: {
      opacity: 1,
      scale: 1.1,
      width: 150,
    },
    bigger: {
      scale: 1.1,
      width: 40,
    },
  });

  const onPress = () => {
    if (animationState.current === "to") {
      animationState.transitionTo("bigger");
      show(true);
    } else {
      animationState.transitionTo("to");
      show(false);
    }
  };

  return (
    <View style={[styles.test]}>
      <ScrollView
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 10) {
            if (curr < 10) {
              onPress();
            }
          } else {
            if (curr > 10) {
              onPress();
            }
          }
          setCurr(Math.trunc(e.nativeEvent.contentOffset.y));
        }}
        style={[styles.scroll]}
      >
        <Text>man</Text>
        <Text>man</Text>
        <Text>man</Text>
        <Text>man</Text>
        <Text>man</Text>
        <Text>man</Text>
        <Text>man</Text>
        <Text>man</Text>
        <Text>man</Text>
        <Text>man</Text>
      </ScrollView>
      <MotiView state={animationState} style={[styles.view]}>
        <>
          <AnimatePresence>
            {hide && (
              <MotiText
                from={{ scale: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  scale: {
                    type: "spring",
                    delay: 5,
                  },
                }}
                style={[styles.text, { fontWeight: "800", fontSize: 20 }]}
              >
                +
              </MotiText>
            )}
          </AnimatePresence>
        </>
        <>
          <AnimatePresence>
            {!hide && (
              <MotiText
                from={{ scale: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  scale: {
                    type: "spring",
                    delay: 1,
                  },
                }}
                style={[styles.text]}
              >
                + Create new
              </MotiText>
            )}
          </AnimatePresence>
        </>
      </MotiView>
      {/* <Pressable onPress={() => onPress()} style={[styles.btn]} /> */}

      <Text>{JSON.stringify(curr)}</Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  test: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
  },
  scroll: {
    backgroundColor: "#FFF600FF",
    padding: 10,
    height: 100,
    width: 100,
    position: "absolute",
    top: StatusBar.currentHeight,
  },
  btn: {
    backgroundColor: "blue",
    borderRadius: 10,
    height: 70,
    width: 70,
  },
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
    width: 100,
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    textAlignVertical: "center",
    position: "absolute",
  },
});
