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
            console.log("dfault")
            break
        }
    } 
    return query
}

function generateArtistQuery(params: ArtistParams): string {
    var query: string = ""
    query += "SELECT ?person ?personLabel\n"
    query += "WHERE {\n"

    // FILTER ARTISTS
    query += "\n  #----KEEP ONLY ARTISTS--------\n"
    query += "  ?person wdt:P106 ?occupation .\n"
    query += "  ?occupation wdt:P31 wd:Q66715801 .\n"
    
    // NAME 
    if(params.name != null) {
        query += "\n  #----NAME--------\n"
        query += "  ?person rdfs:label \"" + params.name + "\"@en . \n"
    }

    // COUNTRY
    if(params.country != null) {
        query += "\n  #----COUNTRY--------\n"
        query += "  ?person wdt:P27 ?country . \n"
        query += "  ?country rdfs:label \"" + params.country + "\"@en . \n"    
    }
    
    // IS DEAD
    if(params.isDead == true) {
        query += "\n  #----IS DEAD--------\n"
        query += "  FILTER(EXISTS {\n" +
        "      ?person wdt:P570 ?referenceDeath .\n  })\n"
    }
    if(params.isDead == false) {
        query += "\n  #----IS NOT DEAD--------\n"
        query += "  FILTER(NOT EXISTS {\n" +
        "      ?person wdt:P570 ?referenceDeath .\n  })\n"
    }

    // LABELS 
    query += "  SERVICE wikibase:label {\n" +
             "      bd:serviceParam wikibase:language \"en\" . \n" +
             "  }\n} LIMIT 10"

    return query
}

function generateAlbumQuery(params: ArtistParams): string {
    var query: string = ""
    return query
}

function generateTrackQuery(params: ArtistParams): string {
    var query: string = ""
    return query
}

interface Params {
    kind: string
}

export class ArtistParams implements Params {
    kind: string = "artist"
    name?: string
    genre?: string
    country?: string
    album?: string
    track?: string
    instrument?: string
    isDead?: boolean
    label?: string

    constructor(
        name?: string,
        isDead?: boolean,
        country?: string,
        genre?: string,
        album?: string,
        track?: string,
        instrument?: string,
    ){
        this.name = name
        this.genre = genre
        this.country = country
        this.album = album
        this.track = track
        this.instrument = instrument
        this.isDead = isDead
    }
}

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

export class TrackParams implements Params {
    kind: string = "track"
    constructor(
        name?: string,
        genre?: string,
        artistName?: string,
        album?: string
    ){} 
}