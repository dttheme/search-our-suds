import React from "react";
import "./Search.scss";
import { IoIosSearch } from "react-icons/io";

const SearchForm = ({ setAPIResponse, searchQuery, setSearchQuery }) => {
  const callBreweryAPI = async searchQuery => {
    try {
      const response = await fetch(
        `http://localhost:9000/breweries?query=${searchQuery}`
      );
      if (response.status !== 200) {
        throw Error(response.message);
      }
      const body = await response.json();
      setAPIResponse({ body });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = e => {
    e.preventDefault();

    callBreweryAPI(searchQuery);
  };

  return (
    <form className="search">
      <input
        type="text"
        name="query"
        value={searchQuery}
        onChange={handleChange}
        className="search__input"
        autoComplete="off"
      />
      <button className="search__button" onClick={handleSearch}>
        <IoIosSearch />
      </button>
    </form>
  );
};

export default SearchForm;
