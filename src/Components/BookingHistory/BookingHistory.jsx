// BookingHistory.jsx
import React, { useEffect, useState } from 'react';
import styles from './Booking.module.css';
import { fetchFilteredData } from '../../Utils/Service';
import { Navbar } from '../Navbar/Navbar';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('login'));
        if (user?.user) {
            const filter = {
                filters: [
                    {
                        field: "CustomerId",
                        operator: "Equal",
                        value: user?.user?.id
                    }
                ]
            };
            fetchFilteredData('/Bookings', filter).then((data) => {
                setBookings(data);
            });
        }
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <h1>Booking History</h1>
                <table className={styles.tableContainer}>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Service Type</th>
                            <th>Check-In Date</th>
                            <th>Check-Out Date</th>
                            <th>Person</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.serviceType}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.person}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>


    );
};

export default BookingHistory;