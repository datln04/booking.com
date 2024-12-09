// import { useEffect, useState } from "react";

// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import { loadStripe } from "@stripe/stripe-js";

// function Payment() {
//   const [stripePromise, setStripePromise] = useState(null);
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     // fetch("/config").then(async (r) => {
//     //   const { publishableKey } = await r.json();
//     //   setStripePromise(loadStripe(publishableKey));
//     // });
//     setStripePromise(loadStripe(JSON.stringify('pk_test_51QS4jIJ4XdP6E8eXW0NpDHdSs8zzZpUWSRIBZNbKQwcGoZfNUWjqyHhDweoV7oe2PvGvnekQG3m5Z4iR6CgDh42y0054pIJRac')));
//   }, []);

//   useEffect(() => {
//     // fetch("/create-payment-intent", {
//     //   method: "POST",
//     //   body: JSON.stringify({}),
//     // }).then(async (result) => {
//     //   var { clientSecret } = await result.json();
//     //   setClientSecret(JSON.stringify('sk_test_51QS4jIJ4XdP6E8eXT3PVykq7rXlF0oLDBfmp1BtN8Uox20GGZzVjujJr2neTL1HuAi10k9Gl8mXlc2YUXcXjVnur00ikEqzVVx'));
//     // });
//     setClientSecret(JSON.stringify('sk_test_51QS4jIJ4XdP6E8eXT3PVykq7rXlF0oLDBfmp1BtN8Uox20GGZzVjujJr2neTL1HuAi10k9Gl8mXlc2YUXcXjVnur00ikEqzVVx'));

//   }, []);

//   return (
//     <>
//       <h1>React Stripe and the Payment Element</h1>
//       {clientSecret && stripePromise && (
//         <Elements stripe={stripePromise} options={{ clientSecret }}>
//           <CheckoutForm />
//         </Elements>
//       )}
//     </>
//   );
// }

// export default Payment;

import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm'; // Assuming you have a CheckoutForm component
import { createData } from './Service';

const stripePromise = loadStripe('pk_test_51QS4jIJ4XdP6E8eXW0NpDHdSs8zzZpUWSRIBZNbKQwcGoZfNUWjqyHhDweoV7oe2PvGvnekQG3m5Z4iR6CgDh42y0054pIJRac'); // Replace with your public key

const Payment = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Fetch the client secret from your backend
    createData('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(async (result) => {
        const { clientSecret } = await result.json();
        setClientSecret(clientSecret);
      });
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;