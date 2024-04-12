document.getElementById('payButton').addEventListener('click', async function() {
  try {
      // Get the amount from the input field
      const amount = document.getElementById('amountInput').value;
      const currency = 'usd'; // Change this to the desired currency

      const response = await fetch('/create-payment-intent', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ amount, currency })
      });

      const data = await response.json();
      const clientSecret = data.clientSecret;

      // Call function to complete payment using client secret
      completePayment(clientSecret);
  } catch (error) {
      console.error('Error processing payment:', error);
      // Handle error
  }
});





// const express = require('express');
// const app = express();
// const stripe = require('stripe')('sk_test_51Nk1deSJAgGS2ex3OZMZRP7jXQtgzsk41NUL8UW8n1xkrhqx2zrA7iTkpls1Qz7aKQkAwKdDpc8BaQWsgiLkVXbi00SiHU35xv');

// // mam const stripe = require('stripe')('sk_test_51Nivr3SAlVYhuhtitPal8hkvrrd7yfvH4KWRoHxQZVr45qlczdy40t316xoeHXMJPM2tUFdDNz4WfFsnY0CzN0OE00ek1ewIvY');
// //worng const stripe = require('stripe')('pk_test_51Nk1deSJAgGS2ex32ebc3FviNDmBIBbuMjAOS78LRrlKRLpUZBNOa3q8dEmrymg6xMbH1Q4dWRzav54QjmQMRUdV00JOcEufU6');


// app.use(express.static('public'));
// app.use(express.json());

// app.post('/create-payment-intent', async (req, res) => {
//   try {
//     const { amount, currency } = req.body;
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//     });
//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).json({ error: 'An error occurred while processing payment.' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });