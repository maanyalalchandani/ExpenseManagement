import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const initialState = JSON.parse(localStorage.getItem('monthlyExpense')) || {
  expenses: [],
};

const monthlyExpenseSlice = createSlice({
  name: 'monthlyExpense',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      localStorage.setItem('monthlyExpense', JSON.stringify(state));
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
      localStorage.setItem('monthlyExpense', JSON.stringify(state));
    },
  },
});

export const { addExpense, deleteExpense } = monthlyExpenseSlice.actions;
export default monthlyExpenseSlice.reducer;