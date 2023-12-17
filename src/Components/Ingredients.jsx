import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Loader from "../Components/Loader";
let ingredientURL = "https://www.themealdb.com/images/ingredients/";

let infoIngredients = "";

const Ingredients = () => {
  const [url, setUrl] = useState(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );

  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  // const [showMore, setShowMore] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(url).then((res) =>
      res.json().then((data) => {
        setLoading(false);
        setItem(data.meals);
        infoIngredients = data;
      })
    );
  }, [url]);

  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      <Nav />
      <div className="row row-cols-4 row-cols-md-6 mt-1 justify-content-md-center">
        {!item ? (
          <h1>bulunamadı</h1>
        ) : (
          item.map((item) => {
            return (
              <div
                className="col point border border-1 border-secondary my-1 m-0 p-0"
                key={item.idIngredient}
              >
                <div className="card bg-opacity-25 bg-dark">
                  <img
                    className="imgeffectIngredients card-img-top img-fluid"
                    key={item.MealId}
                    onClick={() => {
                      navigate(`/ingredientsfilter/${item.strIngredient}`);
                    }}
                    src={ingredientURL + item["strIngredient"] + ".png"}
                    alt=""
                    title={item["strIngredient"]}
                  />
                  <div className="card-body text-end">
                    <span
                      className="card-title fs-4 px-1 text-black"
                      style={{ backgroundColor: "orange" }}
                    >
                      {item.strIngredient.toUpperCase()}
                    </span>
                    {/* <pre className="card-text">
                      <button
                        className="btn bg-dark text-light"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore
                          ? item?.strDescription
                          : item?.strDescription?.substring(0, 100)}
                        <hr />
                        {showMore ? "Show less" : "Show more"}
                      </button>
                    </pre> */}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export function IngredientsInfo(iName) {
  var desc = "";
  infoIngredients.meals?.map((ingredientsInfo) => {
    if (ingredientsInfo.strIngredient === iName.iName) {
      desc = ingredientsInfo.strDescription;
    }
  });

  return desc ? (
    <div className="m-1 border border-secondary p-2">
      <pre className="text-secondary">{desc}</pre>
    </div>
  ) : null;
}

export default Ingredients;
