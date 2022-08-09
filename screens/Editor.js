import {
  StyleSheet,
  View,
  useWindowDimensions,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import React, { useRef, useState } from "react";
import Header from "../components/Other/Header";
import TextArea from "../components/Other/TextArea";

const Editor = ({
  goTo,
  addNewFile,
  itemId,
  bundleId,
  setNotes,
  name,
  setName,
  data,
  setData,
}) => {
  const headerRef = useRef(null);
  const textAreaRef = useRef(null);
  const [currentName, setCurrentName] = useState(name);
  const [currentData, setCurrentData] = useState(data);

  const compileEveryThing = (name, data, time, createdAt) => {
    if (name) {
      if (itemId && bundleId) {
        addNewFile(name, data ? data : "Empty...!", time, createdAt);
        setNotes((prevNotes) => {
          let bundleIndex = prevNotes.findIndex(({ id }) => id === bundleId);
          let itemIndex = prevNotes[bundleIndex].data.findIndex(
            ({ id }) => id === itemId
          );
          prevNotes[bundleIndex].data.splice(itemIndex, 1);
          if (prevNotes[bundleIndex].data.length == 0) {
            prevNotes.splice(bundleIndex, 1);
          }
          return [...prevNotes];
        });
      } else {
        addNewFile(name, data ? data : "Empty...!", time, createdAt);
      }
    } else {
      Alert.alert(
        "Untitled",
        "Name your note!",
        [{ text: "Ok", onPress: () => null }],
        {
          cancelable: true,
          onDismiss: () => null,
        }
      );
    }
  };

  const blurTextAreas = () => {
    headerRef.current.blur();
    textAreaRef.current.blur();
  };

  return (
    <View style={[styles.EDITOR]}>
      <Header
        goTo={goTo}
        compile={compileEveryThing}
        textRef={headerRef}
        hideKeyboard={blurTextAreas}
        name={currentName}
        setName={setCurrentName}
        setSaveName={setName}
        setSaveData={setData}
        prevData={data}
        currentData={currentData}
        prevName={name}
      />
      <TextArea
        data={currentData}
        setData={setCurrentData}
        textRef={textAreaRef}
      />
    </View>
  );
};

export default Editor;

const styles = StyleSheet.create({
  EDITOR: {
    paddingTop: StatusBar.currentHeight,
    // backgroundColor: '#f4f4f4',
    backgroundColor: "#ffffff",
    flex: 1,
    borderBottomColor: "red",
    borderBottomWidth: 2,
  },
});
