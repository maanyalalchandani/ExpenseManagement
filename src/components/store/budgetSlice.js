import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    income: 0,
    budget: 0,
    expenses: [],
    budgetDetails: [],
  },
  reducers: {
    setIncome: (state, action) => {
      state.income = action.payload;
      localStorage.setItem('income', action.payload);
    },
    setBudget: (state, action) => {
      state.budget = action.payload;
      localStorage.setItem('budget', action.payload);
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
      localStorage.setItem('expenses', JSON.stringify(state.expenses));
    },
    setBudgetDetails: (state, action) => {
      state.budgetDetails = action.payload;
      localStorage.setItem('budgetDetails', JSON.stringify(action.payload));
    },
  },
});

export const { setIncome, setBudget, addExpense, setBudgetDetails } = budgetSlice.actions;

export default budgetSlice.reducer;