import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    income: 0,
    budget: 0,
    expenses: [],
  },
  reducers: {
    setIncome: (state, action) => {
      state.income = action.payload;
    },
    setBudget: (state, action) => {
      state.budget = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action) => {
      const { index, expense } = action.payload;
      state.expenses[index] = expense;
    },
    removeExpense: (state, action) => {
      state.expenses.splice(action.payload, 1);
    },
  },
});

export const { setIncome, setBudget, addExpense, updateExpense, removeExpense } = budgetSlice.actions;

export default budgetSlice.reducer;
