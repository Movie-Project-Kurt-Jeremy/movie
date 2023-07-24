// GLOBAL VARIABLES
const searchInput = document.querySelector("#search");

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

    return fetch(url, options)
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data[0].title);
            return data;
        })
        .then((movieArray) => {
            // Search update functionality
            let movieName = searchInput.value;
            let searchedMovies = [];
            console.log(movieArray);
            for (let i = 0; i < movieArray.length; i++) {
                console.log(movieArray[i].title);
                if (movieArray[i].title.toLowerCase().includes(movieName.toLowerCase())) {
                    searchedMovies.push(movieArray[i]);
                }
            }
            return searchedMovies;
        })
        .catch(error => {
            console.log(error.message);
        });
}

// IIFE
(() => {
    // Call the function to fetch and update the movie array
    updateSearch();

    // Slide
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        slides[slideIndex - 1].style.display = "block";
        setTimeout(showSlides, 2000); // Change image every 2 seconds
    }
})();
