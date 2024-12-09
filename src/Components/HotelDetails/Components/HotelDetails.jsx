
import styled from 'styled-components'
import { TopSection } from './TopSection/TopSection'
import { TitleInfo } from './TittleInfo/TittleInfo'
import { AllIcons } from './AllIcons/AllIcons'
import { Navbar } from '../../Navbar/Navbar'
import FooterBlue from '../../Footer/FooterBlue'
import { SearchRequest } from '../../SearchPage/SearchRequest'
import { useParams } from 'react-router'
import { HotelData } from '../../../Utils/HotelData'
import { useEffect, useState } from 'react'
import Review from '../../Review/Review'
import { fetchData, fetchFilteredData } from '../../../Utils/Service'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { Availability } from './Avaliablity/Availability'

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
export const HotelDetails = () => {
    const param = useParams()
    const [showData, setShowData] = useState("")
    const location = useLocation(); // Get the location object
    const queryParams = new URLSearchParams(location.search);
    const checkInDate = queryParams.get('checkInDate');
    const checkOutDate = queryParams.get('checkOutDate');
    const person = queryParams.get('person');

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        const filter = {
            filters: [
                {
                    field: "Id",
                    operator: "Equal",
                    value: parseInt(param?.id),
                }
            ],
            includes: [
                "Hotel", "Hotel.Province"
            ],
            logic: "string",
            pageSize: 0,
            pageNumber: 0,
            all: true
        }
        const roomResponse = await fetchFilteredData('/Rooms', filter);
        if (roomResponse) {
            let tmp = { ...roomResponse[0] };
            const requestObject = {
                filters: [
                    {
                        field: "ServiceId",
                        operator: "Equal",
                        value: parseInt(param?.id),
                    },
                    {
                        field: "ServiceType",
                        operator: "Contains",
                        value: "Room",
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
                        value: parseInt(param?.id),
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

    const filterSearch = (search) => {

        const filteredData = HotelData.filter((e) => {
            return (e.name.toLowerCase().includes(search.toLowerCase()))
        })
        setShowData(filteredData)
    }
    return (
        <>
            <Navbar />
            <Wrapper>
                <SearchRequest filterSearch={filterSearch} />
                <Div>
                    <TopSection />
                    <TitleInfo 
                        total={showData?.thumbnails?.length}
                        type="hotel" name={`${showData?.hotel?.name}`}
                        address={`${showData?.hotel?.province?.name}`}
                        url_1={`${showData?.image?.imageUrl}` || ''}
                        url_2={`${showData?.thumbnails?.length >= 6 ? showData.thumbnails[showData.thumbnails.length - 6]?.imageUrl : ''}`}
                        url_3={`${showData?.thumbnails?.length >= 5 ? showData.thumbnails[showData.thumbnails.length - 5]?.imageUrl : ''}`}
                        url_5={`${showData?.thumbnails?.length >= 4 ? showData.thumbnails[showData.thumbnails.length - 4]?.imageUrl : ''}`}
                        url_6={`${showData?.thumbnails?.length >= 3 ? showData.thumbnails[showData.thumbnails.length - 3]?.imageUrl : ''}`}
                        url_7={`${showData?.thumbnails?.length >= 2 ? showData.thumbnails[showData.thumbnails.length - 2]?.imageUrl : ''}`}
                        url_8={`${showData?.thumbnails?.length >= 1 ? showData.thumbnails[showData.thumbnails.length - 1]?.imageUrl : ''}`}
                    />

                    <AllIcons />

                    <Availability Id={param?.id} checkInDate={checkInDate} checkOutDate={checkOutDate} person={person}/>
                    <Review serviceType={'Room'} data={showData}/>
                </Div>
            </Wrapper>
            <FooterBlue />

        </>
    )
}