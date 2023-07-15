import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Nav from "./Nav";
import Cmbarealist from "./Cmbarealist";
import Loader from "../Components/Loader";

const AreaFilter = () => {
  let navigate = useNavigate();
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
        <div className="heading">
        <h1 className="text-center">CUISINES</h1>
        </div>
        <div>
        <h1 className="text-center p-3 mb-2 bg-dark text-light">
          <Cmbarealist /> {areaName} Cuisine
        </h1>


        </div>


        <div className="row row-cols-3 g-3 justify-content-md-center">
          {items.map((item) => {
            return (
              <div className="col col-md-2"  key={item.idMeal}>
                <div
                  className="card text-dark bg-white"
                  style={{ color: "white", cursor: "pointer"}}
                 
                  onClick={() => {
                    navigate(`/recipeinfo/${item.idMeal}`);
                  }}
                >
                  <img
                    className="card-img "
                    src={item.strMealThumb + "/preview"}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = item.strMealThumb;
                    }}
                    alt={item.strMeal}
                  />

                  <div className="card-img-overlay px-0">
                    <h4 className="card-title">{item.strMeal}</h4>

                    <div />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default AreaFilter;
