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
	
function singleSparqlQuery($query, $varName){

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
    	$result = '';
        foreach($results as $row) { 
            $result = $results['0']->$varName;   
            break;
        }
      	return $result;
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
	
function getCountryPopulation($countryUri) {

    $query = "SELECT DISTINCT ?date ?personCount ?sourceUri ?method WHERE {
  GRAPH ?container {
    ?camps <http://hxl.humanitarianresponse.info/ns/#atLocation> <$countryUri> .
  }  
  GRAPH ?container2 {
    ?populations <http://hxl.humanitarianresponse.info/ns/#atLocation> ?camps .  
  }   
  GRAPH ?container2 {
    ?populations <http://hxl.humanitarianresponse.info/ns/#atLocation> ?camps .  
  }
  GRAPH ?container3 {
    ?populations <http://hxl.humanitarianresponse.info/ns/#personCount> ?personCount .
    ?populations <http://hxl.humanitarianresponse.info/ns/#method> ?method .
    ?populations <http://hxl.humanitarianresponse.info/ns/#source> ?sourceUri .
  } 
  ?container3 <http://www.w3.org/2001/XMLSchema#date> ?date .
}";
    
    //echo $query;
    
    $result = sparqlQuery($query);

    $resultArray = Array();
    $date = "date";
    $personCount = "personCount";
    $sourceUri = "sourceUri";
    $method = "method";

    $i = 0;
    foreach($result as $row2) {
        $resultArray[$i]['date'] = $row2->$date;
        $resultArray[$i]['personCount'] = $row2->$personCount;
        
        // Getting the source name 
        $source = $row2->$sourceUri;
        //echo $source;
        $query = "SELECT DISTINCT ?source WHERE {
    <$source> <http://hxl.humanitarianresponse.info/ns/#orgDisplayName> ?source .
    }";
        $source = "source";
        $source = singleSparqlQuery($query, $source);
        
        $resultArray[$i]['source'] = $source;
        $resultArray[$i]['method'] = $row2->$method;

        $i++;
    }
    /*
    // Getting the source name
    $result = sparqlQuery($query);

    $resultArray = Array();
    $date = "date";
    $personCount = "personCount";
    $sourceUri = "sourceUri";
    $method = "method";

    $i = 0;
    foreach($result as $row2) {
        $resultArray[$i]['date'] = $row2->$date;
        $resultArray[$i]['personCount'] = $row2->$personCount;
        $resultArray[$i]['sourceUri'] = $row2->$sourceUri;
        $resultArray[$i]['method'] = $row2->$method;

        $i++;
    }*/
    
    
    
    return $resultArray;
}
	

/*
	$result = sparqlQuery('SELECT DISTINCT ?c1 ?c2
WHERE {
   ?c1 a <http://dbpedia.org/ontology/Country> .
   ?c1 dbpprop:populationEstimate ?c2
}');
	
	*/
?>
