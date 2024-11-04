import { useState } from "react"
import styles from "./SearchRestaurantSideNav.module.css"
import Calendar from "react-calendar"


export const SearchRestaurantSideNav = ({ filterSearch }) => {
    const [destination, setDestination] = useState("")


    const [initvalue, onInitChange] = useState(new Date());
    const [endvalue, onEndChange] = useState(new Date());
    const [intiDate, setInitDate] = useState(false)
    const [endDate, setEndDate] = useState(false)
    // const [selector, setSelector] = useState(false)
    const [currentMonth, currentDay, currentDayNum] = endDatePicker(initvalue.getDay(), initvalue.getMonth(), initvalue.getDate())
    const [endMonth, endDay, endDayNum] = endDatePicker(endvalue.getDay(), endvalue.getMonth(), endvalue.getDate())

    const [adults, setAdults] = useState(2)
    const [children, setChildren] = useState(0)
    const [rooms, setRooms] = useState(2)

    const [adult, setAdult] = useState(false)
    const [child, setChild] = useState(false)
    const [room, setRoom] = useState(false)

    const handleInitDate = () => {
        setInitDate(!intiDate)
        setEndDate(false)
        // setSelector(false)

    }
    const handleEndDate = () => {
        setInitDate(false)
        setEndDate(!endDate)
        // setSelector(false)

    }
    // const handleSelector = () => {
    //     setInitDate(false)
    //     setEndDate(false)
    //     setSelector(!selector)
    // }

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
    const handleAdult = () => {
        setAdult(!adult)
        setChild(false)
        setRoom(false)
    }
    const handleChild = () => {
        setAdult(false)
        setChild(!child)
        setRoom(false)
    }
    const handleRoom = () => {
        setAdult(false)
        setChild(false)
        setRoom(!room)
    }

    const handleSearch = () => {
        filterSearch(destination)
        setDestination("")
        setAdults(1)
        setChildren(0)
        setRooms(1)

    }



    return <div className={styles.SearchRequestContainer}>

        <p>
            Search
        </p>
        <div className={styles.destination}>
            <p>Destination/property name:</p>
            <div>
                <svg aria-hidden="true" fill="#838181" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 24 24"><path d="M17.464 6.56a8.313 8.313 0 1 1-15.302 6.504A8.313 8.313 0 0 1 17.464 6.56zm1.38-.586C16.724.986 10.963-1.339 5.974.781.988 2.9-1.337 8.662.783 13.65c2.12 4.987 7.881 7.312 12.87 5.192 4.987-2.12 7.312-7.881 5.192-12.87zM15.691 16.75l7.029 7.03a.75.75 0 0 0 1.06-1.06l-7.029-7.03a.75.75 0 0 0-1.06 1.06z"></path></svg>
                <input type="text" placeholder="Search Your Restaurant" onChange={(e) => setDestination(e.target.value)} />
            </div>
        </div>
        <div className={styles.startDate}>
            <p>Check-in date</p>
            <div>
                <svg aria-hidden="true" fill="#838181" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 24 24"><path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path></svg>
                <input type="text" placeholder="Mon 30 Aug" onClick={handleInitDate} value={`${currentDay} ${currentDayNum} ${currentMonth}`} />
                <svg aria-hidden="true" fill="#838181" focusable="false" height="18" role="presentation" width="18" viewBox="0 0 24 24"><path d="M18 9.45c0 .2-.078.39-.22.53l-5 5a1.08 1.08 0 0 1-.78.32 1.1 1.1 0 0 1-.78-.32l-5-5a.75.75 0 0 1 0-1.06.74.74 0 0 1 1.06 0L12 13.64l4.72-4.72a.74.74 0 0 1 1.06 0 .73.73 0 0 1 .22.53zm-5.72 4.47zm-.57 0z"></path></svg>
            </div>
        </div>
        <div className={styles.endDate}>
            <p>Check-in time</p>
            <div>
                <svg aria-hidden="true" fill="#838181" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 24 24"><path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path></svg>
                <input type="time" style={{ width: '80%' }} />
                {/* <svg aria-hidden="true" fill="#838181" focusable="false" height="18" role="presentation" width="18" viewBox="0 0 24 24"><path d="M18 9.45c0 .2-.078.39-.22.53l-5 5a1.08 1.08 0 0 1-.78.32 1.1 1.1 0 0 1-.78-.32l-5-5a.75.75 0 0 1 0-1.06.74.74 0 0 1 1.06 0L12 13.64l4.72-4.72a.74.74 0 0 1 1.06 0 .73.73 0 0 1 .22.53zm-5.72 4.47zm-.57 0z"></path></svg> */}
            </div>
        </div>
        <div className={styles.stay}>
            <p>
                Number of persons
            </p>

            <div style={{alignItems: 'center'}}>
                <svg class="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-width="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                <input type="text" placeholder="2 adults" value={`${adults}`} onClick={handleAdult} />
                <svg height="16" fill="#838181" width="16" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M12 20.09a1.24 1.24 0 0 1-.88-.36L6 14.61a.75.75 0 1 1 1.06-1.06L12 18.49l4.94-4.94A.75.75 0 0 1 18 14.61l-5.12 5.12a1.24 1.24 0 0 1-.88.36zm6-9.46a.75.75 0 0 0 0-1.06l-5.12-5.11a1.24 1.24 0 0 0-1.754-.006l-.006.006L6 9.57a.75.75 0 0 0 0 1.06.74.74 0 0 0 1.06 0L12 5.7l4.94 4.93a.73.73 0 0 0 .53.22c.2 0 .39-.078.53-.22z"></path></svg>
            </div>
        </div>
        <div className={styles.button}>
            <button onClick={handleSearch}>Search</button>
        </div>
        <div className={styles.cal}>
            {
                intiDate &&


                <div className={styles.calenderItem}>
                    <Calendar
                        onChange={onInitChange}
                        value={initvalue}
                        className={styles.cal1}
                    />
                </div>
            }
            {
                endDate &&
                <div className={styles.calenderItem2}>
                    <Calendar
                        onChange={onEndChange}
                        value={endvalue}
                        className={styles.cal1}

                    />
                </div>
            }
        </div>
        {
            adult && <div className={styles.adultSelect} >
                <div>
                    <button onClick={() => handleAdults(-1)}>-</button>
                    <button onClick={() => handleAdults(1)} >+</button>
                </div>
            </div>
        }

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