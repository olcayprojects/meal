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
          className="text-center text-uppercase"
          style={{ color: "orange", fontWeight: "bold" }}
        >
          <span className="px-2" style={{}}> {item["strMeal"]}</span>
        </h1>
        <h4
          className="text-center point"
          style={{ color: "darkseagreen" }}
          onClick={(e) => {
            navigate(`/area/${item.strArea}`);
          }}
        >
          {item["strArea"]} Food
        </h4>
        <h4
          style={{ color: "greenyellow" }}
          className="text-center point"
          onClick={() => {
            navigate(`/fg/${item.strCategory}`);
          }}
        >
          {item["strCategory"]}
        </h4>
        {item.strTags ? (
          <h4 className="text-center">Tags:
            <span className="border p-1" style={{ color: "darkseagreen" }}>
              {item.strTags}
            </span>
          </h4>
        ) : (
          ""
        )}
      </div>

      <img
        className="img-thumbnail w-50 mx-auto d-block"
        // src={item.strMealThumb + "/preview"}
        src={item.strMealThumb}
        onError={(e) => {
          e.currentTarget.src = item.strMealThumb;
        }}
        alt=""
      />

      <div className="container-fluid p-1">
        <div className="row m-1">
          <div
            className="col-xl-4 me-2"
            style={{ border: "dashed", borderColor: "orange" }}
          >
            <ol className="list-group list-group-numbered fs-5">
              {Object.keys(item).map((items, index) => {
                return item["strIngredient" + index] ? (
                  <li
                    id={item["strIngredient" + index]}
                    key={index}
                    onClick={(ef) => {
                      console.log(ef);
                      navigate(`/ingredientsfilter/${ef.target.id}`);
                    }}
                    className="point list-group-item list-group-item-action bg-black text-light border-dark border border-1"
                  >
                    <img
                      className="img-fluid"
                      src={
                        ingredientURL +
                        item["strIngredient" + index] +
                        "-Small.png"
                      }
                      alt=""
                      title={item["strIngredient" + index]}
                    />
                    {" " +
                      item["strMeasure" + index] +
                      " " +
                      item["strIngredient" + index]}
                  </li>
                ) : (
                  ""
                );
              })}
            </ol>
          </div>
          <div
            className="col pt-2"
            style={{ border: "dashed", borderColor: "orange"}}
          >
            <pre className="text-light p-2 fs-5">{item?.strInstructions}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Randomeal;
