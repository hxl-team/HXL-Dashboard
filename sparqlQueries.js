/* 
 * 
 */

function getCategoriesInfo () {

	var jsonObject = new Array();

	$query = 'SELECT ?classLabel ?classDefinition ?subClassLabel ?subClassDefinition WHERE { ';
	$query += '<http://hxl.humanitarianresponse.info/ns/#Displaced> <http://www.w3.org/2004/02/skos/core#prefLabel> ?classLabel .  ';
	$query += '<http://hxl.humanitarianresponse.info/ns/#Displaced> <http://www.w3.org/2000/01/rdf-schema#comment> ?classDefinition . ';
	$query += '?subClass <http://www.w3.org/2000/01/rdf-schema#subClassOf> <http://hxl.humanitarianresponse.info/ns/#Displaced> .';
	$query += '?subClass <http://www.w3.org/2004/02/skos/core#prefLabel> ?subClassLabel .  ';
	$query += '?subClass <http://www.w3.org/2000/01/rdf-schema#comment> ?subClassDefinition . ';
	$query += '}';

	//console.log($query);
				
	var personCount = new Array();
	var temp;
		   		
	$.ajax({
		url: 'http://hxl.humanitarianresponse.info/sparql',
		headers: {
			Accept: 'application/sparql-results+json'
		},
		data: { 
			query: $query 
		},
		datatype: "json",
		success: displayData, 
		error: displayError,
	    async: false
	});

	function displayError(xhr, textStatus, errorThrown) {
		alert(textStatus + ': ' + errorThrown);
	}

	function displayData(data) {
		jsonObject = jQuery.parseJSON(data);
		if (jsonObject == null) alert('sparql query returns null');
	}

	return jsonObject;
}

function getPopulationInfo () {

	$query = 'SELECT DISTINCT ?population ?graph ?date ?personCount ?method ?sourceName ?reportedBy ?type WHERE {';
	$query += '?a <http://hxl.humanitarianresponse.info/ns/#atLocation> <http://hxl.humanitarianresponse.info/datatest/locations/apl/bfa/BFA> .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#atLocation> ?a .';
	$query += 'GRAPH ?graph {';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#personCount> ?personCount .';
	$query += '?population <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?type .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#method> ?method .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#source> ?source .';
	$query += '?graph <http://hxl.humanitarianresponse.info/ns/#validityStart> ?date .';
	$query += '?graph <http://hxl.humanitarianresponse.info/ns/#reportedBy> ?reporterUri .';
	$query += '}';
	$query += '?source <http://hxl.humanitarianresponse.info/ns/#orgDisplayName> ?sourceName .';
	$query += '?reporterUri <http://xmlns.com/foaf/0.1/Member_of> ?reporter .';
	$query += '?reporter <http://hxl.humanitarianresponse.info/ns/#orgDisplayName> ?reportedBy .';
	$query += '?graph <http://hxl.humanitarianresponse.info/ns/#validityStart> ?date .';
	$query += '} ';
	$query += 'ORDER BY ASC(?date)';

	//console.log($query);

	$.ajax({
		url: 'http://hxl.humanitarianresponse.info/sparql',
		headers: {
			Accept: 'application/sparql-results+json'
		},
		data: { 
			query: $query 
		},
		success: displayData, 
		error: displayError,
        async: false
	});


	function displayError(xhr, textStatus, errorThrown) {
		alert(textStatus + ': ' + errorThrown);
	}

	function displayData(data) {
		populationInfo = jQuery.parseJSON(data);
	}
}