import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../firebaseConfig';

export const getAllData = createAsyncThunk('data/getData', async () => {
  const allData = [];
  try {
    const querySnapshot = await db.collection('TodoList').orderBy('createdAt', 'asc').get();
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
      isCompleted: false,
      createdAt: new Date(), 
    });
    console.log('Document Written with ID : ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error(e.message);
  }
});
export const deleteData = createAsyncThunk("data/deleteData", async ({ value }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      await db.collection('TodoList').doc(value).delete();
      await dispatch(getAllData());
      console.log('Data Deleted Successfully.');
    } catch (error) {
      console.error('Data Cant Deleted: ', error);
      throw new Error(error.message);
    }
  });
export const updateData = createAsyncThunk(
  'data/updateData',
  async ({ value, status }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      await db.collection('TodoList').doc(value).update({
        isCompleted: !status,
      });
      console.log('Data Updated Successfully.');

      await dispatch(getAllData());
    } catch (error) {
      console.error('Data Cant Updated: ', error);
      throw new Error(error.message);
    }
  }
);

const initialState = {
  data: [],
  userInput: null,
  isLoading: false,
  isSaved: false,
  isUpdated: false,
  isDeleted:false,
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
        state.userInput = null;
      })
      .addCase(saveData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateData.fulfilled, (state) => {
        state.isLoading = false;
        state.isUpdated = !state.isUpdated;
      })
      .addCase(updateData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteData.fulfilled, (state) => {
        state.isLoading = false;
        state.isDeleted = !state.isDeleted;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const { setUserInput } = dataSlice.actions;
export default dataSlice.reducer;
