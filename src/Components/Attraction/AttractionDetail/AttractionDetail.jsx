import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faCheck, faInfoCircle, faExclamationTriangle, faPhone, faEnvelope, faMapMarkerAlt, faCancel, faInfo, faUser } from '@fortawesome/free-solid-svg-icons';
import { attractions } from '../../../Utils/mock';
import { Navbar } from '../../Navbar/Navbar';
import Review from '../../Review/Review';
import { createData, fetchData, fetchFilteredData } from '../../../Utils/Service';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import OrderConfirmation from '../../../Utils/OrderConfirmation';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BigImage = styled.img`
  width: 50%;
  margin-bottom: 10px;
`;

const Thumbnails = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Thumbnail = styled.img`
  width: 48%;
  margin-bottom: 10px;
  height: 300px;
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Rating = styled.div`
  font-size: 1.5em;
  color: #FFA500;
  margin: 20px 0;
`;

const Section = styled.div`
  margin: 20px 0;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 10px;
  color: green;
`;

const RestrictionIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: red;
`;

const AdditionalInfoIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: blue;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 48%;
  margin-bottom: 10px;
`;

const ThumbnailText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.2em;
`;

const ParentContent = styled.div`
  display: flex;
`;

const LeftContent = styled.div`
  width: 70%;
  margin-right: 10px;
`;

const ListItem = styled.li`
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 10px;
`;

