import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";

const SearchItem = ({ setNotesStore, note, selectItem }) => {
  const cleanOne = (fileId, bundleId) => {
    setNotesStore((prevFiles) => {
      let bundlePlace =
        prevFiles[prevFiles.findIndex(({ id }) => id === bundleId)].data;
      bundlePlace.splice(
        bundlePlace.findIndex(({ id }) => id === fileId),
        1
      );
      if (bundlePlace.length === 0) {
        prevFiles.splice(
          prevFiles.findIndex(({ id }) => id === bundleId),
          1
        );
      }
      return [...prevFiles];
    });
  };

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Pressable
      onPress={() => setOpenMenu(false)}
      style={[styles.Item]}
      key={note.id}
    >
      <TouchableOpacity
        onPress={() => {
          setOpenMenu(false);
          selectItem(note.name, note.data, note.bundleId, note.id);
        }}
        style={[styles.views]}
      >
        <Text style={[styles.name]}>{note.name}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.data]}>
          {note.data}
        </Text>
        <Text style={[styles.time]}>{note.time}</Text>
      </TouchableOpacity>
      {openMenu && (
        <View style={[styles.fileMenuOpened]}>
          <TouchableOpacity style={[styles.share]}>
            <Text style={[styles.shareText]}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => cleanOne(note.id, note.bundleId)}
            style={[styles.delete]}
          >
            <Text style={[styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={() => (openMenu ? setOpenMenu(false) : setOpenMenu(true))}
        style={[styles.fileMenu]}
      >
        <Icon name="dots-three-vertical" size={22} color="black" />
      </TouchableOpacity>
    </Pressable>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
  Item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 90,
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 11,
    paddingVertical: 10,
    alignSelf: "center",
    elevation: 2,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  views: {
    backgroundColor: "#ffffff",
    height: "100%",
    flex: 7,
    flexDirection: "column",
    marginLeft: 13,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 2,
    color: "black",
  },
  data: {
    backgroundColor: "#ffffff",
    width: "100%",
    overflow: "hidden",
    marginBottom: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  time: {
    fontSize: 12,
    color: "#323232",
    fontWeight: "300",
  },
  fileMenu: {
    backgroundColor: "#ffffff",
    flex: 1,
    alignItems: "center",
  },
  fileMenuOpened: {
    height: "90%",
    width: "20%",
    position: "absolute",
    right: "12%",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#f4f4f4",
    zIndex: 10,
  },
  shareText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2c2c2c",
    letterSpacing: 0.5,
  },
  deleteText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2c2c2c",
    letterSpacing: 0.5,
  },
});
