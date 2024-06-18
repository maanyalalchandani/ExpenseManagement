import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import AddIncomeForm from './AddIncomeForm';
import AddBudgetForm from './AddBudgetForm';
import BudgetGraph from './BudgetGraph';

const MonthlyBudget = () => {
  const [showGraph, setShowGraph] = useState(false);
  const [incomeData, setIncomeData] = useState(null);
  const [budgetData, setBudgetData] = useState([]);
  const [editingIncome, setEditingIncome] = useState(false);
  const [editingBudget, setEditingBudget] = useState(false);

  const handleIncomeSubmit = (data) => {
    setIncomeData(data);
    setEditingIncome(false);
  };

  const handleBudgetSubmit = (data) => {
    setBudgetData(data);
    setEditingBudget(false);
  };

  const handleShowGraph = () => {
    setShowGraph(true);
  };

  const handleCloseGraph = () => {
    setShowGraph(false);
  };

  return (
    <Box p={3} display="flex" justifyContent="center">
      <Card sx={{ maxWidth: 600, width: '100%' }}>
        <CardContent>
          <Typography variant="h4" gutterBottom className="!font-bold">Monthly Budget</Typography>
          {!incomeData || editingIncome ? (
            <AddIncomeForm
              onSubmit={handleIncomeSubmit}
              initialIncome={incomeData?.income || ''}
              initialBudget={incomeData?.budget || ''}
            />
          ) : (
            <Box>
              <Typography variant="h6">Income: {incomeData.income}</Typography>
              <Typography variant="h6">Budget: {incomeData.budget}</Typography>
              <Typography variant="h6">Left Income: {incomeData.leftIncome}</Typography>
              <Button variant="contained" onClick={() => setEditingIncome(true)} sx={{ mt: 2 }}>
                Edit Income
              </Button>
              {!budgetData.length || editingBudget ? (
                <AddBudgetForm onSubmit={handleBudgetSubmit} totalBudget={incomeData.budget} />
              ) : (
                <Box mt={3}>
                  <Typography variant="h6" gutterBottom className="!font-semibold">Budget Details</Typography>
                  {budgetData.map((budget, index) => (
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
      <BudgetGraph open={showGraph} onClose={handleCloseGraph} data={budgetData} />
    </Box>
  );
};

export default MonthlyBudget;
