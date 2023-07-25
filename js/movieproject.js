// Functions
function updateSearch(e) {
    // Prevent default form submission behavior
    // e.preventDefault();

    // fetch array
    let url = '../data/db.json';
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Fetch the movie data using the Fetch API
    return fetch(url, options)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            // loop to get id's for the movies
            for (let i = 0; i < data.length; i++) {
                data[i].id = i;
                let movieId = data[i].id;
                console.log(movieId)
                // movieId === the id number per movie
                let favoriteMovieIdsArray = []
            }
            console.log(data);
            return data;
        })
        .then((data) => {
                // console.log(data);
                let movieId =  data.id
                //     console.log(movieId);
                return data
            }
        )
        .then((movieArray) => {
            // Search update functionality
            console.log(movieArray);
            let movieName = searchInput.value;
            let searchedMovies = [];

            // If the search input is empty, display no movies
            if (movieName === "") {
                searchedMovies = movieArray.slice(0, 0);
            } else {
                // Filter movies based on the search input (case-insensitive)
                for (let i = 0; i < movieArray.length; i++) {
                    if (movieArray[i].title.toLowerCase().includes(movieName.toLowerCase())) {
                        searchedMovies.push(movieArray[i]);
                    }
                }
            }

            // Display the filtered movies on the cards
            displayMovies(searchedMovies);
            return searchedMovies;
        })
        .catch((error) => {
            console.log(error.message);
        });
}

function displayMovies(movies) {
    // Get the container element where the cards will be appended
    const movieContainer = document.querySelector(".append-cards .row");

    // Clear previous movie cards by setting the innerHTML to an empty string
    movieContainer.innerHTML = "";

    // Check if there are movies to display
    if (movies.length === 0) {
        const noResultsElement = document.createElement("p");
        noResultsElement.textContent = "";
        noResultsElement.classList.add("noResults")
        noResultsElement.classList.add("text-white")
        movieContainer.appendChild(noResultsElement);
    } else {
        // Append movie cards to the container, but limit it to the first 4 movies
        const maxMoviesToShow = 4;
        let appendedMoviesCount = 0;

        for (const movie of movies) {
            // Check if the maximum number of movies has been appended
            if (appendedMoviesCount >= maxMoviesToShow) {
                break;
            }

            // Create a new card element for each movie
            const card = document.createElement("div");
            card.classList.add("column", "card");

            // Use innerHTML to set the content of the card with movie data
            card.innerHTML = `
        <div class="max-img-size">
        <img src="${movie.thumbnail}" alt="img" style="" class="height">
        </div>
        <h1 class="height-title">${movie.title}</h1>
        <h2><span class="small-text">${movie.cast[0]}, ${movie.cast[1]}, ${movie.cast[2]}</span></h2>
        <div class="row justify-space-between">
          <button data-id = "${movie.id}" class="addToFavoritesBtn">Add</button>
        </div>
      
        
      `;

            // Append the card to the movie container
            movieContainer.appendChild(card);

            // Increment the appended movies count
            appendedMoviesCount++;
        }
    }
}


// Global variables
const addToFavoritesButton = document.querySelectorAll(".addToFavoritesBtn")

/// EVENTS
addToFavoritesButton.addEventListener("click", (e) => {
    console.log(e.target)
})



    // IIFE
    (() => {
        // Call the function to fetch and update the movie array
        updateSearch();

        // Slide
        let slideIndex = 0;
        showSlides();

        function showSlides() {

            // Call the showSlides function recursively after 2 seconds
            setTimeout(showSlides, 2000); // Change image every 2 seconds
        }
    })();

// Event Listener for search input
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", updateSearch);
