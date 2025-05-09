
import RootNavigation from"./src/Navigation/RootNavigation"
import {Provider,useDispatch,useSelector} from "react-redux"
import{ store} from "./src/redux/store"
import{ getAllData} from "./src/redux/dataSlice"
import React,{useEffect} from "react"
import Loading from "./src/components/Loading"


const App = () => {
  const dispatch = useDispatch();
  const {isLoading,isSaved} = useSelector(state=>state.data)
  useEffect(()=>{
    dispatch(getAllData())
  },[isSaved])
  if(isLoading){
    return <Loading/>
  }
  return (
    <RootNavigation/>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWrapper;
