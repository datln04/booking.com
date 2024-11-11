import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { NextTrip } from '../Components/NextTripDiv/NextTrip'
import { HomeGuestsDiv } from '../Components/HomeGuests/HomeGuestsDiv'
import Degination from '../Components/Degination'
import FooterBlue from '../Components/Footer/FooterBlue'
import SearchAttractionRequest from '../Components/Attraction/SearchPage/SearchAttractionRequest'

const Attraction = () => {
    return (
        <div >
            <Navbar />
            <SearchAttractionRequest />
            <NextTrip />
            <HomeGuestsDiv />
            <Degination />
            {/* <Discover /> */}
            <FooterBlue />
        </div>
    )
}

export default Attraction