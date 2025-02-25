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
    <ul className="list-group fs-5 point">
      <h4 className="text-center m-0">
        <pre className="text-black bg-warning px-2 m-0 fs-4">
          Ingredients
          <span className="ps-2 fw-bolder">
            {/* "{props.item.strMeal?.length > 30 ? mealName : props.item.strMeal}" */}
          </span>
        </pre>
        <hr className="my-1 border border-warning border-4" />
      </h4>
      {Object.keys(props.item).map((items, index) => {
        return props.item["strIngredient" + index] ? (
          <div className="pb-1" key={index}>
            <span className="p-0">
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
                className="fw-bold list-group-item-action bg-dark text-warning border-warning border-top border-bottom p-0 d-block "
              >
                <img
                  className="img-fluid mx-1"
                  style={{ width: "25px" }}
                  src={
                    ingredientURL +
                    props.item["strIngredient" + index] +
                    "-Small.png"
                  }
                  alt={props.item["strIngredient" + index]}
                />
                <span className="pe-1">
                  {`${props.item["strMeasure" + index].trim()} ${
                    props.item["strIngredient" + index]
                  }`}
                </span>
              </li>
            </span>
          </div>
        ) : null;
      })}
    </ul>
  );
}
