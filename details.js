window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('imdbID');
  
    if (imdbID) {
      fetchMovieDetails(imdbID)
        .then((movie) => {
          displayMovieDetails(movie);
        })
        .catch((error) => {
          console.error(error);
          displayMovieDetails(null);
        });
    } else {
      displayMovieDetails(null);
    }
  });
  
  async function fetchMovieDetails(imdbID) {
    const url = `https://www.omdbapi.com/?apikey=fa362c73&i=${encodeURIComponent(imdbID)}&plot=full`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  }
  
  function displayMovieDetails(movie) {
    const moviePosterContainer = document.getElementById('moviePoster');
    const movieDetailsContainer = document.getElementById('movieDetails');
  
    if (movie) {
      moviePosterContainer.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title} Poster" width="400">
      `;
  
      movieDetailsContainer.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Release Year:</strong> ${movie.Year}</p>
        <p><strong>IMDb ID:</strong> ${movie.imdbID}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Cast:</strong> ${movie.Actors}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
      `;
    } else {
      movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
    }
  }
  