// src/store/monthlyExpenseSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenses: [],
};

const monthlyExpenseSlice = createSlice({
  name: 'monthlyExpense',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
  },
});

export const { addExpense, deleteExpense } = monthlyExpenseSlice.actions;
export default monthlyExpenseSlice.reducer;
