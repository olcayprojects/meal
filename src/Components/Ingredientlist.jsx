import { useNavigate } from "react-router-dom";

export default function Ingredientlist(props) {
  let navigate = useNavigate();
  let ingredientURL = "https://www.themealdb.com/images/ingredients/";

  let mealName = "";

  for (let index = 25; index > 1; index--) {
    if (props.item.strMeal?.substring(index, index + 1) === " ") {
      mealName =
        props.item.strMeal.substring(0, index) +
        "\n" +
        props.item.strMeal.substring(index, props.item.strMeal.length);
      break;
    }
  }

  return (
    <ul className="list-group list-group-horizontal fs-5 point d-flex flex-wrap justify-content-center align-items-center">
      {Object.keys(props.item).map((items, index) => {
        return props.item["strIngredient" + index] ? (
          <div className="pb-1" key={index} style={{}}>
            <li
              id={props.item["strIngredient" + index]}
              title={
                "Click go to " +
                props.item["strIngredient" + index] +
                " Recipes"
              }
              onClick={(ef) => {
                navigate(
                  `/ingredientsfilter/${props.item["strIngredient" + index]}`
                );
              }}
              className="fw-bold list-group-item bg-dark text-warning border-warning mx-1 p-0 d-flex flex-column justify-content-center align-items-center"
              style={{}}
            >
              <div className="d-flex justify-content-center">
                <img
                  className="img-fluid"
                  style={{}}
                  src={
                    ingredientURL +
                    props.item["strIngredient" + index] +
                    "-Small.png"
                  }
                  alt={props.item["strIngredient" + index]}
                />
              </div>
              <p className="text-center bg-black w-100 px-1" style={{}}>
                {`${props.item["strMeasure" + index].trim()} ${
                  props.item["strIngredient" + index]
                }`}
              </p>
            </li>
          </div>
        ) : null;
      })}
    </ul>
  );
}
