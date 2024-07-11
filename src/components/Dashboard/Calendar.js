import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Calendar = () => {
  const expenses = useSelector(state => state.monthlyExpense.expenses);
  const incomeData = useSelector(state => state.budget.incomeData);

  const [date, setDate] = useState(dayjs());

  const expensesForDate = expenses.filter(expense => dayjs(expense.date).isSame(date, 'day'));

  return (
    <Box p={3} display="flex" flexDirection="column" alignItems="center">
      <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>Calendar</Typography>
          <Typography variant="h6">Total Income: {incomeData?.income}</Typography>
          <Typography variant="h6">Monthly Budget: {incomeData?.budget}</Typography>
          <Typography variant="h6">Left Income: {incomeData?.income - expenses.reduce((total, expense) => total + expense.amount, 0)}</Typography>
        </CardContent>
      </Card>
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
