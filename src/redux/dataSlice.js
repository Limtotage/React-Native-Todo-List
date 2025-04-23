import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebaseConfig';

export const getAllData = createAsyncThunk('data/getData', async () => {
  const allData = [];
  try {
    const querySnapshot = await db.collection('TodoList').get();
    querySnapshot.forEach((doc) => {
      allData.push({ ...doc.data(), id: doc.id });
    });
    return allData;
  } catch (error) {
    throw new Error(error.message);
  }
});
export const saveData = createAsyncThunk('data/saveData', async (value) => {
  try {
    const docRef = await db.collection('TodoList').add({
      content: value,
    });
    console.log('Document Written with ID : ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error(e.message);
  }
});

const initialState = {
  data: [],
  userInput: null,
  isLoading: false,
  isSaved: false,
  error: null,
};
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUserInput: (state, action) => {
      state.userInput = action.payload;
    },
  },
  //veri baklamamiz gerekmediği sürece bu kısım eğer veri beklememiz gerekiyorsa extrareducers
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(saveData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSaved = !state.isSaved;
        state.userInput=null;
      })
      .addCase(saveData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setUserInput } = dataSlice.actions;
export default dataSlice.reducer;
