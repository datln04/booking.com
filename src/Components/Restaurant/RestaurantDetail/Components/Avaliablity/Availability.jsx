import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import { createData } from '../../../../../Utils/Service';

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
    text-align: left;
  }
  h1:hover {
    text-decoration: underline;
  }
`;

const Last = styled.div`
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const FlexDiv = styled.div`
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
  padding: 8px 16px;
  cursor: pointer;
  text-align: center;
`;

const Tag = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  p {
    font-style: italic;
    color: #333 !important;
    font-weight: bold;
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
  const {id} = useParams();

  moment.locale('vi');
  const formattedCheckInDate = moment(props?.checkInDate).format('dddd, DD MMMM, YYYY');
  const formattedCheckOutDate = moment(props?.checkOutDate).format('dddd, DD MMMM, YYYY');
  let data = JSON.parse(localStorage.getItem('login'));

  useEffect(() => {

    if (data) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, []);

  const handleClick = () => {
    if (data) {
      const payload = {
        id: 0,
        customerId: data?.user?.id,
        serviceType: "Restaurant",
        serviceId: id,
        bookingDate: new Date().toISOString(),
        price: 0,
        // paymentStatus: "UnPaid",
        bookingStatus: "Confirmed",
        checkInDate: props.checkInDate,
        // checkOutDate: props.checkInDate,
        isDeleted: false
      };

      createData('/Bookings', payload).then((res) => {
        if(res){
          window.location.href = '/booking-history'
        }
      });
    } else {
      alert("Please login first!");
    }
  };



  return (
    <Div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <H1>Khả năng đặt chỗ</H1>
        <Tag>
          <img src="https://cf.bstatic.com/static/img/bpg/bpg_logo_retina/b4785e81dfbdb3907f75887373d5920d3dc3b245.png" alt="tag" />
          <p>Chúng tôi khớp giá</p>
        </Tag>
      </div>

      <Cont>
        <FlexDiv>
          <DataDiv>
            <p>Ngày đặt chỗ</p>
            <h1>{formattedCheckInDate}</h1>
            <Last>Thời gian có sẵn</Last>
          </DataDiv>
          <Line />

          <DataDiv>
            <p>Thời gian đặt chỗ</p>
            <h1>7:30 PM</h1>
          </DataDiv>
        </FlexDiv>

        <FlexDiv>
          <DataDiv>
            <p>Số lượng khách</p>
            <h1>{props.people} người</h1>
          </DataDiv>
          <Button onClick={handleClick}>
            {!reserve ? "Đặt bàn" : "Đã đặt"}
          </Button>
        </FlexDiv>
      </Cont>
    </Div>
  );
};
