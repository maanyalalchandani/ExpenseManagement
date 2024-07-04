import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const DefaultDash = () => {
  const incomeData = useSelector(state => state.budget.incomeData || {});
  const budgetData = useSelector(state => state.budget.budgetData || []);
  const expenses = useSelector(state => state.monthlyExpense.expenses || []);

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const leftIncome = incomeData?.income - calculateTotalExpenses();

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Budget</Typography>
              {incomeData ? (
                <Box>
                  <Typography variant="subtitle1">Income: {incomeData.income}</Typography>
                  <Typography variant="subtitle1">Budget: {incomeData.budget}</Typography>
                  <Typography variant="subtitle1">Left Income: {leftIncome}</Typography>
                </Box>
              ) : (
                <Typography variant="body2">No income data available.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Expenses</Typography>
              {budgetData.length ? (
                budgetData.map((budget, index) => (
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
