import ArtistDto from "./ArtistDto";
import SongDto from "./SongDto";

const DB_PATH  : string = "localhost:3000"

export const SONGS : Array<SongDto> | undefined = await getSongs();
export const ARTISTS : Array<ArtistDto> | undefined = await getArtists();


export async function getSongs() : Promise<Array<SongDto> | undefined> {
    try{
        const response = await fetch(new Request("http://" + DB_PATH + "/songs"), {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        })
        return await response.json()
    } catch (err) {
        return;
    }
}

export async function getArtists() : Promise<Array<ArtistDto> | undefined> {
    try{
        const response = await fetch(new Request("http://" + DB_PATH + "/artists"), {
            method: 'GET',
            headers: {'Content-Type' : 'application/json'}
        })
        return await response.json()
    } catch (err) {
        return;
    }
}