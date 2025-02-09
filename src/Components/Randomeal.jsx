import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";
import Ingredientlist from "./Ingredientlist";

const Randomeal = () => {
  let navigate = useNavigate();

  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const result = await response.json();
      setItem(result.meals[0]);
    };
    fetchData();
  }, []);

  return (
    <div className="container-fluid">
      <Nav />
      <div className="heading mt-2">
        <h1
          className="text-center text-uppercase fw-bold"
          style={{ color: "orange" }}
        >
          <span className="px-4 bg-warning text-dark rounded-pill">
            {" "}
            {item["strMeal"]}
          </span>
        </h1>
        <h4 className="text-center">
          <span
            className="btn btn-outline-success me-1 fs-5 fw-bold border-2"
            onClick={(e) => {
              navigate(`/area/${item.strArea}`);
            }}
          >
            {item["strArea"]} Cuisine
          </span>
          <span
            className="btn btn-outline-info text-center fs-5 fw-bold border-2"
            onClick={() => {
              navigate(`/fg/${item.strCategory}`);
            }}
          >
            {item["strCategory"]} Meals
          </span>
        </h4>
        {item.strTags ? (
          <h5 className="text-center text-primary fs-4">{item.strTags}</h5>
        ) : null}
      </div>
      <img
        className="img-thumbnail mx-auto d-block"
        // src={item.strMealThumb + "/preview"}
        src={item.strMealThumb}
        onError={(e) => {
          e.currentTarget.src = item.strMealThumb;
        }}
        alt=""
        title={item.strMeal}
      />
      <div className="container-fluid p-1">
        <div className="row m-1 d-flex justify-content-center">
          <div
            className="IngredientList col-md-auto p-1"
            style={{ border: "dashed", borderColor: "orange" }}
          >
            <Ingredientlist item={item} />
          </div>
          <div
            className="col pt-2"
            style={{ border: "dashed", borderColor: "orange" }}
          >
            {" "}
            <h4 className="text-black fw-bolder bg-warning text-center m-0">
              Instructions
            </h4>
            <pre className="text-warning bg-dark fst-italic p-2 fs-5">
              {item?.strInstructions}
            </pre>
          </div>
        </div>
        <div className="ratio ratio-16x9">
          <iframe
            className=""
            title={item.strMeal}
            src={`https://www.youtube.com/embed/${
              item?.strYoutube?.split("=")[1]
            }`}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Randomeal;
