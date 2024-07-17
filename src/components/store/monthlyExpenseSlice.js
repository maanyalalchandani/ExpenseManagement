import { createSlice } from '@reduxjs/toolkit';

const monthlyExpenseSlice = createSlice({
  name: 'monthlyExpense',
  initialState: {
    monthlyExpenses: JSON.parse(localStorage.getItem('monthlyExpenses')) || {},
  },
  reducers: {
    addExpense: (state, action) => {
      const { month, expense } = action.payload;
      if (!state.monthlyExpenses[month]) {
        state.monthlyExpenses[month] = [];
      }
      state.monthlyExpenses[month].push(expense);
      localStorage.setItem('monthlyExpenses', JSON.stringify(state.monthlyExpenses));
    },
    deleteExpense: (state, action) => {
      const { month, id } = action.payload;
      state.monthlyExpenses[month] = state.monthlyExpenses[month].filter(expense => expense.id !== id);
      localStorage.setItem('monthlyExpenses', JSON.stringify(state.monthlyExpenses));
    },
  },
});

export const { addExpense, deleteExpense } = monthlyExpenseSlice.actions;
export default monthlyExpenseSlice.reducer;