const RightContent = styled.div`
  width: 30%;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AttractionDetail = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('login'))?.user;

  const [data, setData] = useState(null);
  const [isOrderConfirmationOpen, setOrderConfirmationOpen] = useState(false);
  const location = useLocation(); // Get the location object
  const queryParams = new URLSearchParams(location.search);
  const checkInDate = queryParams.get('checkInDate');
  const adults = queryParams.get('adults');
  const children = queryParams.get('children');
  const provinceId = queryParams.get('provinceId');

  const order = {
    id: 0,
    customer: user,
    serviceType: "Activity",
    bookingDate: new Date().toISOString(),
    price: ((data?.priceAdult * adults) + (children > 0 ? data?.priceChild * children : 0)),
    checkInDate: checkInDate,
    checkOutDate: checkInDate,
    isCustom: true
  };

  const handleOpenOrderConfirmation = () => {
    if (user) {
      setOrderConfirmationOpen(true);
    } else {
      alert("Vui lòng đăng nhập để đặt xe")
    }
  };

  const handleCloseOrderConfirmation = () => {
    // const checkIn = new Date(checkInDate);
    // const checkOut = new Date(checkInDate);
    const days = 1;
    const totalPrice = days * ((data?.priceAdult * adults) + (children > 0 ? data?.priceChild * children : 0));
    const payload = {
      email: user?.email,
      token: "tok_visa",
      amount: totalPrice,
      bookingId: 0,
      cardholderName: "Activity Service",
      userId: user?.id,
      serviceId: id,
      serviceType: "Activity",
      checkInDate: checkInDate,
      checkOutDate: checkInDate
    }
    localStorage.setItem('paymentInfo', JSON.stringify(payload));
    createData('/Payments/Paypal', payload).then((resp) => {
      if (resp) {
        window.location.href = resp?.approvalUrl;
      }
    });
    setOrderConfirmationOpen(false);
  };

  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    const filter = {
      ilters: [
        {
          field: "Id",
          operator: "Equal",
          value: parseInt(id),
        }
      ],
      includes: [
        "LeisureActivitiesAdditionalInfos",
        "LeisureActivitiesRestrictions",
        "LeisureActivitiesAdditionalInfos.Info",
        "LeisureActivitiesRestrictions.Restriction",
        "Manager"
      ],
      logic: "string",
      pageSize: 0,
      pageNumber: 0,
      all: true
    }
    const response = await fetchFilteredData(`/LeisureActivities`, filter)
    if (response) {
      let tmp = { ...response[0] };
      const requestObject = {
        filters: [
          {
            field: "ServiceId",
            operator: "Equal",
            value: parseInt(id),
          },
          {
            field: "ServiceType",
            operator: "Contains",
            value: "ExperienceService",
          },
          {
            field: "ImageType",
            operator: "Contains",
            value: "Thumbnail",
          },
        ],
        logic: "And",
        pageSize: 0,
        pageNumber: 0,
        all: true,
      };

      const requestObjectImage = {
        filters: [
          {
            field: "ServiceId",
            operator: "Equal",
            value: parseInt(id),
          },
          {
            field: "ServiceType",
            operator: "Contains",
            value: "ExperienceService",
          },
          {
            field: "ImageType",
            operator: "Contains",
            value: "Image",
          },
        ],
        logic: "And",
        pageSize: 0,
        pageNumber: 0,
        all: true,
      };

      const [thumbnailsResponse, imagesResponse] = await Promise.all([
        fetchFilteredData('/Images', requestObject),
        fetchFilteredData('/Images', requestObjectImage)
      ]);

      if (thumbnailsResponse && thumbnailsResponse.length > 0) {
        tmp = { ...tmp, thumbnails: thumbnailsResponse };
      }

      if (imagesResponse && imagesResponse.length > 0) {
        tmp = { ...tmp, image: imagesResponse[imagesResponse?.length - 1] };
      }

      setData(tmp);
    }
  }

  if (!data) {
    return <div>...loading</div>;
  }
console.log(data);

  const RightContentComponent = ({ location, contact }) => (
    <RightContent>
      <ContactInfo>
        <h3>Thông tin liên hệ</h3>
        <ContactItem>
          <FontAwesomeIcon icon={faUser} /> {contact?.username}
        </ContactItem>
        <ContactItem>
          <FontAwesomeIcon icon={faEnvelope} /> {contact.email}
        </ContactItem>
        <ContactItem>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {location}
        </ContactItem>
      </ContactInfo>
      <Button onClick={handleOpenOrderConfirmation}>Book Here</Button>
      <OrderConfirmation
        isOpen={isOrderConfirmationOpen}
        onClose={handleCloseOrderConfirmation}
        order={order}
      />
    </RightContent>
  );

  // const formatKey = (key) => {
  //   return key
  //     .replace(/([A-Z])/g, ' $1') // Thêm khoảng trắng trước các chữ cái viết hoa
  //     .replace(/^./, (str) => str.toUpperCase()); // Viết hoa chữ cái đầu
  // };


  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <Navbar />
      </div>
      {data && data?.activityName ? <Container>
        <Title>{data?.activityName}</Title>
        <ImageSection>
          <BigImage src={data?.image?.imageUrl} alt={data?.activityName} />
          <Thumbnails>
            {data?.thumbnails?.map((thumb, index) => {
              if (index === 3 && data?.thumbnails.length > 4) {
                return (
                  <ThumbnailWrapper key={index}>
                    <Thumbnail src={thumb?.imageUrl} alt={thumb?.imageType} style={{ width: '100%', marginBottom: '0' }} />
                    <ThumbnailText>+{data?.thumbnails.length - 4}</ThumbnailText>
                  </ThumbnailWrapper>
                );
              } else if (index <= 3) {
                return <Thumbnail key={index} src={thumb?.imageUrl} alt={data.activityName} />;
              }
              return null;
            })}
          </Thumbnails>
        </ImageSection>
        <ParentContent>
          <LeftContent>
            <Duration>
              <div className='d-flex justify-content-between'>
                <FontAwesomeIcon icon={faClock} /> <b>Thời lượng: {data?.duration.replace(';', ' - ')}</b>
              </div>
            </Duration>
            {/* <h2>Đánh giá của người dùng</h2>
            <Rating>
              <FontAwesomeIcon icon={faStar} /> {data?.rating} ({data?.reviews} đánh giá)
            </Rating>
            <Review /> */}
            <Section>
              <SectionTitle>Những gì bao gồm</SectionTitle>
              <ul>
                {data?.includes.split(',').map((item, index) => (
                  <ListItem key={index}>
                    <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '10px' }} />
                    {item}
                  </ListItem>
                ))}
              </ul>
            </Section>
            <Section>
              <SectionTitle>
                <RestrictionIcon icon={faExclamationTriangle} /> Hạn chế
              </SectionTitle>
              <ul>
                {data?.leisureActivitiesRestrictions?.map((r, index) => (
                  <div>
                    <FontAwesomeIcon icon={faCancel} style={{ color: 'red', marginRight: '10px' }} />
                    {`${r?.restriction?.name}`}
                  </div>
                ))}
              </ul>
            </Section>
            <Section>
              <SectionTitle>
                <AdditionalInfoIcon icon={faInfoCircle} /> Thông tin bổ sung
              </SectionTitle>
              <ul>
                {data?.leisureActivitiesAdditionalInfos?.map((a, index) => (
                  <>
                    <FontAwesomeIcon icon={faInfo} style={{ color: 'lightBlue', marginRight: '10px' }} />
                    {`${a?.info?.name}`}
                  </>
                ))}
              </ul>
            </Section>
          </LeftContent>
          <RightContentComponent location={data?.locationCity} contact={data?.manager} />
        </ParentContent>
      </Container>
        : <div>Không tìm thấy dữ liệu</div>}
    </>
  );
};


export default AttractionDetail;