import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

const Categories = () => {
  const [url, setUrl] = useState(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );

  let navigate = useNavigate();

  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch(url).then((res) =>
      res.json().then((data) => {
        // console.log(data.categories);

        setItem(data.categories);
        setShow(true);
      })
    );
  }, [url]);
  if (!show) return <Loader />;

  return (
    <>
      <br />
      <div className="row row-cols-4 g-3 justify-content-md-center">
        {!item
          ? "bulunamadı"
          : item.map((item) => {
              return (
                <div
                  className="col col-4 col-md-2 point  rounded-circle"
                  key={item.idCategory}
                >
                  <div
                    className="card text-dark bg-white "
                    style={{}}
                    key={item.idCategory}
                    onClick={() => {
                      navigate(`/fg/${item.strCategory}`);
                    }}
                  >
                    <img
                      className="card-img-top img-thumbnail"
                      src={item.strCategoryThumb}
                      title={item["strCategoryDescription"]}
                      alt={item["strCategoryDescription"]}
                    />
                    <div className="card-img-overlay text-center">
                      <h4 className="card-title">
                        {item.strCategory.toUpperCase()}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};
export default Categories;
