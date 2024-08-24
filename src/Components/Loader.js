import "bootstrap/dist/css/bootstrap.css";

const url = "https://www.themealdb.com/api/json/v1/1/random.php";

fetch(url)
  .then((response) => {
    // console.log(response.status)
  })
  .catch((error) => {
    window.alert(error);
    // handle the error
  });

function Loader() {
  return (
    <div className="d-flex min-vh-100">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <h1 style={{ color: "orange" }} className="fw-bold">
          Loading...
        </h1>
      </div>
    </div>
  );
}

export default Loader;
