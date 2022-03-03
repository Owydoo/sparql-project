import { TrackParams } from "./TrackParams"

export function generateTrackQuery(params: TrackParams): string {
    var query: string = ""
    query += "SELECT ?track ?trackLabel\n"
    query += "WHERE {\n"

    // FILTER ALBUMS
    query += "\n  #----KEEP ONLY TRACK--------\n"
    query += "  ?track wdt:P31 wd:Q105543609 .\n"
    
    // NAME 
    if(params.name != null) {
        query += "\n  #----NAME-----------------\n"
        query += "  ?track rdfs:label \"" + params.name + "\"@en . \n"
    }

    // GENRE
    if(params.genre != null) {
        query += "\n  #----GENRE----------------\n"
        query += "  ?track wdt:P136 ?genre . \n"
        query += "  ?genre rdfs:label \"" + params.genre + "\"@en . \n"    
    }

    // ARTIST
    if(params.artistName != null) {
        query += "\n  #----ARTIST-----------\n"
        query += "  ?track wdt:P175 ?artist .\n"
        query += "  ?artist rdfs:label \"" + params.artistName + "\"@en . \n"
    }

    // LABEL
    if(params.label != null) {
        query += "\n  #----LABEL----------------\n"
        query += "  ?track wdt:P264 ?label . \n"
        query += "  ?label rdfs:label \"" + params.label + "\"@en . \n"    
    }

    // Album
    if(params.album != null) {
        query += "\n  #----ALBUM----------------\n"
        query += "  ?track wdt:P361 ?album . \n"
        query += "  ?album rdfs:label \"" + params.album + "\"@en . \n"    
    }

    // LABELS WIKI
    query += "\n  SERVICE wikibase:label {\n" +
             "      bd:serviceParam wikibase:language \"en\" . \n" +
             "  }\n} LIMIT 10"

    return query
}