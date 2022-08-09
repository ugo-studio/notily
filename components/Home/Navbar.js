import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const Navbar = ({ setSearchWord, searchRef }) => {
  return (
    <Pressable style={[styles.navbar]}>
      <View style={styles.envelope}>
        <View style={[styles.search]}>
          <TouchableOpacity style={[styles.icon]}>
            <Icon name="search" size={25} color="#0092ff" />
          </TouchableOpacity>
          <TextInput
            ref={searchRef}
            style={[styles.text]}
            placeholder="Search note"
            placeholderTextColor="#818181"
            multiline={false}
            selectionColor="#0092ff"
            onChangeText={(value) => setSearchWord(value)}
          />
        </View>
        <TouchableOpacity style={[styles.userIcon]}>
          <Icon name="person" size={23} color="#727272" />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    // backgroundColor: "#f4f4f4",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  envelope: {
    paddingHorizontal: 5,
    borderColor: "#000",
    borderWidth: 1,
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 50,
  },
  search: {
    flex: 1,
    flexDirection: "row",
    // backgroundColor: "#f4f4f4",
    backgroundColor: "#ffffff",
    width: "90%",
    height: "70%",
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 10,
  },
  text: {
    fontSize: 17,
    height: "100%",
    color: "#000000",
    textAlignVertical: "center",
    flex: 9,
    backgroundColor: "#ffffff00",
  },
  icon: {
    alignItems: "center",
    backgroundColor: "#ffffff00",
    marginHorizontal: 5,
  },
  userIcon: {
    backgroundColor: "#cfcfcf",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    height: 31,
    width: 31,
    marginRight: 0,
    borderColor: "#f4f4f4",
    borderWidth: 1,
  },
});
