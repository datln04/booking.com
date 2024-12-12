// Payment.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createData, fetchData } from '../../Utils/Service';
import loadingImage from '../../Assets/Images/loading.gif';
import paymentImage from '../../Assets/Images/PAYMENT-SUCCESS.png';
import { Navbar } from '../Navbar/Navbar';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Payment = () => {
    const query = useQuery();
    const paymentId = query.get('paymentId');
    const token = query.get('token');
    const PayerID = query.get('PayerID');
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const payload = JSON.parse(localStorage.getItem('paymentInfo'));
        createData(`/Payments/PaypalSuccess?paymentId=${paymentId}&payerId=${PayerID}`, payload).then((resp) => {
            if (resp) {
                setLoading(false)
                setSuccess(true)
                localStorage.removeItem('paymentInfo')
            }
        });
    }, [paymentId, token, PayerID]);

    if (loading) {
        return <div><img src={loadingImage} alt='img' style={{ width: '100%', height: '100vh' }} /></div>;
    }

    return (
        success && <>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <img src={paymentImage} alt='img' />
            </div>
        </>
    );
};

export default Payment;