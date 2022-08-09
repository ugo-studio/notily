import {
  StyleSheet,
  Text,
  View,
  SectionList,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
import NotesItem from "./NotesItem";
import SearchList from "./SearchList";

const NotesList = ({
  notesStore,
  setNotesStore,
  selectItem,
  searchWord,
  searchRef,
  dimen,
  prevScroll,
}) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getTodaysDate = () => {
    const d = new Date();
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };
  const getYesterdaysDate = () => {
    const d = new Date();
    return `${d.getDate() - 1} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <Pressable
      onPress={() => searchRef.current.blur()}
      android_disableSound={true}
      style={[styles.Note]}
    >
      {searchWord === "" ? (
        <>
          {notesStore[0].id ? (
            <SectionList
              onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y >= prevScroll.value) {
                  dimen.value = {
                    w: 50,
                    b: 50,
                    l: 0,
                    s: 1,
                    lo: 0,
                    so: 1,
                  };
                  prevScroll.value = e.nativeEvent.contentOffset.y - 20;
                } else {
                  dimen.value = {
                    w: 130,
                    b: 50,
                    l: 1,
                    s: 0,
                    lo: 1,
                    so: 0,
                  };
                  prevScroll.value = e.nativeEvent.contentOffset.y + 20;
                }
              }}
              style={[styles.fileList, { width: useWindowDimensions().width }]}
              sections={notesStore}
              renderItem={({ item }) =>
                item.id && (
                  <NotesItem
                    note={item}
                    setNotesStore={setNotesStore}
                    selectItem={selectItem}
                  />
                )
              }
              renderSectionHeader={({ section }) =>
                section.id && (
                  <Text style={[styles.noteConHeader]}>
                    {section.title === getTodaysDate()
                      ? "Today"
                      : section.title === getYesterdaysDate()
                      ? "Yesterday"
                      : section.title}
                  </Text>
                )
              }
              keyExtractor={(item) => item.id}
            />
          ) : (
            <View style={[styles.noNoteContainer]}>
              <Icon
                name="calendar-times-o"
                style={[styles.icon]}
                size={90}
                color="#000000"
              />
              <Text style={[styles.noNoteText]}>No Notes!</Text>
            </View>
          )}
        </>
      ) : (
        <SearchList
          selectItem={selectItem}
          notesStore={notesStore}
          setNotesStore={setNotesStore}
          searchWord={searchWord}
        />
      )}
    </Pressable>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  Note: {
    flex: 12,
    // backgroundColor: '#f4f4f4',
    backgroundColor: "#ffffff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  fileList: {
    paddingHorizontal: 18,
  },
  noteConHeader: {
    marginBottom: 5,
    marginTop: 30,
    fontSize: 17,
    fontWeight: "700",
    color: "#5f5f5f",
  },
  noNoteContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginBottom: 20,
  },
  noNoteText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#5f5f5f",
  },
});
