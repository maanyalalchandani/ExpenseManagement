import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Card, CardContent, Grid, TextField, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { addExpense, deleteExpense } from '../store/monthlyExpenseSlice';
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
  const income = useSelector(state => state.budget.income);
  const budget = useSelector(state => state.budget.budget);
  const expenses = useSelector(state => state.monthlyExpense.expenses);
  const userEmail = useSelector(state => state.auth.user?.email);

  const [date, setDate] = useState(dayjs());
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const [budgetDetails, setBudgetDetails] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddExpense = () => {
    const expense = {
      id: uuidv4(),
      date: date.format('YYYY-MM-DD'),
      category: category || customCategory,
      amount: parseFloat(amount),
    };
    dispatch(addExpense(expense));
    sendExpenseEmail(expense, userEmail);
    setCategory('');
    setCustomCategory('');
    setAmount('');
  };

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
    setCategory(newValue);
  };

  // const handleAddBudgetDetail = () => {
  //   const newBudget = { type: selectedCategory, amount: 100 }; // Assuming you have some logic to determine the amount
  //   setBudgetDetails([...budgetDetails, newBudget]);
  //   setSelectedCategory('');
  // };

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Daily Expense</Typography>
          <Typography variant="subtitle1">Total Income: {income}</Typography>
          <Typography variant="subtitle1">Budget: {budget}</Typography>
          <Typography variant="subtitle1">Left Income: {income - budget}</Typography>
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

      {/* <Card sx={{ maxWidth: 800, width: '100%', mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>Budget Details</Typography>
          {budgetDetails.length ? (
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

      <Box display="flex" justifyContent="space-between" width="100%">
        <Button variant="contained" onClick={() => setShowGraph(true)} sx={{ mt: 2 }}>
          Show Graph
        </Button>
        <Button variant="contained" onClick={() => setShowCalculator(true)} sx={{ mt: 2 }}>
          Calculator
        </Button>
      </Box>

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
