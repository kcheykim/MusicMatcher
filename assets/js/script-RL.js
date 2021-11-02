//submit button element for adding click event for our search
let searchEl = document.getElementById("search-artist");



function getArtist(event) {
    event.preventDefault();
    if (searchEl) {
        let artist = document.getElementById("artist-input").value
            if (!artist) {
                return;
            }
            _getSimilarArtist(artist);
    }
}


                // var artist = $('<h2 class="artist"></h2>').text("")
                var artist;
                var artistEl = document.createElement("h2")
                artistEl.innerText = ""
                artistEl.setAttribute('id', 'artist-name')
                artistInfo.appendChild(artist);



            });
        } else {
            
            var errorMessage = document.createElement("p")
            errorMessage.innerText = "Please seach again"
            errorMessage.setAttribute('id' , 'error-message')
            //append error message under search button if there is an error
            SearchBtnEl.appendChild(errorMessage);

        }
    
}

searchEl.addEventListener('click', getArtist);

