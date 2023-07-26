// // Functions
// function updateSearch(e) {
//     // Prevent default form submission behavior
//     // e.preventDefault();
//
//     // fetch array
//     let url = 'http://localhost:3000/movies';
//     let options = {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     // Fetch the movie data using the Fetch API
//     return fetch(url, options)
//         .then((response) => {
//             console.log(response);
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data[0].title);
//             return data;
//         })
//         .then((movieArray) => {
//             // Search update functionality
//             console.log(movieArray);
//             let movieName = searchInput.value;
//             let searchedMovies = [];
//
//             // If the search input is empty, display no movies
//             if (movieName === "") {
//                 searchedMovies = movieArray.slice(0, 0);
//             } else {
//                 // Filter movies based on the search input (case-insensitive)
//                 for (let i = 0; i < movieArray.length; i++) {
//                     if (movieArray[i].title.toLowerCase().includes(movieName.toLowerCase())) {
//                         searchedMovies.push(movieArray[i]);
//                     }
//                 }
//             }
//
//             // Display the filtered movies on the cards
//             displayMovies(searchedMovies);
//             return searchedMovies;
//         })
//         .catch((error) => {
//             console.log(error.message);
//         });
// }
//
// function displayMovies(movies) {
//     // Get the container element where the cards will be appended
//     const movieContainer = document.querySelector(".append-cards .row");
//
//     // Clear previous movie cards by setting the innerHTML to an empty string
//     movieContainer.innerHTML = "";
//
//     // Check if there are movies to display
//     if (movies.length === 0) {
//         const noResultsElement = document.createElement("p");
//         noResultsElement.textContent = "";
//         noResultsElement.classList.add("noResults")
//         noResultsElement.classList.add("text-white")
//         movieContainer.appendChild(noResultsElement);
//     } else {
//         // Append movie cards to the container, but limit it to the first 4 movies
//         const maxMoviesToShow = 4;
//         let appendedMoviesCount = 0;
//
//         for (const movie of movies) {
//             // Check if the maximum number of movies has been appended
//             if (appendedMoviesCount >= maxMoviesToShow) {
//                 break;
//             }
//
//             // Create a new card element for each movie
//             const card = document.createElement("div");
//             card.classList.add("column", "card");
//
//             // Use innerHTML to set the content of the card with movie data
//             card.innerHTML = `
//         <div class="max-img-size">
//         <img src="${movie.thumbnail}" alt="img" style="" class="height">
//         </div>
//         <h1 class="height-title">${movie.title}</h1>
//         <h2><span class="small-text">${movie.cast[0]}, ${movie.cast[1]}, ${movie.cast[2]}</span></h2>
//         <div class="row justify-space-between">
//         <button>Add</button>
//         </div>
//
//
//       `;
//
//             // Append the card to the movie container
//             movieContainer.appendChild(card);
//
//             // Increment the appended movies count
//             appendedMoviesCount++;
//         }
//     }
// }
// Functions

const searchInput = document.querySelector("#search");

searchInput.addEventListener('keyup', (e) => {
    updateSearch(searchInput.value)

    if(e.keyCode === 13) {
        console.log(searchInput.value)
    }
});
function displayMovies(movies = "Full Metal Jacket") {
    console.log(movies)
    // Get the container element where the cards will be appended
    const movieContainer = document.querySelector(".append-cards");

    // Clear previous movie cards by setting the innerHTML to an empty string
    movieContainer.innerHTML = "";

    // Check if there are movies to display
    if (movies.length === 0) {
        const noResultsElement = document.createElement("p");
        noResultsElement.textContent = "";
        noResultsElement.classList.add("noResults")
        noResultsElement.classList.add("text-white")
        movieContainer.appendChild(noResultsElement);
        console.log("inside if statement")
    } else {
        // Append movie cards to the container, but limit it to the first 4 movies
        const maxMoviesToShow = 4;
        let appendedMoviesCount = 0;

        for (let j = 0; j < movies.length; j++) {
            for(let k = 0; k < movies[j].results.length; k++){

                // Check if the maximum number of movies has been appended
                if (appendedMoviesCount >= maxMoviesToShow) {
                    break;
                }
                console.log(appendedMoviesCount)
                console.log("inside else statement")
                // console.log(movie.results[j].original_title)
                // Create a new card element for each movie
                const card = document.createElement("div");
                card.classList.add("column", "card");
                console.log(card)
                // Use innerHTML to set the content of the card with movie data
                card.innerHTML = `
      <div class="max-img-size">
        <img src="${movies[j].results[k].poster_path}" alt="img">
        </div>
        <h1 >${movies[j].results[k].original_title}</h1>
        <p>${movies[j].results[k].overview}</p>
      

        </div>
      `;
                console.log(card)
                // Append the card to the movie container
                movieContainer.appendChild(card);

                // Increment the appended movies count
                appendedMoviesCount++;
                console.log(appendedMoviesCount)
            }
        }
    }

}
function updateSearch(searchInput="Full Metal Jacket") {
    // Prevent default form submission behavior
    // e.preventDefault();

    // console.log(searchInput.value)
    // fetch array
    let url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchInput)}&api_key=${TMDB_KEY}`;
    let options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_KEY}`
        }
    };
    // Fetch the movie data using the Fetch API
    return fetch(url, options)
        .then((response) => {
            console.log(response);
            console.log(searchInput)
            return response.json();
        })
        .then((data) => {
            console.log(data)
            return data;
        })
        .then((movieArray) => {
            // Search update functionality
            console.log(movieArray.results[0].poster_path);
            let movieName = searchInput.value;
            let searchedMovies = [];
            console.log(movieArray.results.length)
            // If the search input is empty, display no movies
            // if (movieName === "") {
            // 	searchedMovies = movieArray.slice(0, 0);
            // } else {
            // Filter movies based on the search input (case-insensitive)
            for (let i = 0; i < movieArray.results.length; i++) {
                if (movieArray.results[i].original_title.toLowerCase().includes(searchInput.toLowerCase())) {
                    searchedMovies.push(movieArray);

                }
                console.log(searchedMovies)
            }

            // Display the filtered movies on the cards

            displayMovies(searchedMovies);
            return searchedMovies;
        })
        .catch((error) => {
            console.log(error.message);
        });
}

// function displayFavoriteMovies(favoriteMovies){
// 	const favoriteMovieContainer = document.querySelector(".append-favorite-movies .row");
// 	favoriteMovieContainer.innerHTML = "";



// displayFavoriteMovies()

// GLOBAL VARIABLES


// EVENTS


// IIFE
(() => {
    // Call the function to fetch and update the movie array
    // updateSearch();

    // Slide
    let slideIndex = 0;
    showSlides();

    function showSlides() {

        // Call the showSlides function recursively after 2 seconds
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
    // Get the modal
    let modal = document.getElementById("myModal");

// Get the button that opens the modal
    let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
    let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
})();
// })();

// Event Listener for search input
// const searchInput = document.querySelector("#search");
// searchInput.addEventListener("input", updateSearch);
