import { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/vi';
import { loadStripe } from '@stripe/stripe-js';
import Payment from '../../../../Utils/Payment';

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

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('login'));

    if (data) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const handleClick = () => {
    // if (user) {
    //   alert('Congratulations! Your room has been booked successfully');
    //   setReserve(!reserve);
    // } else {
    //   alert('Please login first!');
    // }
    window.location.href = `/payment?RoomId=${props?.Id}&checkInDate=${props?.checkInDate}&checkOutDate=${props?.checkOutDate}&person=${props?.person}`;
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
          <Button onClick={handleClick}>
            {!reserve ? 'Đặt phòng' : 'Đã đặt'}
          </Button>
        </FelxDiv>
      </Cont>
    </Div>
  );
};