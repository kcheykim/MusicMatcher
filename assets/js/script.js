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


//-------------------------------------------------------------------------------//

const lastFmKey = 'f50b0e7f874bf3ca9a40af2dc2697097'

const _getSimilarArtist = async (search) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=${lastFmKey}&format=json&limit=5`
    const result = await fetch(lastFM)
    const data = await result.json();
    return data.similarartists.artist
}

const _getTopTracks = async (artistName) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${lastFmKey}&format=json&limit=5`
    const result = await fetch(lastFM)
    const data = await result.json();
    return data.toptracks.track
}

//replace metallica and  Daft Punk with artists name 
const SimilarArtist = _getSimilarArtist('metallica')
const artistTopTracks = _getTopTracks('Daft Punk')