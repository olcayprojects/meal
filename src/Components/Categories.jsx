import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";

var infocate = "";

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
        infocate = data;
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
          : item.map((itemCategory) => {
              return (
                <div
                  className="col col-4 col-md-2 point d-flex"
                  key={itemCategory.idCategory}
                >
                  <div
                    className="card text-dark bg-white w-100 bg-opacity-25"
                    style={{}}
                    key={itemCategory.idCategory}
                    onClick={() => {
                      navigate(`/fg/${itemCategory.strCategory}`);
                    }}
                  >
                    <img
                      className="imgeffectIngredients card-img-top img-fluid"
                      src={itemCategory.strCategoryThumb}
                      title={itemCategory["strCategoryDescription"]}
                      alt={itemCategory["strCategoryDescription"]}
                    />
                    <div className="text-end">
                      <span className="card-title text-white px-2 fs-4">
                        {itemCategory.strCategory.toUpperCase()}
                      </span>
                      <h6 className="card-title text-start text-white">
                        {/* {itemCategory.strCategoryDescription} */}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
};

export function CategoryInfo(cName) {
  var desc = "";
  infocate.categories?.map((categoryInfo) => {
    if (categoryInfo.strCategory === cName.cName) {
      desc = categoryInfo.strCategoryDescription;
    }
  });

  return <span className="text-secondary">{desc}</span>;
}

export default Categories;
