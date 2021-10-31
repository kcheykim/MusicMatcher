let TasteDiveData;
let NapsterData;
let search;
let artist, song;
const apiKey = {
    TasteDive: '426208-MusicRec-QH74RS8V',
    Napster: 'MDc1YWUxMWUtYjY0NS00ZGI5LTgxNzEtZjRmMWY0NGQ3Nzgx',
}

function getSongData(search = 'metallica') {
    // let TasteDiveApi = `https://cors-anywhere.herokuapp.com/https://tastedive.com/api/similar?q=${search}&k=${apiKey.TasteDive}`
    let napsterApi = "https://api.napster.com/v2.2/artists/top";

    const options = { headers: { apikey: apiKey.Napster } };

    // fetch(TasteDiveApi)
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err))

    fetch(napsterApi, options)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
};

function getLyric(artist = 'ed sheeran', song = 'shivers') {
    let lyricOvhApi = "https://api.lyrics.ovh/v1/${artist}/${song}/";
    fetch(lyricOvhApi)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
};

getSongData()
getLyric()