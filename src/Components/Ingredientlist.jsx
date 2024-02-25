import { useNavigate } from "react-router-dom";

export default function Ingredientlist(props) {
  let navigate = useNavigate();
  let ingredientURL = "https://www.themealdb.com/images/ingredients/";

  return (
    <ul className="list-group fs-5 point">
      <h5 className="text-center text-secondary fw-bold">
        {" "}
        <span className=" text-warning">
          The ingredients for {props.item.strMeal}!
        </span>
      </h5>
      {Object.keys(props.item).map((items, index) => {
        return props.item["strIngredient" + index] ? (
          <div className="" key={index}>
            <input
              className="form-check-input me-3"
              type="checkbox"
              value=""
              aria-label="..."
            ></input>
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
              <span className="fw-bold">{" " + props.item["strIngredient" + index]}</span>
            </li>
          </div>
        ) : null;
      })}
    </ul>
  );
}
