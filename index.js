const baseURL = "http://127.0.0.1:3000/"


//FETCH GENRES & RENDER GENRES
function fetchGenres() {
  fetch("http://127.0.0.1:3000/genres")
    .then(function (response) {
      return response.json();
    })
    .then(renderGenres);
}

function renderGenres(genres) {
  const body = document.querySelector("body");
  // Next steps - Create a div for row to append to append class=col then append div row to body
  genres.forEach((genres) => {
    const card = new Card(genres.title);
    body.appendChild(card.render());
  });
}

//FETCH MOVIES & RENDER MOVIES
function fetchMovies() {
  fetch("https://127.0.0.1:3000/movies")
    .then(function (response) {
      return response.json();
    })
    .then(renderMovies);
}

function renderMovies(movies) {
  const body = document.querySelector("body");
  movies.forEach((movies) => {
    const card = new Card(movies.title);
    body.appendChild(card.render());
  });
}

//CREATING THE GENRE CARD CLASS
class Card {
  constructor(title) {
    this.title = title;
  }

  render() {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", `card-${this.title}`);
    card.textContent = this.title;
    
    let btn = document.createElement("button");
    btn.innerHTML = `See ${this.title} Movies`;
    // btn.addEventListener("click", )
    card.append(btn);
    return card;
  }

  handleGenreClick() {
    return ``
  }
}

//CALLING THE FUNCTIONS
document.addEventListener("DOMContentLoaded", function () {
  console.log("The DOM has loaded");
  fetchGenres();
});
