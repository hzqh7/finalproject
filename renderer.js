function movieSearch() {
  var movieTitle = document.getElementById("search-input").value;

  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=4b75f613&s=${encodeURIComponent(movieTitle)}`)
    .then((response) => response.json())
    .then((data) => {
      const resultsTable = document.getElementById("resultsTable");
      const resultsBody = document.getElementById("resultsBody");
      resultsBody.innerHTML = '';

      if (data.Search && data.Search.length > 0) {
        const movies = data.Search;

        // Clear existing table body
        resultsBody.innerHTML = '';

        // Display the related movies
        movies.forEach((movie) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${movie.Title}</td>
            <td>${movie.Year}</td>
            <td>${movie.imdbID}</td>
            <td><button onclick="showMovieDetails('${movie.imdbID}')">Details</button></td>
          `;
          resultsBody.appendChild(row);
        });
      } else {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">No results found</td>';
        resultsBody.appendChild(row);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function showMovieDetails(imdbID) {
  window.location.href = `details.html?imdbID=${encodeURIComponent(imdbID)}`;
}
