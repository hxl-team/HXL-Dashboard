var queryPrefix = "PREFIX hxl: <http://hxl.humanitarianresponse.info/ns/#> \n";
queryPrefix += "PREFIX geo: <http://www.opengis.net/ont/geosparql#> \n";
queryPrefix += "PREFIX dc: <http://purl.org/dc/terms/> \n";
queryPrefix += "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n";
queryPrefix += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
queryPrefix += "PREFIX foaf: <http://xmlns.com/foaf/0.1/> \n";
queryPrefix += "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \n";
queryPrefix += "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> \n \n";

/* 
 * 
 */
function getEmergenciesInfo () 
{
    jQuery.support.cors = true; // for IE8+

    var jsonObject = new Array();
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?emergencyUri ?emergencyDisplay WHERE { \n';
    $query += 'GRAPH ?graph { \n';
    //$query += 'GRAPH <http://hxl.humanitarianresponse.info/data/datacontainers/unocha/1234567890.000002> { \n';
    $query += '?emergencyUri rdf:type hxl:Emergency . \n';
    $query += '?emergencyUri hxl:commonTitle ?emergencyDisplay . \n';
    $query += '?emergencyUri hxl:atLocation ?countryUri . \n';
    $query += '} \n';
    $query += '} \n';
    $query += 'ORDER BY ?emergencyUri \n';
    //console.log($query);

    var personCount = new Array();
    var temp;

    $.ajax
    ({
        url: 'http://hxl.humanitarianresponse.info/sparql',
        headers: 
        {
            Accept: 'application/sparql-results+json'
        },
        data: 
        { 
            query: $query 
        },
        datatype: "json",
        success: displayData, 
        error: displayError,
        async: false
    });

    function displayError(xhr, textStatus, errorThrown) 
    {
        console.log(textStatus + ': ' + errorThrown);
    }

    function displayData(data) 
    {
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
    }
    return jsonObject;
}

/* 
 * 
 */
function getCategoriesInfo () 
{
    jQuery.support.cors = true; // for IE8+

    var jsonObject = new Array();

    $query = queryPrefix;
    $query += 'SELECT ?classLabel ?classDefinition ?subClassLabel ?subClassDefinition WHERE { \n';
    $query += 'hxl:Displaced skos:prefLabel ?classLabel . \n';
    $query += 'hxl:Displaced rdfs:comment ?classDefinition . \n';
    $query += '?subClass rdfs:subClassOf hxl:Displaced . \n';
    $query += '?subClass skos:prefLabel ?subClassLabel . \n';
    $query += '?subClass rdfs:comment ?subClassDefinition . \n';
    $query += '} \n';
    //console.log($query);

    var personCount = new Array();
    var temp;

    $.ajax
    ({
        url: 'http://hxl.humanitarianresponse.info/sparql',
        headers: 
        {
            Accept: 'application/sparql-results+json'
        },
        data: 
        { 
            query: $query 
        },
        datatype: "json",
        success: displayData, 
        error: displayError,
        async: false
    });

    function displayError(xhr, textStatus, errorThrown) 
    {
        alert(textStatus + ': ' + errorThrown);
    }

    function displayData(data) 
    {
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } else {
                jsonObject = data;
        }
    }

    return jsonObject;
}

function getPopulationInfo(emergencyUri)
{
    if (emergencyUri == null )
    {
        emergencyUri = emergenciesList.results.bindings[1]['emergencyUri'].value;
    }

    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?population ?location ?pcode ?personCount ?date ?populationType ?populationTypeDisplay ?sourceDisplay ?countMethod ?reportedByDisplay ?countryDisplay ?countryUri \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <http://hxl.humanitarianresponse.info/data/emergencies/mali2012test> . \n';
    $query += '    ?graph hxl:validOn ?date . \n';
    $query += '    ?graph hxl:reportedBy ?reportedBy . \n';
    $query += '    ?population hxl:personCount ?personCount . \n';
    $query += '    ?population rdf:type ?populationType . \n';
    $query += '    ?population hxl:atLocation ?location . \n';
    $query += '    ?population hxl:source ?source . \n';
    $query += '    ?population hxl:method ?countMethod . \n';
    $query += '  } \n';
    $query += '  ?location hxl:pcode ?pcode . \n';
    $query += '  ?location hxl:atLocation+ ?countryUri . \n';
    $query += '  ?countryUri hxl:atLevel ?adminLevel .  \n';
    $query += '  ?countryUri hxl:featureName ?countryDisplay .  \n';
    $query += '  ?populationType skos:prefLabel ?populationTypeDisplay . \n';
    $query += '  OPTIONAL \n';
    $query += '  { \n';
    $query += '    ?source hxl:abbreviation ?sourceDisplay . \n';
    $query += '  } \n';
    $query += '  ?reportedBy foaf:Member_of ?reporter . \n';
    $query += '  ?reporter hxl:orgDisplayName ?reportedByDisplay . \n';
    $query += '  FILTER regex(str(?adminLevel), "0$") . \n';
    $query += '} \n';
    $query += 'ORDER BY ASC(?date) \n\n';
    //console.log($query);

    $.ajax
    ({
        url: 'http://hxl.humanitarianresponse.info/sparql',
        headers: 
        {
            Accept: 'application/sparql-results+json'
        },
        data: 
        { 
            query: $query 
        },
        datatype: "json",
        success: displayData, 
        error: displayError,
        async: false
    });

    function displayError(xhr, textStatus, errorThrown) 
    {
        alert(textStatus + ': ' + errorThrown);
    }

    function displayData(data) 
    {
        populationInfo = '';
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            populationInfo = jQuery.parseJSON(data);
            if (populationInfo == null) // Necessary for FF on blackmesh (!?)
            {
                populationInfo = data;
            }
        } 
        else 
        {
            populationInfo = data;
        }
        data = '';
    }
/*
	// This is a separate query for getting the geometry without blocking the interface
	if (populationInfo.results.bindings[0] != null) {
// must depend on the selection of the Location ddlist.
		getlocationGeom(populationInfo.results.bindings[0]['countryUri'].value);
	}
        */
    return populationInfo;
}

var locGeom;
function getlocationGeom (geomUri) 
{
    locGeom = '';
    var request = $.ajax
    ({
        url: "sparqlQueries.php",
        type: "POST",
        data: {uri : geomUri},
        dataType: "html"
    });

    request.done
    (
        function(msg) 
        {
            locGeom = msg;
        }
    );

    request.fail
    (
        function(jqXHR, textStatus) 
        {
            console.log( "Request failed: " + textStatus );
        }
    );
    request = null;
}