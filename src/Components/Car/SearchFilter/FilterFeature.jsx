import Switch from '@material-ui/core/Switch';
import styles from "./FilterFeature.module.css";
import { useEffect, useState } from 'react';
import { carData } from '../../../Utils/mock';

export const FilterFeature = ({ filterManufacturer, filterModel, filterYear, filterColor, filterFuelType, filterTransmission, filterSeatingCapacity, filterRentalPrice, filterAvailability, filterMileage, filterLocation }) => {

    const [manufacturerCounts, setManufacturerCounts] = useState({});
    const [modelCounts, setModelCounts] = useState({});
    const [yearCounts, setYearCounts] = useState({});
    const [colorCounts, setColorCounts] = useState({});
    const [fuelTypeCounts, setFuelTypeCounts] = useState({});
    const [transmissionCounts, setTransmissionCounts] = useState({});
    const [seatingCapacityCounts, setSeatingCapacityCounts] = useState({});
    const [rentalPriceCounts, setRentalPriceCounts] = useState({});
    const [availabilityCounts, setAvailabilityCounts] = useState({});
    const [mileageCounts, setMileageCounts] = useState({});
    const [locationCounts, setLocationCounts] = useState({});

    useEffect(() => {
        const countOccurrences = (key) => {
            return carData.reduce((acc, car) => {
                acc[car[key]] = (acc[car[key]] || 0) + 1;
                return acc;
            }, {});
        };

        setManufacturerCounts(countOccurrences('manufacturer'));
        setModelCounts(countOccurrences('model'));
        setYearCounts(countOccurrences('year'));
        setColorCounts(countOccurrences('color'));
        setFuelTypeCounts(countOccurrences('fuelType'));
        setTransmissionCounts(countOccurrences('transmission'));
        setSeatingCapacityCounts(countOccurrences('seatingCapacity'));
        setRentalPriceCounts(countOccurrences('rentalPrice'));
        setAvailabilityCounts(countOccurrences('availability'));
        setMileageCounts(countOccurrences('mileage'));
        setLocationCounts(countOccurrences('location'));
    }, []);

    const handleFilter = (filterFunction) => (e) => {
        filterFunction(e.target.value);
    };

    const renderFilterOptions = (counts, filterFunction) => {
        return Object.entries(counts).map(([key, count]) => (
            <div key={key}>
                <div>
                <input type="radio" value={key} onChange={handleFilter(filterFunction)} name={filterFunction.name} />
                <p>{key}</p>
                </div>
                <p>{count}</p>
            </div>
        ));
    };

    return (
        <div className={styles.filterFeatureContainer}>
            <h2 className={styles.header}>Filter by:</h2>

            <div className={styles.filterSection}>
                <h3>Manufacturer</h3>
                {renderFilterOptions(manufacturerCounts, filterManufacturer)}
            </div>

            <div className={styles.filterSection}>
                <h3>Model</h3>
                {renderFilterOptions(modelCounts, filterModel)}
            </div>

            <div className={styles.filterSection}>
                <h3>Year</h3>
                {renderFilterOptions(yearCounts, filterYear)}
            </div>

            <div className={styles.filterSection}>
                <h3>Color</h3>
                {renderFilterOptions(colorCounts, filterColor)}
            </div>

            <div className={styles.filterSection}>
                <h3>Fuel Type</h3>
                {renderFilterOptions(fuelTypeCounts, filterFuelType)}
            </div>

            <div className={styles.filterSection}>
                <h3>Transmission</h3>
                {renderFilterOptions(transmissionCounts, filterTransmission)}
            </div>

            <div className={styles.filterSection}>
                <h3>Seating Capacity</h3>
                {renderFilterOptions(seatingCapacityCounts, filterSeatingCapacity)}
            </div>

            <div className={styles.filterSection}>
                <h3>Rental Price per Day</h3>
                {renderFilterOptions(rentalPriceCounts, filterRentalPrice)}
            </div>

            <div className={styles.filterSection}>
                <h3>Availability Status</h3>
                {renderFilterOptions(availabilityCounts, filterAvailability)}
            </div>

            <div className={styles.filterSection}>
                <h3>Mileage</h3>
                {renderFilterOptions(mileageCounts, filterMileage)}
            </div>

            <div className={styles.filterSection}>
                <h3>Location</h3>
                {renderFilterOptions(locationCounts, filterLocation)}
            </div>
        </div>
    );
};