import {
  StyleSheet,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";

const TextArea = ({ data, setData, textRef }) => {
  useEffect(() => {
    const hideSubcription = Keyboard.addListener("keyboardDidHide", () => {
      textRef.current.blur();
    });

    return () => {
      hideSubcription.remove();
    };
  });

  return (
    <View style={[styles.textarea]}>
      <TextInput
        ref={textRef}
        style={[styles.text]}
        multiline={true}
        placeholder="write here..."
        placeholderTextColor="#979797"
        onChangeText={(value) => setData(value)}
        selectionColor="#0080ffa2"
        defaultValue={data}
        scrollEnabled
      />
    </View>
  );
};

export default TextArea;

const styles = StyleSheet.create({
  textarea: {
    flex: 15,
    backgroundColor: "#fff",
  },
  text: {
    backgroundColor: "#fff",
    color: "#000000",
    flex: 1,
    textAlignVertical: "top",
    fontSize: 17,
    paddingHorizontal: 5,
    borderBottomColor: "red",
    borderBottomWidth: 5,
  },
});
