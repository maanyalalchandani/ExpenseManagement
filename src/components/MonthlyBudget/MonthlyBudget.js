import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import AddIncomeForm from './AddIncomeForm';
import AddBudgetForm from './AddBudgetForm';
import BudgetGraph from './BudgetGraph';
import { setIncome, setBudget, setBudgetDetails } from '../store/budgetSlice';

const MonthlyBudget = () => {
  const dispatch = useDispatch();
  const income = useSelector(state => state.budget.income);
  const budget = useSelector(state => state.budget.budget);
  const budgetDetails = useSelector(state => state.budget.budgetDetails);
  
  const [showGraph, setShowGraph] = useState(false);
  const [editingIncome, setEditingIncome] = useState(!income);
  const [editingBudget, setEditingBudget] = useState(!budgetDetails.length);

  const handleIncomeSubmit = (data) => {
    dispatch(setIncome(data.income));
    dispatch(setBudget(data.budget));
    setEditingIncome(false);
  };

  const handleBudgetSubmit = (data) => {
    dispatch(setBudgetDetails(data));
    setEditingBudget(false);
  };

  const handleShowGraph = () => {
    setShowGraph(true);
  };

  const handleCloseGraph = () => {
    setShowGraph(false);
  };

  const calculateLeftIncome = () => {
    // const totalBudget = budgetDetails.reduce((sum, budget) => sum + budget.amount, 0);
    return income - budget;
  };

  return (
    <Box p={2} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Monthly Budget</Typography>
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
                  {budgetDetails.map((budget, index) => (
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