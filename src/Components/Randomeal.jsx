import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import Nav from "./Nav";

let response = getData(`https://www.themealdb.com/api/json/v1/1/random.php`);
let ingredientURL = "https://www.themealdb.com/images/ingredients/";

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
      <div className="heading">
        <h1
          className="text-center text-uppercase fw-bold"
          style={{ color: "orange" }}
        >
          <span className="px-2"> {item["strMeal"]}</span>
        </h1>
        <h4 className="text-center">
          <span
            className="btn btn-outline-success me-1 fs-5 fw-bold"
            onClick={(e) => {
              navigate(`/area/${item.strArea}`);
            }}
          >
            {item["strArea"]} Cuisine
          </span>
          <span
            className="btn btn-outline-info text-center fs-5 fw-bold"
            onClick={() => {
              navigate(`/fg/${item.strCategory}`);
            }}
          >
            {item["strCategory"]} Meals
          </span>
        </h4>
        {item.strTags ? (
          <h4 className="text-center">
            <span className="p-1" style={{ color: "darkseagreen" }}>
              {item.strTags.replaceAll(",", " ")}
            </span>
          </h4>
        ) : (
          ""
        )}
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
        <div className="row m-1">
          <div
            className="col-auto py-2 me-2"
            style={{ border: "dashed", borderColor: "orange" }}
          >
            <ol className="list-group list-group-numbered fs-5">
              {Object.keys(item).map((items, index) => {
                return item["strIngredient" + index] ? (
                  <li
                    id={item["strIngredient" + index]}
                    key={index}
                    onClick={(ef) => {
                      navigate(`/ingredientsfilter/${ef.target.id}`);
                    }}
                    className="point list-group-item list-group-item-action bg-black text-light border-dark border border-1"
                  >
                    <span>{item["strMeasure" + index]}</span>
                    <img
                      className="img-fluid"
                      style={{ width: "25px" }}
                      src={
                        ingredientURL +
                        item["strIngredient" + index] +
                        "-Small.png"
                      }
                      alt=""
                      title={item["strIngredient" + index]}
                    />
                    <span>{item["strIngredient" + index]}</span>
                  </li>
                ) : (
                  null
                );
              })}
            </ol>
          </div>
          <div
            className="col pt-2"
            style={{ border: "dashed", borderColor: "orange" }}
          >
            <pre className="text-light p-2 fs-5">{item?.strInstructions}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Randomeal;
