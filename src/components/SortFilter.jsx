import PropTypes from "prop-types";

function SortFilter({ bites, sort, onSortChange }) {

    /*
  Add the prop types for the SortFilter component. The component should receive the following props:
  - bites: an array of objects representing the bites.
  - sort: a string representing the selected category.
  - onSortChange: a function that will be called when the selected category changes.
  */
  SortFilter.propTypes = {
    bites: PropTypes.array.isRequired,
    sort: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
  };


  return (
    <div>
      <select value={sort} onChange={onSortChange} className="sort-filter">
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="Alphabetically">Alphabetically</option>
        <option value="Shortest Preparation Time">Shortest Preparation Time</option>
        <option value="Longest Preparation Time">Longest Preparation Time</option>
      </select>
    </div>
  )
}

export default SortFilter