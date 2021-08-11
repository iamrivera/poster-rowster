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
    let card = new GenreCard(genres.title, genres.id);
    body.appendChild(card.render());
  });
}

// //FETCH MOVIES & RENDER MOVIES
// function fetchMovies() {
//   fetch("http://127.0.0.1:3000/movies")
//     .then(function (response) {
//       return response.json();
//     })
//     .then(renderMovies);
// }

function renderMovies(movies) {
  const body = document.querySelector("body");
  // Next steps - Create a div for row to append to append class=col then append div row to body
  movies.forEach((movies) => {
    let card = new MovieCard(movies.title);
    body.appendChild(card.render());
  });
}



//CREATING THE CLASSES
// Next step --> Create a Genre Card + Movie Card classes with unique divs so you can easily hide and unhide 
class GenreCard {
  constructor(title, id) {
    this.title = title;
    this.id = id
  }

  render() {
    const gcard = document.createElement("div");
    gcard.setAttribute("class", "card");
    gcard.setAttribute("id", `gcard-${this.title}`);
    gcard.textContent = this.title;
    let btn = document.createElement("button");
    btn.innerHTML = `See ${this.title} Movies`;
    btn.addEventListener("click", function(){
      fetch(`http://127.0.0.1:3000/${this.id}movies`)
      .then(function (response) {
        return response.json();
      })
      .then(renderMovies);
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
    mcard.setAttribute("id", `mcard-${this.title}`);
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
