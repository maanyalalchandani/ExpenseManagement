import React, { useEffect } from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setIncome, setBudget, addExpense, setBudgetDetails } from '../store/budgetSlice';
import { addExpense as addMonthlyExpense } from '../store/monthlyExpenseSlice';

const DefaultDash = () => {
  const dispatch = useDispatch();
  const income = useSelector(state => state.budget.income);
  const budget = useSelector(state => state.budget.budget);
  const budgetDetails = useSelector(state => state.budget.budgetDetails);
  const expenses = useSelector(state => state.monthlyExpense.expenses);

  useEffect(() => {
    const storedIncome = localStorage.getItem('income');
    const storedBudget = localStorage.getItem('budget');
    const storedBudgetDetails = JSON.parse(localStorage.getItem('budgetDetails')) || [];
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const storedMonthlyExpenses = JSON.parse(localStorage.getItem('monthlyExpenses')) || [];

    if (storedIncome) {
      dispatch(setIncome(parseFloat(storedIncome)));
    }

    if (storedBudget) {
      dispatch(setBudget(parseFloat(storedBudget)));
    }

    if (storedBudgetDetails.length > 0) {
      dispatch(setBudgetDetails(storedBudgetDetails));
    }

    if (storedExpenses.length > 0) {
      storedExpenses.forEach(expense => dispatch(addExpense(expense)));
    }

    if (storedMonthlyExpenses.length > 0) {
      storedMonthlyExpenses.forEach(expense => dispatch(addMonthlyExpense(expense)));
    }
  }, [dispatch]);

  // const calculateTotalExpenses = () => {
  //   return expenses.reduce((total, expense) => total + expense.amount, 0);
  // };

  const leftIncome = income - budget;

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Budget</Typography>
              <Box>
                <Typography variant="subtitle1">Income: {income}</Typography>
                <Typography variant="subtitle1">Budget: {budget}</Typography>
                <Typography variant="subtitle1">Left Income: {leftIncome}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Expenses</Typography>
              {budgetDetails.length ? (
                budgetDetails.map((budget, index) => (
                  <Typography key={index} variant="subtitle1">{`${budget.type}: ${budget.amount}`}</Typography>
                ))
              ) : (
                <Typography variant="body2">No budget data available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={4} width="100%">
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Recent Expenses</Typography>
            {expenses.length ? (
              expenses.map((expense) => (
                <Typography key={expense.id} variant="subtitle1">{`${expense.date} - ${expense.category}: ${expense.amount}`}</Typography>
              ))
            ) : (
              <Typography variant="body2">No recent expenses.</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DefaultDash;
