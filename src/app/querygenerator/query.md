```sparql
SELECT ?person ?personLabel ?image ?occupationLabel ?dateDeath WHERE {
  ?person wdt:P106 ?occupation .
  ?occupation wdt:P31 wd:Q66715801 .

  ?person rdfs:label "Freddie Mercury"@en . 
  ?person wdt:P18 ?image .
  ?person wdt:P106 ?occupation .
  ?occupation rdfs:label "singer"@en .
  FILTER(EXISTS {
     ?person wdt:P570 ?referenceDeath .
  })
  ?person wdt:P570 ?dateDeath .
  
  SERVICE wikibase:label { 
       bd:serviceParam wikibase:language "en" . 
  }
} 
```

