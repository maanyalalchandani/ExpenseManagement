import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    monthlyData: JSON.parse(localStorage.getItem('budgetData')) || {},
  },
  reducers: {
    setMonthlyData: (state, action) => {
      const { userId, month, data } = action.payload;
      if (!state.monthlyData[userId]) {
        state.monthlyData[userId] = {};
      }
      if (!state.monthlyData[userId][month]) {
        state.monthlyData[userId][month] = {};
      }
      state.monthlyData[userId][month] = {
        ...state.monthlyData[userId][month],
        ...data,
      };
      localStorage.setItem('budgetData', JSON.stringify(state.monthlyData));
    },
  },
});

export const { setMonthlyData } = budgetSlice.actions;

export default budgetSlice.reducer;