import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

function AverageRating({ rating }) {
  /*
  Add PropTypes for the rating prop in the AverageRating component
  The rating prop should be an array of objects with a rating property that is a number and is required
  */
  AverageRating.propTypes = {
    rating: PropTypes.arrayOf(
      PropTypes.shape({
        rating: PropTypes.number.isRequired,
      })
    ),
  };

  // Calculate the average rating of the bite using reduce method
  const averageRating =
    rating && rating.length > 0
      ? rating.reduce((acc, curr) => acc + curr.rating, 0) / rating.length
      : 0;

  return (
    <StarRatings
      rating={averageRating}
      starDimension="13px"
      starRatedColor="yellow"
      isSelectable={false}
    />
  );
}
export default AverageRating;
