const lastFmKey = 'f50b0e7f874bf3ca9a40af2dc2697097'
let artist = document.getElementById('artist-input').value;
let oldSearch = [];

function getArtist() {
    artist = document.getElementById('artist-input').value;
    oldSearch.unshift(artist);
    localStorage.setItem("artist", JSON.stringify(oldSearch));
    artist.value = "";
    let newArtist = document.createElement('button');
    newArtist.classList.add('btn-results');
    newArtist.classList.add('button');
    newArtist.classList.add('is-medium');
    newArtist.classList.add('mt-1');
    newArtist.textContent = artist;
    document.querySelector("#search-results").innerHTML = '';
    loadOldSearch();
    _getSimilarArtist(artist);
};
const _getSimilarArtist = async(search) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=${lastFmKey}&format=json&limit=5`;
    const result = await fetch(lastFM);
    const data = await result.json();
    document.getElementById('song').textContent = `${data.similarartists["@attr"].artist}`
    document.querySelector("#similar-artist").innerHTML = '';
    document.querySelector("#top-tracks").innerHTML = '';
    for (let i = 0; i < data.similarartists.artist.length; i++) {
        let similarArtistEl = document.createElement('button');
        similarArtistEl.textContent = data.similarartists.artist[i].name;
        similarArtistEl.classList.add('btn-similar-artist');
        similarArtistEl.classList.add('button');
        similarArtistEl.classList.add('is-medium');
        similarArtistEl.classList.add('mt-1');
        document.querySelector("#similar-artist").appendChild(similarArtistEl);
    };
    let savedResults = document.querySelectorAll(".btn-similar-artist");
    for (let i = 0; i < savedResults.length; i++) {
        savedResults[i].addEventListener('click', function() {
            _getTopTracks(savedResults[i].innerHTML);
        });
    };
};

const _getTopTracks = async(artistName) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${lastFmKey}&format=json&limit=5`
    const result = await fetch(lastFM)
    const data = await result.json();
    document.querySelector("#top-tracks").innerHTML = '';
    for (let i = 0; i < data.toptracks.track.length; i++) {
        let similarArtistEl = document.createElement('button');
        similarArtistEl.textContent = data.toptracks.track[i].name;
        similarArtistEl.classList.add('btn-top-tracks');
        similarArtistEl.classList.add('button');
        similarArtistEl.classList.add('is-medium');
        similarArtistEl.classList.add('mt-1');
        document.querySelector("#top-tracks").appendChild(similarArtistEl);
    };
    let savedResults = document.querySelectorAll(".btn-top-tracks");
    for (let i = 0; i < savedResults.length; i++) {
        savedResults[i].addEventListener('click', function() {
            getLyric(artistName, savedResults[i].innerHTML);
        });
    };
};

//submit button element for adding click event for our search
let searchEl = document.getElementById('search-artist');


function loadOldSearch() {
    try {
        oldSearch = JSON.parse(localStorage.getItem("artist"));
        for (let i = 0; i < 5; i++) {
            let searchEl = document.createElement(`button`);
            searchEl.textContent = `${oldSearch[i]}`;
            if (oldSearch[i] == undefined) return
            searchEl.classList.add('btn-results');
            searchEl.classList.add('button');
            searchEl.classList.add('is-medium');
            searchEl.classList.add('mt-1');
            document.querySelector("#search-results").appendChild(searchEl);
        };
        let savedResults = document.querySelectorAll(".btn-results");
        for (let i = 0; i < savedResults.length; i++) {
            savedResults[i].addEventListener('click', function() {
                document.getElementById('artist-input').value = savedResults[i].innerHTML
            });
        };
    } catch (error) {
        console.log(error);
        oldSearch = [];
    };
};

function getLyric(artist, song) {
    let lyricEl = document.getElementById('lyric');
    lyricEl.innerHTML = "";
    document.getElementById('lyric-title').textContent = "";
    document.getElementById('lyric-title').textContent += "Lyric: ";
    document.getElementById('lyric-title').textContent += song;
    let lyricApi = 'https://api.lyrics.ovh/v1/';
    fetch(lyricApi + artist + '/' + song)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    var parseLyric = data.lyrics;
                    parseLyric = replaceStr(parseLyric, '\r\n', '|');
                    parseLyric = replaceStr(parseLyric, '\n\n\n\n', '|');
                    parseLyric = replaceStr(parseLyric, '\n\n\n', '|');
                    parseLyric = replaceStr(parseLyric, '\n\n', '|');
                    parseLyric = replaceStr(parseLyric, '\n', '|');
                    const newLyric = parseLyric.split('|');
                    for (var i = 0; i < newLyric.length; i++) {
                        var lyrics = document.createElement('p');
                        lyrics.innerHTML = newLyric[i];
                        lyricEl.appendChild(lyrics);
                    }

                });
            } else {
                var errorMessage = document.createElement('p');
                errorMessage.innerHTML = 'Sorry - Lyric is unavailable.';
                lyricEl.append(errorMessage);
            }
        });

}

function replaceStr(string, unwanted, replace) {
    return string.split(unwanted).join(replace);
}

searchEl.addEventListener('click', getArtist);
loadOldSearch()