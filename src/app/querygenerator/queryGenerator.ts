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
    query += "SELECT ?person \n"
    query += "WHERE {"

    if(params.name != null) {
        query += "  ?person rdfs:label \"" + params.name + "\"@en . "
    }
    query += "  SERVICE wikibase:label { " +
             "      bd:serviceParam wikibase:language \"en\" . \n" +
             "  }\n}"

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

function getPrefixs(): string {
    return "PREFIX dbo:<http://dbpedia.org/ontology/>\n" +
            "PREFIX dbp:<http://dbpedia.org/property/>\n"+
            "PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>\n"+
            "PREFIX dbpedia:<http://dbpedia.org/resource/>\n"+
            "PREFIX tto:<http://example.org/tuto/ontology#>\n"+
            "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\n"+
            "PREFIX ttr:<http://example.org/tuto/resource#>\n"+
            "PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>\n" +
            "PREFIX foaf: <http://xmlns.com/foaf/0.1/>\n"
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

    constructor(
    name?: string,
    genre?: string,
    country?: string,
    album?: string,
    track?: string,
    instrument?: string,
    isDead?: boolean
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
    constructor(
    name?: string,
    genre?: string,
    date?: string,
    artistName?: string,
    track?: string,
    label?: string){}
    
}

export class TrackParams implements Params {
    kind: string = "track"
    constructor(
    name?: string,
    genre?: string,
    date?: string,
    artistName?: string,
    album?: string){} }