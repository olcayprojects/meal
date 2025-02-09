import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Loader from "../Components/Loader";
let ingredientURL = "https://www.themealdb.com/images/ingredients/";
let ingUrl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

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
      })
    );
  }, [url]);

  if (loading) return <Loader />;
  return (
    <div className="container-fluid p-0">
      <Nav />
      <div className="row row-cols-auto row-cols-md-auto mt-2 justify-content-center m-0 p-0">
        {!item ? (
          <h1>bulunamadı</h1>
        ) : (
          item.map((item) => {
            return (
              <div
                className="col point my-4 m-0 p-0"
                style={{}}
                key={item.idIngredient}
              >
                <div
                  className="card bg-dark  rounded-pill"
                  style={{ boxSizing: "border-box", width: "100px" }}
                  title={item["strIngredient"]}
                >
                  <img
                    className="card-img-top img-fluid"
                    style={{ height: "" }}
                    key={item.MealId}
                    onClick={() => {
                      navigate(`/ingredientsfilter/${item.strIngredient}`);
                    }}
                    src={ingredientURL + item["strIngredient"] + "-Small.png"}
                    alt={item["strIngredient"]}
                  />
                  <div className="card-body text-bottom text-center p-0 m-0">
                    <h6
                      className="card-title fw-bold px-1 m-0 text-white bg-success text-truncate"
                      style={{}}
                    >
                      {item.strIngredient}
                    </h6>
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
  const [url, setUrl] = useState(ingUrl);
  const [descIng, setDescIng] = useState([]);

  useEffect(() => {
    fetch(url).then((res) =>
      res.json().then((data) => {
        data.meals.map((idIngredient) => {
          if (props.iName === idIngredient.strIngredient) {
            setDescIng(idIngredient);
          }
        });
      })
    );
  }, [url, props.iName]);

  return descIng?.strDescription ? (
    <div
      className="bg-dark mb-1 "
      style={{ borderStyle: "ridge", borderColor: "orange" }}
    >
      <pre className="text-warning fs-5 fst-italic px-2 m-0">
        {descIng?.strType ? (
          <>
            <span className="fw-bold fst-normal text-success">Type: </span>
            <span>{descIng?.strType}</span>
          </>
        ) : null}
        {descIng?.strDescription ? (
          <>
            <br />
            <span className="fw-bold fst-normal text-success">
              Description:{" "}
            </span>
            <span>{descIng?.strDescription}</span>
          </>
        ) : null}
      </pre>
    </div>
  ) : null;
}

export default Ingredients;
