import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Calendar = () => {
  const monthlyExpenses = useSelector(state => state.monthlyExpense.monthlyExpenses);
  const monthlyData = useSelector(state => state.budget.monthlyData);

  const [date, setDate] = useState(dayjs());

  const currentMonth = date.format('YYYY-MM');
  const currentMonthData = monthlyData[currentMonth] || {};
  const { income, budget, budgetDetails } = currentMonthData;

  const expensesForDate = (monthlyExpenses[currentMonth] || []).filter(expense => 
    dayjs(expense.date).isSame(date, 'day')
  );

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
      <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>Calendar</Typography>
          <Typography variant="h6">Total Income: {income || 'Not set'}</Typography>
          <Typography variant="h6">Monthly Budget: {budget || 'Not set'}</Typography>
          <Typography variant="h6">Left Income: {income && budget ? income - budget : 'Not available'}</Typography>
        </CardContent>
      </Card>
      {/* <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>Budget Details</Typography>
          {budgetDetails && budgetDetails.length ? (
            budgetDetails.map((budget, index) => (
              <Typography key={index} variant="subtitle1">{`${budget.type}: ${budget.amount}`}</Typography>
            ))
          ) : (
            <Typography variant="body2">No budget data available.</Typography>
          )}
        </CardContent>
      </Card> */}
      <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
          </LocalizationProvider>
          <Box mt={2}>
            <Typography variant="h6" gutterBottom>Expenses for {date.format('YYYY-MM-DD')}</Typography>
            {expensesForDate.length > 0 ? (
              expensesForDate.map(expense => (
                <Typography key={expense.id}>{`${expense.category}: ${expense.amount}`}</Typography>
              ))
            ) : (
              <Typography>No expenses for this date</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Calendar;