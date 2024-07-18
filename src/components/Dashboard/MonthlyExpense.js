import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, Button, Typography, Card, CardContent, Grid, TextField, 
  IconButton, Dialog, DialogTitle, DialogContent, Select, MenuItem, useTheme,
  Chip, Divider, List, ListItem, ListItemText, ListItemSecondaryAction
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { addExpense, deleteExpense } from '../store/monthlyExpenseSlice';
import BudgetGraph from '../MonthlyBudget/BudgetGraph';
import Calculator from './Calculator';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalculateIcon from '@mui/icons-material/Calculate';
import Autocomplete from '@mui/material/Autocomplete';
import { sendExpenseEmail } from '../utils/emailUtils';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const expenseCategories = ['Food', 'Travel', 'Utilities', 'Entertainment', 'Shopping', 'Education', 'Electricity'];

const MonthlyExpense = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const currentUser = useSelector(state => state.auth.user);
  const monthlyData = useSelector(state => state.budget.monthlyData[currentUser.id] || {});
  const monthlyExpenses = useSelector(state => state.monthlyExpense.monthlyExpenses[currentUser.id] || {});

  const [selectedMonth, setSelectedMonth] = useState(dayjs().format('YYYY-MM'));
  const [date, setDate] = useState(dayjs());
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [showGraph, setShowGraph] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const currentMonthData = monthlyData[selectedMonth] || {};
  const { income, budget } = currentMonthData;
  const expenses = monthlyExpenses[selectedMonth] || [];

  const handleAddExpense = () => {
    const expense = {
      id: uuidv4(),
      date: date.format('YYYY-MM-DD'),
      category: category,
      amount: parseFloat(amount),
    };
    dispatch(addExpense({ userId: currentUser.id, month: selectedMonth, expense }));
    sendExpenseEmail(expense, currentUser.email);
    setCategory('');
    setAmount('');
  };

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpense({ userId: currentUser.id, month: selectedMonth, id }));
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Box p={4} sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ mb: 3, bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom color="primary">Monthly Expense</Typography>
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Total Income: ₹{income || 'Not set'}</Typography>
                  <Typography variant="subtitle1">Budget: ₹{budget || 'Not set'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Left Income: ₹{income && budget ? income - budget : 'Not available'}</Typography>
                  <Typography variant="subtitle1">Total Expenses: ₹{calculateTotalExpenses()}</Typography>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="space-between" width="100%" mt={2}>
                <Button variant="contained" color="primary" onClick={() => setShowGraph(true)} startIcon={<BarChartIcon />}>
                  Show Graph
                </Button>
                <Button variant="contained" color="secondary" onClick={() => setShowCalculator(true)} startIcon={<CalculateIcon />}>
                  Calculator
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={3} sx={{ mb: 3, bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">Add Expense</Typography>
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
                    onChange={(_, newValue) => setCategory(newValue)}
                    renderInput={(params) => <TextField {...params} label="Category" fullWidth />}
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
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddExpense} 
                    fullWidth
                    startIcon={<AddIcon />}
                  >
                    Add Expense
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card elevation={3} sx={{ bgcolor: 'background.paper' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom color="primary">Expenses</Typography>
              <List>
                {expenses.map((expense) => (
                  <React.Fragment key={expense.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${expense.category}: ₹${expense.amount}`}
                        secondary={dayjs(expense.date).format('MMMM D, YYYY')}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteExpense(expense.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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