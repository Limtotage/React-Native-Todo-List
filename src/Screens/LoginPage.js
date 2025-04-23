import { Text, Image, StyleSheet, View } from 'react-native';
import { Loading, CustomTextInput, CustomButton } from '../components/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLoading, login, autoLogin } from '../redux/userSlice';
import React, { useState ,useEffect} from 'react';

const LoginPage = ({ navigation }) => {
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
useEffect(()=>{
  dispatch(autoLogin())
},[])
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}> Welcome </Text>
      <Image
        source={require('../../assets/Images/loginicon.png')}
        style={styles.image}
      />
      <CustomTextInput
        handletitle="E-mail"
        handleisSecureText={false}
        handleonChangeText={(text) => setEmail(text)}
        handlevalue={email}
        handleplaceholder="Enter Your E-mail"
      />
      <CustomTextInput
        handletitle="Password"
        handleisSecureText={true}
        handleonChangeText={(password) => setPassword(password)}
        handlevalue={password}
        handleplaceholder="Enter Your Password"
      />
      <CustomButton
        buttonText="Login"
        setWidth="70%"
        handleOnPress={() => dispatch(login({ email, password }))}
        pressedColor="lightgray"
        nonPressedColor="blue"
      />
      <CustomButton
        buttonText="Sign Up"
        setWidth="30%"
        handleOnPress={() => navigation.navigate('Signup')}
        pressedColor="gray"
        nonPressedColor="lightgray"
      />
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    paddingTop: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 30,
  },
});
