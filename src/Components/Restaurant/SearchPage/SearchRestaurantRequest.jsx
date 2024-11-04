import React, { useState } from 'react';
import styles from './SearchRestaurantRequest.module.css';
import { Calendar } from 'react-calendar';
import { Link } from '@material-ui/core';
import styled from "styled-components"
import { useThrottle } from "use-throttle"

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
// const IconImage = styled.img`
/* height:20px;
padding-right: 20px; */
// `
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
/* &>div:nth-child(n+${({ limit }) => limit + 1}){
    display: none;
} */
`

function SearchRestaurantRequest() {
  const [formData, setFormData] = useState({
    location: '',
    arrivalDate: '',
    arrivalTime: '',
    numberOfPersons: '2'
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log('id: ', id, 'value: ', value);

    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      arrivalDate: date
    }));
    setShowCalendar(false);
  };

  // return (
  //   <form onSubmit={handleSubmit} className={styles.form}>
  //     <InputField
  //       id="location"
  //       type="text"
  //       value={formData.location}
  //       onChange={handleChange}
  //       placeholder="Location"
  //     />
  //     <InputField
  //       id="arrivalDate"
  //       type="date"
  //       value={formData.arrivalDate}
  //       onChange={handleChange}
  //       placeholder="Arrival Date"
  //     />
  //     <InputField
  //       id="arrivalTime"
  //       type="time"
  //       value={formData.arrivalTime}
  //       onChange={handleChange}
  //       placeholder="Arrival Time"
  //     />
  //     <div className={`${styles.inputField} ${styles.formElement}`}>
  //       <button type="submit" className={styles.button}>Search</button>
  //     </div>
  //   </form>
  // );
  const handleClear = () => {
    setFormData((prevData) => ({
      ...prevData,
      location: ""
    }));
  }
  return <div className={styles.main}>

    <div className={styles.searchDealsContainer}>
      <div>

      </div>
      <div className={styles.uppertext}>
        <h3>
          Find deals on hotels, homes and much more...
        </h3>
        <p>
          From cosy country homes to funky city flats
        </p>
      </div>
      <div className={styles.searchDealsBars}>
        <div className={styles.search}>
          <div className={styles.svgImg}>
            <img src="https://cf.bstatic.com/static/img/cross_product_index/accommodation/07ca5cacc9d77a7b50ca3c424ecd606114d9be75.svg" alt="icon" />
          </div>
          <div className={styles.input}>
            <SearchBarWrapper>
              <Input id="location" onChange={handleChange} value={formData.location} placeholder="Where are you going?" />
              <RightSide>
                {formData.location && <div onClick={handleClear}>
                  <p>
                    x
                  </p>
                </div>}
              </RightSide>
            </SearchBarWrapper>
          </div>
        </div>
        <div className={styles.calender}>
          <div style={{ display: 'flex', width: '100%' }}>
            <svg fill="#BDBDBD" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 128 128"><path d="m112 16h-16v-8h-8v8h-48v-8h-8v8h-16c-4.4 0-8 3.9-8 8.7v86.6c0 4.8 3.6 8.7 8 8.7h96c4.4 0 8-3.9 8-8.7v-86.6c0-4.8-3.6-8.7-8-8.7zm0 95.3a1.1 1.1 0 0 1 -.2.7h-95.6a1.1 1.1 0 0 1 -.2-.7v-71.3h96zm-68-43.3h-12v-12h12zm0 28h-12v-12h12zm26-28h-12v-12h12zm0 28h-12v-12h12zm26 0h-12v-12h12zm0-28h-12v-12h12z" fillRule="evenodd"></path></svg>
            <div className={styles.calendarInput} onClick={() => setShowCalendar(!showCalendar)}>
              {formData.arrivalDate ? formData.arrivalDate.toDateString() : 'Arrival Date'}
            </div>
          </div>
          {showCalendar && (
            <Calendar
              onChange={handleDateChange}
              value={formData.arrivalDate}
              className={styles.calenderItem}
            />
          )}

        </div>
        <div className={styles.arrivalTime}>
          <label>Arrival Time: </label>
          <InputField
            id="arrivalTime"
            className={styles.arrivalTimeInput}
            type="time"
            value={formData.arrivalTime}
            onChange={handleChange}
            placeholder="Arrival Time"
          />
        </div>
        <div className={styles.numberOfPersons}>
          <label>Persons: </label>
          <select
            id="numberOfPersons"
            className={styles.numberOfPersonsSelect}
            value={formData.numberOfPersons}
            onChange={handleChange}
          >
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className={styles.button}>
          <a href="/searchRestaurant">
            <button>Search</button>
          </a>
        </div>
      </div>
    </div>
  </div>
}


export default SearchRestaurantRequest;