import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, booking }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Xác Nhận Hủy Đặt Chỗ</DialogTitle>
      <DialogContent>
        <p>Bạn sẽ phải đợi quản trị viên xác nhận hủy đặt chỗ.</p>
        <p>Bạn có chắc chắn muốn hủy đặt chỗ cho dịch vụ <strong>{booking.serviceType}</strong>?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button onClick={onConfirm} color="primary">Xác Nhận</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;