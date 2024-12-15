// // BookingHistory.jsx
// import React, { useEffect, useState } from 'react';
// import styles from './Booking.module.css';
// import { fetchFilteredData, updateData } from '../../Utils/Service';
// import { Navbar } from '../Navbar/Navbar';

// const BookingHistory = () => {
//     const [bookings, setBookings] = useState([]);
//     const user = JSON.parse(localStorage.getItem('login'));
//     useEffect(() => {

//         if (user?.user) {
//             const filter = {
//                 filters: [
//                     {
//                         field: "CustomerId",
//                         operator: "Equal",
//                         value: user?.user?.id
//                     }
//                 ],
//             };
//             fetchFilteredData('/Bookings', filter).then((data) => {
//                 setBookings(data);
//             });
//         }
//     }, []);

//     const handleViewBooking = (serviceId, serviceType) => {

//     }

//     const handleCancelBooking = async (booking) => {
//         const payload = {...booking, bookingStatus: 'Cancelled'};
//         await updateData(`/Bookings/${booking.id}`, payload).then(() => {
//             window.location.reload();
//         });
//     }


//     return (
//         <>
//             <Navbar />
//             <div>
//                 <h1>Booking History</h1>
//                 <table className={styles.tableContainer}>
//                     <thead>
//                         <tr>
//                             <th>Customer</th>
//                             <th>Service Type</th>
//                             <th>Check-In Date</th>
//                             <th>Check-Out Date</th>
//                             <th>Payment Status</th>
//                             <th>Booking Status</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map((booking) => (
//                             <tr key={booking.id}>
//                                 <td>{user?.user?.fullName}</td>
//                                 <td>{booking.serviceType}</td>
//                                 <td>{booking.checkInDate}</td>
//                                 <td>{booking.checkOutDate}</td>
//                                 <td>{booking.paymentStatus}</td>
//                                 <td>{booking.bookingStatus}</td>
//                                 <td>
//                                     {/* <button className={styles.button} onClick={() => handleViewBooking(booking.serviceId, booking.serviceType)}>View</button> */}
//                                     {new Date(booking.checkInDate) > new Date() ? (
//                                         <button className={styles.cancelButton} onClick={() => handleCancelBooking(booking)}>Cancel</button>
//                                     ) : null}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>


//     );
// };

// export default BookingHistory;

import React, { useEffect, useState } from 'react';
import styles from './Booking.module.css';
import ConfirmationDialog from '../../Utils/ConfirmationDialog';
import { fetchFilteredData, updateData } from '../../Utils/Service';
import { Navbar } from '../Navbar/Navbar';

const BookingHistory = () => {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('login'));
    useEffect(() => {

        if (user?.user) {
            const filter = {
                filters: [
                    {
                        field: "CustomerId",
                        operator: "Equal",
                        value: user?.user?.id
                    }
                ],
            };
            fetchFilteredData('/Bookings', filter).then((data) => {
                setBookings(data);
            });
        }
    }, []);

    const handleCancelBooking = (booking) => {
        setSelectedBooking(booking);
        setConfirmationOpen(true);
    };

    const handleConfirmCancel = async () => {
        const payload = { ...selectedBooking, bookingStatus: 'cancelled' };
        await updateData(`/Bookings/${selectedBooking.id}`, payload).then(() => {
            window.location.reload();
        });
    };

    const handleCloseConfirmation = () => {
        setConfirmationOpen(false);
    };

    return (
        <>
            <Navbar />
            <h1>Booking History</h1>
            <div >
                <table className={styles.tableContainer}>
                    <thead>
                        <tr>
                            <th>Khách Hàng</th>
                            <th>Loại Dịch Vụ</th>
                            <th>Ngày ĐếnĐến</th>
                            <th>Ngày Đi</th>
                            <th>Trạng Thái Thanh Toán</th>
                            <th>Trạng Thái Đặt Chỗ</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{user?.user?.fullName}</td>
                                <td>{booking.serviceType}</td>
                                <td>{booking.checkInDate}</td>
                                <td>{booking.checkOutDate}</td>
                                <td>{booking.paymentStatus}</td>
                                <td>{booking.bookingStatus}</td>
                                <td>
                                    {new Date(booking.checkInDate) > new Date() && booking.bookingStatus === 'Confirmed' ? (
                                        <button className={styles.cancelButton} onClick={() => handleCancelBooking(booking)}>Hủy</button>
                                    ) : null}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isConfirmationOpen && (
                <ConfirmationDialog
                    isOpen={isConfirmationOpen}
                    onClose={handleCloseConfirmation}
                    onConfirm={handleConfirmCancel}
                    booking={selectedBooking}
                />
            )}
        </>
    );
};

export default BookingHistory;