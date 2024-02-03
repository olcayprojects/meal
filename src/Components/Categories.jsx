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
      <div className="row row-cols-3 row-cols-md-6 g-1 justify-content-md-center">
        {!item
          ? "bulunamadı"
          : item.map((itemCategory) => {
              return (
                <div className="col" key={itemCategory.idCategory}>
                  <div
                    className="card text-dark w-100 h-100"
                    style={{}}
                    key={itemCategory.idCategory}
                    onClick={() => {
                      navigate(`/fg/${itemCategory.strCategory}`);
                    }}
                  >
                    <img
                      className="imgeffectIngredients card-img-top"
                      src={itemCategory.strCategoryThumb}
                      title={itemCategory.strCategory}
                      alt={itemCategory.strCategory}
                    />
                    <div className="text-end">
                      <span className="bg-warning card-title text-dark fw-bold py-1 px-1 fs-5">
                        {itemCategory.strCategory.toUpperCase()}
                      </span>
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
    return desc;
  });
  return (
    <div className="border border-warning border-4 bg-dark ">
      <pre className="text-light p-2 m-0">{desc}</pre>
    </div>
  );
}

export default Categories;
