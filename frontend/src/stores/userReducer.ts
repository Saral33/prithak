import { createSlice } from '@reduxjs/toolkit';

export interface IUserData {
  auth: {
    isLoggedIn?: boolean;
    refreshToken?: string;
    accessToken?: string;
  };
  name: string;
  email: string;
  userId: string;
  role: string;
}

const initialState: IUserData = {
  auth: {
    isLoggedIn: false,
    refreshToken: '',
    accessToken: '',
  },
  name: '',
  email: '',
  userId: '',
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.auth = action.payload.auth;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.auth = {
        isLoggedIn: false,
        refreshToken: '',
        accessToken: '',
      };
      state.name = '';
      state.email = '';
      state.userId = '';
      state.role = '';
    },
    refresh: (state, action) => {
      console.log({ a: action.payload });
      state.auth = { ...state.auth, accessToken: action.payload };
    },
  },
});

export const { login, logout, refresh } = userSlice.actions;

export default userSlice.reducer;
