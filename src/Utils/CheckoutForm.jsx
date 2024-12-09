import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { createData } from './Service';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, token } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
    } else {
      const paymentRequest = {
        token: token.id,
        email: 'user@example.com',  // Replace with actual email
        amount: 15000,  // Replace with actual amount
        bookingId: 1,  // Replace with actual booking ID
        cardholderName: 'Viet Hung'  // Replace with actual cardholder name
      };

      const response = await createData('/payment/creditcard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      });

      const result = await response.json();
      if (result.status === 'succeeded') {
        alert('Payment successful!');
      } else {
        alert('Payment failed!');
      }
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div id="card-element">
        <CardElement />
      </div>
      <div id="card-errors" role="alert"></div>
      <button type="submit" id="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;