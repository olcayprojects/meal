import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Loader from "../Components/Loader";
let ingredientURL = "https://www.themealdb.com/images/ingredients/";
let ingUrl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

var descIng = "";

const Ingredients = () => {
  const [url, setUrl] = useState(ingUrl);

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
        descIng = data;
      })
    );
  }, [url]);

  if (loading) return <Loader />;
  return (
    <div className="container-fluid p-0">
      <Nav />
      <div className="row row-cols-4 row-cols-md-6 mt-1 justify-content-md-center m-0 p-0">
        {!item ? (
          <h1>bulunamadı</h1>
        ) : (
          item.map((item) => {
            return (
              <div
                className="col point border border-1 border-secondary my-1 m-0 p-0 mx-0 bg-dark"
                key={item.idIngredient}
              >
                <div className="card bg-opacity-25 bg-dark">
                  <img
                    className="imgeffectIngredients card-img-top img-thumbnail bg-black"
                    style={{ height: "" }}
                    key={item.MealId}
                    onClick={() => {
                      navigate(`/ingredientsfilter/${item.strIngredient}`);
                    }}
                    src={ingredientURL + item["strIngredient"] + "-Small.png"}
                    alt={item["strIngredient"]}
                    title={item["strIngredient"]}
                  />
                  <div className="card-body text-bottom text-center">
                    <span
                      className="card-title fs-5 fw-bold p-1 text-black"
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

export function IngredientsInfo(props) {
  var desc = "";
  descIng.meals?.map((categoryInfo) => {
    if (categoryInfo.strIngredient === props.iName) {
      desc = categoryInfo.strDescription;
    }
    return desc;
  });

  return desc ? (
    <div className="border border-warning border-4 bg-dark mb-1 ">
      <pre className="text-light p-2 m-0">{desc}</pre>
    </div>
  ) : null;
}

export default Ingredients;
