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
    <div className="d-flex flex-grow-1 justify-content-center align-items-center">
      <div
        class="spinner-grow text-warning"
        style={{ width: "300px", height: "300px" }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
