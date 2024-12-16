import React from "react";
import styles from "../SearchData/DataComponent.module.css";
import { Link } from "react-router-dom";

const DataComponent = ({
  id,
  hotelId,
  roomType,
  price,
  availabilityStatus,
  bedType,
  maxGuests,
  roomSize,
  amenities,
  isDeleted,
  checkInDate,
  checkOutDate,
  starRating,
  url,
  person
}) => {
  const lab = "Xem tình trạng phòng >";
  return (
    <div className={styles.maindiv}>
      <div className={styles.imgdiv}>
        <img src={url} alt="Hình ảnh khách sạn" />
      </div>
      <div className={styles.datadiv}>
        <h3 className={styles.h3}>{roomType}</h3>

        <div>
          <p
            style={{
              color: "#0071C2",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {availabilityStatus}
          </p>
          <p>{roomSize}</p>
        </div>
        <h5 style={{ padding: "0", marginTop: "4px", marginBottom: "6px" }}>
          {roomSize}
        </h5>
        <p style={{ padding: "0", margin: "0", fontSize: "13px" }}>{bedType}</p>
        <h5
          style={{
            color: "green",
            padding: "0",
            marginTop: "6px",
            marginBottom: "0",
          }}
        >
          {amenities}
        </h5>
        <p
          style={{
            padding: "0",
            margin: "0",
            fontSize: "13px",
            color: "green",
            marginTop: "6px",
          }}
        >
          Tối đa {maxGuests} khách
        </p>
        <h5 style={{ color: "brown", padding: "0", marginTop: "2px" }}>
          {availabilityStatus === "Available" ? "Phòng còn trống" : "Hết phòng"}
        </h5>
      </div>
      <div>
        <div style={{ display: "flex", float: "right" }}>
          <div style={{ marginRight: "3px" }}>
            <h5
              style={{
                padding: "0",
                margin: "0",
                marginTop: "5px",
                fontSize: "16px",
                textAlign: "right",
              }}
            >
              {starRating ? `${starRating} sao` : "Chưa có đánh giá"}
            </h5>
          </div>
        </div>

        <div style={{ marginTop: "75px", textAlign: "right" }}>
          <p
            style={{
              padding: "0",
              margin: "0",
              color: "gray",
              fontSize: "13px",
            }}
          >
            1 đêm, {maxGuests} người lớn
          </p>
          <p style={{ margin: "0", padding: "0" }}>
            <span
              style={{ fontSize: "22px", fontWeight: "600" }}
            >
              VND {price}
            </span>
          </p>
          <p
            style={{
              padding: "0",
              margin: "0",
              color: "gray",
              fontSize: "13px",
            }}
          >
            bao gồm thuế và phí
          </p>
          <Link to={`/search/${id}?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&person=${person}`}>
            <button
              style={{
                backgroundColor: "#0071C2",
                color: "white",
                border: "none",
                borderRadius: "3px",
                padding: "15px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              {lab}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { DataComponent };