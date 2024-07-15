import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const initialState = JSON.parse(localStorage.getItem('auth')) || {
  isAuthenticated: false,
  user: null,
  registeredUsers: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      state.registeredUsers.push(action.payload);
      localStorage.setItem('auth', JSON.stringify(state));
    },
    login: (state, action) => {
      const user = state.registeredUsers.find(
        user => user.username === action.payload.username && user.password === action.payload.password
      );
      if (user) {
        state.isAuthenticated = true;
        state.user = user;
        localStorage.setItem('auth', JSON.stringify(state));
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.setItem('auth', JSON.stringify(state));
    },
  },
});

export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;