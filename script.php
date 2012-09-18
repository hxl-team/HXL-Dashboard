<?php
include_once('lib/geoPHP/geoPHP.inc');
include_once('lib/sparqllib.php');

$uri = $_POST['uri'];
$query = 'SELECT DISTINCT ?countryGeom WHERE {';
$query .= '<' . $uri . '>' . ' <http://www.opengis.net/ont/geosparql#hasSerialization> ?countryGeom ';
$query .= '}';
//echo $query;

$queryResult = getQueryResults($query);

if ($queryResult->num_rows() == 0) echo 'no result';
else {
	$return = '';
    // Certainly not the safest algotythm to extract coordinates from the polygon string.
    while( $row = $queryResult->fetch_array() ){  


        $temp = wkt_to_json($row["countryGeom"]);
        $return = substr($temp, 35, strlen($temp) - 39);
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