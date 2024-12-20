import styles from "./SearchDeals.module.css"
import React, { useEffect } from "react"
import Calendar from 'react-calendar';
import { useState } from "react";
// import { countries } from "../../Utils/SuggitionItems";
import 'react-calendar/dist/Calendar.css';
import { Searchbar } from "./Suggestion/Searchbar";
import { Link } from "react-router-dom";
import { fetchData } from "../../Utils/Service";


export const SearchDeals = () => {

    const [initvalue, onInitChange] = useState(new Date());
    const [endvalue, onEndChange] = useState(new Date());
    const [intiDate, setInitDate] = useState(false)
    const [endDate, setEndDate] = useState(false)
    const [selector, setSelector] = useState(false)
    const [currentMonth, currentDay, currentDayNum] = endDatePicker(initvalue.getDay(), initvalue.getMonth(), initvalue.getDate())
    const [endMonth, endDay, endDayNum] = endDatePicker(endvalue.getDay(), endvalue.getMonth(), endvalue.getDate())
    const [countries, setCountries] = useState([])
    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [rooms, setRooms] = useState(2)

    const [query, setQuery] = React.useState("");
    const [, setLoading] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState([]);
    const [selectedLocation, setSelectedLocation] = React.useState(null);
    useEffect(() => {        
        if (query === "") {
            setSuggestions([]);
        } else {        
            setSelectedLocation(null);    
            let out = countries
                .filter((item) =>
                    item.name.toLowerCase().indexOf(query.toLocaleLowerCase()) !== -1 ? true : false
                )
                .map((item) => {
                    return {id: item?.id, name: item?.name}
                });
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

    const handleInitDate = () => {
        setInitDate(!intiDate)
        setEndDate(false)
        setSelector(false)

    }
    const handleEndDate = () => {
        setInitDate(false)
        setEndDate(!endDate)
        setSelector(false)

    }
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
    const handleRooms = (v) => {

        setRooms((prev) => {
            let x = prev + v;
            if (x < 1) {
                return 1
            }
            else {
                return x
            }
        })
    }

    const handleSearch = () => {

        const formatDate = (date) => {
            return date.toISOString();
        };

        if (selectedLocation && initvalue && endvalue && adults && rooms) {
            window.location.href = `/search?provinceId=${selectedLocation?.id}&checkInDate=${formatDate(initvalue)}&checkOutDate=${formatDate(endvalue)}&persons=${adults}&rooms=${rooms}`;
        } else {
            alert("Please fill all fields");
        }
    }

    const handleInitDateChange = (date) => {
        onInitChange(date);
        setInitDate(false);
    }

    const handleEndDateChange = (date) => {
        onEndChange(date);
        setEndDate(false);
    }

    return <div className={styles.main}>

        <div className={styles.searchDealsContainer}>
            <div>

            </div>
            <div className={styles.uppertext}>
                <h3>
                    Tìm kiếm các ưu đãi về khách sạn, nhà ở và nhiều hơn nữa...
                </h3>
                <p>
                    Từ những ngôi nhà ấm cúng ở nông thôn đến những căn hộ thành phố sành điệu
                </p>
            </div>
            <div className={styles.searchDealsBars}>
                <div className={styles.search}>
                    <div className={styles.svgImg}>
                        <img src="https://cf.bstatic.com/static/img/cross_product_index/accommodation/07ca5cacc9d77a7b50ca3c424ecd606114d9be75.svg" alt="icon" />
                    </div>
                    <div className={styles.inpu}>

                        <Searchbar
                            className={styles.suggestions}
                            value={query}
                            setQuery={setQuery}
                            loading={false}
                            setLoading={setLoading}
                            suggestions={suggestions}
                            setSuggestions={setSuggestions}
                            onChange={(value) => setQuery(value)}
                            placeholder={"Chọn địa điểm muốn thuê phòng?"}
                            setSelectedLocation={setSelectedLocation}
                        />

                    </div>
                    <div className={styles.Cross}>
                        {/* < svg className={styles.svgCross} focusable="false" height="20" role="presentation" width="20" viewBox="0 0 24 24"><path d="M13.31 12l6.89-6.89a.93.93 0 1 0-1.31-1.31L12 10.69 5.11 3.8A.93.93 0 0 0 3.8 5.11L10.69 12 3.8 18.89a.93.93 0 0 0 1.31 1.31L12 13.31l6.89 6.89a.93.93 0 1 0 1.31-1.31z"></path></svg> */}
                    </div>
                </div>
                <div className={styles.calender}>
                    <div className={styles.calenderPermnantItems}>
                        <div>
                            <svg fill="#BDBDBD" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 128 128"><path d="m112 16h-16v-8h-8v8h-48v-8h-8v8h-16c-4.4 0-8 3.9-8 8.7v86.6c0 4.8 3.6 8.7 8 8.7h96c4.4 0 8-3.9 8-8.7v-86.6c0-4.8-3.6-8.7-8-8.7zm0 95.3a1.1 1.1 0 0 1 -.2.7h-95.6a1.1 1.1 0 0 1 -.2-.7v-71.3h96zm-68-43.3h-12v-12h12zm0 28h-12v-12h12zm26-28h-12v-12h12zm0 28h-12v-12h12zm26 0h-12v-12h12zm0-28h-12v-12h12z" fillRule="evenodd"></path></svg>
                        </div>
                        <div onClick={handleInitDate}>
                            <p>
                                {currentDay}
                            </p>

                            <p>
                                {currentDayNum}

                            </p>
                            <p>
                                {currentMonth}

                            </p>
                            -
                        </div>
                        <div>
                            -
                        </div>
                        <div onClick={handleEndDate}>
                            <p>
                                {endDay}
                            </p>

                            <p>
                                {endDayNum}

                            </p>
                            <p>
                                {endMonth}

                            </p>

                        </div>
                    </div>
                    <div className={styles.cal}>


                        {
                            intiDate &&


                            <div className={styles.calenderItem}>
                                <p className={styles.datePicke}>Start Date</p>
                                <Calendar
                                    onChange={handleInitDateChange}
                                    value={initvalue}
                                    className={styles.cal1}
                                />
                            </div>
                        }
                        {
                            endDate &&
                            <div className={styles.calenderItem2}>
                                <p className={styles.datePicke}>End date</p>
                                <Calendar
                                    onChange={handleEndDateChange}
                                    value={endvalue}
                                    className={styles.cal1}

                                />
                            </div>
                        }
                    </div>
                </div>

                <div className={styles.selector}>
                    <div className={styles.manIcon}>
                        <img src="https://cf.bstatic.com/static/img/cross_product_index/guest/b2e5f2aa32b71ca0fc66aa671e4e958bcd69b7d0.svg" alt="manSVG" />
                    </div>
                    <div className={styles.selectorItems} onClick={() => handleSelector()}>
                        <p>
                            Tổng số người: {adults} -
                        </p>
                        {/* <p>
                            {children} Trẻ em  .
                        </p> */}
                        <p>
                            {rooms} Phòng
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
                                    <h4>Tổng số người</h4>

                                </div>
                                <div >
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
                            {/* <div className={styles.adult}>
                                <div>
                                    <h4>Trẻ em</h4>

                                </div>
                                <div >
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
                            </div> */}
                            <div className={styles.adult}>
                                <div>
                                    <h4>Phòng</h4>

                                </div>
                                <div >
                                    <div className={styles.button}>

                                        <button
                                            onClick={() => handleRooms(-1)}
                                        >-</button>
                                    </div>
                                    <div>
                                        <h4>{rooms}</h4>
                                    </div>
                                    <div className={styles.button}>
                                        <button
                                            onClick={() => handleRooms(1)}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>

                <div className={styles.button}>
                    <div onClick={handleSearch}>

                        <button>Tìm kiếm</button>
                    </div>
                </div>
            </div>
            {/* <div className={styles.lowerText}>
                <input type="checkbox" />
                <p>I'm travelling for work</p>
            </div> */}
        </div>
    </div>
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