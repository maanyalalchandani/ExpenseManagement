import React, { useState } from 'react';
import { Box, Card, CardContent, Grid, Typography, Paper, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PieChartIcon from '@mui/icons-material/PieChart';
import BudgetGraph from '../MonthlyBudget/BudgetGraph';
import { useTheme } from '@mui/material/styles';

const DefaultDash = () => {
  const theme = useTheme();
  const currentUser = useSelector(state => state.auth.user);
  const monthlyData = useSelector(state => state.budget.monthlyData[currentUser.id] || {});
  const monthlyExpenses = useSelector(state => state.monthlyExpense.monthlyExpenses[currentUser.id] || {});

  const [showGraph, setShowGraph] = useState(false);

  const currentMonth = dayjs().format('YYYY-MM');
  const lastMonth = dayjs().subtract(1, 'month').format('YYYY-MM');
  const currentMonthData = monthlyData[currentMonth] || {};
  const lastMonthData = monthlyData[lastMonth] || {};
  const { income: currentIncome, budget, budgetDetails } = currentMonthData;
  const { income: lastIncome } = lastMonthData;
  const currentExpenses = monthlyExpenses[currentMonth] || [];
  const lastExpenses = monthlyExpenses[lastMonth] || [];

  const totalCurrentExpenses = currentExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalLastExpenses = lastExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleShowGraph = () => {
    setShowGraph(true);
  };

  const handleCloseGraph = () => {
    setShowGraph(false);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh', 
      padding: 3 
    }}>  
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography color="textSecondary" gutterBottom>Expense Last Month</Typography>
            <Typography variant="h4" component="div">
              ₹{totalLastExpenses}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <ShoppingCartIcon color="primary" />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                Last month's total
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography color="textSecondary" gutterBottom>Expense This Month</Typography>
            <Typography variant="h4" component="div">
              ₹{totalCurrentExpenses}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <ShoppingCartIcon color="secondary" />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                Current month's total
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography color="textSecondary" gutterBottom>Income Last Month</Typography>
            <Typography variant="h4" component="div">
              ₹{lastIncome || 'N/A'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <AttachMoneyIcon color="primary" />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                Last month's income
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
            <Typography color="textSecondary" gutterBottom>Income This Month</Typography>
            <Typography variant="h4" component="div">
              ₹{currentIncome || 'N/A'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <AttachMoneyIcon color="secondary" />
              <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
                Current month's income
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Recent Expenses</Typography>
            {currentExpenses.length ? (
              currentExpenses.slice(0, 5).map((expense) => (
                <Box key={expense.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">{`${expense.category}`}</Typography>
                  <Typography variant="body2">{`₹${expense.amount}`}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No recent expenses.</Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Budget Overview</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Total Budget:</Typography>
              <Typography variant="body1">₹{budget || 'Not set'}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Spent:</Typography>
              <Typography variant="body1">₹{totalCurrentExpenses}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1">Remaining:</Typography>
              <Typography variant="body1">₹{budget ? budget - totalCurrentExpenses : 'N/A'}</Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PieChartIcon />}
              onClick={handleShowGraph}
              fullWidth
            >
              Show Budget Distribution
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <BudgetGraph open={showGraph} onClose={handleCloseGraph} data={budgetDetails || []} />
    </Box>
  );
};

export default DefaultDash;