import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { db } from '../../firebaseConfig';
import { logout } from '../redux/userSlice';
import {
  setUserInput,
  saveData,
  updateData,
  deleteData,
} from '../redux/dataSlice';
import { CustomButton } from '../components/index.js';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, {
  BounceIn,
  FlipInYRight,
  PinwheelIn,
} from 'react-native-reanimated';

const HomePage = () => {
  const { data, userInput } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const hadleLogout = () => {
    dispatch(logout());
  };
  const handleTextInput = (text) => {
    dispatch(setUserInput(text));
  };
  const renderItem = ({ item, index }) => {
    return (
      <Animated.View
        entering={FlipInYRight.delay(150 * (index + 1))}
        style={styles.flatlistContainer}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => [
            console.log('Item Clicked', item.id),
            dispatch(updateData({ value: item.id, status: item.isCompleted })),
          ]}>
          {item.isCompleted ? (
            <AntDesign name="checkcircle" size={24} color="black" />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-circle-outline"
              size={24}
              color="black"
            />
          )}
        </Pressable>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.content}</Text>
        </View>
        <Pressable
          style={styles.iconContainer}
          onPress={() => [
            console.log('Item Clicked', item.id),
            dispatch(deleteData({ value: item.id })),
          ]}>
          <Ionicons name="trash-bin-sharp" size={24} color="black" />
          )}
        </Pressable>
      </Animated.View>
    );
  };
  //<AntDesign name="checkcircleo" size={24} color="black" /> Tıklanmamış
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> TODO List </Text>
      <Animated.FlatList
        style={styles.flatlist}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View style={styles.inputButtonContainer}>
        <TextInput
          value={userInput}
          placeholder="Add To Do"
          onChangeText={handleTextInput}
          style={styles.textInput}
          placeholderTextColor="gray"
        />
        <CustomButton
          buttonText="SAVE"
          flexValue={1}
          handleOnPress={() => {
            if(userInput && userInput.trim() !== "") dispatch(saveData(userInput));
            console.log(userInput);
          }}
          pressedColor="lightgray"
          nonPressedColor="blue"
        />
      </View>
    </SafeAreaView>
  );
};
export default HomePage;
const styles = StyleSheet.create({
  inputButtonContainer: {
    width: '90%',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
  },

  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 5,
    marginLeft: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  flatlistContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 0.3,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatlist: {
    width: '90%',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkblue',
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    flex: 3,
    borderRadius: 10,
    paddingVertical: 5,
    textAlign: 'center',
    marginRight: 5,
  },
});
