const lastFmKey = 'f50b0e7f874bf3ca9a40af2dc2697097'

const _getSimilarArtist = async (search) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=${lastFmKey}&format=json&limit=5`
    const result = await fetch(lastFM)
    const data = await result.json();
    return data.similarartists.artist
}

const _getTopTracks = async (artistName) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artistName}&api_key=${lastFmKey}&format=json&limit=5`
    const result = await fetch(lastFM)
    const data = await result.json();
    return data.toptracks.track
}

//replace metallica and  Daft Punk with artists name 
const SimilarArtist = _getSimilarArtist('metallica')
const artistTopTracks = _getTopTracks('Daft Punk')