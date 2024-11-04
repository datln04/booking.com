
import { Link } from "react-router-dom";
import styles from "./RestaurantDataComponent.module.css";

const RestaurantDataComponent = ({
  url,
  id,
  name,
  city,
  cuisineType,
  address,
  phoneNumber,
  email,
  rating,
  operatingHours,
  photos,
  priceRange,
  reviews,
  dietaryOptions,
  discountMessage
}) => {
  const lab = "See More >";
  return (
    <div className={styles.maindiv}>
      <div className={styles.imgdiv}>
        <img src={url} alt="imageofRestaurant" />
      </div>
      <div className={styles.datadiv}>
        <h3 className={styles.h3}>{name}</h3>

        <div>
          <p style={{ color: "#0071C2", textDecoration: "underline", cursor: "pointer" }}>
            {city}
          </p>
          <p>{address}</p>
          <p>{phoneNumber}</p>
          <p>{email}</p>
        </div>

        <h5 style={{ padding: "0", marginTop: "4px", marginBottom: "6px" }}>
          Cuisine: {cuisineType}
        </h5>
        <p style={{ padding: "0", margin: "0", fontSize: "13px" }}>
          Price Range: {priceRange}
        </p>

        <h5 style={{ color: "green", padding: "0", marginTop: "6px", marginBottom: "0" }}>
          Dietary Options: {dietaryOptions.join(", ")}
        </h5>

        <h5 style={{ color: "brown", padding: "0", marginTop: "2px" }}>
          Operating Hours: {operatingHours.join(", ")}
        </h5>

        <p style={{ color: "green", padding: "0", margin: "0", fontSize: "13px", marginTop: "6px" }}>
          {discountMessage}
        </p>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{ float: "right" }}>
          <div style={{ marginRight: "3px" }}>
            <h5 style={{ padding: "0", margin: "0", marginTop: "5px", fontSize: "16px", textAlign: "right" }}>
              {reviews} Reviews
            </h5>
          </div>
          <div style={{float: 'right'}}>
            <div style={{ backgroundColor: "#003580", color: "white", padding: "10px", fontWeight: "bold", borderRadius: "5px", width: 'fit-content' }}>
              {rating}
            </div>
          </div>
        </div>

        <div style={{ marginTop: "75px", textAlign: "right" }}>
          <p style={{ padding: "0", margin: "0", color: "gray", fontSize: "13px" }}>
            {operatingHours[0]} - {operatingHours[operatingHours.length - 1]}
          </p>
          <Link to={`/restaurant/${id}`}>
            <button style={{ backgroundColor: "#0071C2", color: "white", border: "none", borderRadius: "3px", padding: "15px", marginTop: "10px", cursor: "pointer" }}>
              {lab}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { RestaurantDataComponent };
