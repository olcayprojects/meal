import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";
import Nav from "./Nav";
import Loader from "../Components/Loader";

const Filtercategory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();
  const { CategoryName = "Beef" } = useParams();
  let url =
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" +
    { CategoryName }.CategoryName +
    "";

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //  console.log(data.meals[0]);
        setItems(data.meals);
        //console.log(item);
        setLoading(false);
      });
  }, [url]);
  //console.log(CategoryName);
  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      <Nav />

      {!items ? (
        ""
      ) : (
        <>
          <Categories />

          <hr className="border border-3 opacity-75"></hr>
          <img
            className="img-fluid rounded mx-auto d-block"
            src={
              "https://www.themealdb.com/images/category/" +
              CategoryName +
              ".png"
            }
            alt=""
          />
          <h2 className="text-center fs-1 fw-bold" style={{color:"orange"}}>{CategoryName} Meals</h2>

          <div className="row row-cols-2 row-cols-md-6 g-3 justify-content-md-center pt-4">
            {items.map((item) => {
              return (
                <div className="col point" key={item.idMeal}>
                  <div
                    className="imgeffect card text-dark bg-white"
                    key={item.idMeal}
                    onClick={() => {
                      navigate(`/recipeinfo/${item.idMeal}`);
                    }}
                  >
                    <img
                      className="card-img-top img-thumbnail"
                      src={item.strMealThumb + "/preview"}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = item.strMealThumb;
                      }}
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <h4 className="card-title" style={{}}>{item.strMeal}</h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Filtercategory;
