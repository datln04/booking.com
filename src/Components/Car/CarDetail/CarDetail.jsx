import React, { useEffect, useState } from 'react';
import CarPriceBreakdown from './CarPriceBreakdown';
import CarBreadcrumb from './CarBreadcrumb';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { carData } from '../../../Utils/mock';
import { CarDataComponent } from '../SearchCarData/CarDataComponent';
import { Navbar } from '../../Navbar/Navbar';
import styled from 'styled-components';
import { Box, List, ListItem, ListItemIcon, ListItemText, Tab, Tabs } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { faCheck, faClock, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { createData, fetchData, fetchFilteredData } from '../../../Utils/Service';
import OrderConfirmation from '../../../Utils/OrderConfirmation';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CarDetailContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const CarData = styled.div`
  flex: 0 0 70%;
  margin: 20px 0;
`;

const CarPriceBreakdownContainer = styled.div`
  flex: 0 0 30%;
`;

const BookButton = styled.button`
    background-color: #ff5a5f;
    color: white;
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #ff787d;
    }
    float: right;
`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

const CarDetail = () => {
    const user = JSON.parse(localStorage.getItem('login'))?.user;

    const { id } = useParams();
    const [value, setValue] = React.useState(0);

    const [showData, setShowData] = useState("")
    const location = useLocation(); // Get the location object
    const queryParams = new URLSearchParams(location.search);
    const checkInDate = queryParams.get('checkInDate');
    const checkOutDate = queryParams.get('checkOutDate');
    const provinceId = queryParams.get('provinceId');

    const [province, setProvince] = useState(null);
    const [isOrderConfirmationOpen, setOrderConfirmationOpen] = useState(false);

    const order = {
        id: 0,
        customer: user,
        serviceType: "TransportService",
        bookingDate: new Date().toISOString(),
        price: showData?.rentalPricePerDay,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
    };

    const handleOpenOrderConfirmation = () => {
        if (user) {
            setOrderConfirmationOpen(true);
        } else {
            alert("Vui lòng đăng nhập để đặt xe")
        }
    };

    const handleCloseOrderConfirmation = () => {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
        const totalPrice = days * showData?.rentalPricePerDay;
        const payload = {
            email: user?.email,
            token: "tok_visa",
            amount: totalPrice,
            bookingId: 0,
            cardholderName: "Transport Service",
            userId: user?.id,
            serviceId: id,
            serviceType: "Transport",
            checkInDate: checkInDate,
            checkOutDate: checkOutDate
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
        getProvince()
    }, [])

    const getProvince = async () => {
        fetchData(`/Provinces/${provinceId}`).then((response) => {
            if (response) {
                setProvince(response);
            }
        })
    }



    const getData = async () => {
        const filter = {
            filters: [
                {
                    field: "Id",
                    operator: "Equal",
                    value: parseInt(id),
                }
            ],
            includes: [
                // "Hotel", "Hotel.Province"
            ],
            logic: "string",
            pageSize: 0,
            pageNumber: 0,
            all: true
        }
        const roomResponse = await fetchFilteredData('/TransportServices', filter);
        if (roomResponse) {
            let tmp = { ...roomResponse[0] };
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
                        value: "TransportService",
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
                        value: "TransportService",
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

            setShowData(tmp);
        }
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <div style={{ marginBottom: '20px' }}>
                <Navbar />
            </div>
            <CarBreadcrumb startTime={checkInDate} endTime={checkOutDate} location={province} />
            {
                showData && <CarDetailContainer>
                    <CarData>
                        <CarDataComponent
                            key={showData.id}
                            id={showData.id}
                            make={showData.make}
                            model={showData.model}
                            year={showData.year}
                            color={showData.color}
                            fuelType={showData.fuelType}
                            transmission={showData.transmission}
                            seatingCapacity={showData.seatingCapacity}
                            rentalPricePerDay={showData.rentalPricePerDay}
                            availabilityStatus={showData.availability}
                            mileage={showData.mileage}
                            location={showData.location}
                            licensePlate={showData.licensePlate}
                            features={showData?.transportServiceFeatures}
                            isBooking={true}
                            url={showData?.image?.imageUrl}
                        />
                        <List>
                            <h2>Đã bao gồm trong giá</h2>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon style={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primary="Hủy miễn phí trước 48 giờ trước khi nhận xe" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon style={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primary="Miễn trừ thiệt hại va chạm với mức khấu trừ VND 18,522,443" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon style={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primary="Bảo vệ chống trộm với mức khấu trừ VND 18,522,443" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckIcon style={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primary="270 km mỗi lần thuê" />
                            </ListItem>
                        </List>
                        <h2>Danh sách kiểm tra khi nhận xe</h2>
                        <Tabs value={value} onChange={handleChange} aria-label="pick-up checklist tabs">
                            <Tab icon={<FontAwesomeIcon icon={faClock} />} label="Đến đúng giờ" />
                            <Tab icon={<FontAwesomeIcon icon={faUser} />} label="Những gì cần mang theo" />
                            <Tab icon={<FontAwesomeIcon icon={faWallet} />} label="Tiền đặt cọc có thể hoàn lại" />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            Các công ty cho thuê chỉ cho phép nhận chìa khóa vào thời gian được chỉ định. Xe của bạn sẽ thường được giữ trong một thời gian giới hạn sau thời gian nhận xe - sau đó xe có thể được giao cho khách hàng khác.
                            <br />
                            Thời gian nhận xe của bạn là 10:00 sáng.
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            Khi nhận xe, bạn cần:
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Hộ chiếu hoặc căn cước công dân" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Giấy phép lái xe của tất cả tài xế" />
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                    </ListItemIcon>
                                    <ListItemText primary="Thẻ tín dụng đứng tên tài xế chính để giữ tiền đặt cọc" />
                                </ListItem>
                            </List>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Khi nhận xe, tài xế chính cần có 10.000 DKK trong thẻ tín dụng của họ để làm tiền đặt cọc hoàn lại. Tiền mặt và thẻ ghi nợ không được chấp nhận.
                            <br />
                            Thẻ được chấp nhận: Mastercard, Visa, American Express
                        </TabPanel>
                        <BookButton variant="contained" size="large" onClick={handleOpenOrderConfirmation}>
                            Đặt xe tại đây
                        </BookButton>
                        <OrderConfirmation
                            isOpen={isOrderConfirmationOpen}
                            onClose={handleCloseOrderConfirmation}
                            order={order}
                        />
                    </CarData>
                    <CarPriceBreakdownContainer>
                        <CarPriceBreakdown price={showData?.rentalPricePerDay} />
                    </CarPriceBreakdownContainer>
                </CarDetailContainer>
            }
        </Container>
    );
};

export default CarDetail;
