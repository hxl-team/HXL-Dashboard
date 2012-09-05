<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
?>

<div id="slide2" class="slide" style="width: 900px;" style="margin: 0 auto;" >
    <div id="slideContainer2" >
        <div style="margin: 20px;" >
            <button id="PreviousButton" ><< Overview</button>
                <button id="tableView" style="float: right" >Table view >></button>
        </div>
        <div style="width: 850px; margin: 20px auto;" >
            <h3 id="detailedViewTitle" >Burkina Faso crisis - details of</h3><!-- must be data driven -->
            <br />
            <table>
                <tr>
                    <td>
                        <form action="" style="margin: 0px 0px 10px 0px;">Type of population:<br />
                            <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                <option value="dis_pop">Displaced population</option>
                                <option value="idp_pop">Internally displaced population</option>
                                <option value="ref_pop">Refugees and asylum seekers</option>
                                <option value="oth_pop">Others of concern</option>
                                <option value="nod_pop">Non-displaced population</option>
                            </select>
                        </form>
                    </td>
                </tr>
            </table>
            <table style="width: 860px;" >
                <tr>
                    <td colspan="2" width="620" style="vertical-align: top;" >
                        <div id="chart_div2" style="width: 850px; height: 350px; margin: 10px 20px 20px 0px;" >
                        </div>
                        <div id="" style="margin: 10px 5px 10px 10px; text-align: center;" >
                            <button>XLS</button>
                            <button>GML</button>
                            <button>CSV</button>                        
                        </div>
                    </td>
                </tr>
                    <td style="vertical-align: top;" >
                        <div style="margin: 10px 10px 10px 0px;">
                            <form style=" margin-bottom: 25px; padding: 0;" action="" >Location (all admin level and camps):<br />
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="aff_pop">Deou</option>
                                    <option value="dis_pop">Dibissi</option>
                                    <option value="all_pop">* All camps</option>
                                </select>    
                            </form>
                            <form action="" style="margin: 0px 0px 10px 0px;">Sex categories:<br />
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">Male</option>
                                    <option value="idp_pop">Female</option>
                                    <option value="nod_pop">Inter sex</option>
                                </select>
                            </form>
                            <form action="" style="margin: 0px 0px 10px 0px;">Age groups:<br />
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">0-4</option>
                                    <option value="idp_pop">5-10</option>
                                    <option value="nod_pop">10-20</option>
                                </select>
                            </form>
                            <form action="" style="margin: 0px 0px 10px 0px;">Country of origin:<br />
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">Mali</option>
                                    <option value="idp_pop">Internationally displaced population</option>
                                    <option value="nod_pop">Non-displaced population</option>
                                </select>
                            </form>
                            <form action="" style="margin: 0px 0px 0px 0px;">Data source:<br />
                                <select class="btn" name="populations" style="width: 250px; text-align: left;" >
                                    <option value="dis_pop">UNHCR</option>
                                    <option value="idp_pop">Internationally displaced population</option>
                                    <option value="nod_pop">Non-displaced population</option>
                                </select>
                            </form>
                        </div>
                    </td>  
                    <td>
                        <div id="map_canvas" style="width: 560px; height: 300px; margin: 20px; border: 1px solid black;">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>