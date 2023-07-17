import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Arealist = () => {
  const [area, setarea] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setarea(data.meals);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="row align-items-center">
      <form>
        <select
          size="0"
          defaultValue={""}
          aria-label="Default select example"
          className="form-select text-light bg-dark "
          name="values"
          style={{ width: "200px" }}
          menuisopen="false"
          onChange={(e) => {
            navigate(`/area/${e.target.value}`);
            navigate(0);
          }}
        >
          <option value="" hidden>
            Choose Cuisine
          </option>
          {area.map((areaitems, index) => {
            return (
              <option value={areaitems.strArea} key={index}>
                {areaitems.strArea}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default Arealist;
