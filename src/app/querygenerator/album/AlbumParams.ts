import { Params } from "../queryGenerator"

export class AlbumParams implements Params {
    kind: string = "album"
    name?: string
    genre?: string
    artistName?: string
    track?: string
    label?: string
    constructor(
        name?: string,
        genre?: string,
        artistName?: string,
        track?: string,
        label?: string
    ){
        this.name = name
        this.genre = genre
        this.artistName = artistName
        this.track = track
        this.label = label
    }    
}