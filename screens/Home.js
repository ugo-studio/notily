import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import NotesList from "../components/Home/NotesList";
import Navbar from "../components/Home/Navbar";
import ScrollAnimate from "../components/Home/ScrollAnimate";

const Home = ({ notesStore, setNotesStore, openEditor, selectItem, setAtHome }) => {
  const [searchWord, setSearchWord] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const hideSubcription = Keyboard.addListener("keyboardDidHide", () => {
      searchRef.current.blur();
    });
    return () => {
      hideSubcription.remove();
    };
  });

  const dimen = useSharedValue({ w: 130, b: 50, l: 1, s: 0, lo: 1, so: 0 });
  const prevScroll = useSharedValue(0);
  const btnStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(dimen.value.w, { duration: 300 }),
      borderRadius: withSpring(dimen.value.b),
    };
  });
  const bigStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(dimen.value.l, { duration: 300 }),
        },
      ],
      opacity: withTiming(dimen.value.lo, { duration: 400 }),
    };
  });
  const smallStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(dimen.value.s, { duration: 300 }),
        },
      ],
      opacity: withTiming(dimen.value.so, { duration: 400 }),
    };
  });

  return (
    <View style={[styles.HOME, { height: useWindowDimensions().height }]}>
      <Navbar searchRef={searchRef} setSearchWord={setSearchWord} />
      <NotesList
        notesStore={notesStore}
        setNotesStore={setNotesStore}
        selectItem={selectItem}
        searchWord={searchWord}
        searchRef={searchRef}
        dimen={dimen}
        prevScroll={prevScroll}
      />
      <ScrollAnimate
        btnStyle={btnStyle}
        bigStyle={bigStyle}
        smallStyle={smallStyle}
        openEditor={openEditor}
        setAtHome={setAtHome}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  HOME: {
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: '#f4f4f4',
    backgroundColor: "#ffffff",
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
