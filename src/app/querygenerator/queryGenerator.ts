import { generateAlbumQuery } from "./album/AlbumQuery"
import { generateArtistQuery } from "./artist/ArtistQuery"
import { generateTrackQuery } from "./track/TrackQuery"

export function generateQuery(params: Params): string {
    var query: string
    switch(params.kind) {
        case "artist": {
            query = generateArtistQuery(params)
            console.log("artist")
            break
        }
        case "album": {
            query = generateAlbumQuery(params)
            console.log("album")
            break
        }
        case "track": {
            query = generateTrackQuery(params)
            console.log("track")
            break
        }
        default: {
            query = ""
            console.log("default")
            break
        }
    } 
    return query
}

export interface Params {
    kind: string
}