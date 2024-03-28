
export interface Song{
    id: number
    fileName: string
    songName: string
    desc: string
    infosUrl: string
    artistId: number
}

export interface Artist{
    id: number
    name: string
    desc: string
}

export const templateArtist: Artist = {
    id: -1,
    name: "Any_Artist",
    desc: "Any_Desc"
}
export const templateSong: Song = {
    id: -1,
    fileName: "no_file",
    songName: "Any_Song",
    desc: "Any_Desc",
    infosUrl: "Any_Info",
    artistId: -1
}


export function searchForAudioSong(songName:string): HTMLAudioElement
{
    return new Audio('../assets/songs/' + songName)
}