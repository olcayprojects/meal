import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Categories from "./Categories";
import Nav from "./Nav";
import Loader from "../Components/Loader";
import { CategoryInfo } from "./Categories";
import Meallist from "./Meallist";

const Filtercategory = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

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

          <div className="text-center">
            <img
              className="img-responsive w-25 mx-auto d-block"
              src={
                "https://www.themealdb.com/images/category/" +
                CategoryName +
                ".png"
              }
              alt=""
            />
            <span className="bg-warning fs-1 px-2 fw-bold">
              {CategoryName} Meals
            </span>
          </div>
          <CategoryInfo cName={CategoryName} />
          <Meallist item={items} />
        </>
      )}
    </div>
  );
};

export default Filtercategory;
