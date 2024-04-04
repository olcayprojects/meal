import { useNavigate } from "react-router-dom";

export default function Ingredientlist(props) {
  let navigate = useNavigate();
  let ingredientURL = "https://www.themealdb.com/images/ingredients/";

  let mealName = "";

  for (let index = 25; index > 1; index--) {
    if (props.item.strMeal.substring(index, index + 1) === " ") {
      mealName =
        props.item.strMeal.substring(0, index) +
        "\n" +
        props.item.strMeal.substring(index, props.item.strMeal.length);
      break;
    }
  }

  return (
    <ul className="list-group fs-5 point">
      <h5 className="text-center text-secondary">
        <pre className="text-warning">
          The ingredients for
          <span className="ps-2 fw-bold">
            {props.item.strMeal?.length > 30 ? mealName : props.item.strMeal}!
          </span>
        </pre>
      </h5>
      {Object.keys(props.item).map((items, index) => {
        return props.item["strIngredient" + index] ? (
          <div className="" key={index}>
            <span className="ps-1">
              <li
                id={props.item["strIngredient" + index]}
                title={
                  "Click go to " +
                  props.item["strIngredient" + index] +
                  " Recipes"
                }
                key={index}
                onClick={(ef) => {
                  navigate(
                    `/ingredientsfilter/${props.item["strIngredient" + index]}`
                  );
                }}
                className="list-group-item-action bg-dark text-warning border-warning border-bottom p-0 d-inline"
              >
                <span className="ps-2">
                  {props.item["strMeasure" + index].trim()}
                </span>
                <img
                  className="img-fluid"
                  style={{ width: "25px" }}
                  src={
                    ingredientURL +
                    props.item["strIngredient" + index] +
                    "-Small.png"
                  }
                  alt=""
                />
                <span className="fw-bold pe-2">
                  {props.item["strIngredient" + index]}
                </span>
              </li>
            </span>
          </div>
        ) : null;
      })}
    </ul>
  );
}
