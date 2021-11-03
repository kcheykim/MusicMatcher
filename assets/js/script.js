const lastFmKey = 'f50b0e7f874bf3ca9a40af2dc2697097'
let artist = document.getElementById('artist-input').value;
let oldSearch = [];

const _getSimilarArtist = async (search) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=${lastFmKey}&format=json&limit=5`;
    const result = await fetch(lastFM);
    const data = await result.json();
    document.querySelector("#similar-artist").innerHTML = '';
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
        savedResults[i].addEventListener('click', function () {
            _getTopTracks(savedResults[i]);
        });
    };
}

const _getTopTracks = async (artistName) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${lastFmKey}&format=json&limit=5`
    const result = await fetch(lastFM)
    const data = await result.json();
    console.log(data)
    return data.toptracks.track
}

//submit button element for adding click event for our search
let searchEl = document.getElementById('search-artist');

function getArtist() {
    artist = document.getElementById('artist-input').value;
    oldSearch.unshift(artist);
    localStorage.setItem("artist", JSON.stringify(oldSearch));
    artist.value = "";
    
    // fix issue with going past 5 results 
    let newArtist = document.createElement('button');
    newArtist.classList.add('btn-results');
    newArtist.classList.add('button');
    newArtist.classList.add('is-medium');
    newArtist.classList.add('mt-1');
    newArtist.textContent = artist;
    document.querySelector("#search-results").innerHTML = '';
    loadOldSearch();

    _getSimilarArtist(artist);
}
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
            savedResults[i].addEventListener('click', function () {
                document.getElementById('artist-input').value = savedResults[i].innerHTML
            });
        };
    } catch (error) {
        console.log(error)
        oldSearch = [];
    };
};


function getLyric(artist, song) {
    let lyricEl = document.getElementById('lyric');
    lyricEl.innerHTML = "";
    if (!song) {
        return;
    }
    let lyricApi = 'https://api.lyrics.ovh/v1/';
    fetch(lyricApi + artist + '/' + song)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data.lyrics);
                var parseLyric = data.lyrics.split('\r\n')[1];
                parseLyric = replaceStr(parseLyric, '\n\n\n', '|');
                parseLyric = replaceStr(parseLyric, '\n\n', '|');
                parseLyric = replaceStr(parseLyric, '\n', '|');
                const newLyric = parseLyric.split('|');
                for (var i = 0; i < newLyric.length; i++) {
                    var lyrics = document.createElement('p');
                    lyrics.style.color = 'yellow';
                    lyrics.style.fontSize = '15px';
                    lyrics.innerHTML = newLyric[i];
                    lyricEl.appendChild(lyrics);
                }
            });
        } else {
            var errorMessage = document.createElement('p');
            errorMessage.innerHTML = 'Invalid: No such artist with this song.';
            lyricEl.append(errorMessage);
        }
    });
    
}

function replaceStr(string, unwanted, replace) {
    return string.split(unwanted).join(replace);
}



searchEl.addEventListener('click', getArtist);
loadOldSearch()