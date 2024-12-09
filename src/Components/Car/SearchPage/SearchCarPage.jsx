import React, { useEffect, useState } from 'react';
import { FilterFeature } from '../SearchFilter/FilterFeature';
import { CarDataComponent } from '../SearchCarData/CarDataComponent';
import styles from "../../SearchPage/SearchRequest.module.css"
// import { carData } from '../../../Utils/mock';
import { Navbar } from '../../Navbar/Navbar';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { fetchFilteredData, fetchFilteredDataWithoutFilter } from '../../../Utils/Service';

export const SearchCarPage = () => {
    const [showData, setShowData] = useState(null)
    const [filterData, setFilterData] = useState(null);
    const location = useLocation(); // Get the location object
    const queryParams = new URLSearchParams(location.search);

    // Extract parameters
    const provinceId = queryParams.get('provinceId');
    const checkInDate = queryParams.get('checkInDate');
    const checkOutDate = queryParams.get('checkOutDate');
    // const persons = queryParams.get('persons');
    useEffect(() => {
        getData()
    }, [location]);


    const getData = async () => {
        const filter = {
            // provinceId: parseInt(provinceId), // Ensure it's a number
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            filters: [
                {
                    field: "ProvinceId",
                    operator: "Equal",
                    value: parseInt(provinceId), // Static or dynamic value, adjust as needed
                },
            ],
            includes: ["TransportServiceFeatures", "TransportServiceFeatures.Feature"],
            logic: "string", // Replace with appropriate logic value
            pageSize: 0,
            pageNumber: 0,
            all: true,
        };
        let data = await fetchFilteredDataWithoutFilter('/TransportServices/SearchTransportServices', filter).then((response) => {
            if (response && response?.length > 0) {
                return response?.map((e) => {
                    const requestObject = {
                        filters: [
                            {
                                field: "ServiceId",
                                operator: "Equal",
                                value: e?.id,
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

                    return fetchFilteredData('/Images', requestObject).then(resp => {
                        if (resp) {
                            const image = resp.find((img) => img.serviceId === e.id);
                            return { ...e, url: image?.imageUrl };
                        }
                    })
                })
            }
        });
        if (data) {
            data = await Promise.all(data);
            setShowData(data);
            setFilterData(data);
        } else {
            setShowData([]);
            setFilterData([]);
        }
    }

    // const filterManufacturer = (value) => {
    //     setFilterData(showData.filter(car => car.manufacturer === value));
    // };

    const filterModel = (value) => {
        setFilterData(showData.filter(car => car.model == value));
    };

    const filterYear = (value) => {
        setFilterData(showData.filter(car => car.year == value));
    };

    const filterColor = (value) => {
        setFilterData(showData.filter(car => car.color == value));
    };

    const filterFuelType = (value) => {
        setFilterData(showData.filter(car => car.fuelType == value));
    };

    const filterTransmission = (value) => {
        setFilterData(showData.filter(car => car.transmission == value));
    };

    const filterSeatingCapacity = (value) => {
        setFilterData(showData.filter(car => car.seatingCapacity == value));
    };

    const filterRentalPrice = (value) => {
        setFilterData(showData.filter(car => car.rentalPrice == value));
    };

    const filterAvailability = (value) => {
        setFilterData(showData.filter(car => car.availability == value));
    };

    const filterMileage = (value) => {
        setFilterData(showData.filter(car => car.mileage == value));
    };

    const filterLocation = (value) => {
        setFilterData(showData.filter(car => car.location == value));
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className={styles.serachPageContainer}>
                <div className={styles.left}>
                    <FilterFeature
                        carData={showData}
                        // filterManufacturer={filterManufacturer}
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

                {
                    filterData && filterData.length > 0 && <div style={{ width: '90%', paddingLeft: '20px' }}>
                        {filterData.map((car) => (
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
                                features={car?.transportServiceFeatures}
                                isBooking={false}
                                url={car.url}
                            />
                        ))}
                    </div>
                }
            </div>
        </>
    );
};

