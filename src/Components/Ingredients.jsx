import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Loader from "../Components/Loader";
let ingredientURL = "https://www.themealdb.com/images/ingredients/";

const Ingredients = () => {
  const [url, setUrl] = useState(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );

  const [item, setItem] = useState();
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(url).then((res) =>
      res.json().then((data) => {
        // console.log(data.meals);
        // console.log(data);
        setLoading(false);
        setItem(data.meals);
      })
    );
  }, [url]);

  if (loading) return <Loader />;
  return (
    <div className="container-fluid">
      <Nav />
      <div className="row row-cols-1 row-cols-md-6 g-3 justify-content-md-center ">
        {!item ? (
          <h1>bulunamadı</h1>
        ) : (
          item.map((item) => {
            return (
              <div className="col d-flex point border border-primary p-0 m-2" key={item.idIngredient}>
                <div
                  className="card flex-fill text-white bg-dark"
                  
                >
                  <img
                    className="card-img-top img-thumbnail"
                    key={item.MealId}
                    onClick={() => {
                      navigate(`/ingredientsfilter/${item.strIngredient}`);
                    }}
                    src={ingredientURL + item["strIngredient"] + "-small.png"}
                    alt=""
                    title={item["strIngredient"]}
                  />
                  <div className="card-body">
                    <h4 className="card-title">
                      {item.strIngredient.toUpperCase()} MEALS
                    </h4>
                    <pre className="card-text">
                      <button
                        className="btn bg-dark text-light"
                        onClick={() => setShowMore(!showMore)}
                      >
                        
                        {showMore
                          ? item?.strDescription
                          : item?.strDescription?.substring(0, 100)
                          }
                          <hr />
                        {showMore ? "Show less" : "Show more"
                       
                      
                      }
                      </button>
                    </pre>
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
export default Ingredients;
