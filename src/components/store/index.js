import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import budgetReducer from './budgetSlice';
import monthlyExpenseReducer from './monthlyExpenseSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    budget: budgetReducer,
    monthlyExpense: monthlyExpenseReducer,
  },
});

export default store;
