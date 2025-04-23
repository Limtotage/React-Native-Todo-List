import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    console.log('User Mail: ', email);
    console.log('User Password: ', password);
    try {
      const auth = firebase.auth();
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (!user) {
        throw new Error('User data is missing.');
      }
      console.log(user);
      const token = await user.getIdToken();
      const userData = {
        token,
        user: user,
      };
      await AsyncStorage.setItem('userToken', token);
      return userData;
    } catch (error) {
      console.error('Login Error:', error?.message || error);
      throw new Error(
        error?.message || 'An unknown error occurred during login.'
      );
    }
  }
);

// kullanıcı Auto Login
export const autoLogin = createAsyncThunk('user/autoLogin', async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      console.log(token);
      return token;
    } else {
      throw new Error('User Not Found');
    }
  } catch (error) {
    console.log('Auto Login Error : ', error);
    throw new Error(error.message);
  }
});

//logout
export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    const auth = firebase.auth();
    await auth.signOut();
    await AsyncStorage.removeItem('userToken');
    return null;
  } catch (error) {
    console.log('Logout Error : ', error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
//register
export const register = createAsyncThunk(
  'user/register',
  async ({ email, password }) => {
    try {
      const auth = firebase.auth();
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (!user) {
        throw new Error('User data is missing.');
      }
      const token = await user.getIdToken();
      await AsyncStorage.setItem('userToken', token);
      return token;
    } catch (error) {
      console.log('Register Error: ', error.message);
      throw new Error(error.message);
    }
  }
);
const initialState = {
  isLoading: false,
  isAuth: false,
  token: null,
  user: null,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      if (action.payload) {
        const lowerCaseEmail = action.payload.toLowerCase();
        state.email = lowerCaseEmail;
      } else {
        console.error('Email is undefined');
      }
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.error.message || 'Login failed';
      })

      .addCase(autoLogin.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        console.log('auto fullfilled');
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(autoLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.token = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = 'Invalid Email or Password';
      });
  },
});
export const { setEmail, setPassword, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
