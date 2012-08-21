<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/*
if (isset($_POST["countrySelect"])) {
    $country = $_POST["countrySelect"];
    echo $country;
}*/
?>


<?php
    include_once('sparqlQueries.php');
    $countriesArray = getCountries();
?>
                    
<div id="slide1" class="slide" style="width: 900px;" style="margin: 0 auto;" >
    <div id="slideContainer1" >
        <div id="NextButton" class="well" style="text-align: right; margin: 0; cursor: pointer" >
            <button>Detailed view >></button>
        </div>
        <div style="width: 860px; margin: 20px auto;" >
            <form style="padding: 0;" action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" >
                <select id="countrySelect" name="countrySelect" class="btn" name="countryChoice" style="margin-bottom: 0; text-align: left; font-size: 18px; font-weight: bold; height: 34px;" onchange="showUser(this.value)">
                    <?php
                        foreach($countriesArray as $row) {
                            echo '<option value="'.$row['uri'].'"><h2>'.$row['name'].'</h2></option>';
                        }
                    
                    ?>
                    <!--<option value="bfa_cou"><h2>Burkina Faso</h2></option>
                    <option value="mal_cou">Mali</option>-->
                    <option value="all_countries">* All countries</option>
                </select>
            </form>
<br />
<div id="txtHint"><b>Person info will be listed here.</b></div>
            <table>
                <tr>
                    <td width="200">
                        <P class="center">
                        <SPAN style="font-family:'sans-serif', 'Arial', sans-serif; font-size:20pt; font-weight:normal; color:#046CB6">4,640</SPAN><br />
                        <SPAN style="font-family:'sans-serif', 'Arial', sans-serif; font-size:8pt; font-weight:normal; color:#505050">IDF in Deou 2012 (fake)</SPAN>     
                        </P>
                    </td>
                    <td>
                        <div id="chart_div1" style="width: 600px; height: 400px;"></div>
                    </td>       
                </tr>
                <tr>
                <tr>
                    <td>
                    </td>
                    <td>
                        <div style="text-align: center;" >
                            <form id="catPopover" data-content="Population of people affected by a humanitarian crisis" rel="popover" href="#" data-original-title="Affected population" style=" margin-bottom: 10px; padding: 0;" action="" >
                                <select class="btn" name="populations" style="width: 400px; margin-bottom: 0; text-align: left;" >
                                    <option value="aff_pop">Affected population</option>
                                    <option value="dis_pop">Displaced population</option>
                                    <option value="idp_pop">Internationally displaced population</option>
                                    <option value="nod_pop">Non-displaced population</option>
                                    <option value="all_pop">* All populations</option>
                                </select>
                            </form>
                            <SPAN style="font-family:'sans-serif', 'Arial', sans-serif; font-size:12px; font-weight:normal; color:#505050;" >
                                as of 01.08.2012 |
                                <a id="sourcePopover" data-content="Only from UNHCR" rel="popover" href="#" data-original-title="Source" >source</a> | 
                                <a id="methodPopover" data-content="Counting people one by one" rel="popover" href="#" data-original-title="Counting method">method</a> | 
                                <a id="reportedByPopover" data-content="UNOCHA" rel="popover" href="#" data-original-title="Organization reporting">reported by</a>
                            </SPAN>    
                        </div>
                    </td>
                </tr>
                    <td colspan="2">
                        <p class="center" >                    
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>