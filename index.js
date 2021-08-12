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
genreA.setAttribute("href", genresUrl);
genreA.innerHTML = "Genres";
topNav.appendChild(genreA);

const movieA = document.createElement("a");
movieA.setAttribute("href", moviesUrl);
movieA.innerHTML = "Movies";
topNav.appendChild(movieA);

const posterA = document.createElement("a");
posterA.setAttribute("href", postersUrl);
posterA.innerHTML = "Posters";
topNav.appendChild(posterA);

body.appendChild(topNav);

//*********** GENRE: CREATE NEW GENRE W/FETCH ******//

// const configurationObject = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
//   body: JSON.stringify({
//     dogName: "Byron",
//     dogBreed: "Poodle",
//   }),
// };

  let openPopFormBtn = document.createElement("button");
  openPopFormBtn.setAttribute("class", "open-button");
  openPopFormBtn.innerText = "Add Genre";
  body.appendChild(openPopFormBtn);
  openPopFormBtn.addEventListener("click", openForm)

  let genrePopForm = document.createElement("div");
  genrePopForm.setAttribute("class", "form-popup");
  genrePopForm.setAttribute("id", "myForm");
  let gpfInnerHtml = `
  <form action="" class="form-container">
      <h1>Add a New Genre</h1>

      <label for="title"><b>Title</b></label>
      <input type="text" placeholder="Enter Genre Name" name="title" required>

      <label for="glynk"><b>Cover Image Link</b></label>
      <input type="text" placeholder="Enter Link" name="glynk" required>

      <button type="submit" class="btn">Add Genre</button>
      <button type="submit" class="btn cancel"}>Close</button>
    </form>`;
  genrePopForm.innerHTML = gpfInnerHtml;
  body.appendChild(genrePopForm);

  function openForm() {
    document.getElementById("myForm").style.display = "block";
  }

  function closeForm() {
    document.getElementById("myForm").style.display = "none";
  }


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
    let card = new GenreCard(item.title, item.id, item.glynk);
    genreCont.appendChild(card.render());
  });
}

//***********MOVIE: RENDER *****************//
function renderMovies(movies) {
  movies.forEach((movie) => {
    fetchPosters(movie.id)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data); //clean up poster data on backend
        let card = new MovieCard(
          movie.title,
          movie.id,
          data[0].lynk,
          data[1].lynk,
          data[2].lynk
        );
        body.appendChild(card.render());
      });
  });
}

//************* POSTER: FETCH ************ */
function fetchPosters(movieId) {
  return fetch(`http://127.0.0.1:3000/movies/${movieId}/posters`);
}

//***********CARD CLASSES: GENRE & MOVIE *****************//
class GenreCard {
  constructor(title, id, glynk) {
    this.title = title;
    this.id = id;
    this.glynk = glynk;
    this.fetchMovies = this.fetchMovies.bind(this);
  }

  fetchMovies() {
    // console.log(this.id)
    fetch(`http://127.0.0.1:3000/genres/${this.id}/movies`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        document.querySelector(".genres").classList.toggle("hidden");
        renderMovies(data);
      });
  }

  render() {
    const gcard = document.createElement("div");
    gcard.setAttribute("class", "card");
    gcard.setAttribute("id", "gcard");
    const gcardimg = document.createElement("img");
    gcardimg.setAttribute("src", this.glynk);
    gcard.textContent = this.title;
    gcard.appendChild(gcardimg);

    let btn = document.createElement("button");
    btn.innerHTML = `See ${this.title} Movies`;
    btn.addEventListener("click", this.fetchMovies); //bind takes you up one context
    gcard.append(btn);

    return gcard;
  }
}

class MovieCard {
  constructor(title, id, lynk1, lynk2, lynk3) {
    this.title = title;
    this.id = id;
    this.lynk1 = lynk1;
    this.lynk2 = lynk2;
    this.lynk3 = lynk3;
  }

  render() {
    const mcard = document.createElement("div");
    const title = document.createElement("h1"); //can add in p tags later for release date desc etc
    const poster1 = document.createElement("img");
    const poster2 = document.createElement("img");
    const poster3 = document.createElement("img");

    mcard.setAttribute("class", "card");
    mcard.setAttribute("id", "mcard");

    title.innerText = this.title;
    poster1.setAttribute("src", this.lynk1);
    poster2.setAttribute("src", this.lynk2);
    poster3.setAttribute("src", this.lynk3); //set alt attribute = title

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
