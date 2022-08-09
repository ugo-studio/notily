import "react-native-get-random-values";
import "react-native-reanimated";
import {
  StyleSheet,
  View,
  StatusBar,
  BackHandler,
  Alert,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";
import * as NavigationBar from "expo-navigation-bar";
import Home from "./screens/Home";
import Editor from "./screens/Editor";
import Test from "./screens/Test";

const App = () => {
  const [BundleId, setBundleId] = useState(null);
  const [ItemId, setItemId] = useState(null);
  const [Name, setName] = useState("");
  const [Data, setData] = useState("");
  const [notes, setNotes] = useState([
    {
      id: null,
      title: null,
      data: [
        {
          name: null,
          data: null,
          time: null,
          id: null,
        },
      ],
    },
  ]);
  const [atHome, setAtHome] = useState(true);

  // navbar
  useEffect(() => {
    const backSub = NavigationBar.setBackgroundColorAsync("#fff").catch((e) => {
      console.log(e);
    });
    const posSub = NavigationBar.setPositionAsync("absolute").catch((e) => {
      console.log(e);
    });
  }, []);

  // get app storage
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@notily_storage");
        return jsonValue != null
          ? setNotes([...JSON.parse(jsonValue)])
          : console.log("null");
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  // on back button handler
  useEffect(() => {
    const backAction = () => {
      if (!atHome) {
        closeEditor();
      } else {
        Alert.alert(
          "Exit",
          "Are you sure you want to quit?",
          [
            {
              text: "No",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          { cancelable: true, onDismiss: () => null }
        );
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

  // open editor
  const openEditor = () => {
    setAtHome(false);
  };

  // close editor
  const closeEditor = () => {
    setAtHome(true);
    setBundleId(null);
    setItemId(null);
    setName("");
    setData("");
  };

  // select item
  const selectItem = (itemName, itemData, bundleId, itemId) => {
    setAtHome(false);
    setBundleId(bundleId);
    setItemId(itemId);
    setName(itemName);
    if (itemData == "Empty...!") {
      setData("");
    } else {
      setData(itemData);
    }
  };

  // add a new file
  const addNewFile = (name, data, time, createdAt) => {
    if (
      JSON.stringify(
        notes.findIndex(({ title }) => title === createdAt)
      ).includes("-")
    ) {
      let ID = uuidv4();
      let bID = uuidv4();
      setItemId(ID);
      setBundleId(bID);
      setNotes((prevFiles) => {
        let compiled = [
          {
            id: bID,
            title: createdAt,
            data: [
              {
                name: name,
                data: data,
                time: time,
                id: ID,
                bundleId: bID,
              },
            ],
          },
          ...prevFiles,
        ];
        storeDataInStorage(compiled);
        return compiled;
      });
    } else {
      let ID = uuidv4();
      setItemId(ID);
      setBundleId(
        notes[notes.findIndex(({ title }) => title === createdAt)].id
      );
      setNotes((prevFiles) => {
        let objectIndex = prevFiles.findIndex(
          ({ title }) => title === createdAt
        );
        prevFiles[objectIndex].data.unshift({
          name: name,
          data: data,
          time: time,
          id: ID,
          bundleId: prevFiles[objectIndex].id,
        });
        storeDataInStorage([...prevFiles]);
        return [...prevFiles];
      });
    }
  };

  // store in notily storage
  const storeDataInStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@notily_storage", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(atHome);

  return (
    <View
      style={[
        styles.APP,
        {
          height: useWindowDimensions().height + StatusBar.currentHeight,
        },
      ]}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff00"
        translucent={true}
      />
      {atHome ? (
        <Home
          openEditor={openEditor}
          notesStore={notes}
          setNotesStore={setNotes}
          selectItem={selectItem}
          setAtHome={setAtHome}
        />
      ) : (
        <Editor
          goTo={closeEditor}
          addNewFile={addNewFile}
          itemId={ItemId}
          bundleId={BundleId}
          setNotes={setNotes}
          name={Name}
          setName={setName}
          data={Data}
          setData={setData}
        />
      )}
      {/* <Test /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  APP: {
    // flex: 1,
    // backgroundColor: '#f4f4f4',
    backgroundColor: "#000",
  },
});

export default App;
