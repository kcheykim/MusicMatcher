storeInfo();
var submitBtnEl = document.querySelector("#search-artist");
submitBtnEl.addEventListener("click", getLyric);
// $("#search-artist").on("click", getLyric)

function storeInfo() {
    let requestEl = document.getElementById("request");
    requestEl.innerHTML = "";
    for (var a = 0; a < localStorage.length; a++) { //retrieve it from the localstorage
        var artistId = localStorage.key(a);
        //create the button element
        var request = document.createElement("button");
        request.className = "button is-medium mt-1";
        request.innerHTML = artistId + " - " + localStorage.getItem(artistId);
        requestEl.appendChild(request);
    }
}

function getLyric() {

    let lyricEl = document.getElementById("lyrics-p");
    lyricEl.innerHTML = "";

    if (submitBtnEl) {
        let artist = document.getElementById("artist-input").value;
        if (!artist) { return; }
        let song = prompt("Please type in a song: ");
        if (!song) {
            return;
        }
        localStorage.setItem(artist, song);

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