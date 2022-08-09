import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  SectionList,
} from "react-native";
import React, { useState, useEffect } from "react";
import NotesItem from "./NotesItem";
import SearchItem from "./SearchItem";

const SearchList = ({ notesStore, setNotesStore, searchWord, selectItem }) => {
  const [searchContent, setSearchContent] = useState([]);

  // const found = notesStore.map(group => {
  //   if (group.id) {
  //     group.find(item => item);
  //   }
  // });

  return (
    <View style={[styles.searchlist]}>
      {/* <Text>{JSON.stringify(found)}</Text> */}
      <ScrollView
        style={[styles.searched, { width: useWindowDimensions().width }]}
      >
        {notesStore.map((group) =>
          group.data.map((item) => {
            if (item.id && item.name.includes(searchWord)) {
              return (
                <SearchItem
                  note={item}
                  setNotesStore={setNotesStore}
                  selectItem={selectItem}
                />
              );
            }
          })
        )}
      </ScrollView>
    </View>
  );
};

export default SearchList;

const styles = StyleSheet.create({
  searchlist: {
    flex: 13,
    backgroundColor: "#f4f4f4",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  searched: {
    paddingHorizontal: 18,
  },
  noteConHeader: {
    marginBottom: 15,
    marginTop: 30,
    fontSize: 20,
    fontWeight: "700",
    color: "#5f5f5f",
  },
});
