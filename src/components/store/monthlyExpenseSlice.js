import { createSlice } from '@reduxjs/toolkit';

const monthlyExpenseSlice = createSlice({
  name: 'monthlyExpense',
  initialState: {
    monthlyExpenses: JSON.parse(localStorage.getItem('monthlyExpenses')) || {},
  },
  reducers: {
    addExpense: (state, action) => {
      const { userId, month, expense } = action.payload;
      if (!state.monthlyExpenses[userId]) {
        state.monthlyExpenses[userId] = {};
      }
      if (!state.monthlyExpenses[userId][month]) {
        state.monthlyExpenses[userId][month] = [];
      }
      state.monthlyExpenses[userId][month].push(expense);
      localStorage.setItem('monthlyExpenses', JSON.stringify(state.monthlyExpenses));
    },
    deleteExpense: (state, action) => {
      const { userId, month, id } = action.payload;
      state.monthlyExpenses[userId][month] = state.monthlyExpenses[userId][month].filter(expense => expense.id !== id);
      localStorage.setItem('monthlyExpenses', JSON.stringify(state.monthlyExpenses));
    },
  },
});

export const { addExpense, deleteExpense } = monthlyExpenseSlice.actions;
export default monthlyExpenseSlice.reducer;