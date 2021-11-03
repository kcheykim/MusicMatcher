const lastFmKey = 'f50b0e7f874bf3ca9a40af2dc2697097'
let oldSearch = [];

const _getSimilarArtist = async (search) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=${lastFmKey}&format=json&limit=5`
    const result = await fetch(lastFM)
    const data = await result.json();
    console.log(data)
    return data.similarartists.artist
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


function getArtist(event) {
    event.preventDefault();
    if (searchEl) {
        let artist = document.getElementById('artist-input').value;
        if (!artist) {
            return;
        }   
        oldSearch.push(artist);
        localStorage.setItem("artist", JSON.stringify(oldSearch));
        artist.value = "";

        _getSimilarArtist(artist);

        getLyric(artist); //need to get rid of this once pass the artist from Kurtis function

    }    
}    

searchEl.addEventListener('click', getArtist);

function loadOldSearch() {
    try {
      oldSearch = JSON.parse(localStorage.getItem("artist"));
      for (let i = 0; i < oldSearch.length; i++) {
        let searchEl = document.createElement(`button${i}`);
        searchEl.textContent = `${oldSearch[i]}`;
        searchEl.classList.add('btn-results');
        searchEl.classList.add('is-medium mt-1');
        document.querySelector("#search-results").appendChild(searchEl);
      };
      let savedResults = document.querySelectorAll(".btn-results");
      for (let i = 0; i < savedResults.length; i++) {
        savedResults[i].addEventListener('click', function () {
          nameInputEl.value = savedResults[i].innerHTML;
        });
      };
    } catch (error) {
      console.log(error)
      oldSearch = [];
    }
  }

//-------------------------------------------------------------------------------//

//for loop -> button1-5

let top1 = document.getElementById("button1");
let top2 = document.getElementById("button2");
let top3 = document.getElementById("button3");
let top4 = document.getElementById("button4");
let top5 = document.getElementById("button5");

// top1.addEventListener('click', )
// top2.addEventListener('click', )
// top3.addEventListener('click', )
// top4.addEventListener('click', )
// top5.addEventListener('click', )


//-------------------------------------------------------------------------------//


//replace metallica and  Daft Punk with artists name 
const SimilarArtist = _getSimilarArtist('metallica')
const artistTopTracks = _getTopTracks('Daft Punk')


function getLyric(artist , song) {
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