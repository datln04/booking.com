import moment from 'moment';
import 'moment/locale/vi';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createData } from '../../../../Utils/Service';
import OrderConfirmation from '../../../../Utils/OrderConfirmation';

const Div = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const H1 = styled.div`
  font-size: 21px;
  line-height: 32px;
  font-weight: 600;
  color: #333;
  margin: 10px 0;
`;

const Cont = styled.div`
  width: 94%;
  border: 1px solid #ccc7c7a6;
  border-radius: 3px;
  padding: 3%;
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: space-between;
  align-items: center;
  * {
    margin: 0;
  }
`;

const DataDiv = styled.div`
  p {
    margin: 0 0 4px;
    font-size: 14px;
    font-weight: 700;
    padding: 0;
  }
  h1 {
    color: #0071c2;
    font-weight: bold;
    font-size: 17px;
    border-bottom: 0;
    text-align: left;
  }
  h1:hover {
    text-decoration: underline;
  }
`;

const Last = styled.div`
  color: #6b6b6b;
  display: block;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const FelxDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Line = styled.div`
  border-left: 1px solid lightGray;
  height: 40px;
`;

const Button = styled.div`
  background-color: #0071c2;
  border: 1px solid #0071c2;
  border-radius: 2px;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  height: 20px;
  justify-content: center;
  text-align: left;
  padding: 8px 16px;
  cursor: pointer;
`;

const Tag = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    font-style: italic;
    color: #333 !important;
    text-decoration: none;
    font-weight: bold;
    text-align: right;
    margin-left: 5px;
    font-size: 12px;
  }

  img {
    width: 16px;
    height: 16px;
  }
`;

export const Availability = (props) => {
  const [reserve, setReserve] = useState(false);
  const [user, setUser] = useState(false);

  moment.locale('vi');
  const formattedCheckInDate = moment(props?.checkInDate).format('dddd, DD MMMM, YYYY');
  const formattedCheckOutDate = moment(props?.checkOutDate).format('dddd, DD MMMM, YYYY');

  // const makePayment = async () => {
  //   const stripe = await loadStripe("pk_test_51QS4jIJ4XdP6E8eXW0NpDHdSs8zzZpUWSRIBZNbKQwcGoZfNUWjqyHhDweoV7oe2PvGvnekQG3m5Z4iR6CgDh42y0054pIJRac")

  //   const body = {
  //     products: props?.data
  //   }

  //   const headers = {
  //     "Content-Type": "application/json"
  //   }

  //   const response = await fetch(`${apiUrl}/create-checkout-session`, {
  //     method: "POST",
  //     headers,
  //     body: JSON.stringify(body)
  //   })

  //   const session = await response.json();

  //   const result = await stripe.redirectToCheckout({
  //     sessionId: session.id
  //   });

  //   if(result.error) {
  //     console.log(result.error.message)
  //   }

  // };
  let data = JSON.parse(localStorage.getItem('login'))?.user;

  useEffect(() => {

    if (data) {
      setUser(data);
    } else {
      setUser(null);
    }
  }, []);

  const [isOrderConfirmationOpen, setOrderConfirmationOpen] = useState(false);

  const order = {
    id: 0,
    customer: user,
    serviceType: "TransportService",
    bookingDate: new Date().toISOString(),
    price: props?.price,
    checkInDate: props?.checkInDate,
    checkOutDate: props?.checkOutDate,
  };

  const handleOpenOrderConfirmation = () => {
    if (user) {
      setOrderConfirmationOpen(true);
    } else {
      alert("Vui lòng đăng nhập để đặt xe")
    }
  };

  const handleCloseOrderConfirmation = () => {
    const checkIn = new Date(props?.checkInDate);
    const checkOut = new Date(props?.checkOutDate);
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = days * props?.price;
    const payload = {
      email: user?.email,
      token: "tok_visa",
      amount: totalPrice,
      bookingId: 0,
      cardholderName: "Hotel",
      userId: user?.id,
      serviceId: props.id,
      serviceType: "Hotel",
      checkInDate: props.checkInDate,
      checkOutDate: props.checkOutDate
    }
    localStorage.setItem('paymentInfo', JSON.stringify(payload));
    createData('/Payments/Paypal', payload).then((resp) => {
      if (resp) {
        window.location.href = resp?.approvalUrl;
      }
    });
    setOrderConfirmationOpen(false);
  };

  return (
    <Div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <H1>Khả dụng</H1>
        <Tag>
          <img
            src="https://cf.bstatic.com/static/img/bpg/bpg_logo_retina/b4785e81dfbdb3907f75887373d5920d3dc3b245.png"
            alt="tag"
          />
          <p>Chúng tôi đảm bảo giá tốt nhất</p>
        </Tag>
      </div>

      <Cont>
        <FelxDiv>
          <DataDiv>
            <p>Ngày nhận phòng</p>
            <h1>{formattedCheckInDate}</h1>
            <Last>Từ 2:00 chiều</Last>
          </DataDiv>
          <Line />

          <DataDiv>
            <p>Ngày trả phòng</p>
            <h1>{formattedCheckOutDate}</h1>
            {/* <Last>Lưu trú 2 tuần</Last> */}
            <Last>
              {`Lưu trú ${moment(props?.checkOutDate).diff(moment(props?.checkInDate), 'days')} đêm`}
            </Last>
          </DataDiv>
        </FelxDiv>

        <FelxDiv>
          <DataDiv>
            <p>Khách</p>
            <h1>{props.person} người lớn</h1>
          </DataDiv>
          <Button onClick={handleOpenOrderConfirmation}>
            {!reserve ? 'Đặt phòng' : 'Đã đặt'}
          </Button>
          {
            order && <OrderConfirmation
              isOpen={isOrderConfirmationOpen}
              onClose={handleCloseOrderConfirmation}
              order={order}
            />
          }
        </FelxDiv>
      </Cont>
    </Div>
  );
};