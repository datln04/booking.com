import React, { useEffect, useState } from 'react';
import { FilterFeature } from '../SearchFilter/FilterFeature';
import styles from "../../SearchPage/SearchRequest.module.css";
import { attractions } from '../../../Utils/mock';
import { Navbar } from '../../Navbar/Navbar';
import { AttractionDataComponent } from '../SearchAttractionData/AttractionDataComponent';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import { fetchFilteredData, fetchFilteredDataWithoutFilter } from '../../../Utils/Service';

export const SearchAttractionPage = () => {
    const location = useLocation(); // Get the location object
    const queryParams = new URLSearchParams(location.search);
    const [showData, setShowData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);

    // Extract parameters
    const provinceId = queryParams.get('provinceId');
    // const checkInDate = queryParams.get('checkInDate');
    // const persons = queryParams.get('persons');
    // const children = queryParams.get('children');

    const getData = async () => {
        const filter = {
            filters: [
                {
                    field: "ProvinceId",
                    operator: "Equal",
                    value: parseInt(provinceId), // Static or dynamic value, adjust as needed
                },
            ],
            includes: [],
            logic: "string", // Replace with appropriate logic value
            pageSize: 0,
            pageNumber: 0,
            all: true,
        };
        let data = await fetchFilteredData('/LeisureActivities', filter).then((response) => {
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
            // getMaxPrice();
            setShowData(data);
            setFilterData(data);
        } else {
            setShowData([]);
            setFilterData([]);
        }
    }

    useEffect(() => {
        getData();
    }, []);
    // const [filteredData, setFilteredData] = useState(attractions);

    // const filterLocation = (value) => {
    //     setFilterData(showData.filter(attraction => attraction.location === value));
    // };

    const filterRating = (value) => {
        setFilterData(showData.filter(attraction => attraction.rating >= parseFloat(value)));
    };

    const filterReviewCount = (value) => {
        setFilterData(showData.filter(attraction => attraction.reviews >= parseInt(value, 10)));
    };

    const filterAdultPrice = (value) => {
        setFilterData(showData.filter(attraction => attraction.priceAdult <= parseFloat(value)));
    };

    const filterChildPrice = (value) => {
        setFilterData(showData.filter(attraction => attraction.priceChild <= parseFloat(value)));
    };

    // const filterDuration = (value) => {
    //     setFilterData(showData.filter(attraction => attraction.duration === value));
    // };

    // const filterHighlights = (value) => {
    //     setFilterData(showData.filter(attraction => attraction.highlights.includes(value)));
    // };

    return (
        <>
            <div>
                <Navbar />
            </div>
            {
                showData && <div className={styles.serachPageContainer}>
                    <div className={styles.left}>
                        <FilterFeature
                            filterData={filterData ? filterData : []}
                            // filterLocation={filterLocation}
                            filterRating={filterRating}
                            filterReviewCount={filterReviewCount}
                            filterAdultPrice={filterAdultPrice}
                            filterChildPrice={filterChildPrice}
                        // filterDuration={filterDuration}
                        // filterHighlights={filterHighlights}
                        />
                    </div>

                    <div style={{ width: '90%' }}>
                        {filterData && filterData?.length > 0 && filterData.map((experience) => (
                            <AttractionDataComponent
                                key={experience.id}
                                id={experience.id}
                                title={experience.activityName}
                                location={experience.locationCity}
                                rating={experience.rating}
                                reviews={experience.reviews}
                                priceAdult={experience.priceAdult}
                                priceChild={experience.priceChild}
                                duration={experience.duration}
                                availabilityStatus={experience.availabilityStatus}
                                image={experience.image}
                                description={experience.description}
                                isBooking={false}
                            />
                        ))}
                    </div>
                </div>
            }
        </>
    );
};