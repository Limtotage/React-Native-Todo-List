import { Text, StyleSheet, Pressable } from 'react-native';
const CustomButton = (props) => {
  return (
    <Pressable
      onPress={() => props.handleOnPress()}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? props.pressedColor : props.nonPressedColor,
          ...(props.widthval ? { width: props.widthval } : { flex: props.flexValue }),
        },
        styles.buttonStyle,
      ]}>
      <Text style={styles.buttonTextStyle}> {props.buttonText} </Text>
    </Pressable>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  buttonStyle: {
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});
