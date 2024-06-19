import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    registeredUsers: [],
  },
  reducers: {
    register: (state, action) => {
      state.registeredUsers.push(action.payload);
    },
    login: (state, action) => {
      const user = state.registeredUsers.find(
        user => user.username === action.payload.username && user.password === action.payload.password
      );
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;