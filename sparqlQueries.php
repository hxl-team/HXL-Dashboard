<?php 

include_once('Classes/EasyRdf.php');

function sparqlQuery($query){

	// these prefixes will be added to every SPARQL query
	$prefixes = 'prefix xsd: <http://www.w3.org/2001/XMLSchema#>  
	prefix skos: <http://www.w3.org/2004/02/skos/core#> 
	prefix hxl:   <http://hxl.humanitarianresponse.info/ns/#> 
	prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    prefix dbpprop: <http://dbpedia.org/property/>
	';

  	$sparql = new EasyRdf_Sparql_Client('http://hxl.humanitarianresponse.info/sparql');
  	//$sparql = new EasyRdf_Sparql_Client('http://dbpedia.org/sparql');
   
  	$query = $prefixes.$query;
  	error_log($query);
  
  	try {
    	$results = $sparql->query($query);      
      	return $results;
  	} catch (Exception $e) {
      	return "<div class='error'>".$e->getMessage()."</div>\n";
  	}
}
	
function getCountries() {

    $countriesQuery = 'SELECT * {
  ?a <http://hxl.humanitarianresponse.info/ns/#atLevel> <http://hxl.humanitarianresponse.info/data/locations/adminUnitLevel/adminlevel0> . 
  ?a <http://hxl.humanitarianresponse.info/ns/#featureName> ?b
}';
    
    $countriesResult = sparqlQuery($countriesQuery);

    $countriesArray = Array();
    $a = "a";
    $b = "b";

    $i = 0;
    foreach($countriesResult as $row) {
        $countriesArray[$i]['uri'] = $row->$a;
        $countriesArray[$i]['name'] = $row->$b;

        $i++;
    }
    
    return $countriesArray;
}
	

/*
	$result = sparqlQuery('SELECT DISTINCT ?c1 ?c2
WHERE {
   ?c1 a <http://dbpedia.org/ontology/Country> .
   ?c1 dbpprop:populationEstimate ?c2
}');
	
	*/
?>
