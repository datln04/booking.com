import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const OrderConfirmation = ({ isOpen, onClose, order }) => {
  const {
    id,
    customer,
    serviceType,
    bookingDate,
    price,
    checkInDate,
    checkOutDate,
    isCustom
  } = order;

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalPrice = days * price;  

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Xác Nhận Đơn Hàng</DialogTitle>
      <DialogContent>
        {/* <p><strong>Order ID:</strong> {id}</p> */}
        <p><strong>Khách Hàng:</strong> {customer?.fullName}</p>
        <p><strong>Loại Dịch Vụ:</strong> {serviceType}</p>
        <p><strong>Ngày Đặt:</strong> {new Date(bookingDate).toLocaleString()}</p>
        {isCustom ? <p><strong>Giá:</strong> VND {price} cho 1 ngày</p> : <p><strong>Giá:</strong> ${totalPrice} cho {days} ngày</p>}
        <p><strong>Ngày Nhận Xe:</strong> {checkIn.toLocaleString()}</p>
        <p><strong>Ngày Trả Xe:</strong> {checkOut.toLocaleString()}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Thanh toán</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderConfirmation;