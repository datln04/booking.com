import FooterBlue from "../Components/Footer/FooterBlue"
import { Navbar } from "../Components/Navbar/Navbar"
import SearchRestaurantRequest from "../Components/Restaurant/SearchPage/SearchRestaurantRequest"
import { HomeGuestsDiv } from "../Components/HomeGuests/HomeGuestsDiv"
import { NextTrip } from "../Components/NextTripDiv/NextTrip"
import { Discover } from "../Components/Discover"
import Degination from "../Components/Degination"



export const Restaurant = () => {
    return <>
        <div >
            <Navbar />
            <SearchRestaurantRequest />
            <NextTrip />
            <HomeGuestsDiv />
            <Degination />
            <Discover />
            <FooterBlue />
        </div>
    </>
}
