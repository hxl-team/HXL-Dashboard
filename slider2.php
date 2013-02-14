<?php
/*
 * Content of the second slide.
 */
?>
<div id="slide2" class="slide" style="width: 900px;" style="margin: 0 auto;" >
    <div id="slideContainer2" display="none" >
        <div style="margin: 20px 20px 0px 20px;" >
            <table>
                <tr>
                    <td>
                        <button id="PreviousButton1" class="btn" ><< Overview</button>
                    </td>
                    <td>
                        <button id="goToTableView1" class="btn" style="margin-left:630px" >Table view >></button>
                    </td>
                </tr>
            </table>            
            <span style="clear:both" />
        </div>
        <br />
        <div style="width: 850px; margin: 0px auto;" >
            <span id="detailedViewTitle" style="font-size: 18px; line-height: 27px; color: inherit; font-weight: bold; margin: 0; text-rendering: optimizelegibility;" >Detailed view</span><br />
            <br />
            <div style="text-align:center" >
            <div style="display: inline-block;" >
            <div class="well">
                <table>
                    <tr>
                        <td>
                            <div style="margin:0 10px 0 0;" >
                                <b>Type of population</b>
                                <div id="catList" class="btn-group">
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                        <span id="catListSelectedValue" ></span>
                                        <span id="catListSelectedId" style="display: none;" ></span>
                                        <span class="caret"></span>
                                    </a>
                                    <ul id="catListItems" class="dropdown-menu" >
                                    </ul>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div style="margin:0 10px 0 10px;" >
                            <b>Location</b><br />
                            <a id="locListSelectedValue" data-toggle="modal" href="#myModal" class="btn"></a><span id="locListSelectedId" style="display: none;" ></span>
                        </td>
                        <td>
                            <div style="margin:0 0 0 10px;" >
                                <b>Source</b>
                                <div id="sourceList" class="btn-group" >
                                    <a class="btn dropdown-toggle" data-toggle="dropdown" href="#" style="width: 230px;" >
                                        <span id="sourceListSelectedValue" style="float: left;" ></span>
                                        <span id="sourceListSelectedId" style="display: none;" ></span>
                                        <span class="caret" style="float: right;"></span>
                                    </a>
                                    <ul id="sourceListItems" class="dropdown-menu" style="width: 246px;" >
                                    </ul>
                                </div>
                            </div>
                        </td>

                    </tr>
                </table>
            </div>
            </div>
            </div>
            <table style="width: 860px;" >
                <tr>
                    <td colspan="2" width="620" style="vertical-align: top;" >
                        <div id="chart_div2" style="width: 850px; height: 350px; margin: 10px 20px 10px 0px; border: 1px solid black;" >
                        </div>
                        <div class="downloadBar" style="margin: 0px; text-align: center;" >
                         <!--   <button>XLS</button>
                            <button>GML</button>
                            <button>CSV</button>                     -->    
                        </div>
                    </td>
                </tr>
                    <td style="vertical-align: top;" >
                        <div style="margin: 20px 10px 10px 0px;" >
                            Sex categories:<br />
                            <div id="sexList" class="btn-group" style="margin: 0px 0px 8px 0px;" >
                                <a class="btn dropdown-toggle" data-toggle="dropdown" href="#" style="width: 230px;" >
                                    <span id="sexListSelectedValue" style="float: left;" ></span>
                                    <span id="sexListSelectedId" style="display: none;" ></span>
                                    <span class="caret" style="float: right;"></span>
                                </a>
                                <ul id="sexListItems" class="dropdown-menu" style="width: 246px;" >
                                </ul>
                            </div>
                            Age groups:<br />
                            <div id="ageList" class="btn-group" style="margin: 0px 0px 8px 0px;" >
                                <a class="btn dropdown-toggle" data-toggle="dropdown" href="#" style="width: 230px;" >
                                    <span id="ageListSelectedValue" style="float: left;" ></span>
                                    <span id="ageListSelectedId" style="display: none;" ></span>
                                    <span class="caret" style="float: right;"></span>
                                </a>
                                <ul id="ageListItems" class="dropdown-menu" style="width: 246px;" >
                                </ul>
                            </div>
                            Country of origin:<br />
                            <div id="originList" class="btn-group" style="margin: 0px 0px 8px 0px;" >
                                <a class="btn dropdown-toggle" data-toggle="dropdown" href="#" style="width: 230px;" >
                                    <span id="originListSelectedValue" style="float: left;" ></span>
                                    <span id="originListSelectedId" style="display: none;" ></span>
                                    <span class="caret" style="float: right;"></span>
                                </a>
                                <ul id="originListItems" class="dropdown-menu" style="width: 246px;" >
                                </ul>
                            </div>
                            <button id="goToTableView2" class="btn" style="margin: 20px 0px 0px 80px;" >Table view >></button>
                        </div>
                    </td>  
                    <td>
                        <div id="mapMessage" style="text-align: center;display:none"><span class="text-warning" >No coordinates for this location</span></div>
                        <div id="map" style="width: 560px; height: 300px; margin: 20px; border: 1px solid black;"></div>
                    </td>
                </tr>
            </table>
            

            <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 id="myModalLabel">Affected people locations</h3>
                    <span class="label label-warning" style="margin-left: 20px;">Note:</span><span class="text-warning" > Please select only one location and press Ok. No selection select all locations.</span>
                </div>
                <div class="modal-body">              
                    <div id="modalContent">
                    </div>
                </div>
                <div class="modal-footer">
                    <!--<button class="btn" data-dismiss="modal" aria-hidden="true">Cancel</button>-->
                    <button class="btn btn-primary" data-dismiss="modal" >Ok</button>
                </div>
            </div>
            </br>
            </br>
            </br>
        </div>
    </div>
</div>
