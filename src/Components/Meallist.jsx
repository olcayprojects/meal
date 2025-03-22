import React from "react";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from "./useIntersectionObserver"; // Hook'u buradan import ediyoruz

const Meallist = ({ item }) => {
  const visibleCards = useIntersectionObserver(); // Hook'u kullanıyoruz
  const navigate = useNavigate();

  return (
    <div className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-1 justify-content-center">
      {item && item.length > 0 ? (
        item.map((data) => (
          <div className="col py-2" key={data.idMeal}>
            <div
              className={`card cardS text-dark bg-black point imgeffect ${
                visibleCards.includes(document.querySelector(`#cardS-${data.idMeal}`))
                  ? 'visible'
                  : ''
              }`}
              style={{
                borderStyle: "dashed",
                borderWidth: "5px",
                borderColor: "orange",
              }}
              id={`cardS-${data.idMeal}`}
              onClick={() => {
                navigate(`/recipeinfo/${data.idMeal}`);
              }}
              title={`Click to go to '${data.strMeal}' details`}
            >
              <img
                className="image card-img-top"
                src={data.strMealThumb + "/Medium"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = data.strMealThumb; // Fallback to the original image if the medium size fails
                }}
                alt={data.strMeal}
              />
              <div className="card-img-overlay d-flex">
                <span className="card-title text-warning fs-4 px-3 align-self-end rounded-pill">
                  {data.strMeal}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h6>Meals Not Found !!</h6>
      )}
    </div>
  );
};

export default Meallist;
