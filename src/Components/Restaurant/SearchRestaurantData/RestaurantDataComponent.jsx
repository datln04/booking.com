
import { Link } from "react-router-dom";
import styles from "./RestaurantDataComponent.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

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
  const location = useLocation(); // Get the location object
    const queryParams = new URLSearchParams(location.search);

    // Extract parameters
    const checkInDate = queryParams.get('checkInDate');
    const tableSize = queryParams.get('tableSize');
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
         Ẩm thực: {cuisineType?.cuisineName}
        </h5>
        <p style={{ padding: "0", margin: "0", fontSize: "13px" }}>
          {priceRange}
        </p>

        <h5 style={{ color: "green", padding: "0", marginTop: "6px", marginBottom: "0" }}>
          Chế độ ăn uống: {dietaryOptions?.map((option) => option?.dietaryOption?.optionName + ", ")}
        </h5>

        <h5 style={{ color: "brown", padding: "0", marginTop: "2px" }}>
         Giờ mở cửa: {operatingHours}
        </h5>

        <p style={{ color: "green", padding: "0", margin: "0", fontSize: "13px", marginTop: "6px" }}>
          {discountMessage}
        </p>
      </div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{ float: "right" }}>
          <div style={{ marginRight: "3px" }}>
            <h5 style={{ padding: "0", margin: "0", marginTop: "5px", fontSize: "16px", textAlign: "right" }}>
              {reviews || 0} Bình luận
            </h5>
          </div>
          <div style={{float: 'right'}}>
            <div style={{ backgroundColor: "#003580", color: "white", padding: "10px", fontWeight: "bold", borderRadius: "5px", width: 'fit-content' }}>
              {rating} Đánh giá
            </div>
          </div>
        </div>

        <div style={{ marginTop: "75px", textAlign: "right" }}>
          <p style={{ padding: "0", margin: "0", color: "gray", fontSize: "13px" }}>
            {operatingHours}
          </p>
          <Link to={`/restaurant/${id}?checkInDate=${checkInDate}&tableSize=${tableSize}`}>
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
