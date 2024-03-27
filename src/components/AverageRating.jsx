import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

function AverageRating({ userFeedback = [] }) {
  /*
   * The AverageRating component receives the userFeedback prop from the parent component.
   * It calculates the average rating of the bite using the reduce method.
   * The average rating is then displayed using the StarRatings component.
   */

  /*
   * Define the prop types for the AverageRating component
   * The userFeedback prop is an array of objects with the following shape:
   * { name: string, rating: number, comment: string }
   */
  AverageRating.propTypes = {
    userFeedback: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        rating: PropTypes.number,
        comment: PropTypes.string,
      })
    ),
  };

  // Calculate the average rating of the bite using reduce method
  const averageRating =
    userFeedback.length > 0
      ? userFeedback.reduce((acc, curr) => acc + curr.rating, 0) /
        userFeedback.length
      : 0;

  return (
    <StarRatings
      rating={averageRating}
      starDimension="18px"
      starRatedColor="orange"
      isSelectable={false}
    />
  );
}
export default AverageRating;
