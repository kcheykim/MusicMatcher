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