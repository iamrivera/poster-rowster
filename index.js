const baseUrl = "http://127.0.0.1:3000/"
const genresUrl = `${baseUrl}genres`



//***********GENRE: FETCH & RENDER *****************//
function fetchGenres() {
  fetch(genresUrl)
    .then(function (response) {
      return response.json();
    })
    .then(renderGenres);
}

function renderGenres(genres) {
  const body = document.querySelector("body");
  const genreCont = document.createElement("div");
  genreCont.setAttribute("class", "genres");
  body.appendChild(genreCont);
  genres.forEach((genres) => {
    let card = new GenreCard(genres.title, genres.id);
    genreCont.appendChild(card.render());
  });
}

//***********MOVIE: RENDER *****************//
function renderMovies(movies) {
  const body = document.querySelector("body");
  // Next steps - Create a div for row to append to append class=col then append div row to body
  movies.forEach((movies) => {
    let card = new MovieCard(movies.title);
    body.appendChild(card.render());
  });
}

//***********CARD CLASSES: GENRE & MOVIE *****************//
class GenreCard {
  constructor(title, id) {
    this.title = title;
    this.id = id
  }

  render() {
    const gcard = document.createElement("div");
    gcard.setAttribute("class", "card");
    gcard.setAttribute("id", "gcard");
    gcard.textContent = this.title;
    let btn = document.createElement("button");
    btn.innerHTML = `See ${this.title} Movies`;
    btn.addEventListener("click", function(){
      fetch(`http://127.0.0.1:3000/${this.id}movies`)
      .then(function (response) {
        return response.json();
      })
      .then(renderMovies);
      document.getElementsByClassName("genres")[0].style.visibility = "hidden"
    })
    gcard.append(btn);
    return gcard;
  }
}


class MovieCard {
  constructor(title, id) {
    this.title = title;
    this.id = id
  }

  render() {
    const mcard = document.createElement("div");
    mcard.setAttribute("class", "card");
    mcard.setAttribute("id", "mcard");
    mcard.textContent = this.title;
    let btn = document.createElement("button");
    btn.innerHTML = `See ${this.title} Posters`;
    btn.addEventListener("click", function(){
      fetch(`http://127.0.0.1:3000/${this.id}movies`)
      .then(function (response) {
        return response.json();
      })
      .then(renderMovies);
    })
    mcard.append(btn);
    return mcard;
  }
}






//CALLING THE FUNCTIONS
document.addEventListener("DOMContentLoaded", function () {
  console.log("The DOM has loaded");
  fetchGenres();
});
