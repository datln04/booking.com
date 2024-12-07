import React from "react";
import styles from "../SearchData/DataComponent.module.css";
import { Link } from "react-router-dom";

const DataComponent = ({
  url,
  id,
  view,
  price,
  name,
  city,
  distance,
  bedSize,
  roomSize,
  cancelationPolicy,
  cancellation,
  reviews,
  rating,
  breakFast,
  availability,
  availableRooms,
  discountedPrice,
}) => {
  const lab = "Xem tình trạng phòng >";
  return (
    <div className={styles.maindiv}>
      <div className={styles.imgdiv}>
        <img src={url} alt="Hình ảnh khách sạn" />
      </div>
      <div className={styles.datadiv}>
        <h3 className={styles.h3}>{name}</h3>

        <div>
          <p
            style={{
              color: "#0071C2",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {city}
          </p>
          <p
            style={{
              color: "#0071C2",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            {/* Hiển thị trên bản đồ */}
          </p>
          <p>{distance} km từ trung tâm</p>
        </div>
        <h5 style={{ padding: "0", marginTop: "4px", marginBottom: "6px" }}>
          {roomSize}
        </h5>
        <p style={{ padding: "0", margin: "0", fontSize: "13px" }}>{bedSize}</p>
        <h5
          style={{
            color: "green",
            padding: "0",
            marginTop: "6px",
            marginBottom: "0",
          }}
        >
          Bữa sáng {breakFast}
        </h5>
        <h5
          style={{
            color: "green",
            padding: "0",
            marginTop: "3px",
            marginBottom: "0",
          }}
        >
          {cancellation} hủy miễn phí • {cancelationPolicy}
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
          Bạn có thể hủy sau, hãy đặt mức giá tốt này ngay hôm nay!
        </p>
        <h5 style={{ color: "brown", padding: "0", marginTop: "2px" }}>
          Chỉ còn {availableRooms} phòng với mức giá này trên trang web của chúng tôi
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
              {view}
            </h5>
            <p
              style={{
                padding: "0",
                margin: "0",
                color: "gray",
                fontSize: "13px",
              }}
            >
              {reviews} Đánh giá
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#003580",
              color: "white",
              padding: "10px",
              marginLeft: "5px",
              fontWeight: "bold",
              borderRadius: "5px 5px 5px 5px",
            }}
          >
            {rating}
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
            1 đêm, 2 người lớn
          </p>
          <p style={{ margin: "0", padding: "0" }}>
            <span
              style={{
                color: "red",
                textDecoration: "line-through",
                fontSize: "14px",
              }}
            >
              ₹ {price}
            </span>
            <span
              style={{ fontSize: "22px", fontWeight: "600" }}
            >
              {" "}
              ₹ {discountedPrice}
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
          <Link to={`/search/${id}`}>
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
