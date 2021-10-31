let search;
// I will create new api keys and add them to apiKey.js
const apiKey = {
  TasteDive: '426208-MusicRec-QH74RS8V',
  Napster: 'MDc1YWUxMWUtYjY0NS00ZGI5LTgxNzEtZjRmMWY0NGQ3Nzgx'
}
//hiding Spoitfy client and client secret key in file apiKey.js
import * as Spotify from "./apiKey.js"

const _getToken = async () => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(Spotify.clientID + ':' + Spotify.clientSecret)
    },
    body: 'grant_type=client_credentials'
  })
  const data = await result.json();
  console.log(data.access_token);
}

function getSongData(search) {
  //Visit the proxy link and enable for taste dive
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const TasteDiveApi = `${proxy}https://tastedive.com/api/similar?q=${search}&k=${apiKey.TasteDive}`
  const napsterApi = "https://api.napster.com/v2.2/artists/top";
  const options = {
    headers: {
      apikey: apiKey.Napster
    }
  };

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
_getToken()