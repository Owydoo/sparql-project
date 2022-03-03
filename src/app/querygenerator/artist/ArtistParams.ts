import { Params } from "../queryGenerator"

export class ArtistParams implements Params {
    kind: string = "artist"
    name?: string
    country?: string
    isDead?: boolean
    instrument?: string
    label?: string
    genre?: string
    album?: string
    track?: string

    constructor(
        name?: string,
        isDead?: boolean,
        country?: string,
        instrument?: string,
        label?: string,
        genre?: string,
        album?: string,
        track?: string,
    ){
        this.name = name
        this.genre = genre
        this.country = country
        this.album = album
        this.track = track
        this.instrument = instrument
        this.isDead = isDead
        this.label = label
    }
}