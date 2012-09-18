/* 
 * 
 */

function getCategoriesInfo () {

	jQuery.support.cors = true; // for IE8+

	var jsonObject = new Array();

	$query = 'SELECT ?classLabel ?classDefinition ?subClassLabel ?subClassDefinition WHERE {';
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
		if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
			jsonObject = jQuery.parseJSON(data);
			if (jsonObject == null){ // Necessary for FF on blackmesh (!?)
				jsonObject = data;
			}
		} else {
			jsonObject = data;
		}
	}

	return jsonObject;
}

function getPopulationInfo () {

	jQuery.support.cors = true; // for IE8+

    // temporary query
	$query = 'SELECT DISTINCT ?population ?graph ?date ?countryDisplay ?countryPCode ?countryUriGeom ?regionDisplay ?provinceDisplay ?departementDisplay ?campDisplay ?personCount ?sexDisplay ?ageGroup ?ageDisplay ?nationalityDisplay ?nationality ?methodDisplay ?nationalityPCode ?sourceDisplay ?reportedByDisplay ?type ?typeUri WHERE {';
	$query += '?countryUri <http://hxl.humanitarianresponse.info/ns/#pcode> "BFA" .';
    $query += '?countryUri <http://hxl.humanitarianresponse.info/ns/#pcode> ?countryPCode .';
    $query += '?countryUri <http://hxl.humanitarianresponse.info/ns/#featureName> ?countryDisplay .';
    $query += '?countryUri <http://www.opengis.net/ont/geosparql#hasGeometry> ?countryUriGeom .';
	$query += '?region <http://hxl.humanitarianresponse.info/ns/#atLocation> <http://hxl.humanitarianresponse.info/datatest/locations/admin/bfa/BFA> .';
	$query += '?province <http://hxl.humanitarianresponse.info/ns/#atLocation> ?region .';
	$query += '?departement <http://hxl.humanitarianresponse.info/ns/#atLocation> ?province .';
	$query += '?camp <http://hxl.humanitarianresponse.info/ns/#atLocation> ?departement .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#atLocation> ?camp .';
	$query += 'GRAPH ?graph {';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#personCount> ?personCount .';
	$query += '?population <http://www.w3.org/1999/02/22-rdf-syntax-ns#type> ?typeUri .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#method> ?methodDisplay .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#source> ?source .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#SexCategory> ?sexCategory .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#AgeGroup> ?ageGroup .';
	$query += '?population <http://hxl.humanitarianresponse.info/ns/#nationality> ?nationality .';
	$query += '?graph <http://hxl.humanitarianresponse.info/ns/#validityStart> ?date .';
	$query += '?graph <http://hxl.humanitarianresponse.info/ns/#reportedBy> ?reporterUri .';
	$query += '}';
    $query += '?countryUriGeom <http://www.opengis.net/ont/geosparql#hasSerialization> ?countryGeom .'; //
	$query += '?typeUri <http://www.w3.org/2004/02/skos/core#prefLabel> ?type .';
	$query += '?camp <http://hxl.humanitarianresponse.info/ns/#featureName> ?campDisplay .';
	$query += '?departement <http://hxl.humanitarianresponse.info/ns/#featureName> ?departementDisplay .';
    $query += '?province <http://hxl.humanitarianresponse.info/ns/#featureName> ?provinceDisplay .';
    $query += '?region <http://hxl.humanitarianresponse.info/ns/#featureName> ?regionDisplay .';
    $query += '?nationality <http://hxl.humanitarianresponse.info/ns/#featureName> ?nationalityDisplay .';
    $query += '?nationality <http://hxl.humanitarianresponse.info/ns/#pcode> ?nationalityPCode .';
	$query += '?ageGroup <http://hxl.humanitarianresponse.info/ns/#title> ?ageDisplay .';
	$query += '?source <http://hxl.humanitarianresponse.info/ns/#orgDisplayName> ?sourceDisplay .';
	$query += '?sexCategory <http://hxl.humanitarianresponse.info/ns/#title> ?sexDisplay .';
	$query += '?reporterUri <http://xmlns.com/foaf/0.1/Member_of> ?reporter .';
	$query += '?reporter <http://hxl.humanitarianresponse.info/ns/#orgDisplayName> ?reportedByDisplay .';
	$query += '} ';
	$query += 'ORDER BY ASC(?date)';

	//console.log($query);

	$.ajax({
		url: 'http://hxl.humanitarianresponse.info/sparql',
		headers: {
			Accept: 'application/sparql-results+json',
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
		if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
			populationInfo = jQuery.parseJSON(data);
			if (populationInfo == null){ // Necessary for FF on blackmesh (!?)
				populationInfo = data;
			}
		} else {
			populationInfo = data;
		}
	}

	// separate query for getting the geometry
	getlocationGeom(populationInfo.results.bindings[0]['countryUriGeom'].value);
}



var locGeom;
function getlocationGeom (geomUri) {
    var request = $.ajax({
      url: "script.php",
      type: "POST",
      data: {uri : geomUri},
      dataType: "html"
    });

    request.done(function(msg) {
    	locGeom = msg;
//console.log( msg );
    });

    request.fail(function(jqXHR, textStatus) {
      console.log( "Request failed: " + textStatus );
    });
}