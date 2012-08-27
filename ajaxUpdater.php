<?php
    include_once('sparqlQueries.php');
    
$countryUri=$_GET["countryUri"];
//echo $countryUri;


    $populationsArray = getCountryPopulation($countryUri);
    //$currentPopulation = $countriesArray[0]['uri'];
    
    //Injecting data into the HTML to retreive it with javaScript
    
    $code = '<div id="currentCountryUri">'.$countryUri.'</div>';
    
    $code .= '<div id="currentPopulation">';
    foreach($populationsArray as $row) {
        $code .= $row['date'].','.$row['personCount'].';';
    }
    $code .= '</div>';
    
    
    echo $code;
    
    //return '------------------------------------------------';//$code;
    
/*
    $countriesArray = getCountries();
                            foreach($countriesArray as $row) {
                            echo '<div><h2>'.$row['name'].'</h2></div>';
                        }
                        
                        
                        
                        
    $populationsArray = getCountryPopulation($countryUri);
                        foreach($populationsArray as $row) {
                            echo $row['date'].' - '.$row['personCount'].' - '.$row['source'].' - '.$row['method'].'<br>';
                        }
                        
/*
$con = mysql_connect('localhost', 'peter', 'abc123');
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysql_select_db("ajax_demo", $con);

$sql="SELECT * FROM user WHERE id = '".$q."'";

$result = mysql_query($sql);
*
echo "<table border='1'>
<tr>
<th>Firstname</th>
<th>Lastname</th>
<th>Age</th>
<th>Hometown</th>
<th>Job</th>
</tr>";

while($row = mysql_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['FirstName'] . "</td>";
  echo "<td>" . $row['LastName'] . "</td>";
  echo "<td>" . $row['Age'] . "</td>";
  echo "<td>" . $row['Hometown'] . "</td>";
  echo "<td>" . $row['Job'] . "</td>";
  echo "</tr>";
  }
echo "</table>";

mysql_close($con);
 */
?> 