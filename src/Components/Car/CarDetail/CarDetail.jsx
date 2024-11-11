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
            <CarBreadcrumb startTime={'10:00 AM'} endTime={'1:00 PM'} location={'Hồ Chí Minh city'} />
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
                        <h2>Included in the price</h2>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="Free cancellation up to 48 hours before pick-up" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="Collision Damage Waiver with VND 18,522,443 deductible" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="Theft Protection with VND 18,522,443 excess" />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CheckIcon style={{ color: 'green' }} />
                            </ListItemIcon>
                            <ListItemText primary="270 kilometres per rental" />
                        </ListItem>
                    </List>
                    <h2>Your pick-up checklist</h2>
                    <Tabs value={value} onChange={handleChange} aria-label="pick-up checklist tabs">
                        <Tab icon={<FontAwesomeIcon icon={faClock} />} label="Arrival on time" />
                        <Tab icon={<FontAwesomeIcon icon={faUser} />} label="What to bring" />
                        <Tab icon={<FontAwesomeIcon icon={faWallet} />} label="Refundable deposit" />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        Rental companies only allow you to get your keys at your allocated pick-up time, they'll usually hold your car for a limited time after you're due to pick it up - then it's likely to be passed to another customer.
                        <br />
                        Your pick-up time is 10:00 AM
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        When you pick the car up, you'll need:
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primary="A passport or national ID card" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primary="All drivers to provide their driver's licence(s)" />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                </ListItemIcon>
                                <ListItemText primary="A credit card in the main driver's name, to hold the security deposit" />
                            </ListItem>
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        At pick-up, the main driver will need DKK 10,000 available on their credit card for a refundable security deposit. Cash and debit cards aren't accepted.
                        <br />
                        Accepted cards: Mastercard, Visa, American Express
                    </TabPanel>
                    <BookButton variant="contained" size="large">
                        Book Here
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