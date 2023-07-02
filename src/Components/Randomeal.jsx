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

      <img
        className="img-thumbnail w-50 mx-auto d-block rounded-pill"
        src={item.strMealThumb + "/preview"}
        onError={(e) => {
          e.currentTarget.src = item.strMealThumb;
        }}
        alt=""
      />

      <h3 className="text-center">{item["strMeal"]}</h3>
      <h5 className="text-center">
        {item["strArea"]} Food | {item["strCategory"]}
      </h5>

      {item.strTags ? (
        <h6 className="text-center">Tags: {item.strTags}</h6>
      ) : (
        <h5 className="text-center">Tags: ???</h5>
      )}

      <div className="container">
        <ol className="list-group list-group-numbered">
          {Object.keys(item).map((items, index) => {
            return item["strIngredient" + index] ? (
              <li
                key={index}
                className="list-group-item list-group-item-action list-group-item-dark"
              >
                {item["strMeasure" + index]} {item["strIngredient" + index]}
                <img
                  className="img-fluid"
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

        {!item
          ? ""
          : Array(item).map((items, index) => {
              return (
                <h6 key={index} className="text-light p-2">
                  {items.strInstructions}
                </h6>
              );
            })}
      </div>
    </div>
  );
};

export default Randomeal;
