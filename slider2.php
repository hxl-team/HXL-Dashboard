<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>

                    <!--<a href="javascript:void(0)" onclick="PreviousSlide()" id="PreviousButton" style="margin-right: 10px;">
          <div style="text-align: left;" >          <div style="width: 800px;" >
-->
<div id="slide2" class="slide" style="width: 900px;" style="margin: 0 auto;" >
    <div id="slideContainer2" >
        <div style="margin: 20px;" >
            <button id="PreviousButton" ><< Simple view</button>
                            <button id="tableView" style="float: right" >Table view >></button>
        </div>
        <div style="width: 860px; margin: 20px auto;" >
            <h3 id="detailedViewTitle" >Burkina Faso crisis - details of</h3>
            <br />
            <table>
                <tr><!--
                    <td>
            <form style=" margin-bottom: 25px; padding: 0;" action="" >
                <select class="btn" name="populations" style="margin-bottom: 0; text-align: left; font-size: 18px; font-weight: bold; height: 34px;" >
                    <option value="aff_pop"><h2>Burkina Faso</h2></option>
                    <option value="dis_pop">Mali</option>
                    <option value="all_pop">* All countries</option>
                </select>    
            </form>
                    </td>-->
                    <td>
            <form style=" margin-bottom: 25px; padding: 0;" action="" >Location (all admin level and camps):<br />
                <select class="btn" name="populations" style="margin-bottom: 0; text-align: left;" >
                    <option value="aff_pop">Deou</option>
                    <option value="dis_pop">Douala</option>
                    <option value="all_pop">* All camps</option>
                </select>    
            </form>
                    </td>
                </tr>
            </table>
            <table style="width: 860px;" >
                <tr>
                    <td width="600" style="vertical-align: top;" >
                        <div id="chart_div2" style="width: 580px; height: 300px; margin: 10px 20px 20px 0px;" >
                        </div>
                        <div id="" style="margin: 10px 5px 10px 10px; text-align: center;" >
                            <button>XLS</button>
                            <button>GML</button>
                            <button>CSV</button>                        
                        </div>
                    </td>
                    <td style="vertical-align: top;" >
                        <div id="map_canvas" style="width: 250px; height: 300px; margin: 10px 0px 20px 0px; border: 1px solid black;">
                        </div>
                        <div style="margin: 10px 10px 10px 0px;">
                            <form action="" style="margin: 0px 0px 10px 0px;">Type of population:
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">Displaced population</option>
                                    <option value="idp_pop">Internally displaced population</option>
                                    <option value="ref_pop">Refugees and asylum seekers</option>
                                    <option value="oth_pop">Others of concern</option>
                                    <option value="nod_pop">Non-displaced population</option>
                                </select>
                            </form>
                            <form action="" style="margin: 0px 0px 10px 0px;">Sex categories:
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">Male</option>
                                    <option value="idp_pop">Female</option>
                                    <option value="nod_pop">Inter sex</option>
                                </select>
                            </form>
                            <form action="" style="margin: 0px 0px 10px 0px;">Age groups:
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">0-4</option>
                                    <option value="idp_pop">5-10</option>
                                    <option value="nod_pop">10-20</option>
                                </select>
                            </form>
                            <form action="" style="margin: 0px 0px 10px 0px;">Country of origin:
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">Mali</option>
                                    <option value="idp_pop">Internationally displaced population</option>
                                    <option value="nod_pop">Non-displaced population</option>
                                </select>
                            </form>
                            <form action="" style="margin: 0px 0px 0px 0px;">Data source:
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">UNHCR</option>
                                    <option value="idp_pop">Internationally displaced population</option>
                                    <option value="nod_pop">Non-displaced population</option>
                                </select>
                            </form>
                        </div>
                    </td>  
            </table>
            <p>
                <br />
                <br />
                <br />
            </p>
        </div>
    </div>
</div>