import PropTypes from 'prop-types';

function Search({ search, onHandleSearch }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={search}
        onChange={(e) => onHandleSearch(e)}
      />
    </div>
  );
}

/*
Add PropTypes for the search and onHandleSearch props in the Search component
The search prop should be a string and is required
The onHandleSearch prop should be a function and is required
*/
Search.propTypes = {
  search: PropTypes.string.isRequired,
  onHandleSearch: PropTypes.func.isRequired,
};

export default Search;
