//*** TODO ****//
//Main Goals: Achieved
//Stretch Goals: Add Poster, Add Movie, Sort Posters by Vote, Advanced CSS Styling

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
genreA.setAttribute(
  "href",
  "file://wsl%24/Ubuntu/home/iamrivera/phasefour/project_four/try-this-again-api/index.html"
);
genreA.innerHTML = "Home";
topNav.appendChild(genreA);

// const movieA = document.createElement("a");
// movieA.setAttribute("href", moviesUrl);
// movieA.innerHTML = "Movies";
// topNav.appendChild(movieA);

// const posterA = document.createElement("a");
// posterA.setAttribute("href", postersUrl);
// posterA.innerHTML = "Posters";
// topNav.appendChild(posterA);

body.appendChild(topNav);

const movieContainer = document.createElement("div");
movieContainer.setAttribute("class", "movie-container");
body.appendChild(movieContainer);

const logo = document.createElement("div");
logo.setAttribute("class", "logo");
const logoImg = document.createElement("img");
logoImg.setAttribute("src","https://myproject-images.s3.us-east-2.amazonaws.com/PosterRoasterLogo_Test.PNG");
logo.appendChild(logoImg);
topNav.appendChild(logo);

//*********** GENRE: CREATE NEW GENRE W/FETCH POST ******//

let openPopFormBtn = document.createElement("button");
openPopFormBtn.setAttribute("class", "open-button");
openPopFormBtn.innerText = "Add Genre";
body.appendChild(openPopFormBtn);
openPopFormBtn.addEventListener("click", openForm);

let genrePopForm = document.createElement("div");
genrePopForm.setAttribute("class", "form-popup");
genrePopForm.setAttribute("id", "myForm");
let gpfInnerHtml = `
  <form action="/action_page.php" class="form-container" id="theForm">
      <h1>Add a New Genre</h1>

      <label for="title"><b>Title</b></label>
      <input type="text" id="formtitle" placeholder="Enter Genre Name" name="title" required>

      <label for="glynk"><b>Cover Image Link</b></label>
      <input type="text" id="formglynk" placeholder="Enter Link" name="glynk" required>

      <button type="submit" class="btn" >Add Genre</button>
    </form>`;
genrePopForm.innerHTML = gpfInnerHtml;
body.appendChild(genrePopForm);

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

const theForm = document.getElementById("theForm");
const closeBtn = document.createElement("button");
closeBtn.className = "btn-cancel";
closeBtn.id = "close-button";
closeBtn.textContent = "👎";
genrePopForm.appendChild(closeBtn);
closeBtn.addEventListener("click", closeForm);

theForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    title: `${document.getElementById("formtitle").value}`,
    glynk: `${document.getElementById("formglynk").value}`,
  };

  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  };

  fetch(genresUrl, configurationObject);

  location.reload();
});

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
        console.log(data);
        let card = new MovieCard(
          movie.title,
          movie.id,
          data[0].id,
          data[0].lynk,
          data[0].votes,
          data[1].id,
          data[1].lynk,
          data[1].votes,
          data[2].id,
          data[2].lynk,
          data[2].votes
        );
        movieContainer.appendChild(card.render());
      });
  });
}

//************* POSTER: FETCH *************//
function fetchPosters(movieId) {
  return fetch(`http://127.0.0.1:3000/movies/${movieId}/posters`);
}

//***********CARD CLASSES: GENRE *****************//
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

//***********CARD CLASSES: POSTERS *****************//
class PosterCard {
  constructor(id, lynk, votes) {
    this.id = id;
    this.lynk = lynk;
    this.votes = votes;
    this.voteNow = this.voteNow.bind(this);
  }

  render() {
    const pcard = document.createElement("div");
    pcard.setAttribute("class", "pcard");

    const poster = document.createElement("img");
    poster.src = this.lynk;

    const votes = document.createElement("p");
    votes.textContent = `Votes: ${this.votes}`;

    const pbtn = document.createElement("button");
    pbtn.textContent = "Vote Now!";
    // pbtn1.dataset.id = this.id1 //custom attributes in html
    pbtn.addEventListener("click", this.voteNow);
    pcard.appendChild(pbtn);
    pcard.appendChild(votes);
    pcard.appendChild(poster);

    return pcard;
  }

  voteNow(e) {
    fetch(`http://127.0.0.1:3000/posters/${this.id}/add_vote`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        alert(`${data["message"]}`);
        e.target.nextElementSibling.textContent = `Votes: ${data.votes}`;
      });
  }
}

//***********CARD CLASSES: MOVIES *****************//
class MovieCard {
  constructor(
    title,
    id,
    id1,
    lynk1,
    vote1,
    id2,
    lynk2,
    vote2,
    id3,
    lynk3,
    vote3
  ) {
    this.title = title;
    this.id = id;
    this.lynk1 = lynk1;
    this.lynk2 = lynk2;
    this.lynk3 = lynk3;
    this.vote1 = vote1;
    this.vote2 = vote2;
    this.vote3 = vote3;
    this.id1 = id1;
    this.id2 = id2;
    this.id3 = id3;
  }

  render() {
    const mcard = document.createElement("div");
    const title = document.createElement("h1");

    let poster1 = new PosterCard(this.id1, this.lynk1, this.vote1);
    let poster2 = new PosterCard(this.id2, this.lynk2, this.vote2);
    let poster3 = new PosterCard(this.id3, this.lynk3, this.vote3);

    mcard.setAttribute("class", "mcard");

    title.innerText = this.title;

    mcard.appendChild(title);
    mcard.appendChild(poster1.render());
    mcard.appendChild(poster2.render());
    mcard.appendChild(poster3.render());

    return mcard;
  }
}

//***********GO!!!!!*****************//
document.addEventListener("DOMContentLoaded", function () {
  console.log("The DOM has loaded");
  fetchGenres();
});
