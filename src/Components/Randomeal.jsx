import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";
import Ingredientlist from "./Ingredientlist";

let response = getData(`https://www.themealdb.com/api/json/v1/1/random.php`);

async function getData(url) {
  let res = await fetch(url);
  let data = res.json();
  return data;
}

const Randomeal = () => {
  let navigate = useNavigate();

  const [item, setItem] = useState(response);
  response.then((res) => {
    //  console.log(res.meals[0]);

    setItem(res.meals[0]);
  });
  return (
    <div className="container-fluid">
      <Nav />
      <div className="heading mt-2">
        <h1
          className="text-center text-uppercase fw-bold"
          style={{ color: "orange" }}
        >
          <span className="px-4 bg-warning text-dark rounded-pill"> {item["strMeal"]}</span>
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
      <div className="container-fluid p-1 ">
        <div className="row m-1 d-flex justify-content-center">
          <div
            className="col-auto py-2 me-2"
            style={{ border: "dashed", borderColor: "orange" }}
          >
            <Ingredientlist item={item} />
          </div>
          <div
            className="col pt-2"
            style={{ border: "dashed", borderColor: "orange" }}
          >
            <pre className="text-warning bg-dark fst-italic p-2 fs-5">{item?.strInstructions}</pre>
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
