
const catImage = document.getElementById("cat-image");
const loading = document.getElementById("loading");
const button = document.getElementById("new-cat-btn");
const errorMessage = document.getElementById("error-message");

// Function to fetch a random cat
async function getRandomCat() {

    // Show loading message
    loading.style.display = "block";
    loading.textContent = "Finding your cat...";
    catImage.style.display = "none";
    errorMessage.textContent = "";
    button.disabled = true;

    try {

        // Fetch data from the public API
        const response = await fetch(
            "https://api.thecatapi.com/v1/images/search"
        );

        // Check if the request was successful
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        // Convert the response into JSON
        const data = await response.json();

        // Get the image URL from the API response
        const imageURL = data[0].url;

        // Create an image and wait for it to load
        const newImage = new Image();
        newImage.src = imageURL;

        newImage.onload = function() {
            catImage.src = imageURL;
            catImage.style.display = "block";
            loading.style.display = "none";
            button.disabled = false;
        };

        newImage.onerror = function() {
            throw new Error("Could not load the image.");
        };

    } catch (error) {

        // Display an error if something fails
        loading.style.display = "none";
        errorMessage.textContent =
            "Oops! Couldn't find a cat. Please try again.";

        button.disabled = false;

        console.log(error);

    }
}

// Run the function when the button is clicked
button.addEventListener("click", getRandomCat);

// Automatically load a cat when the page opens
getRandomCat();
