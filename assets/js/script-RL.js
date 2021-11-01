var apiUrl = ' https://https://api.discogs.com/'
var apiKey = ''

//element for appending songs
var requestSongEl = document.getElementById("request-song")
//element for appending artists
var artistInfo = document.getElementById("song-info")
//element for appending lyrics
var lyricsP = document.getElementById("lyrics-p")

//submit button element for adding click event for our search
var submitBtnEl = document.getElementById("search-artist");
//target searchBtn's parent element of search button for appending error message below 'search button'
var SearchBtnEl = document.getElementsByClassName("searchBtn")






function getArtist(event) {
    event.preventDefault();
    if (submitBtnEl) {
        let artist = document.getElementById("artist-input").val

        // https://https://api.discogs.com/artists/1/releases?page=2&per_page=75
        fetch(apiUrl + input)
        .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var keyId = data.dt;
                localStorage.setItem(keyId, songName);
                
                // // var song1 = $('<button class="song1" data-id="song1"></button>').text(songName);
                var song1 = document.createElement("button")
                // song1.innerText = ""
                song1.setAttribute('id', 'song1')
                requestSongEl.appendChild(song1)


                // var artist = $('<h2 class="artist"></h2>').text("")
                var artist;
                var artistEl = document.createElement("h2")
                artistEl.innerText = ""
                artistEl.setAttribute('id', 'artist-name')
                artistInfo.appendChild(artist);

                //fetch lyrics

                var lyricsEl = document.createElement("p")                
                lyricsEl.innerText = ""
                lyricsEl.setAttribute('id','fetched-lyrics')
                lyricsP.append(lyricsEl);

            });
        } else {
            
            var errorMessage = document.createElement("p")
            errorMessage.innerText = "Please seach again"
            errorMessage.setAttribute('id' , 'error-message')
            //append error message under search button if there is an error
            SearchBtnEl.appendChild(errorMessage);

        }
    });
    }
}

submitBtnEl.addEventListener('click', getArtist);


let TasteDiveData;
let NapsterData;
let search;
const apiKey = {
    TasteDive: '426208-MusicRec-QH74RS8V',
    Napster: 'MDc1YWUxMWUtYjY0NS00ZGI5LTgxNzEtZjRmMWY0NGQ3Nzgx'
}

function getSongData(search = 'metallica') {
    let TasteDiveApi = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${search}&k=${apiKey.TasteDive}`
    let napsterApi = "https://api.napster.com/v2.2/artists/top";

    const options = {headers: {apikey: apiKey.Napster}};

    fetch(TasteDiveApi)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

    fetch(napsterApi, options)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
};

getSongData()

