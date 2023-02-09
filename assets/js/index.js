// api keys for use with the application */
let spoonacularApiKey = "9575d7b24ee042eabce68a8f0dd4cec7";
let calorieNinjaApiKey = "bpGUOf+/ZIm6T5zzOTafCw==kaTMpUEumQBV1CvA";
/**defined global variables for application code */
//Ian-code variables
//variable to connect with user input of ingredient
let ingredientEl = document.getElementById("inputIngredient");
//variable to connect with id connected to the search button
let searchEl = document.getElementById("search");
//variable to connect with clear button
let clearEl = document.getElementById("clearSearch");
//variable to connect with id to display search history
let historyEl = document.getElementById("history");
//variable used to retrieve data from the local storage to keep the search history repopulated if needed
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
//ANDREI
let searchButton = document.querySelector("#search");
let inputArea = document.querySelector(".form-control");
let cardArea = document.querySelector("#card-placeholder");
//variable to allow the eventual displaying of the joke of the day
let jokesEl = document.getElementById("jokes");
//variable required by function to resend joke enquiry to the joke ninja api
let nextJokeEl = document.getElementById("nextJoke");
//the following are api tests carried out by us to ensure the validity of chosen apis, the calorieninja api was not used in the final product as
//its content overlapped the spoonocular one to much
//test example for calorie API
// fetch("https://api.calorieninjas.com/v1/nutrition?query=10oz your food name",
// {headers:{"X-Api-Key": "bpGUOf+/ZIm6T5zzOTafCw==kaTMpUEumQBV1CvA"}}
// )
// .then(response => response.json())
// .then(data => console.log(data))
//text example for food api
// fetch("https://api.spoonacular.com/recipes/716429/information?apiKey=9575d7b24ee042eabce68a8f0dd4cec7&includeNutrition=true")
// .then(response => response.json())
// .then(data => console.log(data))
/**allows retention of search history -Ian*/
window.onload = renderSearchHistory();
/**allows generation of the joke of the day as the page loads */
window.onload = joke();
/**function to wrap around api enquiry to aid in functions that run the search button etc- moved onclick search button code to bottom of page */
function getIngredient() {
  //HERE IS CODE BY ANDREI
  fetch(
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
      inputArea.value +
      "&apiKey=9575d7b24ee042eabce68a8f0dd4cec7&includeNutrition=true&addRecipeNutrition=true&addRecipeInformation=true&number=5"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //for loop for displaying cards
      for (i = 0; i < 6; i++) {
        //dynamically adds the data
        cardArea.innerHTML += `<div class="col">
          <section class="mx-auto my-5" style="max-width: 23rem; ">
          <div class="card">
          <div class="bg-image-card hover-overlay ripple" data-mdb-ripple-color="light">
          <img src="${data.results[i].image}" class="rounded mx-auto d-block" />
          </div>
          <div class="card-body">
          <h5 class="card-title font-weight-bold"><a>${
            data.results[i].title
          }</a></h5>
          <p class="mb-2">Ready in: ${
            data.results[i].readyInMinutes
          } minutes</p>
          <p class="card-text">
          ${data.results[i].summary}
                </p>
                <hr class="my-4" />
                <p class="lead"><strong>Total Calories:</strong> ${
                  data.results[i].nutrition.nutrients[0].amount
                } Kcal</p>
                  <p class="lead"><strong>Dish price:</strong> ${Number.parseFloat(
                    data.results[i].pricePerServing / 100
                  ).toFixed(2)}£</p>
                  <!-- Recipe Button trigger modal -->
                  <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#recipeModal${i}">
                    Show Calories
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="recipeModal${i}" tabindex="-1" role="dialog" aria-labelledby="recipeModal"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <!--Header-->
                    <div class="modal-header">
                    <h4 class="modal-title" id="myModalLabel">Your Food's Nutritional Values</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                  </button>
                  </div>
                  <!--Body-->
                  <div class="modal-body">
                  <table class="table table-hover">
                    <thead>
                    <tr>
                    <th>#</th>
                    <th>Nutrients</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                    <th scope="row">1</th>
                        <td>Fat</td>
                        <td>${
                          data.results[i].nutrition.nutrients[1].amount
                        }</td>
                        <td>gr</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Cholesterol</td>
                        <td>${
                          data.results[i].nutrition.nutrients[6].amount
                        }</td>
                        <td>mg</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Sodium</td>
                        <td>${
                          data.results[i].nutrition.nutrients[7].amount
                        }</td>
                        <td>mg</td>
                        </tr>
                        <tr>
                        <th scope="row">4</th>
                        <td>Carbohydrates</td>
                        <td>${
                          data.results[i].nutrition.nutrients[3].amount
                        }</td>
                        <td>gr</td>
                        </tr>
                        <tr>
                        <th scope="row">5</th>
                        <td>Fiber</td>
                        <td>${
                          data.results[i].nutrition.nutrients[19].amount
                        }</td>
                        <td>gr</td>
                        </tr>
                        <tr class="total">
                        <th scope="row">6</th>
                        <td>Protein</td>
                        <td>${
                          data.results[i].nutrition.nutrients[1].amount
                        }</td>
                        <td>gr</td>
                      </tr>
                      </tbody>
                      </table>
                      </div>
                      <!--Footer-->
                <div class="modal-footer">
                  <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Close</button>
                  </div>
              </div>
                </div>
              </div>
              <!--commented out by Ian to see if we will have time to populate this data or not before presentation-->
              <!-- Recipe Button trigger modal -->
               <!--    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#caloriesModal${i}">
                    Show Recipe
                    </button>-->
                  <!-- Modal -->
                  <div class="modal fade" id="caloriesModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog" role="document">
                  <div class="modal-content">
                  <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Recipe Nutrition Label</h5>
                  </div>
                  <div class="modal-body">
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  </section>
                  </div>`;
      }
    });
}
//commenting to try force this file to push
//function to make api call - call created by andrei and wrapped up by Ian
function joke() {
  fetch("https://api.api-ninjas.com/v1/jokes", {
    method: "GET",
    headers: { "X-Api-Key": "dUAUs30Lfu4CuIlu7zOLWg==qDOYWZsxCCElnYyb" },
  })
    .then((response) => response.json())
    .then((joke) => {
      let generatedJoke = joke[0].joke;
      //console log of joke to understand response of api to complete function
      console.log(joke);
      //use the following to link the api response to the html section for jokes allowing the joke to be displayed to the user
      jokesEl.innerHTML = generatedJoke;
    });
}
//code added by Ian
/* create a event listener for when the user clicks on the search  button - event listener created by Andrei, moved here by Ian*/
searchButton.addEventListener("click", function (event) {
  //this clears the old input - andrei
  cardArea.innerHTML = "";
  event.preventDefault();
  let searchTerm = ingredientEl.value;
  getIngredient(searchTerm);
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
});
/* create an event listener for when the user clicks on the clear search history button*/
clearEl.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  renderSearchHistory();
  /**use window.location.reload to reset the page and ensure the page knows local storage is cleared */
  window.location.reload();
});
/** create function to render the search history */
function renderSearchHistory() {
  historyEl.innerHTML = "";
  for (let i = 0; i < searchHistory.length; i++) {
    const historyItem = document.createElement("input");
    historyItem.setAttribute("type", "button");
    historyItem.setAttribute("readonly", true);
    historyItem.setAttribute(
      "class",
      "rounded-2  historyBut bg-primary mt-2 text-center text-light responsive-content"
    );
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click", function () {
      getIngredient(historyItem.value);
    });
    historyEl.append(historyItem);
  }
}
//listerner event to allow user to view multiple jokes without needing to refresh the page
nextJokeEl.addEventListener("click", function (event) {
  event.preventDefault();
  joke();
});
