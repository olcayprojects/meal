import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";
import Nav from "./Nav";
import Loader from "../Components/Loader";
import { CategoryInfo } from "./Categories";

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

          <hr className="border border-3 opacity-25"></hr>

          <img
            className="img-responsive w-50 mx-auto d-block"
            src={
              "https://www.themealdb.com/images/category/" +
              CategoryName +
              ".png"
            }
            alt=""
          />
          <h2 className="text-center fs-1 fw-bold" style={{ color: "orange" }}>
            {CategoryName} Meals
          </h2>
          <CategoryInfo cName={CategoryName} />

          <div className="row row-cols-2 row-cols-md-6 g-1 justify-content-md-center pt-4">
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
                      className="card-img-top"
                      src={item.strMealThumb + "/preview"}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = item.strMealThumb;
                      }}
                      alt=""
                    />
                    <div className="card-img-overlay text-end">
                      <span
                        className="card-title text-white fs-4 px-2"
                        style={{}}
                      >
                        {item.strMeal}
                      </span>
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
