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

    let lyricEl = document.getElementById("lyric");
    lyricEl.innerHTML = "";

    if (submitBtnEl) {
        let artist = document.getElementById("artist-input").value;
        if (!artist) { return; }
        let song = prompt("Please type in a song: ");
        if (!song) {
            return;
        }
        let lyricTitleEl = document.getElementById("lyric-title");
        lyricTitleEl += ": " + song;
        localStorage.setItem(artist, song);

        let lyricApi = "https://api.lyrics.ovh/v1/";
        fetch(lyricApi + artist + "/" + song)
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(data) {
                        var parseLyric = data.lyrics.split("\r\n")[1];
                        parseLyric = replaceStr(parseLyric, "\n\n\n", "|");
                        parseLyric = replaceStr(parseLyric, "\n\n", "|");
                        parseLyric = replaceStr(parseLyric, "\n", "|");
                        const newLyric = parseLyric.split("|");
                        for (var i = 0; i < newLyric.length; i++) {

                            var lyrics = document.createElement("p");
                            // lyrics.style.color = "yellow";
                            // lyrics.style.fontSize = "15px";
                            lyrics.innerHTML = newLyric[i];
                            lyricEl.appendChild(lyrics);
                        }

                        // lyricEl.innerHTML = JSON.parse(data.lyrics);
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

// url Async requesting function
function httpGetAsync(theUrl, callback) {
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}
let responsetext = "dua lipa"
    // callback for GIF categories
function tenorCallback_categories(responsetext) {
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    categories = response_objects["tags"];

    // load the categories - example is for the first category

    // url to load:
    var imgurl = categories[0]["image"];

    // text to overlay on image:
    var txt_overlay = categories[0]["name"];


    // search to run if user clicks the category
    var category_search_path = categories[0]["path"];

    document.getElementById("category_gif").src = imgurl
    document.getElementById("catgif_caption").innerHTML = txt_overlay
    document.getElementById("cat_link").href = category_search_path

    return;
}

function grab_data() {
    // set the apikey and limit
    var apikey = "SCEYCNJDEOWA";
    var lmt = 10;

    // get the current list of categories - using the default locale of en_US
    var cat_url = "https://g.tenor.com/v1/categories?key=" + apikey;

    httpGetAsync(cat_url, tenorCallback_categories);

    // data will be loaded by each call's callback
    return;
}

grab_data();