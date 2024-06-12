import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Pie } from 'react-chartjs-2';

const BudgetGraph = ({ open, onClose, data }) => {
  const graphData = {
    labels: data.map(item => item.type),
    datasets: [
      {
        data: data.map(item => item.amount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Expense Distribution</DialogTitle>
      <DialogContent>
        <Pie data={graphData} />
      </DialogContent>
    </Dialog>
  );
};

export default BudgetGraph;
