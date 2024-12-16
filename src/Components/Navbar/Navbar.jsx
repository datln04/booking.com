import styles from "./Navbar.module.css"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Profile } from "./Profile";
import { colors } from "@material-ui/core";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import flag from '../../Assets/Images/vn_flag.png'
const Tabs = styled.li`
cursor: pointer;
padding-left: 8px;
padding-right: 12px;
text-align: center;
padding-bottom: 10px;
border-bottom:${props => (props.tab === props.t) ? "2px solid white;" : "none"};
font-weight:${props => (props.tab === props.t) ? "500" : "none"};
font-size:${props => (props.tab === props.t) ? "14px" : "13px"};
`
export const Navbar = () => {
    const [tab, setTabs] = useState(1);
    const [user, setUser] = useState(false);
    const location = useLocation();
    const isRegisterOrLogin = location.pathname.includes('register') || location.pathname.includes('login');


    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("login"));

        if (data) {
            setUser(true)
        }
        else {
            setUser(false)
        }
    }, [])


    useEffect(() => {
        switch (location.pathname) {
            case '/':
            case '/search':
            case location.pathname.match(/^\/search\/\d+$/)?.input:
                setTabs(1);
                break;
            case '/car':
            case '/searchCar':
            case location.pathname.match(/^\/car\/\d+$/)?.input:
                setTabs(4);
                break;
            case '/attraction':
            case '/searchAttraction':
            case location.pathname.match(/^\/attraction\/\d+$/)?.input:
                setTabs(5);
                break;
            case '/restaurant':
            case '/searchRestaurant':
            case location.pathname.match(/^\/restaurant\/\d+$/)?.input:
                setTabs(6);
                break;
            default:
                setTabs(1);
        }
    }, [location.pathname]);
    return <>
        <div className={styles.main} >
            <div className={styles.navbarContainer}>
                <div className={styles.navbarUpperSection}>
                    <div>
                        <Link to="/" style={{ fontSize: 30, textDecoration: 'none', color: 'white' }} >
                            <div>Bookify<span style={{ color: 'lightblue' }}>.com</span></div>
                        </Link>
                    </div>
                    <div className={styles.navbarUpperSectionItems}>
                        <ul>
                            <li className={styles.inr}>
                                VND
                            </li>
                            <li className={styles.indianFlag}>
                                <img src={flag} alt="india's-flag" />
                            </li>
                            {/* <li>
                                <svg className={styles.questionIcon} height="24" width="24" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M9.75 9a2.25 2.25 0 1 1 3 2.122 2.25 2.25 0 0 0-1.5 2.122v1.006a.75.75 0 0 0 1.5 0v-1.006c0-.318.2-.602.5-.708A3.75 3.75 0 1 0 8.25 9a.75.75 0 1 0 1.5 0zM12 16.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zM22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12z"></path></svg>
                            </li> */}
                            {
                                user && <li className={styles.propertyList}>
                                    <button onClick={() => window.location.href = '/booking-history'}>Booking History</button>
                                </li>
                            }
                            {
                                !user && <li className={styles.signButton}>
                                    <Link to="/register">
                                        <button>Đăng ký</button>
                                    </Link>
                                </li>}
                            {
                                !user && <li className={styles.signButton}>
                                    <Link to="/login">
                                        <button>Đăng nhập</button>
                                    </Link>

                                </li>
                            }
                            {
                                user && <Profile />
                            }

                        </ul>

                    </div>
                </div>
                {
                    !isRegisterOrLogin && <div className={styles.navbarLowerSection}>
                        <ul>
                            <Tabs onClick={() => setTabs(1)} t={1} tab={tab}>
                                <Link to="/" className={styles.Link}>
                                    <svg className={styles.svgIcons} height="20" width="20" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path></svg>

                                    <p className={styles.text} >
                                        Nhà Nghỉ
                                    </p>
                                </Link>


                            </Tabs>
                            <Tabs onClick={() => setTabs(4)} t={4} tab={tab}>
                                <Link to="/car" className={styles.Link}>
                                    <svg className={styles.svgIcons} height="20" width="20" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M21.684 9.443l-1.7-3.79c-.42-1.128-1.542-1.905-2.794-1.903H6.809a2.999 2.999 0 0 0-2.811 1.947L2.316 9.443a.75.75 0 1 0 1.368.614l1.7-3.79c.238-.63.798-1.018 1.424-1.017h10.383a1.5 1.5 0 0 1 1.407.973l1.718 3.834a.75.75 0 1 0 1.368-.614zM.75 16.468V18a2.25 2.25 0 0 0 4.5 0v-1.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 1-1.5 0v-1.532a.75.75 0 0 0-1.5 0zm21 0V18a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 0-1.5 0V18a2.25 2.25 0 0 0 4.5 0v-1.532a.75.75 0 0 0-1.5 0zM19.875 13.5a.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5zm.375-.375a.375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5c-.621 0-1.125.504-1.125 1.125a.75.75 0 0 0 1.5 0zm-.375-.375c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5zm-.375.375c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0zM4.125 12C3.504 12 3 12.504 3 13.125a.75.75 0 0 0 1.5 0 .375.375 0 0 1-.375.375.75.75 0 0 0 0-1.5zm1.125 1.125c0-.621-.504-1.125-1.125-1.125a.75.75 0 0 0 0 1.5.375.375 0 0 1-.375-.375.75.75 0 0 0 1.5 0zM4.125 14.25c.621 0 1.125-.504 1.125-1.125a.75.75 0 0 0-1.5 0c0-.207.168-.375.375-.375a.75.75 0 0 0 0 1.5zM3 13.125c0 .621.504 1.125 1.125 1.125a.75.75 0 0 0 0-1.5c.207 0 .375.168.375.375a.75.75 0 0 0-1.5 0zM2.75 10.5h18.5c.69 0 1.25.56 1.25 1.25v3.75a.25.25 0 0 1-.25.25H1.75a.25.25 0 0 1-.25-.25v-3.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 11.75v3.75c0 .966.784 1.75 1.75 1.75h20.5A1.75 1.75 0 0 0 24 15.5v-3.75A2.75 2.75 0 0 0 21.25 9H2.75z"></path></svg>
                                    <p className={styles.text}>
                                        Thuê xe
                                    </p>
                                </Link>
                            </Tabs>
                            <Tabs onClick={() => setTabs(5)} t={5} tab={tab}>
                                <Link to="/attraction" className={styles.Link}>
                                    <svg className={styles.svgIcons} height="20" width="20" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="M13.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM15 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM21 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm-9-3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm10.066 1.277a7.5 7.5 0 0 1-3.077 2.05.75.75 0 0 0 .498 1.415 9 9 0 0 0 3.693-2.46.75.75 0 1 0-1.114-1.005zm1.798-6.466c.177.922.183 1.869.015 2.792a.75.75 0 1 0 1.476.268c.2-1.106.194-2.24-.019-3.344a.75.75 0 1 0-1.472.284zm-5.337-5.784a7.5 7.5 0 0 1 3.54 2.196.75.75 0 0 0 1.113-1.004 9.002 9.002 0 0 0-4.247-2.636.75.75 0 1 0-.406 1.444zM6.434 6.223a7.5 7.5 0 0 1 3.539-2.196.75.75 0 1 0-.406-1.444A9.001 9.001 0 0 0 5.32 5.219a.75.75 0 0 0 1.114 1.004zM4.636 12.69a7.602 7.602 0 0 1 0-2.878.75.75 0 1 0-1.472-.284 9.102 9.102 0 0 0 0 3.446.75.75 0 0 0 1.472-.284zm4.876 5.639a7.517 7.517 0 0 1-3.035-2.005.75.75 0 0 0-1.106 1.014 9.017 9.017 0 0 0 3.641 2.405.75.75 0 1 0 .5-1.414zM7.31 21.872A1.5 1.5 0 0 0 8.672 24h6.656a1.5 1.5 0 0 0 1.362-2.128l-3.314-8.217c-.361-.785-1.252-1.114-2.005-.767a1.5 1.5 0 0 0-.733.734l-3.343 8.283zm1.377.595l3.328-8.25-.015.033 3.313 8.217.015.033H8.672z"></path></svg>
                                    <p className={styles.text}>
                                        Du lịch
                                    </p>
                                </Link>
                            </Tabs>
                            <Tabs onClick={() => setTabs(6)} t={6} tab={tab}>
                                <Link to="/restaurant" className={styles.Link}>
                                    <svg className={styles.svgIcons} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" id="restaurant">
                                        <path fill="none" d="M0 0h24v24H0V0z"></path>
                                        <path d="M16 6v6c0 1.1.9 2 2 2h1v7c0 .55.45 1 1 1s1-.45 1-1V3.13c0-.65-.61-1.13-1.24-.98C17.6 2.68 16 4.51 16 6zm-5 3H9V3c0-.55-.45-1-1-1s-1 .45-1 1v6H5V3c0-.55-.45-1-1-1s-1 .45-1 1v6c0 2.21 1.79 4 4 4v8c0 .55.45 1 1 1s1-.45 1-1v-8c2.21 0 4-1.79 4-4V3c0-.55-.45-1-1-1s-1 .45-1 1v6z"></path>
                                    </svg>

                                    <span className={styles.text}>
                                        Nhà hàng
                                    </span>
                                </Link>
                            </Tabs>
                        </ul>
                    </div>
                }
            </div>
        </div>
    </>
}