import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51QS4jIJ4XdP6E8eXW0NpDHdSs8zzZpUWSRIBZNbKQwcGoZfNUWjqyHhDweoV7oe2PvGvnekQG3m5Z4iR6CgDh42y0054pIJRac');

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51QS4jIJ4XdP6E8eXT3PVykq7rXlF0oLDBfmp1BtN8Uox20GGZzVjujJr2neTL1HuAi10k9Gl8mXlc2YUXcXjVnur00ikEqzVVx',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};