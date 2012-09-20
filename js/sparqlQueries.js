var queryPrefix = "PREFIX hxl: <http://hxl.humanitarianresponse.info/ns/#> ";
queryPrefix += "PREFIX geo: <http://www.opengis.net/ont/geosparql#> ";
queryPrefix += "PREFIX dc: <http://purl.org/dc/terms/> ";
queryPrefix += "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ";
queryPrefix += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
queryPrefix += "PREFIX foaf: <http://xmlns.com/foaf/0.1/> ";
queryPrefix += "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> ";
queryPrefix += "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> ";

/* 
 * 
 */
function getEmergenciesInfo () {

	jQuery.support.cors = true; // for IE8+

	var jsonObject = new Array();
	$query = queryPrefix;
	$query += 'SELECT DISTINCT ?emergencyUri ?emergencyDisplay WHERE {';
	$query += 'GRAPH <http://hxl.humanitarianresponse.info/data/datacontainers/unocha/1234567890.000002> {';
	$query += '?emergencyUri rdf:type hxl:Emergency .';
	$query += '?emergencyUri hxl:commonTitle ?emergencyDisplay .';
	$query += '?emergencyUri hxl:atLocation ?countryUri .';
	$query += '}';
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

/* 
 * 
 */
function getCategoriesInfo () {

	jQuery.support.cors = true; // for IE8+

	var jsonObject = new Array();

	$query = queryPrefix;
	$query += 'SELECT ?classLabel ?classDefinition ?subClassLabel ?subClassDefinition WHERE {';
	$query += 'hxl:Displaced skos:prefLabel ?classLabel .  ';
	$query += 'hxl:Displaced rdfs:comment ?classDefinition . ';
	$query += '?subClass rdfs:subClassOf hxl:Displaced .';
	$query += '?subClass skos:prefLabel ?subClassLabel .  ';
	$query += '?subClass rdfs:comment ?subClassDefinition . ';
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

function getPopulationInfo (emergencyUri) {

	// for proto only
	if (emergencyUri == null ) {
		emergencyUri = emergenciesList.results.bindings[1]['emergencyUri'].value;
	}

	jQuery.support.cors = true; // for IE8+

    // This query considers there is no departments!
	$query = queryPrefix;
	$query += 'SELECT DISTINCT ?population ?graph ?date ?countryDisplay ?countryPCode ?countryUriGeom ?regionDisplay ?provinceDisplay ?campDisplay ?personCount ?householdCount ?sexDisplay ?ageGroup ?ageDisplay ?nationalityDisplay ?nationality ?methodDisplay ?nationalityPCode ?sourceDisplay ?reportedByDisplay ?type ?typeUri WHERE {';
    $query += '<' + emergencyUri + '> hxl:commonTitle ?emergencyDisplay .';
    $query += '<' + emergencyUri + '> hxl:atLocation ?countryUri .';
    $query += '?countryUri hxl:pcode ?countryPCode .';
    $query += '?countryUri hxl:featureName ?countryDisplay .';
    $query += '?countryUri geo:hasGeometry ?countryUriGeom .';
	$query += '?region hxl:atLocation ?countryUri .';
	$query += '?province hxl:atLocation ?region .';
	$query += '?camp hxl:atLocation ?province .';
	$query += '?population hxl:atLocation ?camp .';
	$query += 'GRAPH ?graph {';
	$query += '?population hxl:personCount ?personCount .';
	$query += 'OPTIONAL { ?population hxl:householdCount ?householdCount .}';
	$query += '?population rdf:type ?typeUri .';
	$query += '?population hxl:method ?methodDisplay .';
	$query += '?population hxl:source ?source .';
	$query += '?population hxl:SexCategory ?sexCategory .';
	$query += '?population hxl:AgeGroup ?ageGroup .';
	$query += '?population hxl:nationality ?nationality .';
	$query += '?graph hxl:validityStart ?date .';
	$query += '?graph hxl:reportedBy ?reporterUri .';
	$query += '}';
    //$query += '?countryUriGeom geo:hasSerialization ?countryGeom .'; //
	$query += '?typeUri skos:prefLabel ?type .';
	$query += '?camp hxl:featureName ?campDisplay .';
    $query += '?province hxl:featureName ?provinceDisplay .';
    $query += '?region hxl:featureName ?regionDisplay .';
    $query += '?nationality hxl:featureName ?nationalityDisplay .';
    $query += '?nationality hxl:pcode ?nationalityPCode .';
	$query += '?ageGroup hxl:title ?ageDisplay .';
	$query += '?source hxl:orgDisplayName ?sourceDisplay .';
	$query += '?sexCategory hxl:title ?sexDisplay .';
	$query += '?reporterUri foaf:Member_of ?reporter .';
	$query += '?reporter hxl:orgDisplayName ?reportedByDisplay .';
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

	// This is a separate query for getting the geometry without blocking the interface
	if (populationInfo.results.bindings[0] != null) {
		getlocationGeom(populationInfo.results.bindings[0]['countryUriGeom'].value);
	}
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
    });

    request.fail(function(jqXHR, textStatus) {
      console.log( "Request failed: " + textStatus );
    });
}