function movieSearch() {
  var movieTitle = document.getElementById("search-input").value;

  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=4b75f613&s=${encodeURIComponent(movieTitle)}`)
    .then((response) => response.json())
    .then((data) => {
      const resultsTable = document.getElementById("resultsList");
      resultsTable.innerHTML = '';

      if (data.Search && data.Search.length > 0) {
        const movies = data.Search;

        // Display the related movies
        movies.forEach((movie) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${movie.Title}</td>
            <td>${movie.Year}</td>
            <td>${movie.imdbID}</td>
            <td></td>
          `;
          resultsTable.appendChild(row);
        });

        // Call the function to display movie recommendations
        displayMovieRecommendations(movies);
      } else {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">No results found</td>';
        resultsTable.appendChild(row);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to display movie recommendations based on the year
function displayMovieRecommendations(movies) {
  // Sort the movies by year (newer to older)
  const sortedMovies = movies.sort((a, b) => b.Year - a.Year);

  // Display the movie recommendations
  const recommendationsTable = document.getElementById("recommendationsList");
  recommendationsTable.innerHTML = '';

  sortedMovies.forEach((movie) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${movie.Title}</td>
      <td>${movie.Year}</td>
      <td>${movie.imdbID}</td>
      <td></td>
    `;
    recommendationsTable.appendChild(row);
  });
}
