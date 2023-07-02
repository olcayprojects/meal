import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import Nav from "./Nav";
import MyCarousel from "./Carousel";

let response = getData(`https://www.themealdb.com/api/json/v1/1/random.php`);
let ingredientURL = "https://www.themealdb.com/images/ingredients/";

async function getData(url) {
  let res = await fetch(url);
  let data = res.json();
  return data;
}

const Randomeal = () => {
  const [item, setItem] = useState(response);
  response.then((res) => {
    //  console.log(res.meals[0]);

    setItem(res.meals[0]);
  });
  return (
    <div className="container-fluid">
      <Nav />
      <div className="heading">
        <MyCarousel />
        <h1 className="text-center">RANDOM MEAL</h1>
      </div>

      <h1 className="text-center">{item["strMeal"]}</h1>
      <h4 className="text-center">
        {item["strArea"]} Food | {item["strCategory"]}
      </h4>

      {item.strTags ? (
        <h5 className="text-center">Tags: {item.strTags}</h5>
      ) : (
        <h5 className="text-center">Tags: ???</h5>
      )}

      <img
        className="w-50 mx-auto d-block"
        src={item.strMealThumb + "/preview"}
        onError={(e) => {
          e.currentTarget.src = item.strMealThumb;
        }}
        alt=""
      />

      <h2 className="text-center">Measure Ingredient</h2>
      <ol className="list-group list-group-numbered">
        {Object.keys(item).map((items, index) => {
          return item["strIngredient" + index] ? (
            <li
              key={index}
              className="list-group-item list-group-item-action list-group-item-dark"
            >
              {item["strMeasure" + index]} {item["strIngredient" + index]}
              <img
                className="img"
                src={
                  ingredientURL + item["strIngredient" + index] + "-Small.png"
                }
                alt=""
                title={item["strIngredient" + index]}
              />
            </li>
          ) : (
            ""
          );
        })}
      </ol>

      <h2>Instructions</h2>
      {!item
        ? ""
        : Array(item).map((items, index) => {
            return (
              <h5 key={index} className="text-light">
                {items.strInstructions}
              </h5>
            );
          })}
    </div>
  );
};

export default Randomeal;
