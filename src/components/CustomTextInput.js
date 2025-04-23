import { Text, StyleSheet, View, TextInput } from 'react-native';
const CustomTextInput = (props) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}> {props.handletitle} </Text>
      <TextInput
        secureTextEntry={props.handleisSecureText}
        placeholder={props.handleplaceholder}
        style={styles.input}
        onChangeText={props.handleonChangeText}
        value={props.handlevalue}
      />
    </View>
  );
};
export default CustomTextInput;
const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20, 
    width: '80%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderBottomWidth: 0.5,
    borderRadius: 10,
    borderColor: 'darkblue',
    paddingVertical: 8,
    fontSize: 16,
    color: 'gray',
  },
});
