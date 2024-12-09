import { useEffect, useState } from 'react';
import styles from "./FilterFeature.module.css";
// import { attractions } from '../../../Utils/mock';

export const FilterFeature = ({
  filterData,
  filterLocation,
  filterRating,
  filterReviewCount,
  filterAdultPrice,
  filterChildPrice,
  filterDuration,
  filterHighlights
}) => {

  const [locationCounts, setLocationCounts] = useState({});
  const [ratingCounts, setRatingCounts] = useState({});
  const [reviewCountCounts, setReviewCountCounts] = useState({});
  const [adultPriceRange, setAdultPriceRange] = useState([0, 1000]);
  const [childPriceRange, setChildPriceRange] = useState([0, 500]);
  const [durationCounts, setDurationCounts] = useState({});
  const [highlightsCounts, setHighlightsCounts] = useState({});

  useEffect(() => {
    const countOccurrences = (key) => {
      return filterData?.reduce((acc, attraction) => {
        console.log(attraction);
        acc[attraction[key]] = (acc[attraction[key]] || 0) + 1;
        return acc;
      }, {});
    };

    setLocationCounts(countOccurrences('location'));
    setRatingCounts(countOccurrences('rating'));
    setReviewCountCounts(countOccurrences('reviews'));
    setDurationCounts(countOccurrences('duration'));
    setHighlightsCounts(countOccurrences('highlights'));
  }, []);

  const handleFilter = (filterFunction) => (e) => {
    filterFunction(e.target.value);
  };

  const handleRangeFilter = (filterFunction, setRange) => (e) => {
    const value = parseFloat(e.target.value);
    setRange(prevRange => {
      const newRange = [...prevRange];
      newRange[e.target.name === 'min' ? 0 : 1] = value;
      filterFunction(newRange);
      return newRange;
    });
  };

  const renderFilterOptions = (counts, filterFunction) => {
    return Object.entries(counts).map(([key, count]) => (
      <div key={key}>
        <div>
          <input type="radio" value={key} onChange={handleFilter(filterFunction)} name={filterFunction.name} />
          <p>{key}</p>
        </div>
        <p>{count}</p>
      </div>
    ));
  };

  return (
    <div className={styles.filterFeatureContainer}>
      <h2 className={styles.header}>Lọc theo:</h2>

      {/* <div className={styles.filterSection}>
        <h3>Địa điểm</h3>
        {renderFilterOptions(locationCounts, filterLocation)}
      </div> */}

      {/* <div className={styles.filterSection}>
        <h3>Đánh giá</h3>
        {renderFilterOptions(ratingCounts, filterRating)}
      </div> */}

      {/* <div className={styles.filterSection}>
        <h3>Số lượng đánh giá</h3>
        {renderFilterOptions(reviewCountCounts, filterReviewCount)}
      </div> */}

      <div className={styles.filterSection}>
        <h3>Giá người lớn</h3>
        <input
          type="range"
          name="min"
          min="0"
          max="1000"
          step="10"
          value={adultPriceRange[0]}
          onChange={handleRangeFilter(filterAdultPrice, setAdultPriceRange)}
        />
        <p>Khoảng giá được chọn: ${adultPriceRange[0]} - ${adultPriceRange[1]}</p>
      </div>

      <div className={styles.filterSection}>
        <h3>Giá trẻ em</h3>
        <input
          type="range"
          name="min"
          min="0"
          max="500"
          step="5"
          value={childPriceRange[0]}
          onChange={handleRangeFilter(filterChildPrice, setChildPriceRange)}
        />
        <p>Khoảng giá được chọn: ${childPriceRange[0]} - ${childPriceRange[1]}</p>
      </div>

      {/* <div className={styles.filterSection}>
        <h3>Thời gian</h3>
        {renderFilterOptions(durationCounts, filterDuration)}
      </div> */}

      {/* <div className={styles.filterSection}>
        <h3>Điểm nổi bật</h3>
        {renderFilterOptions(highlightsCounts, filterHighlights)}
      </div> */}
    </div>

  );
};