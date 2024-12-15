import { useEffect, useState } from "react";
import { HotelData } from "../../Utils/HotelData";
import FooterBlue from "../Footer/FooterBlue";
import { Navbar } from "../Navbar/Navbar";
import { DataComponent } from "../SearchData/DataComponent";
import { FilterFeature } from "./FilterFeature";
import { SearchRequest } from "./SearchRequest";
import styles from "./SearchRequest.module.css"
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { fetchData, fetchFilteredData, fetchFilteredDataWithoutFilter } from "../../Utils/Service";



export const SearchPage = () => {
    const [showData, setShowData] = useState(null)
    const [price, setPrice] = useState(false)
    const [star, setStar] = useState(false)
    // const [image, setImage] = useState(null);
   
    const [filterData, setFilterData] = useState(null);
    const location = useLocation(); // Get the location object
    const queryParams = new URLSearchParams(location.search);

    // Extract parameters
    const provinceId = queryParams.get('provinceId');
    const checkInDate = queryParams.get('checkInDate');
    const checkOutDate = queryParams.get('checkOutDate');
    const persons = queryParams.get('persons');
    useEffect(() => {
        getData()
    }, [location]);

   
    const getData = async () => {
        const filter = {
            provinceId: parseInt(provinceId), // Ensure it's a number
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            filters: [
                {
                    field: "MaxGuests",
                    operator: "GreaterThanOrEqual",
                    value: parseInt(persons), // Static or dynamic value, adjust as needed
                },
            ],
            includes: [],
            logic: "string", // Replace with appropriate logic value
            pageSize: 0,
            pageNumber: 0,
            all: true,
        };
        let data = await fetchFilteredDataWithoutFilter('/Rooms/SearchRooms', filter).then((response) => {
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
                                value: "Room",
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

    const filterPrice = async (e) => {
        if (e.target.name === "price") {
            if (Number(e.target.value) === 1500) {

                const filteredAbove1500 = showData.filter((el) => {
                    return (Number(el.price) > 1500)
                })
                setFilterData([...filteredAbove1500])
            }
            else if (Number(e.target.value) === 1000) {

                const filteredAbove1500 = showData.filter((el) => {

                    return ((Number(el.price) >= 1000) && (Number(el.price) < 1500));
                })
                setFilterData([...filteredAbove1500])
            }
            else if (Number(e.target.value) === 0) {

                const filteredAbove1500 = showData.filter((el) => {

                    return (Number(el.price) <= 1000)
                })
                setFilterData([...filteredAbove1500])
            }

            setPrice(!price)
        }
        else {
            setFilterData(showData)
        }
        /// console.log(e.target.value, e.target.checked, e.target.name);


    }
    const filterStar = (e) => {

        if (price) {
            const filteredAbove1500 = showData.filter((el) => {

                return (Number(el.rating) === Number(e.target.value))
            })
            setShowData([...filteredAbove1500])
        }

        else {

            const filteredAbove1500 = showData.filter((el) => {

                return (Number(el.rating) === Number(e.target.value))
            })
            setShowData([...filteredAbove1500])
        }

        setStar(!star)
    }
    // const filterPolicy = (e) => {
    //     if (star || price) {

    //         if (e.target.value === "cancellation") {

    //             const filteredAbove1500 = showData.filter((el) => {

    //                 return (el.cancellation === "Free")
    //             })
    //             setShowData([...filteredAbove1500])
    //         }
    //         if (e.target.value === "breakFast") {

    //             const filteredAbove1500 = showData.filter((el) => {

    //                 return (el.breakFast === "Included")
    //             })
    //             setShowData([...filteredAbove1500])
    //         }
    //     }
    //     else {
    //         if (e.target.value === "cancellation") {

    //             const filteredAbove1500 = HotelData.filter((el) => {

    //                 return (el.cancellation === "Free")
    //             })
    //             setShowData([...filteredAbove1500])
    //         }
    //         if (e.target.value === "breakFast") {

    //             const filteredAbove1500 = HotelData.filter((el) => {

    //                 return (el.breakFast === "Included")
    //             })
    //             setShowData([...filteredAbove1500])
    //         }
    //     }
    // }
    const filterSearch = (search) => {

        const filteredData = HotelData.filter((e) => {
            return (e.name.toLowerCase().includes(search.toLowerCase()))
        })
        setShowData(filteredData)
    }

    
    return <>
        <div>
            <Navbar />
        </div>
        <div className={styles.serachPageContainer} >
            <div className={styles.left}>
                <SearchRequest filterSearch={filterSearch} />
                <FilterFeature filterPrice={filterPrice} filterStar={filterStar} filterPolicy={null} />
            </div>

            {
                filterData && filterData.length > 0 ? 
                <div className={styles.hotelListContainer}>
                    {/* <ul className={styles.listOfHotels} > */}

                    {
                        filterData.map((e, i) => {
                            // console.log(e.url);


                            return (
                                <DataComponent
                                    key={e.id}
                                    id={e.id}
                                    hotelId={e.hotelId}
                                    roomType={e.roomType}
                                    price={e.price}
                                    availabilityStatus={e.availabilityStatus}
                                    bedType={e.bedType}
                                    maxGuests={e.maxGuests}
                                    roomSize={e.roomSize}
                                    amenities={e.amenities}
                                    isDeleted={e.isDeleted}
                                    checkInDate={checkInDate}
                                    checkOutDate={checkOutDate}
                                    starRating={e.starRating}
                                    url={e.url}
                                    person={persons}
                                />
                            );


                        })
                    }

                    {/* </ul> */}

                </div>
                : <h1>No Data Found</h1>
            }
        </div>


        <FooterBlue />

    </>
}