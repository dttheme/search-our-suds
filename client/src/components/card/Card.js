import React, { useState, useEffect } from "react";
import { IoIosHeart } from "react-icons/io";
import "./Card.scss";

const Card = ({ data, setFavoritesInStorage, favoritesInStorage }) => {
  const [favoriteBool, setFavoriteBool] = useState(false);
  const {
    // id,
    brewery_type,
    name,
    phone,
    street,
    city,
    state,
    postal_code,
    country,
    website_url
  } = data;

  // When the component mounts, check card id against ids held in localStorage
  // Set favoriteBool to true if it exists in storage
  useEffect(() => {
    favoritesInStorage &&
      favoritesInStorage.forEach(localStorageData => {
        if (data.id === localStorageData.id) {
          setFavoriteBool(true);
        }
        return null;
      });
  }, []);

  // When favoriteBool state changes, check if there any favorites in localStorage
  // If there are none, add the data of the current card
  // If it's been set to true, add it to localStorage
  // If the favoriteBool as been set to false, remove it from localStorage
  useEffect(() => {
    if (!favoritesInStorage) {
      setFavoritesInStorage([data]);
    }
    if (favoriteBool === true) {
      setFavoritesInStorage(prevState => {
        return [...prevState, data];
      });
    }
    if (favoriteBool === false) {
      setFavoritesInStorage(prevFav => prevFav.filter(item => item !== data));
    }
  }, [favoriteBool]);

  const handleFavorite = () => {
    setFavoriteBool(prevState => !prevState);
  };

  return (
    <div className={`card cardFavorite${favoriteBool}`}>
      <div className="card__header">
        <div className={`type ${brewery_type}`}>{brewery_type}</div>
        <button
          onClick={handleFavorite}
          className={`card__favorite buttonFavorite${favoriteBool}`}
        >
          <IoIosHeart className={`heart heartFavorite${favoriteBool}`} />
        </button>
      </div>
      <div className="card__copy">
        <h3>
          <a href={website_url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h3>
        <address>
          {street}
          <br />
          {city}, {state} {postal_code}
          <br />
          {country}
        </address>
        {phone ? <a href={`tel://1-${phone}`}>{phone}</a> : null}
      </div>
    </div>
  );
};

export default Card;
