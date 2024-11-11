import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faGasPump, faCogs, faChair, faDollarSign, faMapMarkerAlt, faTachometerAlt, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import styles from "./CarDataComponent.module.css";

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
  isBooking
}) => {
  const lab = "See More >";
  return (
    <div className={styles.maindiv}>
      <div className={styles.imgdiv}>
        <img src={`/images/cars/${id}.jpg`} alt={`${make} ${model}`} />
      </div>
      <div className={styles.datadiv}>
        <h3 className={styles.h3}>{`${make} ${model} (${year})`}</h3>

        <div>
          <p><FontAwesomeIcon icon={faCar} /> {`Color: ${color}`}</p>
          <p><FontAwesomeIcon icon={faGasPump} /> {`Fuel Type: ${fuelType}`}</p>
          <p><FontAwesomeIcon icon={faCogs} /> {`Transmission: ${transmission}`}</p>
          <p><FontAwesomeIcon icon={faChair} /> {`Seating Capacity: ${seatingCapacity}`}</p>
          <p><FontAwesomeIcon icon={faDollarSign} /> {`Rental Price Per Day: $${rentalPricePerDay}`}</p>
          <p><FontAwesomeIcon icon={faTachometerAlt} /> {`Mileage: ${mileage} miles`}</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {`Location: ${location}`}</p>
          <p><FontAwesomeIcon icon={faIdBadge} /> {`License Plate: ${licensePlate}`}</p>
        </div>

        <h5 style={{ color: "green", padding: "0", marginTop: "6px", marginBottom: "0" }}>
          Features: {features.join(", ")}
        </h5>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <p><FontAwesomeIcon icon={faDollarSign} /> {`Rental Price Per Day: `}<p>{`$${rentalPricePerDay}`}</p></p>
          {!isBooking && <Link to={`/car/${id}`}>
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