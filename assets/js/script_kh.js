let search = 'metallica';
import * as apiKey from "./apiKey.js"

const _getToken = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(apiKey.SpotifyclientID + ':' + apiKey.SpotifyclientSecret)
        },
        body: 'grant_type=client_credentials'
    })
    const data = await result.json();
    return data.access_token
};

const _getSimilarArtist= async(search) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=${apiKey.lastFmKey}&format=json`
    const result = await fetch(lastFM)
    const data = await result.json();
    return data.similarartists.artist
}
const _searchArtist= async (search) => {
    const result = await fetch('', {
        method: 'GET',
        headers:{'Authorization' : `Bearer ${SpotifyToken}`}
    })

}

const SpotifyToken = _getToken()
const SimilarArtist = _getSimilarArtist(search)
console.log(SimilarArtist)
