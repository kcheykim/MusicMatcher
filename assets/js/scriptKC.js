// // var apiUrl = ''
// // var apiKey = ''
// // var submitBtnEl = $('.searchBtn');
// // var input = $('input')
// // var searchResults = input.value;


var submitBtnEl = document.querySelector("#search-artist");
submitBtnEl.addEventListener("click", getLyric);
// $("#search-artist").on("click", getLyric)

function getLyric() {

    let lyricEl = document.getElementById("lyrics-p");
    $("#lyrics-p").empty();

    //if (lyricEl.hasChildNodes()) { lyricEl.removeChild(lyricEl.childNodes[0]); }
    //lyricEl.removeChild();
    debugger;
    if (submitBtnEl) {
        let artist = document.getElementById("artist-input").value;
        alert(artist);

        let song = prompt("Please type in a song: ");
        let lyricApi = "https://api.lyrics.ovh/v1/";
        fetch(lyricApi + artist + "/" + song)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        console.log(data.lyrics);
                        var parseLyric = data.lyrics.split("\r\n")[1];
                        parseLyric = replaceStr(parseLyric, "\n\n\n", "|");
                        parseLyric = replaceStr(parseLyric, "\n\n", "|");
                        parseLyric = replaceStr(parseLyric, "\n", "|");


                        const newLyric = parseLyric.split("|");
                        debugger;
                        console.log(newLyric);
                        debugger;
                        for (var i = 0; i < newLyric.length; i++) {
                            var lyrics = document.createElement("p");
                            lyrics.style.color = "yellow";
                            lyrics.style.fontSize = "15px";
                            lyrics.innerHTML = newLyric[i];
                            lyricEl.appendChild(lyrics);

                        }

                    });
                } else {
                    var errorMessage = document.createElement("p");
                    errorMessage.innerHTML = "Invalid: No such artist with this song."
                    lyricEl.append(errorMessage);
                }
            });
    }
}

function replaceStr(string, unwanted, replace) {
    return string.split(unwanted).join(replace);
}


// function getSong(songName) {
//     fetch(apiUrl + songName + searchResults)
//     .then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                 var keyId = data.dt;
//                 localStorage.setItem(keyId, songName);
//                 var song1 = $('<button class="song1" data-id="song1"></button>').text(songName);
//                 $(".title").append(song1);

//                 var artist = $('<h2 class="artist"></h2>').text("")
//                 $(".is-warning").append(artist);

//                 var lyrics = $('<p class="lyrics"></p>').text()
//                 $(".is-danger").append(lyrics);

//             });
//         } else {
//             var errorMessage = $('<p class ="is-info"><p/>').text("Please seach again");
//             $(".is-info").append(errorMessage);
//         }
//     });
// }

// submitBtnEl.on('click', getSong);
// =======
// let TasteDiveData;
// let NapsterData;
// let search;
// const apiKey = {
//     TasteDive: '426208-MusicRec-QH74RS8V',
//     Napster: 'MDc1YWUxMWUtYjY0NS00ZGI5LTgxNzEtZjRmMWY0NGQ3Nzgx'
// }

// function getSongData(search = 'metallica') {
//     let TasteDiveApi = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${search}&k=${apiKey.TasteDive}`
//     let napsterApi = "https://api.napster.com/v2.2/artists/top";

//     const options = { headers: { apikey: apiKey.Napster } };

//     fetch(TasteDiveApi)
//         .then(res => res.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err))

//     fetch(napsterApi, options)
//         .then(res => res.json())
//         .then(data => console.log(data))
//         .catch(err => console.log(err))
// };

// getSongData()