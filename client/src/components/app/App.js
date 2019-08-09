import React, { useState, useEffect } from "react";
import "./App.scss";
import { IoIosBeer } from "react-icons/io";
import SearchForm from "../search/Search";
import Results from "../results/Results";

function App() {
  const [apiResponse, setAPIResponse] = useState("");
  const [favoritesInStorage, setFavoritesInStorage] = useState(
    JSON.parse(localStorage.getItem("myFavorites"))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavs, setShowFavs] = useState(false);

  useEffect(() => {
    localStorage.setItem("myFavorites", JSON.stringify(favoritesInStorage));
  }, [favoritesInStorage]);

  const handleShowFavs = () => {
    setShowFavs(prevState => !prevState);
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1>
          <a href="/">
            <IoIosBeer /> S.O.S.
          </a>
        </h1>
        <h2>(Search Our Suds)</h2>
        <button onClick={handleShowFavs}>
          {showFavs ? "Results" : "Favorites"}
        </button>
      </div>
      {showFavs && favoritesInStorage ? (
        <div>
          <h3>Favorites</h3>
          <Results
            data={favoritesInStorage}
            setFavoritesInStorage={setFavoritesInStorage}
            favoritesInStorage={favoritesInStorage}
          />
        </div>
      ) : (
        <div>
          <SearchForm
            setAPIResponse={setAPIResponse}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {apiResponse && <div>Displaying results for "{searchQuery}"</div>}
          <Results
            data={apiResponse.body}
            setFavoritesInStorage={setFavoritesInStorage}
            favoritesInStorage={favoritesInStorage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
