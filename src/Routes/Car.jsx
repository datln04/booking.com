import React from 'react'
import { Navbar } from '../Components/Navbar/Navbar'
import { NextTrip } from '../Components/NextTripDiv/NextTrip'
import { HomeGuestsDiv } from '../Components/HomeGuests/HomeGuestsDiv'
import Degination from '../Components/Degination'
import FooterBlue from '../Components/Footer/FooterBlue'
import SearchCarRequest from '../Components/Car/SearchPage/SearchCarRequest'

const Car = () => {
    return <>
    <div >
        <Navbar />
        <SearchCarRequest />
        <NextTrip />
        <HomeGuestsDiv />
        <Degination />
        {/* <Discover /> */}
        <FooterBlue />
    </div>
</>
}

export default Car