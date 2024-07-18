import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  Grid,
  Divider,
  Paper,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AddIncomeForm from './AddIncomeForm';
import AddBudgetForm from './AddBudgetForm';
import BudgetGraph from './BudgetGraph';
import { setMonthlyData } from '../store/budgetSlice';
import dayjs from 'dayjs';

const MonthlyBudget = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.user);
  const monthlyData = useSelector(state => state.budget.monthlyData[currentUser.id] || {});

  const [currentMonth, setCurrentMonth] = useState(dayjs().format('YYYY-MM'));
  const [showGraph, setShowGraph] = useState(false);
  const [editingIncome, setEditingIncome] = useState(false);
  const [editingBudget, setEditingBudget] = useState(false);

  const currentMonthData = monthlyData[currentMonth] || {};
  const { income, budget, budgetDetails } = currentMonthData;

  useEffect(() => {
    if (!income) setEditingIncome(true);
    if (!budgetDetails || budgetDetails.length === 0) setEditingBudget(true);
  }, [currentMonth, income, budgetDetails]);

  const handleIncomeSubmit = (data) => {
    dispatch(setMonthlyData({
      userId: currentUser.id,
      month: currentMonth,
      data: { income: data.income, budget: data.budget },
    }));
    setEditingIncome(false);
  };

  const handleBudgetSubmit = (data) => {
    dispatch(setMonthlyData({
      userId: currentUser.id,
      month: currentMonth,
      data: { budgetDetails: data },
    }));
    setEditingBudget(false);
  };

  const handleShowGraph = () => setShowGraph(true);
  const handleCloseGraph = () => setShowGraph(false);
  const calculateLeftIncome = () => income - budget;
  const formattedBudgetDetails = budgetDetails.map(item => ({
    category: item.type,
    amount: item.amount
  }));

  return (
    <Box 
      p={4} 
      sx={{
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          maxWidth: 800, 
          margin: 'auto', 
          p: 3, 
          borderRadius: 2 
        }}
      >
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Monthly Budget
        </Typography>
        <Select
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
          fullWidth
          sx={{ mb: 4 }}
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
        {editingIncome ? (
          <AddIncomeForm
            onSubmit={handleIncomeSubmit}
            initialIncome={income || ''}
            initialBudget={budget || ''}
          />
        ) : (
          <Box>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">Income</Typography>
                    <Typography variant="h4">₹{income || 'N/A'}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">Budget</Typography>
                    <Typography variant="h4">₹{budget || 'N/A'}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">Left Income</Typography>
                    <Typography variant="h4">₹{calculateLeftIncome() || 'N/A'}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setEditingIncome(true)}
              sx={{ mb: 3 }}
            >
              Edit Income
            </Button>
            {editingBudget ? (
              <AddBudgetForm onSubmit={handleBudgetSubmit} totalBudget={budget} />
            ) : (
              <Box>
                <Typography variant="h5" gutterBottom color="primary">Budget Details</Typography>
                <Divider sx={{ mb: 2 }} />
                {budgetDetails && budgetDetails.map((budgetItem, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1">{budgetItem.type}</Typography>
                    <Typography variant="body1" fontWeight="bold">₹{budgetItem.amount}</Typography>
                  </Box>
                ))}
                <Box display="flex" justifyContent="space-between" mt={3}>
                  <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => setEditingBudget(true)}
                  >
                    Edit Budget
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ShowChartIcon />}
                    onClick={handleShowGraph}
                  >
                    Show Graph
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Paper>
      <BudgetGraph open={showGraph} onClose={handleCloseGraph} data={formattedBudgetDetails} />
    </Box>
  );
};

export default MonthlyBudget;