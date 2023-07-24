//Functions

let getMovie = () =>{
	let url = '../data/db.json'
	let options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}
	return fetch(url,options).then((response) =>{
		console.log(response)
		return response.json()
	})
		.then((data) =>{
			console.log(data[0].title)
		})
		.catch(error => {
			console.log(error.message)
		})
}

//IIFE
(() => {

	getMovie()


//Slide
	let slideIndex = 0;
	showSlides();

	function showSlides() {
		let i;
		let slides = document.getElementsByClassName("mySlides");
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		slideIndex++;
		if (slideIndex > slides.length) {slideIndex = 1}
		slides[slideIndex-1].style.display = "block";
		setTimeout(showSlides, 2000); // Change image every 2 seconds
	}
})();