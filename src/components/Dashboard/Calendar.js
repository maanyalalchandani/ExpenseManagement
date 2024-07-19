import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent, useTheme, Grid, Divider, TextField } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Calendar = () => {
  const theme = useTheme();
  const currentUser = useSelector(state => state.auth.user);
  const monthlyExpenses = useSelector(state => state.monthlyExpense.monthlyExpenses[currentUser.id] || {});
  const monthlyData = useSelector(state => state.budget.monthlyData[currentUser.id] || {});

  const [date, setDate] = useState(dayjs());

  const currentMonth = date.format('YYYY-MM');
  const currentMonthData = monthlyData[currentMonth] || {};
  const { income, budget } = currentMonthData;

  const expensesForDate = (monthlyExpenses[currentMonth] || []).filter(expense => 
    dayjs(expense.date).isSame(date, 'day')
  );

  return (
    <Box p={4} sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ mb: 3, backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <Typography variant="h4" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarMonthIcon sx={{ mr: 1 }} /> Calendar
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon sx={{ mr: 1, color: theme.palette.success.main }} />
                    Total Income: {income || 'Not set'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalanceWalletIcon sx={{ mr: 1, color: theme.palette.info.main }} />
                    Monthly Budget: {budget || 'Not set'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyIcon sx={{ mr: 1, color: theme.palette.warning.main }} />
                    Left Income: {income && budget ? income - budget : 'Not available'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card elevation={3} sx={{ backgroundColor: theme.palette.background.paper }}>
            <CardContent>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  sx={{ 
                    '& .MuiPickersDay-root': { 
                      fontSize: '1rem',
                      margin: '2px',
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                      },
                    },
                  }}
                />
              </LocalizationProvider>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom color="primary">
                Expenses for {date.format('MMMM D, YYYY')}
              </Typography>
              {expensesForDate.length > 0 ? (
                expensesForDate.map((expense, index) => (
                  <Typography key={index} sx={{ 
                    py: 1, 
                    borderBottom: index < expensesForDate.length - 1 ? `1px solid ${theme.palette.divider}` : 'none'
                  }}>
                    {`${expense.category}: ${expense.amount}`}
                  </Typography>
                ))
              ) : (
                <Typography color="textSecondary">No expenses for this date</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calendar;