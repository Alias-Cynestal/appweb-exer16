import axios from 'axios'
const SONGS_PATH = '/songs'
const ARTIST_PATH = '/artists'



export default class SongsService {
    API_URL: string;
    constructor () {
    this.API_URL = 'http://localhost:3000'
  }

  async getSongs () {
    const { data } = await axios.get(this.API_URL + SONGS_PATH)
    return data
  }

  async getSong (songId: string) {
    const { data } = await axios.get(this.API_URL + SONGS_PATH + '/' + songId)
    return data
  }

  async getArtists () {
    const { data } = await axios.get(
      this.API_URL + ARTIST_PATH
    )
    return data
  }
  async getArtist (artistId: string){
    const { data } = await axios.get(this.API_URL + SONGS_PATH + '/' + artistId)
    return data
  }
}
