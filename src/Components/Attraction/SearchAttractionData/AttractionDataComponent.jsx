import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar, faClock, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import styles from "./AttractionDataComponent.module.css";

export const AttractionDataComponent = ({
  id,
  title,
  location,
  rating,
  reviews,
  priceAdult,
  priceChild,
  duration,
  availabilityStatus,
  image,
  description,
  isBooking
}) => {
  const lab = "Chi tiết >";
  return (
    <div className={styles.maindiv}>
      <div className={styles.imgdiv}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.datadiv}>
        <h3 className={styles.h3}>{title}</h3>

        <div>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>{`Location: ${location}`}</strong></p>
          <p><FontAwesomeIcon icon={faClock} /> {`Duration: ${duration}`}</p>
        </div>

        <h5 style={{ color: "green", padding: "0", marginTop: "6px", marginBottom: "0" }}>
          Trạng thái: {availabilityStatus}
        </h5>
        <p>{description}</p>
        <div style={{ marginTop: "10px" }}>
          <p style={{ color: "orange", fontSize: "1.5em" }}><FontAwesomeIcon icon={faStar} /> {`Đánh giá: ${rating} (${reviews} nhận xét)`}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
        <div style={{ marginTop: "10px", textAlign: "right" }}>
          <p><FontAwesomeIcon icon={faDollarSign} /> Giá:<p>{`Người lớn $`}<b>{priceAdult}</b></p> Trẻ em {`$`}<b>{priceChild}</b></p>
          {!isBooking && <Link to={`/attraction/${id}`}>
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