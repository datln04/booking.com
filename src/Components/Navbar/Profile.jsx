import { useEffect, useState } from "react"
import styles from "./Profile.module.css"


export const Profile = () => {
    const [user, setUser] = useState(null);
    const [logout, setLogout] = useState(false)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("login"))
        if (data) {
            setUser(data)
        }
        else {
            setUser({
                imageUrl: "#",
                name: ""
            })
        }
    }, [])
    const handleLogout = () => {
        localStorage.removeItem("login")
        document.location.href = "/"
        alert("Successfully Logged Out")
        // document.location.href = "https://booking-webapp-clone.herokuapp.com/"

    }
    console.log(user);

    return <div>
        {
            user && <div className={styles.profile} onClick={() => setLogout(!logout)}>
                <img src={user?.user?.image} alt="profile" />
                <div>{user?.user?.fullName}</div>
            </div>
        }
        {

            logout && <div className={styles.logout} onClick={() => handleLogout()} >
                <div>Logout</div>
            </div>
        }
    </div>
}