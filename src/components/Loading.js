import { 
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Pressable
} from 'react-native';


const Loading = ({changeIsLoading}) => {

  return (
    <View style={styles.container}>
      <Pressable 
      onPress={()=>changeIsLoading()}
      style={styles.closeButton}>
        <Text style = {styles.closeButtonText}> X </Text>
      </Pressable>
      <ActivityIndicator size={"large"} color = {"blue"} />
      <Text style = {styles.logintext}> Loading... </Text>
    </View>
  );
}
export default Loading
const styles = StyleSheet.create({

  container: {
    position:"absolute",
    width:"100%",
    height:"100%",
    backgroundColor:"tomato",
    alignItems:"center",
    justifyContent:"center",
  },
  logintext:{
    fontWeight:"bold",
    fontSize:16,
    color:"white",
    marginTop:20,

  },
  closeButton:{
    position:"absolute",
    backgroundColor:"black",
    top:50,
    right:30,
    width:50,
    height:50,
    borderRadius:50,
    alignItems:"center",
    justifyContent:"center"
  },
  closeButtonText:{
    color:"white",
    fontSize:16,
    fontWeight:"bold"
  }
});