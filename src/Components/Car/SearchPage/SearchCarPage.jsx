import React, { useState } from 'react';
import { FilterFeature } from '../SearchFilter/FilterFeature';
import { CarDataComponent } from '../SearchCarData/CarDataComponent';
import styles from "../../SearchPage/SearchRequest.module.css"
import { carData } from '../../../Utils/mock';
import { Navbar } from '../../Navbar/Navbar';

export const SearchCarPage = () => {
    const [filteredData, setFilteredData] = useState(carData);

    const filterManufacturer = (value) => {
        setFilteredData(carData.filter(car => car.manufacturer === value));
    };

    const filterModel = (value) => {
        setFilteredData(carData.filter(car => car.model === value));
    };

    const filterYear = (value) => {
        setFilteredData(carData.filter(car => car.year === value));
    };

    const filterColor = (value) => {
        setFilteredData(carData.filter(car => car.color === value));
    };

    const filterFuelType = (value) => {
        setFilteredData(carData.filter(car => car.fuelType === value));
    };

    const filterTransmission = (value) => {
        setFilteredData(carData.filter(car => car.transmission === value));
    };

    const filterSeatingCapacity = (value) => {
        setFilteredData(carData.filter(car => car.seatingCapacity === value));
    };

    const filterRentalPrice = (value) => {
        setFilteredData(carData.filter(car => car.rentalPrice === value));
    };

    const filterAvailability = (value) => {
        setFilteredData(carData.filter(car => car.availability === value));
    };

    const filterMileage = (value) => {
        setFilteredData(carData.filter(car => car.mileage === value));
    };

    const filterLocation = (value) => {
        setFilteredData(carData.filter(car => car.location === value));
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className={styles.serachPageContainer}>
                <div className={styles.left}>
                    <FilterFeature
                        filterManufacturer={filterManufacturer}
                        filterModel={filterModel}
                        filterYear={filterYear}
                        filterColor={filterColor}
                        filterFuelType={filterFuelType}
                        filterTransmission={filterTransmission}
                        filterSeatingCapacity={filterSeatingCapacity}
                        filterRentalPrice={filterRentalPrice}
                        filterAvailability={filterAvailability}
                        filterMileage={filterMileage}
                        filterLocation={filterLocation}
                    />
                </div>

                <div style={{width: '90%'}}>
                    {filteredData.map((car) => (
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
                            isBooking={false}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

