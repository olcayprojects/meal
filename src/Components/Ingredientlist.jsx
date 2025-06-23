import { useNavigate } from "react-router-dom";

export default function IngredientList({ item }) {
  const navigate = useNavigate();
  const ingredientURL = "https://www.themealdb.com/images/ingredients/";

  return (
    <ul className="list-group list-group-horizontal fs-5 point d-flex flex-wrap justify-content-center align-items-center">
      {[...Array(20)].map((_, index) => {
        const ingredient = item[`strIngredient${index + 1}`];
        const measure = item[`strMeasure${index + 1}`];

        if (!ingredient || ingredient.trim() === "") return null;

        return (
          <div className="pb-1" key={index}>
            <li
              id={ingredient}
              title={`Click to go to ${ingredient} Recipes`}
              onClick={() => navigate(`/ingredientsfilter/${ingredient}`)}
              className="fw-bold list-group-item bg-dark text-warning border-warning mx-1 p-0 d-flex flex-column justify-content-center align-items-center"
            >
              <div className="d-flex justify-content-center overflow-hidden">
                <img
                  className="img-fluid transform hover:scale-[1.9] transition-all duration-1000"
                  src={`${ingredientURL}${ingredient}-Small.png`}
                  alt={ingredient}
                />
              </div>
              <p className="text-center bg-black px-1 w-full max-w-[20ch] leading-[1.2em] h-[2.4em] overflow-hidden break-words whitespace-normal line-clamp-2">
                {`${measure?.trim() || ""} ${ingredient}`}
              </p>
            </li>
          </div>
        );
      })}
    </ul>
  );
}
