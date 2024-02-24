import { useNavigate } from "react-router-dom";

export default function Ingredientlist(props) {
  let navigate = useNavigate();
  let ingredientURL = "https://www.themealdb.com/images/ingredients/";

  return (
    <ol className="list-group list-group-numbered fs-5 point">
      <h5 className="text-center text-secondary fw-bold">
        {" "}
        <span className="bg-dark text-warning border border-warning px-2">
          Ingredients
        </span>
      </h5>
      {Object.keys(props.item).map((items, index) => {
        return props.item["strIngredient" + index] ? (
          <li
            id={props.item["strIngredient" + index]}
            title={"Click go to " + props.item["strIngredient" + index] + " Recipes"}
            key={index}
            onClick={(ef) => {
              navigate(
                `/ingredientsfilter/${props.item["strIngredient" + index]}`
              );
            }}
            className="list-group-item list-group-item-action bg-dark text-warning border-warning border border-2 p-2"
          >
            <span>{props.item["strMeasure" + index].trim() + " "}</span>
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
            <span>{" " + props.item["strIngredient" + index]}</span>
          </li>
        ) : null;
      })}
    </ol>
  );
}
