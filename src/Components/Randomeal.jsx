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

      <div className="Randomcontainer text-center">
        
        <div className="itemss" key={item.idmeal}>
          <h1 key={1}>{item["strMeal"]}</h1>
          <h4 key={2}>
            {item["strArea"]} Food | {item["strCategory"]}
          </h4>

          {item.strTags ? (
            <h5 key={3}>Tags: {item.strTags}</h5>
          ) : (
            <h5>Tags: ???</h5>
          )}

          <div className="malzemeListesi">
            <table
              style={{ width: "100%", margin: "auto" }}
              className="table table-bordered table-dark table-hover"
            >
              <thead className="thead-dark">
                <tr>
                  <th className="text-center" style={{ textAlign: "center" }}>
                    <img
                      style={{
                        objectFit: "fill",
                        width: "100%",
                        height: "auto",
                        margin: "auto",
                      }}
                      key={8}
                      src={item.strMealThumb + "/preview"}
                      onError={(e) => {
                        e.currentTarget.src = item.strMealThumb;
                      }}
                      alt=""
                    />
                  </th>
                  <th className="text-center">Ingredient</th>
                  <th className="text-center">Measure</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  let malzemeListesi_p = [];
                  for (let i = 1; i <= 20; i++) {
                    if (item["strIngredient" + i]) {
                      malzemeListesi_p.push(
                        <tr key={i}>
                          <td className="text-end">
                            <img
                              key={5}
                              className="img-fluid"
                              src={
                                ingredientURL +
                                item["strIngredient" + i] +
                                "-Small.png"
                              }
                              alt=""
                              title={item["strIngredient" + i]}
                            />
                          </td>
                          <td className="table-dark text-start" key={6 + i}>
                            {item["strIngredient" + i]}
                          </td>
                          <td
                            style={{
                              textAlignVertical: "center",
                              textAlign: "center",
                            }}
                            className="table-dark  text-start"
                          >
                            {item["strMeasure" + i]}
                          </td>
                        </tr>
                      );
                    }
                  }
                  //console.log(p);

                  var filtered = malzemeListesi_p.filter(function (el) {
                    return el != null;
                  });

                  return filtered;
                })()}
              </tbody>
            </table>
          </div>
        </div>

        <div key={1}>
          <h2>Instructions</h2>
          {!item
            ? "bulunamadı"
            : Array(item).map((items) => {
                return <h5 className="text-light" key={7}>{items.strInstructions}</h5>;
              })}
        </div>
      </div>
    </div>
  );
};

export default Randomeal;
