import React from 'react';
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
    const { id } = useParams();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const car = carData.find(car => car.id === id);

    return (
        <Container>
            <div style={{ marginBottom: '20px' }}>
                <Navbar />
            </div>
            <CarBreadcrumb startTime={'10:00 AM'} endTime={'1:00 PM'} location={'Thành phố Hồ Chí Minh'} />
            <CarDetailContainer>
                <CarData>
                    <CarDataComponent
                        key={car.id}
                        id={car.id}
                        make={car.make}
                        model={car.model}
                        year={car.year}
                        color={car.color}
                        fuelType={car.fuelType}
                        transmission={car.transmission}
                        seatingCapacity={car.seatingCapacity}
                        rentalPricePerDay={car.rentalPricePerDay}
                        availabilityStatus={car.availability}
                        mileage={car.mileage}
                        location={car.location}
                        licensePlate={car.licensePlate}
                        features={car.features}
                        isBooking={true}
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
                    <BookButton variant="contained" size="large">
                        Đặt xe tại đây
                    </BookButton>
                </CarData>
                <CarPriceBreakdownContainer>
                    <CarPriceBreakdown />
                </CarPriceBreakdownContainer>
            </CarDetailContainer>
        </Container>
    );
};

export default CarDetail;
