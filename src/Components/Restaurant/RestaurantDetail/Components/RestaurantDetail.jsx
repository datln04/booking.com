
import styled from 'styled-components'
import { TopSection } from './TopSection/TopSection'
import { TitleInfo } from './TittleInfo/TittleInfo'
import { AllIcons } from './AllIcons/AllIcons'
import { Availability } from './Avaliablity/Availability'
import { useParams } from 'react-router'
import { useState } from 'react'
import { restaurants } from '../../../../Utils/mock'
import FooterBlue from '../../../Footer/FooterBlue'
import { Navbar } from '../../../Navbar/Navbar'
import { SearchRestaurantSideNav } from '../../SearchNav/SearchRestaurantSideNav'
import Review from '../../../Review/Review'

const Wrapper = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 50px;

&>:nth-child(1){
    width: 20%;
    padding: 20px;
    height: 440px;
}
&>:nth-child(2){
    width: 60%;
}

`
const Div = styled.div`
margin:0 ;

`
export const RestaurantDetails = () => {
    const param = useParams()
    const [, setShowData] = useState("")

    const sendData = restaurants.filter((el) => {
        return el.id == param.id
    })
    const filterSearch = (search) => {

        const filteredData = restaurants.filter((e) => {
            return (e.name.toLowerCase().includes(search.toLowerCase()))
        })
        setShowData(filteredData)
    }
    return (
        <>
            <Navbar />
            <Wrapper>
                <SearchRestaurantSideNav filterSearch={filterSearch} />
                <Div>
                    <TopSection />
                    <TitleInfo type="restaurant" name={`${sendData[0].name}`}
                        address={`${sendData[0].city}`}
                        url_1={`${sendData[0].photos[0]}`}
                        url_2={`${sendData[0].photos[1]}`}
                        url_3={`${sendData[0].photos[2]}`}
                        url_5={`${sendData[0].photos[3]}`}
                        url_6={`${sendData[0].photos[4]}`}
                        url_7={`${sendData[0].photos[5]}`}
                        url_8={`${sendData[0].photos[6]}`}
                        url_9={`${sendData[0].photos[7]}`}
                        url_10={`${sendData[0].photos[8]}`}
                    />
                    <AllIcons />
                    <Availability />
                    <Review />
                </Div>
            </Wrapper>
            <FooterBlue />

        </>
    )
}