
const catImage = document.getElementById("cat-image");
const loading = document.getElementById("loading");
const button = document.getElementById("new-cat-btn");
const errorMessage = document.getElementById("error-message");

const catCount = document.getElementById("cat-count");
const likeCount = document.getElementById("like-count");
const likeButton = document.getElementById("like-btn");
const themeButton = document.getElementById("theme-btn");

let discoveredCats = 0;
let likedCats = 0;
let currentCatLiked = false;

// Fetch a random cat
async function getRandomCat() {

    loading.style.display = "block";
    loading.textContent = "Finding your cat...";
    catImage.style.display = "none";
    errorMessage.textContent = "";

    button.disabled = true;
    likeButton.disabled = true;

    try {

        // Fetch data from the public API
        const response = await fetch(
            "https://api.thecatapi.com/v1/images/search"
        );

        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        // Convert response into JSON
        const data = await response.json();

        // Get the image URL
        const imageURL = data[0].url;

        // Load the image before displaying it
        const newImage = new Image();

        await new Promise((resolve, reject) => {
            newImage.onload = resolve;
            newImage.onerror = reject;
            newImage.src = imageURL;
        });

        // Update the webpage
        catImage.src = imageURL;
        catImage.style.display = "block";
        loading.style.display = "none";

        // Update cat counter
        discoveredCats++;
        catCount.textContent = discoveredCats;

        // Reset like button for the new cat
        currentCatLiked = false;
        likeButton.textContent = "♡ Like this cat";

        button.disabled = false;
        likeButton.disabled = false;

    } catch (error) {

        loading.style.display = "none";

        errorMessage.textContent =
            "Oops! Couldn't find a cat. Please try again.";

        button.disabled = false;

        console.log(error);
    }
}

// Main button: Get another cat
button.addEventListener("click", getRandomCat);

// Like button interaction
likeButton.addEventListener("click", function() {

    if (currentCatLiked) {

        likedCats--;
        currentCatLiked = false;
        likeButton.textContent = "♡ Like this cat";

    } else {

        likedCats++;
        currentCatLiked = true;
        likeButton.textContent = "♥ Liked!";

    }

    likeCount.textContent = likedCats;

});

// Change between light and dark themes
themeButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "☀ Light Theme";
    } else {
        themeButton.textContent = "☾ Change Theme";
    }

});

// Load the first cat automatically
getRandomCat();
