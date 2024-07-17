import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Button, Typography, Card, CardContent, Grid, TextField, 
  IconButton, Dialog, DialogTitle, DialogContent, Select, MenuItem 
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { addExpense, deleteExpense } from '../store/monthlyExpenseSlice';
import { setMonthlyData } from '../store/budgetSlice';
import BudgetGraph from '../MonthlyBudget/BudgetGraph';
import Calculator from './Calculator';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import { sendExpenseEmail } from '../utils/emailUtils';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const expenseCategories = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Shopping', 'Education', 'Electricity'];

const MonthlyExpense = () => {
  const dispatch = useDispatch();
  const monthlyData = useSelector(state => state.budget.monthlyData);
  const monthlyExpenses = useSelector(state => state.monthlyExpense.monthlyExpenses);
  const userEmail = useSelector(state => state.auth.user?.email);

  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
  const [date, setDate] = useState(dayjs());
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const currentMonthData = monthlyData[selectedMonth] || {};
  const { income, budget } = currentMonthData;
  const expenses = monthlyExpenses[selectedMonth] || [];

  const handleAddExpense = () => {
    const expense = {
      id: uuidv4(),
      date: date.format('YYYY-MM-DD'),
      category: category || customCategory,
      amount: parseFloat(amount),
    };
    dispatch(addExpense({ month: selectedMonth, expense }));
    sendExpenseEmail(expense, userEmail);
    setCategory('');
    setCustomCategory('');
    setAmount('');
  };

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpense({ month: selectedMonth, id }));
  };

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Monthly Expense</Typography>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            fullWidth
            sx={{ mb: 2 }}
          >
            {[...Array(12)].map((_, i) => {
              const month = dayjs().subtract(i, 'month').format('YYYY-MM');
              return (
                <MenuItem key={month} value={month}>
                  {dayjs(month).format('MMMM YYYY')}
                </MenuItem>
              );
            })}
          </Select>
          <Typography variant="subtitle1">Total Income: {income || 'Not set'}</Typography>
          <Typography variant="subtitle1">Budget: {budget || 'Not set'}</Typography>
          <Typography variant="subtitle1">Left Income: {income && budget ? income - budget : 'Not available'}</Typography>
          <Typography variant="subtitle1">Total Expenses: {calculateTotalExpenses()}</Typography>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button variant="contained" onClick={() => setShowGraph(true)} sx={{ mt: 2 }}>
              Show Graph
            </Button>
            <Button variant="contained" onClick={() => setShowCalculator(true)} sx={{ mt: 2 }}>
              Calculator
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>Add Expense</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                freeSolo
                disablePortal
                id="combo-box-demo"
                options={expenseCategories}
                value={category}
                onChange={handleCategoryChange}
                renderInput={(params) => <TextField {...params} label="Category" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleAddExpense} fullWidth>Add Expense</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>Expenses</Typography>
          {expenses.map((expense) => (
            <Box key={expense.id} display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography>{`${expense.date} - ${expense.category}: ${expense.amount}`}</Typography>
              <IconButton onClick={() => handleDeleteExpense(expense.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </CardContent>
      </Card>

      <BudgetGraph open={showGraph} onClose={() => setShowGraph(false)} data={expenses} />
      <Dialog open={showCalculator} onClose={() => setShowCalculator(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Calculator
          <IconButton
            aria-label="close"
            onClick={() => setShowCalculator(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Calculator onClose={() => setShowCalculator(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MonthlyExpense;