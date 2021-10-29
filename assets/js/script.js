<<<<<<< HEAD
var apiUrl = ''
var apiKey = ''
var submitBtnEl = $('.searchBtn');
var input = $('input')
var searchResults = input.value;



function getSong(songName) {
    fetch(apiUrl + songName + searchResults)
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var keyId = data.dt;
                localStorage.setItem(keyId, songName);
                var song1 = $('<button class="song1" data-id="song1"></button>').text(songName);
                $(".title").append(song1);

                var artist = $('<h2 class="artist"></h2>').text("")
                $(".is-warning").append(artist);

                var lyrics = $('<p class="lyrics"></p>').text()
                $(".is-danger").append(lyrics);

            });
        } else {
            var errorMessage = $('<p class ="is-info"><p/>').text("Please seach again");
            $(".is-info").append(errorMessage);
        }
    });
}

submitBtnEl.on('click', getSong);
=======
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
>>>>>>> e103c059ca34e043b67891ed6021080663b05edd
