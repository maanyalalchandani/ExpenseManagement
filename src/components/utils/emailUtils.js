import emailjs from 'emailjs-com';

const SERVICE_ID = 'your_service_id';
const TEMPLATE_ID = 'your_template_id';
const USER_ID = 'your_user_id';

export const sendExpenseEmail = (expense, recipientEmail) => {
  const templateParams = {
    to_email: recipientEmail,
    date: expense.date,
    category: expense.category,
    amount: expense.amount,
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
    .then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    })
    .catch((err) => {
      console.error('There was an error sending the email:', err);
    });
};