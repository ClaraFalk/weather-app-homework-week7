function handleSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-bar-input");

  let cityHeading = document.querySelector("#city-heading");

  cityHeading.innerHTML = searchInput.value;
}

let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleSubmit);
