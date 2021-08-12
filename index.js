//*** CONSTANTS ***//

//URLS
const baseUrl = "http://127.0.0.1:3000/";
const genresUrl = `${baseUrl}genres`;
const moviesUrl = `${baseUrl}movies`;
const postersUrl = `${baseUrl}posters`;

//Document Elements
const body = document.querySelector("body");

//*** TOP NAV ***//

const topNav = document.createElement("div");
topNav.setAttribute("class", "topnav");

const genreA = document.createElement("a");
genreA.setAttribute("class", "active");
genreA.setAttribute("href",genresUrl);
genreA.innerHTML = "Genres"
topNav.appendChild(genreA);

const movieA = document.createElement("a");
movieA.setAttribute("href",moviesUrl);
movieA.innerHTML = "Movies"
topNav.appendChild(movieA);

const posterA = document.createElement("a");
posterA.setAttribute("href",postersUrl);
posterA.innerHTML = "Posters"
topNav.appendChild(posterA);

body.appendChild(topNav);

//***********GENRE: FETCH & RENDER *****************//
function fetchGenres() {
  fetch(genresUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      renderGenres(data);
    });
}

function renderGenres(genres) {
  const genreCont = document.createElement("div");
  genreCont.setAttribute("class", "genres");
  body.appendChild(genreCont);
  genres.forEach((item) => {
    let card = new GenreCard(item.title, item.id);
    genreCont.appendChild(card.render());
  });
}

//***********MOVIE: RENDER *****************//
function renderMovies(movies) {
  movies.forEach((movie) => {
    fetchPosters(movie.id).then(function(response) {
     return response.json()
    }).then(function(data) {
      console.log(data);//clean up poster data on backend
      let card = new MovieCard(movie.title, movie.id, data[0].lynk, data[1].lynk, data[2].lynk);
      body.appendChild(card.render());
    })
  });
}


//************* POSTER: FETCH ************ */
function fetchPosters(movieId) { 
  return fetch(`http://127.0.0.1:3000/movies/${movieId}/posters`)
}


//***********CARD CLASSES: GENRE & MOVIE *****************//
class GenreCard {
  constructor(title, id) {
    this.title = title;
    this.id = id;
    this.fetchMovies = this.fetchMovies.bind(this)
  }

  fetchMovies() {
    // console.log(this.id)
    fetch(`http://127.0.0.1:3000/genres/${this.id}/movies`)
      .then(function (response) {
        return response.json();
      }).then(function (data) {
        // console.log(data);
        document.querySelector(".genres").classList.toggle("hidden")
        renderMovies(data);
      })
  };
  

  render() {
    const gcard = document.createElement("div");
    gcard.setAttribute("class", "card");
    gcard.setAttribute("id", "gcard");
    gcard.textContent = this.title;

    let btn = document.createElement("button");
    btn.innerHTML = `See ${this.title} Movies`;
    btn.addEventListener("click", this.fetchMovies) //bind takes you up one context
    gcard.append(btn);
    return gcard;
  }


  <div class="card mb-3">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
</div>
<div class="card">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
  </div>
  <img class="card-img-bottom" src="..." alt="Card image cap">
</div>

}

class MovieCard {
  constructor(title, id, lynk1, lynk2, lynk3) {
    this.title = title;
    this.id = id;
    this.lynk1 = lynk1 
    this.lynk2 = lynk2 
    this.lynk3 = lynk3 
  }

  render() {
    const mcard = document.createElement("div");
    const title = document.createElement("h1"); //can add in p tags later for release date desc etc
    const poster1 = document.createElement("img")
    const poster2 = document.createElement("img")
    const poster3 = document.createElement("img") 

    mcard.setAttribute("class", "card");
    mcard.setAttribute("id", "mcard");

    title.innerText = this.title
    poster1.setAttribute("src", this.lynk1)
    poster2.setAttribute("src", this.lynk2)
    poster3.setAttribute("src", this.lynk3) //set alt attribute = title 

    mcard.appendChild(title);
    mcard.appendChild(poster1);
    mcard.appendChild(poster2);
    mcard.appendChild(poster3);

    
    // let htmlString = `
    //   <h1>${this.title}</h1>
    //   <img>src = this
    // `

    return mcard; // set innerHTML of mcard to the template literal on lines 142 - 145
  }
}

//CALLING THE FUNCTIONS
document.addEventListener("DOMContentLoaded", function () {
  console.log("The DOM has loaded");
  fetchGenres();
});
