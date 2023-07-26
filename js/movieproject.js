// Function to delete a movie
function deleteMovie(movieId) {
    const url = `http://localhost:3000/movies/${movieId}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Perform the DELETE request
    return fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            console.log('Movie deleted:', data);
            // Call the updateSearch function to refresh the displayed movies after deletion
            updateSearch();
        })
        .catch((error) => {
            console.log(error.message);
        });
}

// Functions
function updateSearch(e) {
    // Prevent default form submission behavior
    // e.preventDefault();

    // fetch array
    let url = 'http://localhost:3000/movies';
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // Fetch the movie data using the Fetch API
    return fetch(url, options)
        .then((response) => {
            // console.log(response);
            return response.json();
        })
        .then((data) => {
            // console.log(data[0].title);
            return data;
        })
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

            console.log(error);
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
        // Append movie cards to the container, including a delete button for each movie
        for (const movie of movies) {
            // Create a new card element for each movie
            const card = document.createElement("div");
            card.classList.add("column", "card");

            // Use innerHTML to set the content of the card with movie data
            card.innerHTML = `
        <div class="max-img-size">
        <img src="${movie.thumbnail}" alt="img" style="" class="height">
        </div>
        <input placeholder="Change Title" type="text" class="movieTitleInput">
        <h1 class="height-title">${movie.title}</h1>
        <div class="row justify-space-between">
        <button class="update-btn" data-movieId=${movie.id}>update</button>
        <button class="delete-btn">Delete</button>
        </div>
      `;

            // Create a delete button for each movie card
            const deleteButton = card.querySelector(".delete-btn");
            deleteButton.addEventListener("click", () => {
                // Call the deleteMovie function and pass the movie's id to delete it
                deleteMovie(movie.id);
            });

            const updateButton = card.querySelector(".update-btn");
            const movieTitleChangeElem = card.querySelector(".movieTitleInput")


            updateButton.addEventListener("click", function  (){
                console.log("clicked")
                const movieTitle = movieTitleChangeElem.value
               // const movieId =  this.getAttribute("data-movieId");
                 updateMovie(movie, movieTitle)
            })

            // Append the card to the movie container
            movieContainer.appendChild(card);
        }
    }
}

async function updateMovie  (movieObj, movieTitle){
    console.log(movieObj)
    // Fetch from DB with the movie ID and change the title
    const updatedInfo = {
        ...movieObj,
        title: movieTitle
    }
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedInfo)
    }

    const resp = await fetch(`http://localhost:3000/movies/${movieObj.id}`, options)
    const data = await resp.json();
    return data;
}
function addMovie(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const newMovie = {
        title: formData.get('title'),
    };

    // Make the POST request to add the new movie
    const url = 'http://localhost:3000/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newMovie)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('New movie added:', data);
            // Call the updateSearch function to refresh the displayed movies after addition
            // updateSearch();
        })
        .catch(error => {
            console.error('Error adding movie:', error.message);
        });

    // Reset the form fields after submission
    form.reset();
}


// GLOBAL VARIABLES


// EVENTS
const addMovieForm = document.querySelector("#addMovieForm");
addMovieForm.addEventListener("submit", addMovie);

// const searchInput = document.querySelector("#search");
// searchInput.addEventListener("input", updateSearch);

// IIFE
(() => {
    // Call the function to fetch and update the movie array
    // updateSearch();

})();
// updateSearch();
// Event Listener for search input
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", updateSearch);
