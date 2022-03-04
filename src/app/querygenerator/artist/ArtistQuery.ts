import { ArtistParams } from "./ArtistParams"

export function generateArtistQuery(params: ArtistParams): string {
    var query: string = ""
    query += "SELECT DISTINCT ?person ?personLabel ?description ?instrument ?image \n"
    query += "WHERE {\n"

    // FILTER ARTISTS
    query += "\n  #----KEEP ONLY ARTISTS--------\n"
    query += "  ?person wdt:P106 ?occupation .\n"
    query += "  ?occupation wdt:P31 wd:Q66715801 .\n"
    query += "  OPTIONAL { ?person wdt:P18 ?image }\n"
    
    // NAME 
    if(params.name != null) {
        query += "\n  #----NAME-----------------\n"
        query += "  ?person rdfs:label \"" + params.name + "\"@en . \n"
    }

    // COUNTRY
    if(params.country != null) {
        query += "\n  #----COUNTRY--------------\n"
        query += "  ?person wdt:P27 ?country . \n"
        query += "  ?country rdfs:label \"" + params.country + "\"@en . \n"    
    }
    
    // IS DEAD
    if(params.isDead == true) {
        query += "\n  #----IS DEAD--------------\n"
        query += "  FILTER(EXISTS {\n" +
        "      ?person wdt:P570 ?referenceDeath .\n  })\n"
    }
    if(params.isDead == false) {
        query += "\n  #----IS NOT DEAD----------\n"
        query += "  FILTER(NOT EXISTS {\n" +
        "      ?person wdt:P570 ?referenceDeath .\n  })\n"
    }

    // INSTRUMENT
    if(params.instrument != null) {
        query += "\n  #----INSTRUMENT-----------\n"
        query += "  ?person wdt:P1303 ?instrument .\n"
        query += "  ?instrument rdfs:label \"" + params.instrument + "\"@en . \n"
    }

    // LABEL
    if(params.label != null) {
        query += "\n  #----LABEL----------------\n"
        query += "  ?person wdt:P264 ?label . \n"
        query += "  ?label rdfs:label \"" + params.label + "\"@en . \n"    
    }

    // GENRE
    if(params.genre != null) {
        query += "\n  #----GENRE----------------\n"
        query += "  ?person wdt:P136 ?genre . \n"
        query += "  ?genre rdfs:label \"" + params.genre + "\"@en . \n"    
    }

    // LABELS WIKI
    query += "\n  SERVICE wikibase:label {\n" +
    "      bd:serviceParam wikibase:language \"en\" . \n" +
    "      ?person schema:description ?description . \n" +
    "      ?person rdfs:label ?personLabel . \n" +
    "  }\n} LIMIT 10"

    return query
}