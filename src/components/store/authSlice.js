import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
      const newUser = { ...action.payload, id: uuidv4() };
      state.registeredUsers.push(newUser);
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
    updateUserProfile: (state, action) => {
      const { name, email } = action.payload;
      if (state.user) {
        state.user = { ...state.user, name, email };
        const index = state.registeredUsers.findIndex(user => user.id === state.user.id);
        if (index !== -1) {
          state.registeredUsers[index] = { ...state.registeredUsers[index], name, email };
        }
        localStorage.setItem('auth', JSON.stringify(state));
      }
    },
  },
});

export const { register, login, logout, updateUserProfile } = authSlice.actions;

export default authSlice.reducer;

