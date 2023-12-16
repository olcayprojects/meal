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
        <div className="my-2 text-center">
          <div className="d-flex justify-content-center">
            <Cmbarealist />
          </div>
          <span
            className="fs-1 bg-dark p-1 border border-secondary border-3"
            style={{ color: "orange" }}
          >
            {areaName} Cuisine
          </span>
        </div>

        <div className="row row-cols-6 g-1 justify-content-md-center">
          {items.map((item) => {
            return (
              <div className="col " key={item.idMeal}>
                <div
                  className="imgeffect card text-dark bg-white"
                  style={{ color: "white", cursor: "pointer" }}
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
                    <h4 className="card-title text-white">{item.strMeal}</h4>

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
