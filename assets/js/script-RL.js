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



//-------------------------------------------------------------------------------//

//for loop -> button1-5

let top1 = document.getElementById("button1")
let top2 = document.getElementById("button2")
let top3 = document.getElementById("button3")
let top4 = document.getElementById("button4")
let top5 = document.getElementById("button5")

top1.addEventListener('click', )
top2.addEventListener('click', )
top3.addEventListener('click', )
top4.addEventListener('click', )
top5.addEventListener('click', )


<<<<<<< HEAD
//-------------------------------------------------------------------------------//
=======
//-------------------------------------------------------------------------------//
>>>>>>> d2e04d778d542a593182e407a9de24513ee707d9
