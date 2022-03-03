import { Params } from "../queryGenerator";

export class TrackParams implements Params {
    kind: string = "track"
    name?: string
    genre?: string
    artistName?: string
    album?: string
    label?: string

    constructor(
        name?: string,
        genre?: string,
        artistName?: string,
        album?: string,
        label?: string
    ){
        this.name = name
        this.genre = genre
        this.artistName = artistName
        this.album = album
        this.label = label
    } 
}