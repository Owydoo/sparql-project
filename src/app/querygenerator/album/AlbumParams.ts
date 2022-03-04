import { Params } from "../queryGenerator"

export class AlbumParams implements Params {
    kind: string = "album"
    name?: string
    genre?: string
    artistName?: string
    track?: string
    label?: string
    limit: number

    constructor(
        name?: string,
        genre?: string,
        artistName?: string,
        track?: string,
        label?: string,
        limit?: number
    ){
        this.name = name
        this.genre = genre
        this.artistName = artistName
        this.track = track
        this.label = label
        this.limit = limit ? limit : 10
    }   
}