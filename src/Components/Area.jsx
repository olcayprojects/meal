import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Nav from "./Nav";
import Cmbarealist from "./Cmbarealist";
import Loader from "../Components/Loader";
import Meallist from "./Meallist";

const AreaFilter = () => {
  const { areaName = "Turkish" } = useParams();

  let url = `https://themealdb.com/api/json/v1/1/filter.php?a=${areaName}`;

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.meals);
          // console.log(items);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <div className="container-fluid">
        <Nav />
        <div className="my-2 text-center mt-3">
          <div className="d-flex justify-content-center">
            <Cmbarealist />
          </div>
          <span className="text-red-300">
            
            {areaName} Cuisine
          </span>
        </div>

        <Meallist item={items} />
      </div>
    );
  }
};

export default AreaFilter;
