import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import styled from "styled-components";
import { Searchbar } from '../../SearchDeals/Suggestion/Searchbar';
import styles from './SearchAttractionRequest.module.css';
import { fetchData } from '../../../Utils/Service';

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

function SearchAttractionRequest() {
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

  function endDatePicker(D, M, day) {
    var month = [];
    for (let i = 0; i < 12; i++) {
      month.push(0)
    }
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "March";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var weekday = [];
    for (let i = 0; i < 7; i++) {
      weekday.push(0)
    }
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var currentDay = weekday[D];

    var currentMonth = month[M];

    // var currentDayNum = day

    return [currentMonth, currentDay, day]
  }

  const [initvalue, onInitChange] = useState(new Date());
  const [endvalue, onEndChange] = useState(new Date());
  const [intiDate, setInitDate] = useState(false)
  const [endDate, setEndDate] = useState(false)
  const [selector, setSelector] = useState(false)
  const [currentMonth, currentDay, currentDayNum] = endDatePicker(initvalue.getDay(), initvalue.getMonth(), initvalue.getDate())
  const [endMonth, endDay, endDayNum] = endDatePicker(endvalue.getDay(), endvalue.getMonth(), endvalue.getDate())
  const [query, setQuery] = React.useState("");
  const [, setLoading] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([]);
  const [countries, setCountries] = useState([])

  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)

  const handleSelector = () => {
    setInitDate(false)
    setEndDate(false)
    setSelector(!selector)
  }

  const handleAdults = (v) => {
    setAdults((prev) => {
      let x = prev + v;
      if (x < 1) {
        return 1
      }
      else {
        return x
      }
    })
  }
  const handleChildren = (v) => {
    setChildren((prev) => {
      let x = prev + v;
      if (x < 0) {
        return 0
      }
      else {
        return x
      }
    })
  }

  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
    } else {
      let out = countries
        .filter((item) =>
          item.name.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1 ? true : false
        )
        .map((item) => item.name);
      setSuggestions(out);
      console.log(out);
      // setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const getData = async () => {
      await fetchData('/Provinces').then((response) => setCountries(response)).catch((e) => console.log(e));
    }
    getData()
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.searchDealsContainer}>
        <div></div>
        <div className={styles.uppertext}>
          <h3>Điểm tham quan, hoạt động và trải nghiệm</h3>
          <p>Khám phá những điểm đến và trải nghiệm phù hợp với sở thích và phong cách du lịch của bạn</p>
        </div>
        <div className={styles.searchDealsBars}>
          <div className={styles.search}>
            <div className={styles.svgImg}>
              <FontAwesomeIcon icon={faEarthAmericas} />
            </div>
            <div className={styles.input}>
              {/* <SearchBarWrapper>
            <Input id="location" onChange={handleChange} value={location} placeholder="Bạn sẽ đi đâu?" />
            <RightSide>
              {location && <div onClick={handleClear}><p>x</p></div>}
            </RightSide>
          </SearchBarWrapper> */}
              <Searchbar
                className={styles.suggestions}
                value={query}
                setQuery={setQuery}
                loading={false}
                setLoading={setLoading}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                onChange={(value) => setQuery(value)}
                placeholder={"Chọn địa điểm du lịch?"}
              />
            </div>
          </div>
          <div className={styles.calender}>
            <div style={{ display: 'flex', width: '100%' }}>
              <svg fill="#BDBDBD" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 128 128"><path d="m112 16h-16v-8h-8v8h-48v-8h-8v8h-16c-4.4 0-8 3.9-8 8.7v86.6c0 4.8 3.6 8.7 8 8.7h96c4.4 0 8-3.9 8-8.7v-86.6c0-4.8-3.6-8.7-8-8.7zm0 95.3a1.1 1.1 0 0 1 -.2.7h-95.6a1.1 1.1 0 0 1 -.2-.7v-71.3h96zm-68-43.3h-12v-12h12zm0 28h-12v-12h12zm26-28h-12v-12h12zm0 28h-12v-12h12zm26 0h-12v-12h12zm0-28h-12v-12h12z" fillRule="evenodd"></path></svg>
              <div className={styles.calendarInput} onClick={() => setShowPickupCalendar(!showPickupCalendar)}>
                {pickupDate ? pickupDate.toDateString() : 'Ngày tham gia'}
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
          <div className={styles.selector}>
            <div className={styles.manIcon}>
              <img src="https://cf.bstatic.com/static/img/cross_product_index/guest/b2e5f2aa32b71ca0fc66aa671e4e958bcd69b7d0.svg" alt="manSVG" />
            </div>
            <div className={styles.selectorItems} onClick={() => handleSelector()}>
              <p>
                {adults} người lớn .
              </p>
              <p>
                {children} trẻ em
              </p>
            </div>
            <div>
              <img src="https://cf.bstatic.com/static/img/cross_product_index/toggle/fb6f63d62231f9fe552d79b5448620b2e63c726e.svg" alt="corousel" />
            </div>
            {
              selector &&

              <div className={styles.selectorDropDown}>
                <div className={styles.adult}>
                  <div>
                    <h4>Người lớn</h4>
                  </div>
                  <div>
                    <div className={styles.button}>
                      <button
                        onClick={() => handleAdults(-1)}
                      >-</button>
                    </div>
                    <div>
                      <h4>{adults}</h4>
                    </div>
                    <div className={styles.button}>
                      <button
                        onClick={() => handleAdults(1)}
                      >+</button>
                    </div>
                  </div>
                </div>
                <div className={styles.adult}>
                  <div>
                    <h4>Trẻ em</h4>
                  </div>
                  <div>
                    <div className={styles.button}>
                      <button
                        onClick={() => handleChildren(-1)}
                      >-</button>
                    </div>
                    <div>
                      <h4>{children}</h4>
                    </div>
                    <div className={styles.button}>
                      <button
                        onClick={() => handleChildren(1)}
                      >+</button>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
          <div className={styles.button} style={{ width: '170px', borderRight: '4px solid rgb(254, 187, 2)', borderTop: '4px solid rgb(254, 187, 2)', borderBottom: '4px solid rgb(254, 187, 2)' }}>
            <a href="/searchAttraction">
              <button>Tìm kiếm</button>
            </a>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SearchAttractionRequest;