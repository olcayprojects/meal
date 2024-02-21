import { useNavigate } from "react-router-dom";

export default function Meallist(props) {
  let navigate = useNavigate();

  return (
    <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-1 justify-content-center">
      {!props.item ? (
        <h6>Meals Not Found !!</h6>
      ) : (
        props.item.map((data, index) => (
          <div className="col" key={data.idMeal}>
            <div
              key={index}
              className="imgeffect card text-dark bg-black border border-warning point"
              onClick={() => {
                navigate(`/recipeinfo/${data.idMeal}`);
              }}
              title={"Click go to '" + data.strMeal + "' details"}
            >
              <img
                className="image card-img-top"
                key={index + 1}
                src={data.strMealThumb + "/preview"}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = data.strMealThumb;
                }}
                alt=""
                title=""
              />
              <div className="card-img-overlay d-flex">
                <span
                  className="card-title text-warning fs-4 px-3 align-self-end rounded-pill"
                  key={index + 2}
                >
                  {data.strMeal}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
