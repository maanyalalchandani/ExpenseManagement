import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    monthlyData: JSON.parse(localStorage.getItem('budgetData')) || {},
  },
  reducers: {
    setMonthlyData: (state, action) => {
      const { month, data } = action.payload;
      state.monthlyData[month] = {
        ...state.monthlyData[month],
        ...data,
      };
      localStorage.setItem('budgetData', JSON.stringify(state.monthlyData));
    },
  },
});

export const { setMonthlyData } = budgetSlice.actions;

export default budgetSlice.reducer;