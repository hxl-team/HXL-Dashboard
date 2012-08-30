/* 
 * 
 */

var categoriesInfo;
getCategoriesInfo ('<http://hxl.humanitarianresponse.info/ns/#Displaced>', 'catPopover1');


function getCategoriesInfo (uri, htmlElement) {

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
		success: displayData, 
		error: displayError,
	         async:   false
	});


	function displayError(xhr, textStatus, errorThrown) {
		alert(textStatus + ': ' + errorThrown);
	}

	function displayData(data) {
			
		categoriesInfo = jQuery.parseJSON(data);

	/* displaies al props on console *
		var header = $('#result thead').append('<tr/>');
		$.each(categoriesInfo.head.vars, function(key,value) {
			header.append("<th>" + value + "</th>");
		});*/

		var totalPersonCount = 0;
		$.each(categoriesInfo.results.bindings, function(index, bs) {
			$.each(categoriesInfo.head.vars, function(key, varname) {
				console.log(varname + ' - ' + bs[varname].value);
			});	
		});

		personCount[temp] = totalPersonCount;

		console.log('total: ' + personCount[temp]);

	}
}

var populationInfo;
getPopulationInfo ();


function getPopulationInfo () {

	$query = 'SELECT DISTINCT ?population ?graph ?date ?personCount ?method ?sourceName ?reportedBy WHERE {';
	$query += '?a <http://hxl.humanitarianresponse.info/ns/#atLocation> <http://hxl.humanitarianresponse.info/datatest/locations/apl/bfa/BFA> .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#atLocation> ?a .';
	$query += 'GRAPH ?graph {';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#personCount> ?personCount .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#method> ?method .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#source> ?source .';
	$query += '?d <http://hxl.humanitarianresponse.info/ns/#validityStart> ?date .';
	$query += '?d <http://hxl.humanitarianresponse.info/ns/#reportedBy> ?reporterUri .';
	$query += '}';
	$query += '?source <http://hxl.humanitarianresponse.info/ns/#orgDisplayName> ?sourceName .';
	$query += '?reporterUri <http://xmlns.com/foaf/0.1/term_name> ?reportedBy .';
	$query += '?graph <http://hxl.humanitarianresponse.info/ns/#validityStart> ?date .';
	$query += '} ';
	$query += 'ORDER BY ASC(?date)';

	//console.log($query);
		/*		
	var personCount = new Array();
	var temp;
		 */  		
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
	         async:   false
	});


	function displayError(xhr, textStatus, errorThrown) {
		alert(textStatus + ': ' + errorThrown);
	}

	function displayData(data) {
			
		populationInfo = jQuery.parseJSON(data);

	/* displaies al props on console 
		var header = $('#result thead').append('<tr/>');
		$.each(populationInfo.head.vars, function(key,value) {
			header.append("<th>" + value + "</th>");
		});

		var totalPersonCount = 0;
		$.each(populationInfo.results.bindings, function(index, bs) {
			$.each(populationInfo.head.vars, function(key, varname) {
				console.log(varname + ' - ' + bs[varname].value);
			});	
		});

		personCount[temp] = totalPersonCount;

		console.log('total: ' + personCount[temp]);
*/
	}
}
