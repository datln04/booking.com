import React, { useState } from 'react';
import { FilterFeature } from '../SearchFilter/FilterFeature';
import styles from "../../SearchPage/SearchRequest.module.css";
import { attractions } from '../../../Utils/mock';
import { Navbar } from '../../Navbar/Navbar';
import { AttractionDataComponent } from '../SearchAttractionData/AttractionDataComponent';

export const SearchAttractionPage = () => {
    const [filteredData, setFilteredData] = useState(attractions);

    const filterLocation = (value) => {
        setFilteredData(attractions.filter(attraction => attraction.location === value));
    };

    const filterRating = (value) => {
        setFilteredData(attractions.filter(attraction => attraction.rating >= parseFloat(value)));
    };

    const filterReviewCount = (value) => {
        setFilteredData(attractions.filter(attraction => attraction.reviews >= parseInt(value, 10)));
    };

    const filterAdultPrice = (value) => {
        setFilteredData(attractions.filter(attraction => attraction.price.adult <= parseFloat(value)));
    };

    const filterChildPrice = (value) => {
        setFilteredData(attractions.filter(attraction => attraction.price.child <= parseFloat(value)));
    };

    const filterDuration = (value) => {
        setFilteredData(attractions.filter(attraction => attraction.duration === value));
    };

    const filterHighlights = (value) => {
        setFilteredData(attractions.filter(attraction => attraction.highlights.includes(value)));
    };

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className={styles.serachPageContainer}>
                <div className={styles.left}>
                    <FilterFeature
                        filterLocation={filterLocation}
                        filterRating={filterRating}
                        filterReviewCount={filterReviewCount}
                        filterAdultPrice={filterAdultPrice}
                        filterChildPrice={filterChildPrice}
                        filterDuration={filterDuration}
                        filterHighlights={filterHighlights}
                    />
                </div>

                <div style={{ width: '90%' }}>
                    {filteredData.map((experience) => (
                        <AttractionDataComponent
                            key={experience.id}
                            id={experience.id}
                            title={experience.title}
                            location={experience.location}
                            rating={experience.rating}
                            reviews={experience.reviews}
                            price={experience.price}
                            duration={experience.duration}
                            highlights={experience.highlights}
                            image={experience.image}
                            description={experience.description}
                            isBooking={false}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};