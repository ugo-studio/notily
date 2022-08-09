import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LeftIcon from 'react-native-vector-icons/AntDesign';
import SaveIcon from 'react-native-vector-icons/Entypo';

const Header = ({
  goTo,
  compile,
  textRef,
  hideKeyboard,
  name,
  setName,
  setSaveName,
  setSaveData,
  prevData,
  currentData,
  prevName,
}) => {
  const [theSame, setTheSame] = useState(null);
  useEffect(() => {
    const hideSubcription = Keyboard.addListener('keyboardDidHide', () => {
      textRef.current.blur();
    });

    return () => {
      hideSubcription.remove();
    };
  });

  useEffect(() => {
    if (prevData == currentData && prevName == name) {
      setTheSame(true);
    } else {
      setTheSame(null);
    }
  }, [currentData, prevData, prevName, name]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const getTimeNow = () => {
    const d = new Date();
    let period;
    let min;
    let full;
    // get period
    if (d.getHours() <= 11) {
      period = 'AM';
    } else {
      period = 'PM';
    }
    // get minute
    if (d.getMinutes() <= 9) {
      min = '0' + d.getMinutes();
    } else {
      min = d.getMinutes();
    }
    // get full time
    if (d.getHours() >= 13) {
      return (
        days[d.getDay()] + ' ' + (d.getHours() - 12) + ':' + min + ' ' + period
      );
    } else {
      return `${days[d.getDay()]} ${d.getHours()}:${min} ${period}`;
    }
  };

  const getCreatedAt = () => {
    const d = new Date();
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <Pressable
      onPress={() => hideKeyboard()}
      style={[styles.Nav]}
      android_disableSound={true}>
      <TouchableOpacity style={[styles.leftIcon]} onPress={() => goTo()}>
        <LeftIcon name="left" size={30} color="#0092ff" />
      </TouchableOpacity>
      <TextInput
        ref={textRef}
        multiline={false}
        style={[styles.name]}
        placeholder="Note's name..."
        placeholderTextColor="#979797"
        selectionColor="#0080ffa2"
        textAlign="center"
        onChangeText={value => setName(value)}
        defaultValue={name}
      />
      <TouchableOpacity
        style={[styles.saveIcon]}
        onPress={() => {
          setSaveName(name);
          setSaveData(currentData);
          compile(name, currentData, getTimeNow(), getCreatedAt());
          hideKeyboard();
        }}>
        <SaveIcon
          name="save"
          size={25}
          color={theSame ? '#666372' : '#0080ff'}
        />
      </TouchableOpacity>
    </Pressable>
  );
};

export default Header;

const styles = StyleSheet.create({
  Nav: {
    // flex: 1,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    justifyContent: 'space-between',
  },
  leftIcon: {
    margin: 10,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  name: {
    backgroundColor: '#f4f4f4',
    fontSize: 18,
    color: '#000000',
    maxWidth: '70%',
  },
  saveIcon: {
    margin: 10,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
});
