let TasteDiveData;
let NapsterData;
let search;
const apiKey = {
    TasteDive: '426208-MusicRec-QH74RS8V',
    Napster: 'MDc1YWUxMWUtYjY0NS00ZGI5LTgxNzEtZjRmMWY0NGQ3Nzgx'
}

function getSongData(search = 'metallica') {
    let TasteDiveApi = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${search}&k=${apiKey.TasteDive}`
    fetch(TasteDiveApi)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    TasteDiveData = data.Similar.Results
                    console.log(TasteDiveData);
                });
            } else {
                return("Error: " + response.statusText);
            };
        })
        .catch(function (error) {
            return("Unable to find search result");
        });
};

getSongData()