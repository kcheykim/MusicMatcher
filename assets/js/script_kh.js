let search = 'metallica';
const lastFmKey = 'f50b0e7f874bf3ca9a40af2dc2697097'

const _getSimilarArtist= async(search) => {
    const lastFM = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${search}&api_key=${lastFmKey}&format=json`
    const result = await fetch(lastFM)
    const data = await result.json();
    return data.similarartists.artist
}

const SimilarArtist = _getSimilarArtist(search)
