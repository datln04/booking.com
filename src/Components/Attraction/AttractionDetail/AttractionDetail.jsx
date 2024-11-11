import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faCheck, faInfoCircle, faExclamationTriangle, faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { attractions } from '../../../Utils/mock';
import { Navbar } from '../../Navbar/Navbar';
import Review from '../../Review/Review';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BigImage = styled.img`
  width: 50%;
  margin-bottom: 10px;
`;

const Thumbnails = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Thumbnail = styled.img`
  width: 48%;
  margin-bottom: 10px;
  height: 300px;
`;

const Duration = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Rating = styled.div`
  font-size: 1.5em;
  color: #FFA500;
  margin: 20px 0;
`;

const Section = styled.div`
  margin: 20px 0;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 10px;
  color: green;
`;

const RestrictionIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: red;
`;

const AdditionalInfoIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  color: blue;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 48%;
  margin-bottom: 10px;
`;

const ThumbnailText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.2em;
`;

const ParentContent = styled.div`
  display: flex;
`;

const LeftContent = styled.div`
  width: 70%;
  margin-right: 10px;
`;

const ListItem = styled.li`
  list-style-type: none;
  padding-left: 0;
  margin-bottom: 10px;
`;

const RightContent = styled.div`
  width: 30%;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

const ContactInfo = styled.div`
  margin-bottom: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 10px;
`;

const AttractionDetail = () => {
    const { id } = useParams();
    const attraction = attractions.find(attraction => attraction.id === parseInt(id));

    if (!attraction) {
        return <div>Attraction not found</div>;
    }

    const {
        title,
        location,
        rating,
        reviews,
        price,
        duration,
        highlights,
        image,
        thumbnails,
        description,
        restrictions,
        includes,
        additionalInfo,
        contact
    } = attraction;

    const RightContentComponent = ({ location, contact }) => (
        <RightContent>
            {/* <MapWrapper>
                <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>
                            {contact.address}
                        </Popup>
                    </Marker>
                </MapContainer>
            </MapWrapper> */}
            <ContactInfo>
                <h3>Contact Information</h3>
                <ContactItem>
                    <FontAwesomeIcon icon={faPhone} /> {contact.phone}
                </ContactItem>
                <ContactItem>
                    <FontAwesomeIcon icon={faEnvelope} /> {contact.email}
                </ContactItem>
                <ContactItem>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {contact.address}
                </ContactItem>
            </ContactInfo>
        </RightContent>
    );

    const formatKey = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1') // Add a space before each uppercase letter
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
    };

    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <Navbar />
            </div>
            <Container>
                <Title>{title}</Title>
                <ImageSection>
                    <BigImage src={image} alt={title} />
                    <Thumbnails>
                        {thumbnails.map((thumb, index) => {
                            if (index === 3 && thumbnails.length > 4) {
                                return (
                                    <ThumbnailWrapper key={index}>
                                        <Thumbnail src={thumb} alt={title} style={{ width: '100%', marginBottom: '0' }} />
                                        <ThumbnailText>+{thumbnails.length - 4}</ThumbnailText>
                                    </ThumbnailWrapper>
                                );
                            } else if (index <= 3) {
                                return <Thumbnail key={index} src={thumb} alt={title} />;
                            }
                            return null;
                        })}
                    </Thumbnails>
                </ImageSection>
                <ParentContent>
                    <LeftContent>
                        <Duration>
                            <div className='d-flex justify-content-between'>
                                <FontAwesomeIcon icon={faClock} /> <b>Duration: {duration}</b>
                            </div>
                        </Duration>
                        <h2>User Ratings</h2>
                        <Rating>
                            <FontAwesomeIcon icon={faStar} /> {rating} ({reviews} reviews)
                        </Rating>
                        <Review />
                        <Section>
                            <SectionTitle>What's Included</SectionTitle>
                            <ul>
                                {includes.map((item, index) => (
                                    <ListItem key={index}>
                                        <FontAwesomeIcon icon={faCheck} style={{ color: 'green', marginRight: '10px' }} />
                                        {item}
                                    </ListItem>
                                ))}
                            </ul>
                        </Section>
                        <Section>
                            <SectionTitle>
                                <RestrictionIcon icon={faExclamationTriangle} /> Restrictions
                            </SectionTitle>
                            <ul>
                                {Object.entries(restrictions).map(([key, value], index) => (
                                    <ListItem key={index}>{`${formatKey(key)}: ${value}`}</ListItem>
                                ))}
                            </ul>
                        </Section>
                        <Section>
                            <SectionTitle>
                                <AdditionalInfoIcon icon={faInfoCircle} /> Additional Information
                            </SectionTitle>
                            <ul>
                                {Object.entries(additionalInfo).map(([key, value], index) => (
                                    <ListItem key={index}>{`${formatKey(key)}: ${value}`}</ListItem>
                                ))}
                            </ul>
                        </Section>
                    </LeftContent>
                    <RightContentComponent location={location} contact={contact} />

                </ParentContent>
            </Container>
        </>
    );
};

export default AttractionDetail;