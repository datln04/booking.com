
import styled from 'styled-components'
import { TopSection } from './TopSection/TopSection'
import { TitleInfo } from './TittleInfo/TittleInfo'
import { AllIcons } from './AllIcons/AllIcons'
import { Availability } from './Avaliablity/Availability'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { restaurants } from '../../../../Utils/mock'
import FooterBlue from '../../../Footer/FooterBlue'
import { Navbar } from '../../../Navbar/Navbar'
import { SearchRestaurantSideNav } from '../../SearchNav/SearchRestaurantSideNav'
import Review from '../../../Review/Review'
import { useLocation } from 'react-router-dom/cjs/react-router-dom'
import { fetchFilteredData } from '../../../../Utils/Service'

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
    const { id } = useParams()
    const [showData, setShowData] = useState("")
    const location = useLocation(); // Get the location object
    const queryParams = new URLSearchParams(location.search);
    const checkInDate = queryParams.get('checkInDate');
    const tableSize = queryParams.get('tableSize');

    useEffect(() => {
        getData()
    }, [])


    const filterSearch = (search) => {

        const filteredData = restaurants.filter((e) => {
            return (e.name.toLowerCase().includes(search.toLowerCase()))
        })
        setShowData(filteredData)
    }
    const getData = async () => {
        const filter = {
            filters: [
                {
                    field: "Id",
                    operator: "Equal",
                    value: parseInt(id), // Static or dynamic value, adjust as needed
                },
            ],
            includes: ["RestaurantDietaryOptions", "RestaurantDietaryOptions.DietaryOption", "CuisineType"],
            logic: "string", // Replace with appropriate logic value
            pageSize: 0,
            pageNumber: 0,
            all: true,
        }
        const roomResponse = await fetchFilteredData('/Restaurants', filter);
        if (roomResponse) {
            let tmp = { ...roomResponse[0] };
            const requestObject = {
                filters: [
                    {
                        field: "ServiceId",
                        operator: "Equal",
                        value: parseInt(id),
                    },
                    {
                        field: "ServiceType",
                        operator: "Contains",
                        value: "Restaurant",
                    },
                    {
                        field: "ImageType",
                        operator: "Contains",
                        value: "Thumbnail",
                    },
                ],
                logic: "And",
                pageSize: 0,
                pageNumber: 0,
                all: true,
            };

            const requestObjectImage = {
                filters: [
                    {
                        field: "ServiceId",
                        operator: "Equal",
                        value: parseInt(id),
                    },
                    {
                        field: "ServiceType",
                        operator: "Contains",
                        value: "Restaurant",
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

            const [thumbnailsResponse, imagesResponse] = await Promise.all([
                fetchFilteredData('/Images', requestObject),
                fetchFilteredData('/Images', requestObjectImage)
            ]);

            if (thumbnailsResponse && thumbnailsResponse.length > 0) {
                tmp = { ...tmp, thumbnails: thumbnailsResponse };
            }

            if (imagesResponse && imagesResponse.length > 0) {
                tmp = { ...tmp, image: imagesResponse[imagesResponse?.length - 1] };
            }

            setShowData(tmp);
        }
    }
console.log(showData);

    return (
        <>
            <Navbar />
            <Wrapper>
                <SearchRestaurantSideNav filterSearch={filterSearch} />
                {
                    showData && <Div>
                        <TopSection />
                        <TitleInfo type="restaurant"
                            total={showData?.thumbnails?.length}
                            name={`${showData.name}`}
                            address={`${showData.address}`}
                            url_1={`${showData.image?.imageUrl}` || ''}
                            url_2={`${showData?.thumbnails[0]?.imageUrl}` || ''}
                            url_3={`${showData?.thumbnails[1]?.imageUrl}` || ''}
                            url_4={`${showData?.thumbnails[2]?.imageUrl}` || ''}
                            url_5={`${showData?.thumbnails[3]?.imageUrl}` || ''}
                            url_6={`${showData?.thumbnails[4]?.imageUrl}` || ''}
                            url_7={`${showData?.thumbnails[5]?.imageUrl}` || ''}
                            url_8={`${showData?.thumbnails[6]?.imageUrl}` || ''}

                        />
                        <AllIcons />
                        <Availability checkInDate={checkInDate} people={tableSize} />
                        <Review serviceType={'Restaurant'} />
                    </Div>
                }
            </Wrapper>
            <FooterBlue />

        </>
    )
}