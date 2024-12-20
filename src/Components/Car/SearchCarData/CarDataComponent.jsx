import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faGasPump, faCogs, faChair, faDollarSign, faMapMarkerAlt, faTachometerAlt, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import styles from "./CarDataComponent.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

export const CarDataComponent = ({
  id,
  make,
  model,
  year,
  color,
  fuelType,
  transmission,
  seatingCapacity,
  rentalPricePerDay,
  availabilityStatus,
  mileage,
  location,
  licensePlate,
  features,
  isBooking,
  url
}) => {
  const lab = "Chi tiết >";
  const locations = useLocation(); // Get the location object
  const queryParams = new URLSearchParams(locations.search);
  const checkInDate = queryParams.get('checkInDate');
  const checkOutDate = queryParams.get('checkOutDate');
  const provinceId = queryParams.get('provinceId');
  return (
    <div className={styles.maindiv}>
      <div className={styles.imgdiv}>
        <img src={url} alt={`${make} ${model}`} />
      </div>
      <div className={styles.datadiv}>
        <h3 className={styles.h3}>{`${make} ${model} (${year})`}</h3>

        <div className={styles.carDetailsContainer}>
          <div className={styles.carDetailItem}><FontAwesomeIcon icon={faCar} /> {`Color: ${color}`}</div>
          <div className={styles.carDetailItem}><FontAwesomeIcon icon={faGasPump} /> {`Fuel Type: ${fuelType}`}</div>
          <div className={styles.carDetailItem}><FontAwesomeIcon icon={faCogs} /> {`Transmission: ${transmission}`}</div>
          <div className={styles.carDetailItem}><FontAwesomeIcon icon={faChair} /> {`Seating Capacity: ${seatingCapacity}`}</div>
          <div className={styles.carDetailItem}><FontAwesomeIcon icon={faDollarSign} /> {`Rental Price Per Day: $${rentalPricePerDay}`}</div>
          <div className={styles.carDetailItem}><FontAwesomeIcon icon={faTachometerAlt} /> {`Mileage: ${mileage} miles`}</div>
          <div className={styles.carDetailItem}><FontAwesomeIcon icon={faMapMarkerAlt} /> {`Location: ${location}`}</div>
          <div className={styles.carDetailItem}><FontAwesomeIcon icon={faIdBadge} /> {`License Plate: ${licensePlate}`}</div>
        </div>

        <h5 style={{ color: "green", padding: "0", marginTop: "6px", marginBottom: "0" }}>
          Tính năng: {
            features.map((feature, index) => (
              <span key={index} style={{ color: "black" }}>{feature.feature.featureName}, </span>
            ))
          }
        </h5>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <p><FontAwesomeIcon icon={faDollarSign} /> {`Giá thuê 1 ngày: `}<p>{`VND${rentalPricePerDay}`}</p></p>
          {!isBooking && <Link to={`/car/${id}?provinceId=${provinceId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`}>
            <button style={{ backgroundColor: "#0071C2", color: "white", border: "none", borderRadius: "3px", padding: "15px", marginTop: "10px", cursor: "pointer" }}>
              {lab}
            </button>
          </Link>
          }
        </div>
      </div>
    </div>
  );
};