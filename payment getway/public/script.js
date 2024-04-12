document.addEventListener('DOMContentLoaded', () => {
  // const stripe = Stripe('pk_test_51Nivr3SAlVYhuhtiwVHWUof1vopnw7TYtBSuOEVtGSkrPEnxJ2BjpOUXT6RztMstqGhLAAp2kgsEFlZE3AuVyprn00R8aEdt2d');
  const stripe = Stripe('pk_test_51Nk1deSJAgGS2ex32ebc3FviNDmBIBbuMjAOS78LRrlKRLpUZBNOa3q8dEmrymg6xMbH1Q4dWRzav54QjmQMRUdV00JOcEufU6');


  const elements = stripe.elements();
  const cardElement = elements.create('card');

  cardElement.mount('#card-element'); // Mount the Card Element to the specified container

  const payButton = document.getElementById('pay-button');
  const paymentResult = document.getElementById('payment-result');

  payButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 10000, currency: 'inr' }) // Amount is in paise (100 paise = 1 INR)
      });

      const data = await response.json();
      const { clientSecret } = data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement
        }
      });

      if (result.error) {
        console.error('Payment error:', result.error.message);
      } else {
        console.log('Payment successful:', result.paymentIntent);
        paymentResult.innerText = 'Payment successful! Thank you for your purchase.';

        console.log('Payment result element:', paymentResult);
        paymentResult.classList.remove('hidden');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  });
});
