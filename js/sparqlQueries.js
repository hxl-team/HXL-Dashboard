
// Prefixes for all queries
var queryPrefix = "PREFIX hxl: <http://hxl.humanitarianresponse.info/ns/#> \n";
queryPrefix += "PREFIX geo: <http://www.opengis.net/ont/geosparql#> \n";
queryPrefix += "PREFIX dc: <http://purl.org/dc/terms/> \n";
queryPrefix += "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n";
queryPrefix += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> \n";
queryPrefix += "PREFIX foaf: <http://xmlns.com/foaf/0.1/> \n";
queryPrefix += "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> \n";
queryPrefix += "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> \n \n";


/* 
 * Get the emergency list.
 */
function getEmergenciesInfo () 
{
    jQuery.support.cors = true; // for IE8+

    var jsonObject = new Array();
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?emergencyUri ?emergencyDisplay WHERE { \n';
    $query += 'GRAPH ?graph { \n';
    $query += '?emergencyUri rdf:type hxl:Emergency . \n';
    $query += '?emergencyUri hxl:commonTitle ?emergencyDisplay . \n';
    $query += '?emergencyUri hxl:atLocation ?countryUri . \n';
    $query += '} \n';
    $query += '} \n';
    $query += 'ORDER BY ?emergencyUri \n';
    
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
 * Get the categories of population below the Displaced class general category.
 */
function getCategoriesInfo () 
{
    jQuery.support.cors = true; // for IE8+

    var jsonObject = new Array();

    $query = queryPrefix;
    $query += 'SELECT ?class ?classLabel ?classDefinition ?subClass ?subClassLabel ?subClassDefinition \n';
    $query += 'WHERE \n';
    $query += '{ \n';
    $query += '  hxl:Displaced skos:prefLabel ?classLabel . \n';
    $query += '  ?class skos:prefLabel ?classLabel . \n';
    $query += '  hxl:Displaced rdfs:comment ?classDefinition . \n';
    $query += '  ?subClass rdfs:subClassOf hxl:Displaced . \n';
    $query += '  ?subClass skos:prefLabel ?subClassLabel . \n';
    $query += '  ?subClass rdfs:comment ?subClassDefinition . \n';
    $query += '} \n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
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
 * Get the list of sex categories and their labels.
 */
function getSexInfo () 
{
    jQuery.support.cors = true; // for IE8+

    var jsonObject = new Array();

    $query = queryPrefix;
    $query += 'SELECT ?sexCategory ?sexLabel \n';
    $query += 'WHERE \n';
    $query += '{ \n';
    $query += '  ?sexCategory a hxl:SexCategory . \n';
    $query += '  ?sexCategory hxl:title ?sexLabel . \n';
    $query += '} \n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
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
 * Get the list of age groups and their labels.
 */
function getAgeInfo () 
{
    jQuery.support.cors = true; // for IE8+

    var jsonObject = new Array();

    $query = queryPrefix;
    $query += 'SELECT ?ageGroup ?ageLabel \n';
    $query += 'WHERE \n';
    $query += '{ \n';
    $query += '  ?ageGroup a hxl:AgeGroup . \n';
    $query += '  ?ageGroup hxl:title ?ageLabel . \n';
    $query += '} \n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
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
 * Get the list of sources and their labels.
 */
function getSourceInfo () 
{
    jQuery.support.cors = true; // for IE8+

    var jsonObject = new Array();

    $query = queryPrefix;
    $query += 'SELECT ?source ?label \n';
    $query += 'WHERE \n';
    $query += '{ \n';
    $query += '  ?source a hxl:Organisation . \n';
    $query += '  ?source hxl:orgDisplayName ?label . \n';
    $query += '} \n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
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
 * Gets the sources of population counting.
 * The results is convenient because it represents the real combinations of sources.
 */
function getSourcesSets(emergencyUri)
{
    //console.log("getSourcesSets: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT (group_concat(DISTINCT ?sourceDisplay ; separator = ", " ) AS ?sources) \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:source ?source . \n';
    $query += '  } \n';
    $query += '  ?source hxl:orgDisplayName ?sourceDisplay . \n';
    $query += '} \n';
    $query += 'GROUP BY ?population \n\n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    return jsonObject;
}


/*
 * Gets the ordered list of the most frequent sources
 */
function getSourcesScore(emergencyUri)
{
    //console.log("getSourcesScore: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?sourceDisplay (COUNT(?sourceDisplay) as ?sourceCount) \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:source ?source . \n';
    $query += '  } \n';
    $query += '  ?source hxl:orgDisplayName ?sourceDisplay . \n';
    $query += '} \n';
    $query += 'GROUP BY ?sourceDisplay \n';
    $query += 'ORDER BY DESC(?sourceCount) \n\n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    if (jsonObject.results.bindings.length == 0 ||
        jsonObject.results.bindings[0]['sourceDisplay'] == null)
    {
        return null; // When emergency is empty
    }
    else
    {
        return jsonObject;
    }
    
    
}

/*
 * Gets the most frequent countries appearing for an emergency
 */
function getCountryScore(emergencyUri)
{
    //console.log("getCountryScore: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?countryUri ?countryName (COUNT(?countryUri)AS ?countryCount) \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:atLocation ?location . \n';
    $query += '  } \n';
    $query += '  ?location hxl:atLocation+ ?countryUri . \n';
    $query += '  ?countryUri hxl:atLevel ?level . \n';
    $query += '  ?countryUri hxl:featureName ?countryName . \n';
    $query += '  FILTER regex(str(?level), "0$") \n';
    $query += '} \n';
    $query += 'GROUP BY ?countryUri ?countryName \n';
    $query += 'ORDER BY DESC(?countryCount) \n\n';
        
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    return jsonObject;
}

/*
 * Gets the list of locations having a population and admin level structure (2 levels) for a given country.
 */
function getLevelLocations(emergencyUri, countryUri)
{
    //console.log("getLevelLocations: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?location ?locationDisplay ?atLocationL2 ?atLocationL2Display ?atLocationL1 ?atLocationL1Display \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:atLocation ?location . \n';
    $query += '    ?population hxl:personCount ?personCount . \n';
    $query += '  } \n';
    $query += '  ?location hxl:featureName ?locationDisplay . \n';
    $query += '  ?location hxl:atLocation+ ?atLocationL2 . \n';
    $query += '  ?atLocationL2 hxl:featureName ?atLocationL2Display . \n';
    $query += '  ?atLocationL2 hxl:atLevel ?level . \n';
    $query += '  ?atLocationL2 hxl:atLocation ?atLocationL1 . \n';
    $query += '  ?atLocationL1 hxl:featureName ?atLocationL1Display . \n';
    $query += '  ?atLocationL1 hxl:atLocation <' + countryUri + '> . \n';
    $query += '  FILTER regex(str(?level), "2$") . \n';
    $query += '} \n';
    $query += 'ORDER BY DESC(?personCount) \n\n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    return jsonObject;
}

/*
 * Gets the list of locations having a population directly located in a country.
 * It is used to find the locations with no admin level structure (temporary
 * locations with uncorrect pcode, or pourly descibed countries).
 */
function getTheRestOfLocations(emergencyUri, countryUri)
{
    //console.log("getTheRestOfLocations: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?location ?locationDisplay \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:atLocation ?location . \n';
    $query += '    ?population hxl:personCount ?personCount . \n';
    $query += '  } \n';
    $query += '  ?location hxl:featureName ?locationDisplay . \n';
    $query += '  ?location hxl:atLocation <' + countryUri + '> . \n';
    $query += '} \n';
    $query += 'ORDER BY DESC(?personCount) \n\n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    return jsonObject;
}

/*
 * Gets the list of hxl:sexCategory titles.
 */
function getSexCategories(emergencyUri)
{
    //console.log("getSexCategories: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?title ?sex \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:sexCategory ?sex . \n';
    $query += '  } \n';
    $query += '  ?sex hxl:title ?title . \n';
    $query += '} \n';
    $query += 'ORDER BY ASC(?title) \n\n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    return jsonObject;
}

/*
 * Gets the list of hxl:ageGroup titles.
 */
function getAgeGroups(emergencyUri)
{
    //console.log("getSexCategories: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?title ?ageGroup \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:atLocation ?location . \n';
    $query += '    ?population hxl:ageGroup ?ageGroup . \n';
    $query += '  } \n';
    $query += '  ?ageGroup hxl:title ?title . \n';
    $query += '} \n\n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    return jsonObject;
}

/*
 * Gets the list of hxl:placeOfOrigin names.
 */
function getOrigins(emergencyUri)
{
    //console.log("getOrigins: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?title ?origin \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:placeOfOrigin ?origin . \n';
    $query += '  } \n';
    $query += '  ?origin hxl:featureName ?title . \n';
    $query += '} \n';
    $query += 'ORDER BY ASC(?title) \n\n';
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    return jsonObject;
}

/*
 * Gets the populations and related info according main slide 2 filters.
 */
function getFilteredPopulation(emergencyUri, popType, location, sources, sex, age, origin)
{
    //console.log("getOrigins: ");
    
    var jsonObject = new Array();
        
    jQuery.support.cors = true; // for IE8+
    
    // type filter (inside the graph)
    $queryTypeSingle = '    ?population a <[#popType]> . \n';
    $queryTypeDisplaced = '    ?population a ?populationType . \n';
   
    // location filter
    $queryLocationAplGraph = '    ?population hxl:atLocation <[#APL]> . \n';
    $queryLocationAplGraph += '    ?population hxl:atLocation ?location . \n';
    $queryLocationAtLocationGraph = '    ?population hxl:atLocation ?location . \n';
    $queryLocationAtLocationOutGraph = '    ?location hxl:atLocation+ <[#atLocation]> . \n';
    
    // source filter
    $querySourceDefaultGraph = '    ?population hxl:source ?source . \n';
    $querySourceSingleGraph = '    ?population hxl:source <[#source1]> . \n';
    $querySourceSingleGraph += '    ?population hxl:source ?source . \n';
    
    $querySourceDoubleGraph = '    ?population hxl:source <[#source1]> . \n';
    $querySourceDoubleGraph += '    ?population hxl:source <[#source2]> . \n';
    $querySourceDoubleGraph += '    ?population hxl:source ?source . \n';
    
    $querySourceTripleGraph = '    ?population hxl:source <[#source1]> . \n';
    $querySourceTripleGraph += '    ?population hxl:source <[#source2]> . \n';
    $querySourceTripleGraph += '    ?population hxl:source <[#source3]> . \n';
    $querySourceTripleGraph += '    ?population hxl:source ?source . \n';
    
    // optional filters
    // sex filter
    $querySexGraphOpt = '    OPTIONAL{ ?population hxl:sexCategory ?sex } \n';
    $querySexGraph = '    ?population hxl:sexCategory <[#sex]> . \n';
    $querySexGraph += '    ?population hxl:sexCategory ?sex . \n';
    // age filter
    $queryAgeGraphOpt = '    OPTIONAL{ ?population hxl:ageGroup ?age } \n';
    $queryAgeGraph = '    ?population hxl:ageGroup <[#age]> . \n';
    $queryAgeGraph += '    ?population hxl:ageGroup ?age . \n';
    // origin filter
    $queryOriginGraphOpt = '    OPTIONAL{ ?population hxl:placeOfOrigin ?origin } \n';
    $queryOriginGraph = '    ?population hxl:placeOfOrigin <[#origin]> . \n';
    $queryOriginGraph += '    ?population hxl:placeOfOrigin ?origin . \n';
    
    $query = queryPrefix;
    $query += 'SELECT DISTINCT ?population ?personCount ?date ?source \n';
    $query += '?countMethod ?reportedByDisplay ?populationType ?locationDisplay \n'; 
    $query += '?sex ?age ?nationalityDisplay \n';
    $query += 'WHERE  \n';
    $query += '{ \n';
    $query += '  GRAPH ?graph  \n';
    $query += '  { \n';
    $query += '    ?graph hxl:aboutEmergency <' + emergencyUri + '> . \n';
    $query += '    ?population hxl:personCount ?personCount . \n';
    $query += '    ?graph hxl:validOn ?date . \n';
    $query += '    OPTIONAL {?population hxl:method ?countMethod } \n';
    $query += '    OPTIONAL {?graph hxl:reportedBy ?reportedBy } \n';
    $query += '    OPTIONAL {?population hxl:nationality ?nationality } \n';
    $query += '[#QpopTypeG]';
    $query += '[#QlocationG]';
    $query += '[#QsourceG]';
    $query += '[#QsexG]';
    $query += '[#QageG]';
    $query += '[#QoriginG]';
    $query += '  } \n';
    $query += '  ?nationality hxl:featureName ?nationalityDisplay . \n';
    $query += '  ?reportedBy foaf:Member_of ?reporter . \n';
    $query += '  ?reporter hxl:orgDisplayName ?reportedByDisplay \n';
    $query += '  OPTIONAL {?location hxl:featureName ?locationDisplay } \n';
    $query += '[#QlocationOG]';
    $query += '} \n';
    $query += 'ORDER BY ASC(?date) \n\n';
    
    // replacing poptype
    switch (popType)
    {
        case "http://hxl.humanitarianresponse.info/ns/#Displaced":
            $query = $query.replace("[#QpopTypeG]", $queryTypeDisplaced);
            break;
        default:
            $queryTypeSingle = $queryTypeSingle.replace("[#popType]", popType);
            $query = $query.replace("[#QpopTypeG]", $queryTypeSingle);
            break;
    }
    
    //console.log(location);
    
    // replacing location
    if (location == undefined || location == null || location == '')
    {
        $query = $query.replace("[#QlocationG]", $queryLocationAtLocationGraph);
        $query = $query.replace("[#QlocationOG]", '');
    }
    else
    {
        locationSplit = location.split('APL-');

        if (locationSplit.length == 2)//location.indexOf('/apl/') > -1)
        {
            $queryLocationAplGraph = $queryLocationAplGraph.replace("[#APL]", locationSplit[1]);
            $query = $query.replace("[#QlocationG]", $queryLocationAplGraph);
            $query = $query.replace("[#QlocationOG]", '');
        }
        else
        {
            $query = $query.replace("[#QlocationG]", $queryLocationAtLocationGraph);
            $queryLocationAtLocationOutGraph = $queryLocationAtLocationOutGraph.replace("[#atLocation]", location);
            $query = $query.replace("[#QlocationOG]", $queryLocationAtLocationOutGraph);
        }
    }
    
    // replacing sources
    if (sources == null)
    {
        $query = $query.replace("[#QsourceG]", $querySourceDefaultGraph);
    }
    else
    {
        switch (sources.length)
        {
            case 1:
                $querySourceSingleGraph = $querySourceSingleGraph.replace("[#source1]", sources[0]);
                $query = $query.replace("[#QsourceG]", $querySourceSingleGraph);
                break;
            case 2:
                $querySourceDoubleGraph = $querySourceDoubleGraph.replace("[#source1]", sources[0]);
                $querySourceDoubleGraph = $querySourceDoubleGraph.replace("[#source2]", sources[1]);
                $query = $query.replace("[#QsourceG]", $querySourceDoubleGraph);
                break;
            case 3:
                $querySourceTripleGraph = $querySourceTripleGraph.replace("[#source1]", sources[0]);
                $querySourceTripleGraph = $querySourceTripleGraph.replace("[#source2]", sources[1]);
                $querySourceTripleGraph = $querySourceTripleGraph.replace("[#source3]", sources[2]);
                $query = $query.replace("[#QsourceG]", $querySourceTripleGraph);
                break;
        }
    }
    
    // replacing sex
    if (sex == null || sex == '')
    {
        $query = $query.replace("[#QsexG]", $querySexGraphOpt);
    }
    else
    {
        $querySexGraph = $querySexGraph.replace("[#sex]", sex);
        $query = $query.replace("[#QsexG]", $querySexGraph);
    }
    
    // replacing age
    if (age == null || age == '')
    {
        $query = $query.replace("[#QageG]", $queryAgeGraphOpt);
    }
    else
    {
        $queryAgeGraph = $queryAgeGraph.replace("[#age]", age);
        $query = $query.replace("[#QageG]", $queryAgeGraph);
    }
    
    // replacing origin
    if (origin == null || origin == '')
    {
        $query = $query.replace("[#QoriginG]", $queryOriginGraphOpt);
    }
    else
    {
        $queryOriginGraph = $queryOriginGraph.replace("[#origin]", origin);
        $query = $query.replace("[#QoriginG]", $queryOriginGraph);
    }
    
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
        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
        {
            jsonObject = jQuery.parseJSON(data);
            if (jsonObject == null) // Necessary for FF on blackmesh (!?)
            {
                jsonObject = data;
            }
        } 
        else 
        {
            jsonObject = data;
        }
        data = '';
    }
    
    return jsonObject;
}
