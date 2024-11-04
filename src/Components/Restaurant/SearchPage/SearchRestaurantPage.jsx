import { useState } from "react";
import FooterBlue from "../../Footer/FooterBlue";
import { Navbar } from "../../Navbar/Navbar";
import { HotelData } from "../../../Utils/HotelData";
import styles from "../../SearchPage/SearchRequest.module.css"
import { restaurants } from "../../../Utils/mock";
import { RestaurantDataComponent } from "../SearchRestaurantData/RestaurantDataComponent";
import { SearchRestaurantSideNav } from "../SearchNav/SearchRestaurantSideNav";
import { FilterFeature } from "../SearchFilter/FilterFeature";


export const SearchRestaurantPage = () => {
    const [showData, setShowData] = useState(restaurants)
    const [price, setPrice] = useState(false)
    const [star, setStar] = useState(false)
    // const [policy, setPolicy] = useState(false)


    const filterPrice = (e) => {

        if (e.target.name === "price") {
            if (Number(e.target.value) === 1500) {

                const filteredAbove1500 = HotelData.filter((el) => {

                    return (Number(el.price) > 1500)
                })
                setShowData([...filteredAbove1500])
            }
            else if (Number(e.target.value) === 1000) {

                const filteredAbove1500 = HotelData.filter((el) => {

                    return ((Number(el.price) >= 1000) && (Number(el.price) < 1500));
                })
                setShowData([...filteredAbove1500])
            }
            else if (Number(e.target.value) === 0) {

                const filteredAbove1500 = HotelData.filter((el) => {

                    return (Number(el.price) <= 1000)
                })
                setShowData([...filteredAbove1500])
            }

            setPrice(!price)
        }
        else {
            setShowData(HotelData)
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

            const filteredAbove1500 = HotelData.filter((el) => {

                return (Number(el.rating) === Number(e.target.value))
            })
            setShowData([...filteredAbove1500])
        }

        setStar(!star)
    }
    const filterPolicy = (e) => {
        if (star || price) {

            if (e.target.value === "cancellation") {

                const filteredAbove1500 = showData.filter((el) => {

                    return (el.cancellation === "Free")
                })
                setShowData([...filteredAbove1500])
            }
            if (e.target.value === "breakFast") {

                const filteredAbove1500 = showData.filter((el) => {

                    return (el.breakFast === "Included")
                })
                setShowData([...filteredAbove1500])
            }
        }
        else {
            if (e.target.value === "cancellation") {

                const filteredAbove1500 = HotelData.filter((el) => {

                    return (el.cancellation === "Free")
                })
                setShowData([...filteredAbove1500])
            }
            if (e.target.value === "breakFast") {

                const filteredAbove1500 = HotelData.filter((el) => {

                    return (el.breakFast === "Included")
                })
                setShowData([...filteredAbove1500])
            }
        }
    }

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
                <SearchRestaurantSideNav filterSearch={filterSearch} />
                <FilterFeature filterPrice={filterPrice} filterStar={filterStar} filterPolicy={filterPolicy} />
            </div>

            <div className={styles.hotelListContainer}>

                {showData.map((restaurant) => (
                    <RestaurantDataComponent
                        key={restaurant.id}
                        id={restaurant.id}
                        url={restaurant.url}
                        name={restaurant.name}
                        city={restaurant.city}
                        cuisineType={restaurant.cuisineType}
                        address={restaurant.address}
                        phoneNumber={restaurant.phoneNumber}
                        email={restaurant.email}
                        rating={restaurant.rating}
                        operatingHours={restaurant.operatingHours}
                        photos={restaurant.photos}
                        priceRange={restaurant.priceRange}
                        reviews={restaurant.reviews}
                        dietaryOptions={restaurant.dietaryOptions}
                        discountMessage={restaurant.discountMessage}
                    />
                ))}

            </div>
        </div>
        <FooterBlue />
    </>
}