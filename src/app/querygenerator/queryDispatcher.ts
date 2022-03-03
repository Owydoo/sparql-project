const endpointUrl = 'https://query.wikidata.org/sparql';

export function fetchQuery(query: string) {
	const fullUrl = endpointUrl + '?query=' + encodeURIComponent( query );
	const headers = { 'Accept': 'application/sparql-results+json' };
	return fetch( fullUrl, { headers } ).then( body => body.json());
}
