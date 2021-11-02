//submit button element for adding click event for our search
let searchEl = document.getElementById("search-artist");



function getArtist(event) {
    event.preventDefault();
    if (searchEl) {
        let artist = document.getElementById("artist-input").value
            if (!artist) {
                return;
            }
            _getSimilarArtist(artist);
    }
}

searchEl.addEventListener('click', getArtist);

//for loop -> button1-5

// document.getElementById("button1")
// document.getElementById("button2")
// document.getElementById("button3")
// document.getElementById("button4")
// document.getElementById("button5")

