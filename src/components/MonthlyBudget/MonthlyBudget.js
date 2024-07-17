import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Card, CardContent, Select, MenuItem } from '@mui/material';
import AddIncomeForm from './AddIncomeForm';
import AddBudgetForm from './AddBudgetForm';
import BudgetGraph from './BudgetGraph';
import { setMonthlyData } from '../store/budgetSlice';
import dayjs from 'dayjs';

const MonthlyBudget = () => {
  const dispatch = useDispatch();
  const monthlyData = useSelector(state => state.budget.monthlyData);
  
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
      month: currentMonth,
      data: { income: data.income, budget: data.budget },
    }));
    setEditingIncome(false);
  };

  const handleBudgetSubmit = (data) => {
    dispatch(setMonthlyData({
      month: currentMonth,
      data: { budgetDetails: data },
    }));
    setEditingBudget(false);
  };

  const handleShowGraph = () => {
    setShowGraph(true);
  };

  const handleCloseGraph = () => {
    setShowGraph(false);
  };

  const calculateLeftIncome = () => {
    return income - budget;
  };

  return (
    <Box p={2} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Monthly Budget</Typography>
          <Select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
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
          {editingIncome ? (
            <AddIncomeForm
              onSubmit={handleIncomeSubmit}
              initialIncome={income || ''}
              initialBudget={budget || ''}
            />
          ) : (
            <Box>
              <Typography variant="subtitle1">Income: {income}</Typography>
              <Typography variant="subtitle1">Budget: {budget}</Typography>
              <Typography variant="subtitle1">Left Income: {calculateLeftIncome()}</Typography>
              <Button variant="contained" onClick={() => setEditingIncome(true)} sx={{ mt: 2 }}>
                Edit Income
              </Button>
              {editingBudget ? (
                <AddBudgetForm onSubmit={handleBudgetSubmit} totalBudget={budget} />
              ) : (
                <Box mt={3}>
                  <Typography variant="subtitle1" gutterBottom>Budget Details</Typography>
                  {budgetDetails && budgetDetails.map((budget, index) => (
                    <Typography key={index} sx={{ mb: 1 }}>{`${budget.type}: ${budget.amount}`}</Typography>
                  ))}
                  <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" onClick={() => setEditingBudget(true)} sx={{ mt: 2 }}>
                      Edit Budget
                    </Button>
                    <Button variant="contained" onClick={handleShowGraph} sx={{ mt: 2 }}>
                      Show Graph
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
      <BudgetGraph open={showGraph} onClose={handleCloseGraph} data={budgetDetails} />
    </Box>
  );
};

export default MonthlyBudget;