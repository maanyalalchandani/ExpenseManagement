import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

const DefaultDash = () => {
  const monthlyData = useSelector(state => state.budget.monthlyData);
  const monthlyExpenses = useSelector(state => state.monthlyExpense.monthlyExpenses);

  const currentMonth = dayjs().format('YYYY-MM');
  const currentMonthData = monthlyData[currentMonth] || {};
  const { income, budget, budgetDetails } = currentMonthData;
  const expenses = monthlyExpenses[currentMonth] || [];

  const leftIncome = income && budget ? income - budget : 'Not available';

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Budget</Typography>
              <Box>
                <Typography variant="subtitle1">Income: {income || 'Not set'}</Typography>
                <Typography variant="subtitle1">Budget: {budget || 'Not set'}</Typography>
                <Typography variant="subtitle1">Left Income: {leftIncome}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Monthly Expenses</Typography>
              {budgetDetails && budgetDetails.length ? (
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