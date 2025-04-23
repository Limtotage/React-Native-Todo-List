import {
  Text,
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { CustomTextInput, CustomButton, Loading } from '../components/index';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/userSlice';
const SignupPage = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const handleregister = () => {
    dispatch(register({ email, password }));
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Image
          source={require('../../assets/Images/Sign-Up.png')}
          style={styles.image}
        />
        <Text style={styles.welcome}> Sign up </Text>
      </View>
      <View style={styles.textInputField}>
        <CustomTextInput
          handletitle="Name"
          handleisSecureText={false}
          handleonChangeText={setName}
          handlevalue={name}
          handleplaceholder="Enter Your Name"
        />
        <CustomTextInput
          handletitle="E-Mail"
          handleisSecureText={false}
          handleonChangeText={setEmail}
          handlevalue={email}
          handleplaceholder="Enter Your E-mail"
        />
        <CustomTextInput
          handletitle="Password"
          handleisSecureText={true}
          handleonChangeText={setPassword}
          handlevalue={password}
          handleplaceholder="Create a Password"
        />
      </View>
      <View style={styles.signupButtonandothers}>
        <CustomButton
          buttonText="Sign Up"
          setWidth="70%"
          handleOnPress={handleregister}
          pressedColor="lightgray"
          nonPressedColor="blue"
        />
        <Pressable
          style={{ justifyContent: 'space-between' }}
          onPress={() => navigation.navigate('Login')}>
          <Text style={{ fontWeight: 'bold', justifyContent: 'space-between' }}>
            Already have a account? Login{' '}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default SignupPage;
const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    flex: 2,
    paddingTop: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputField: {
    flex: 2,
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  signupButtonandothers: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },

  welcome: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
  },
});
