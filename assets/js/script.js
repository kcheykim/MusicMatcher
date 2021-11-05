let audio = null;
let artist = document.getElementById('artist-input').value;
let oldSearch = [];
let artistName = null;

const options = {
    headers: {
        apikey: 'MDc1YWUxMWUtYjY0NS00ZGI5LTgxNzEtZjRmMWY0NGQ3Nzgx'
    }
};

function getArtist() {
    document.getElementById('lookup-artist').textContent = 'Artist';
    document.getElementById('display-artists').textContent = 'Similar Artists';
    artist = document.getElementById('artist-input').value;
    artistName = artist;

    oldSearch.unshift(artist);
    localStorage.setItem("artist", JSON.stringify(oldSearch));
    artist.value = "";
    _getArtistID(artist.toLowerCase().replace(' ', '-'));
};

const _getArtistID = async(search) => {
    try {
        const result = await fetch(`https://api.napster.com/v2.2/artists/${search}`, options);
        const data = await result.json();
        document.getElementById('lookup-artist').textContent = `${data.artists[0].name}`;
        _getSimilarArtist(data.artists[0].id);
        let newArtist = document.createElement('button');
        newArtist.classList.add('btn-results');
        newArtist.classList.add('button');
        newArtist.classList.add('is-medium');
        newArtist.classList.add('mt-1');
        newArtist.textContent = artist;
        document.querySelector("#search-results").innerHTML = '';
        loadOldSearch();
    } catch (error) {
        document.getElementById('look-artist').textContent = 'Invalid Song';
    }
};

const _getArtistsImage = async(artist_id) => {
    try {

        const result = await fetch(`https://api.napster.com/v2.2/artists/${artist_id}/images`, options);
        const data = await result.json();
        document.getElementById('artist-img').style.display = 'block';
        document.getElementById('artist-img').setAttribute('src', `${data.images[0].url}`);
    } catch (error) {
        document.getElementById('artist-img').setAttribute('src', ``);
    }
}


const _getSimilarArtist = async(search) => {
    const result = await fetch(`http://api.napster.com/v2.2/artists/${search}/similar?`, options);
    const data = await result.json();

    document.querySelector("#similar-artist").innerHTML = '';
    document.querySelector("#top-tracks").innerHTML = '';
    try {
        for (let i = 0; i < 5; i++) {
            let similarArtistEl = document.createElement('button');
            similarArtistEl.textContent = data.artists[i].name;
            similarArtistEl.classList.add('btn-similar-artist');
            similarArtistEl.classList.add('button');
            similarArtistEl.classList.add('is-medium');
            similarArtistEl.classList.add('mt-1');
            similarArtistEl.setAttribute('id', `${data.artists[i].id}`);
            document.querySelector("#similar-artist").appendChild(similarArtistEl);
        };
        let savedResults = document.querySelectorAll(".btn-similar-artist");
        for (let i = 0; i < savedResults.length; i++) {
            savedResults[i].addEventListener('click', function() {
                _getTopTracks(savedResults[i].id);
                _getArtistsImage(savedResults[i].id);
                document.getElementById('artist-img').setAttribute('alt', `${data.artists[i].name} of band`);
                document.getElementById('image-title').textContent = data.artists[i].name;

            });
        };
    } catch (error) {};
};

const _getTopTracks = async(artistID) => {
    document.getElementById('track-title').textContent = 'Top Five Tracks';
    const result = await fetch(`https://api.napster.com/v2.2/artists/${artistID}/tracks/top?limit=5`, options);
    const data = await result.json();
    document.getElementById('track-title').innerHTML = 'Top Five Tracks';
    document.querySelector("#top-tracks").innerHTML = '';
    try {
        for (let i = 0; i < 5; i++) {
            let similarArtistEl = document.createElement('button');
            similarArtistEl.textContent = data.tracks[i].name;
            similarArtistEl.classList.add('btn-top-tracks');
            similarArtistEl.classList.add('button');
            similarArtistEl.classList.add('is-medium');
            similarArtistEl.classList.add('mt-1');
            document.querySelector("#top-tracks").appendChild(similarArtistEl);
        };
        let savedResults = document.querySelectorAll(".btn-top-tracks");
        for (let i = 0; i < savedResults.length; i++) {
            savedResults[i].addEventListener('click', function() {
                getLyric(data.tracks[i].artistName, savedResults[i].innerHTML);
                audio = new Audio(data.tracks[i].previewURL);
            });
        };
    } catch (error) {};
};

let searchEl = document.getElementById('search-artist');


function getLyric(artist, song) {
    let lyricEl = document.getElementById('lyric');
    lyricEl.innerHTML = "";
    document.getElementById('lyric-title').textContent = '';
    document.getElementById('lyric-title').textContent += "Lyric: ";
    document.getElementById('lyric-title').textContent += song;
    document.getElementById('lyric').style.cssText += 'height:300px;overflow-y:auto;background-image:linear-gradient(black, green)';

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
            };
        });

};

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
                document.getElementById('artist-input').value = savedResults[i].innerHTML;
            });
        };
    } catch (error) {
        oldSearch = [];
    };
};

function replaceStr(string, unwanted, replace) {
    return string.split(unwanted).join(replace);
};

function play() {
    try {
        audio.play();
    } catch (error) {}
};

function pause() {
    try {
        audio.pause();
    } catch (error) {}
};

searchEl.addEventListener('click', getArtist);
loadOldSearch();