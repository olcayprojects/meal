import React from "react";
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from "./useIntersectionObserver"; // Hook'u buradan import ediyoruz

const Meallist = ({ item }) => {
  const visibleCards = useIntersectionObserver(); // Hook'u kullanıyoruz
  const navigate = useNavigate();
  const splitSmart = (text, maxLen = 40) => {
    const result = [];
    let i = 0;

    while (i < text.length) {
      let end = i + maxLen;

      if (end >= text.length) {
        result.push(text.slice(i).trim());
        break;
      }

      let slice = text.slice(i, end);
      let lastSpace = slice.lastIndexOf(" ");

      if (lastSpace === -1) {
        result.push(slice);
        i = end;
      } else {
        result.push(slice.slice(0, lastSpace));
        i += lastSpace + 1;
      }
    }

    return result;
  };

  return (
    <div className="mt-1 grid grid-cols-1 sm:grid-cols-6 gap-1 ">
      {item && item.length > 0 ? (
        item.map((data) => (
          <div
            className="bg-gray-900 mx-auto my-1 border-4 border-dashed border-orange-500"
            key={data.idMeal}
          >
            <div
              className={`point  ${
                visibleCards.includes(
                  document.querySelector(`#cardS-${data.idMeal}`)
                )
                  ? "visible"
                  : ""
              }`}
              id={`cardS-${data.idMeal}`}
              onClick={() => {
                navigate(`/recipeinfo/${data.idMeal}`);
              }}
              title={`Click to go to '${data.strMeal}' details`}
            >
              <div className="overflow-hidden">
                <img
                  className="transform hover:scale-[1.9] transition-all "
                  style={{ transitionDuration: "2s" }}
                  src={data.strMealThumb + ""}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = data.strMealThumb; // Fallback to the original image if the medium size fails
                  }}
                  alt={data.strMeal}
                />
              </div>
              <div className="text-center px-1 bg-gradient">
                <div className="text-yellow-500 font-bold">
                  {splitSmart(data.strMeal, 40).map((chunk, index) => (
                    <div key={index}>{chunk}</div>
                  ))}
                </div>
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
