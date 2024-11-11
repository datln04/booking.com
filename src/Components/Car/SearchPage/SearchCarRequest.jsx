import React, { useState } from 'react';
import styles from './SearchCarRequest.module.css';
import { Calendar } from 'react-calendar';
import { Link } from '@material-ui/core';
import styled from "styled-components"
import { useThrottle } from "use-throttle"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function InputField({ id, type, value, onChange, placeholder, className }) {
  return (
    <div className={`${styles.inputField} ${styles.formElement}`}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}

const SearchBarWrapper = styled.div`
  position: relative;
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
    font-family: "BlinkMacSystemFont","-apple-system","Segoe UI",'Roboto','Helvetica','Arial','sans-serif';
  
    display: flex;
    align-items: center;
    position: relative;
    width: 250px;
    font-weight: 100;
    color: gray;
`
const Input = styled.input`
border:none;
outline: none;
flex:1;
font-weight: 500;
background-color: inherit;
font-family: "BlinkMacSystemFont","-apple-system","Segoe UI",'Roboto','Helvetica','Arial','sans-serif';
font-size: 15px;
padding-left: 2%;
color:rgb(85, 84, 84) ;
`
const RightSide = styled.div`

& div > p{
font-size: 24px;
margin-top: -15px;
cursor: pointer;
font-weight: 400;
}
`
const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  animation: spin 2s linear infinite;
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`
const SuggestionBox = styled.div`
display: ${({ len }) => (len === 0 ? "none" : "flex")};
position: absolute;
flex-direction: column;
flex:0 0 auto;
max-height: 300px;
overflow: auto;
overflow-y: hidden;
top: 52%;
left: 12%;
border-radius: 10px;
width: 359px;
z-index: 4;
background-color: white;
box-shadow: 2px 2px 2px 2px #7c787849;

& *{
    flex: 1;
    text-align: left;
    /* padding: 10px;  */
    padding-left: 20px;
    padding-top:10px;
    padding-bottom:10px;
}

&>div:nth-child(${({ active }) => active}){
    background: #eeeaea88;
    color:#1f1e1e85;
    font-weight: 500;
}
&>div{
       height: 30px;
}
`

function SearchCarRequest() {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState('');
  const [dropoffDate, setDropoffDate] = useState(null);
  const [dropoffTime, setDropoffTime] = useState('');
  const [showPickupCalendar, setShowPickupCalendar] = useState(false);
  const [showDropoffCalendar, setShowDropoffCalendar] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log('id: ', id, 'value: ', value);

    switch (id) {
      case 'location':
        setLocation(value);
        break;
      case 'pickupTime':
        setPickupTime(value);
        break;
      case 'dropoffTime':
        setDropoffTime(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      location,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
    };
    console.log('Form Data:', formData);
    window.location.href = '/searchCar';
  };

  const handleDateChange = (date, type) => {
    if (type === 'pickup') {
      setPickupDate(date);
      setShowPickupCalendar(false);
    } else {
      setDropoffDate(date);
      setShowDropoffCalendar(false);
    }
  };

  const handleClear = () => {
    setLocation('');
  }

  return (
    <div className={styles.main}>
      <div className={styles.searchDealsContainer}>
        <div></div>
        <div className={styles.uppertext}>
          <h3>Car rentals for any kind of trip</h3>
          <p>Great cars at great prices from the biggest rental companies</p>
        </div>
        <div className={styles.searchDealsBars}>
          <div className={styles.search}>
            <div className={styles.svgImg}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className={styles.input}>
              <SearchBarWrapper>
                <Input id="location" onChange={handleChange} value={location} placeholder="Pickup location?" />
                <RightSide>
                  {location && <div onClick={handleClear}><p>x</p></div>}
                </RightSide>
              </SearchBarWrapper>
            </div>
          </div>
          <div className={styles.calender}>
            <div style={{ display: 'flex', width: '100%' }}>
              <svg fill="#BDBDBD" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 128 128"><path d="m112 16h-16v-8h-8v8h-48v-8h-8v8h-16c-4.4 0-8 3.9-8 8.7v86.6c0 4.8 3.6 8.7 8 8.7h96c4.4 0 8-3.9 8-8.7v-86.6c0-4.8-3.6-8.7-8-8.7zm0 95.3a1.1 1.1 0 0 1 -.2.7h-95.6a1.1 1.1 0 0 1 -.2-.7v-71.3h96zm-68-43.3h-12v-12h12zm0 28h-12v-12h12zm26-28h-12v-12h12zm0 28h-12v-12h12zm26 0h-12v-12h12zm0-28h-12v-12h12z" fillRule="evenodd"></path></svg>
              <div className={styles.calendarInput} onClick={() => setShowPickupCalendar(!showPickupCalendar)}>
                {pickupDate ? pickupDate.toDateString() : 'Pickup Date'}
              </div>
            </div>
            {showPickupCalendar && (
              <Calendar
                onChange={(date) => handleDateChange(date, 'pickup')}
                value={pickupDate}
                className={styles.calenderItem}
              />
            )}
          </div>
          <div className={styles.arrivalTime}>
            <label>Pickup Time: </label>
            <InputField
              id="pickupTime"
              className={styles.arrivalTimeInput}
              type="time"
              value={pickupTime}
              onChange={handleChange}
              placeholder="Arrival Time"
            />
          </div>
          <div className={styles.calender}>
            <div style={{ display: 'flex', width: '100%' }}>
              <svg fill="#BDBDBD" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 128 128"><path d="m112 16h-16v-8h-8v8h-48v-8h-8v8h-16c-4.4 0-8 3.9-8 8.7v86.6c0 4.8 3.6 8.7 8 8.7h96c4.4 0 8-3.9 8-8.7v-86.6c0-4.8-3.6-8.7-8-8.7zm0 95.3a1.1 1.1 0 0 1 -.2.7h-95.6a1.1 1.1 0 0 1 -.2-.7v-71.3h96zm-68-43.3h-12v-12h12zm0 28h-12v-12h12zm26-28h-12v-12h12zm0 28h-12v-12h12zm26 0h-12v-12h12zm0-28h-12v-12h12z" fillRule="evenodd"></path></svg>
              <div className={styles.calendarInput} onClick={() => setShowDropoffCalendar(!showDropoffCalendar)}>
                {dropoffDate ? dropoffDate.toDateString() : 'DropOff Date'}
              </div>
            </div>
            {showDropoffCalendar && (
              <Calendar
                onChange={(date) => handleDateChange(date, 'dropoff')}
                value={dropoffDate}
                className={styles.calenderItem}
              />
            )}
          </div>
          <div className={styles.arrivalTime}>
            <label>DropOff Time: </label>
            <InputField
              id="dropoffTime"
              className={styles.arrivalTimeInput}
              type="time"
              value={dropoffTime}
              onChange={handleChange}
              placeholder="DropOff Time"
            />
          </div>
          <div className={styles.button}>
            <a href="/searchRestaurant">
              <button onClick={handleSubmit}>Search</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCarRequest;