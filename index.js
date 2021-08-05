function fetchGenres() {
    return fetch('http://127.0.0.1:3000/genres') .then(function(response) {
            return response.json();
            }).then(function(json) {
            renderGenres(json);
            }); }

function renderGenres(genres) {
    const body = document.querySelector('body');
    // Next steps - Create a div for row to append to append class=col then append div row to body
    genres.forEach(genres => {
        const card = document.createElement('div');
        card.setAttribute("class","card")
        card.setAttribute("id",`card-${genres.title}`)
        card.setAttribute("style","width: 18rem;")
        card.innerHTML = genres.title;
        body.appendChild(card);
    });
}

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>










document.addEventListener("DOMContentLoaded", function() {
    console.log("The DOM has loaded");
    fetchGenres();
});