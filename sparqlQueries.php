<?php
/*
 * This file allows to answer AJAX calls from
 */
include_once('lib/geoPHP/geoPHP.inc');
include_once('lib/sparqllib.php');

$uri = $_POST['uri'];
$query = 'SELECT DISTINCT ?geom WHERE {';
$query .= '<' . $uri . '>' . ' <http://www.opengis.net/ont/geosparql#hasGeometry> ?geomUri . ';
$query .= '?geomUri <http://www.opengis.net/ont/geosparql#hasSerialization> ?geom ';
$query .= '}';
//echo $query;

$queryResult = getQueryResults($query);

if ($queryResult->num_rows() == 0) echo 'no result';
else {
	$return = '';
    // To extract coordinates from the polygon string.
    while( $row = $queryResult->fetch_array() ){  

        // Removing the first and last part of the string result depending on the length of the type name.
        $temp = wkt_to_json($row["geom"]);
        switch (substr($temp, 0, 13)) {
            case '{"type":"Poly':
                $return = substr($temp, 35, strlen($temp) - 39);
                break;
            case '{"type":"Poin':
                $return = substr($temp, 31, strlen($temp) - 33);
                break;
            default:
                $return = "Error - localization query: Query value type not recognized (" . substr($temp, 0, 12) . ").";
        }
        
        break;
    } 
}
echo $return;


function getQueryResults($query){
    try {
        $db = sparql_connect( "http://hxl.humanitarianresponse.info/sparql" );
        
        if( !$db ) {
            print $db->errno() . ": " . $db->error(). "\n"; exit;
        }
        $result = $db->query($query);
        if( !$result ) {
            print $db->errno() . ": " . $db->error(). "\n"; exit;
        }

    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
	return $result;
}

function wkt_to_json($wkt) {
  $geom = geoPHP::load($wkt,'wkt');
  return $geom->out('json');
}

?>