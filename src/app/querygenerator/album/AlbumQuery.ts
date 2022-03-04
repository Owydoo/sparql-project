import { AlbumParams } from "./AlbumParams"

export function generateAlbumQuery(params: AlbumParams): string {
    var query: string = ""
    query += "SELECT DISTINCT ?album ?albumLabel ?description ?image\n"
    query += "WHERE {\n"

    // FILTER ALBUMS
    query += "\n  #----KEEP ONLY ALBUMS--------\n"
    query += "  ?album wdt:P31 wd:Q482994 .\n"
    query += "  OPTIONAL { ?album wdt:P18 ?image }\n"
    
    // NAME 
    if(params.name != null) {
        query += "\n  #----NAME-----------------\n"
        query += "  ?album rdfs:label \"" + params.name + "\"@en . \n"
    }

    // GENRE
    if(params.genre != null) {
        query += "\n  #----GENRE----------------\n"
        query += "  ?album wdt:P136 ?genre . \n"
        query += "  ?genre rdfs:label \"" + params.genre + "\"@en . \n"    
    }

    // ARTIST
    if(params.artistName != null) {
        query += "\n  #----ARTIST-----------\n"
        query += "  ?album wdt:P175 ?artist .\n"
        query += "  ?artist rdfs:label \"" + params.artistName + "\"@en . \n"
    }

    // LABEL
    if(params.label != null) {
        query += "\n  #----LABEL----------------\n"
        query += "  ?album wdt:P264 ?label . \n"
        query += "  ?label rdfs:label \"" + params.label + "\"@en . \n"    
    }

    // TRACK
    if(params.track != null) {
        query += "\n  #----TRACK----------------\n"
        query += "  ?album wdt:P658 ?track . \n"
        query += "  ?track rdfs:label \"" + params.track + "\"@en . \n"    
    }

    // LABELS WIKI
    query += "\n  SERVICE wikibase:label {\n" +
             "      bd:serviceParam wikibase:language \"en\" . \n" +
             "      ?album schema:description ?description . \n" +
             "      ?album rdfs:label ?albumLabel . \n" +
             "  }\n} LIMIT 10"

    return query
}