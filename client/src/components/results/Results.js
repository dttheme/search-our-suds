import React from "react";
import Card from "../card/Card";

const Results = ({ data, setFavoritesInStorage, favoritesInStorage }) => {
  return data ? (
    <div className="results__cards">
      {data.map(card => {
        return (
          <Card
            key={card.id}
            data={card}
            setFavoritesInStorage={setFavoritesInStorage}
            favoritesInStorage={favoritesInStorage}
          />
        );
      })}
    </div>
  ) : null;
};

export default Results;
