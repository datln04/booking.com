//StripePayment.js

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentForm from "./PaymentForm";
import { createData } from "./Service";

const stripe = loadStripe('Your API KEY');

const StripePayment = () => {
    const [clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        createData("/create-payment-intent", {
            items: [{ id: 1, name: "momos", amount: 40.00 }],
        })
            .then((resp) => setClientSecret(resp.data.clientSecret));
    }, []);

    const options = {
        clientSecret,
        theme: "stripe",
    };

    return (
        clientSecret && (
            <Elements stripe={stripe} options={options}>
                <PaymentForm></PaymentForm>
            </Elements>
        )
    );
};

export default StripePayment;