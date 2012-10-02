<?php
/*
 * Content of the second slide.
 */
?>
<script>

</script>

<div id="slide2" class="slide" style="width: 900px;" style="margin: 0 auto;" >
    <div id="slideContainer2" >
        <div style="margin: 20px;" >
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
            <br style="clear:both" >
        </div>
        <div style="width: 850px; margin: 20px auto;" >
            <table>
                <tr>
                    <td>
                        <span style="font-size: 18px; line-height: 27px; color: inherit; font-weight: bold; margin: 0; text-rendering: optimizelegibility;" ></span>
                    </td>
                    <td>
                        <span id="detailedViewTitle" style="font-size: 18px; line-height: 27px; color: inherit; font-weight: bold; margin: 0; text-rendering: optimizelegibility;" ></span>
                    </td>
                    <td>
                        <div id="catList" class="btn-group">
                            <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                <span id="catListSelectedValue" >Test1</span>
                                <span id="catListSelectedId" style="display: none;" >Test1</span>
                                <span class="caret"></span>
                            </a>
                            <ul id="catListItems" class="dropdown-menu" >
                            </ul>
                        </div>
                    </td>
                </tr>
            </table>
            <br />
            <table>
                <tr>
                    <td>
                        
                    </td>
                </tr>
            </table>
            <table style="width: 860px;" >
                <tr>
                    <td colspan="2" width="620" style="vertical-align: top;" >
                        <!--<a name="graph"></a> -->
                        <div id="chart_div2" style="width: 850px; height: 350px; margin: 10px 20px 10px 0px; border: 1px solid black;" >
                        </div>
                        <div id="" style="margin: 0px; text-align: center;" >
                            <button>XLS</button>
                            <button>GML</button>
                            <button>CSV</button>                        
                        </div>
                    </td>
                </tr>
                    <td style="vertical-align: top;" >
                        <div style="margin: 0px 10px 10px 0px;" >
                            Location (all admin levels and camps):<br />
                            <div id="locList" class="btn-group" style="margin: 0px 0px 8px 0px;" >
                                <a class="btn dropdown-toggle" data-toggle="dropdown" href="#" style="width: 230px;" >
                                    <span id="locListSelectedValue" style="float: left;" ></span>
                                    <span id="locListSelectedId" style="display: none;" ></span>
                                    <span class="caret" style="float: right;"></span>
                                </a>
                                <ul id="locListItems" class="dropdown-menu" style="width: 246px;" >
                                </ul>
                            </div>
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
                            Data source:<br />
                            <div id="sourceList" class="btn-group" style="margin: 0px 0px 8px 0px;" >
                                <a class="btn dropdown-toggle" data-toggle="dropdown" href="#" style="width: 230px;" >
                                    <span id="sourceListSelectedValue" style="float: left;" ></span>
                                    <span id="sourceListSelectedId" style="display: none;" ></span>
                                    <span class="caret" style="float: right;"></span>
                                </a>
                                <ul id="sourceListItems" class="dropdown-menu" style="width: 246px;" >
                                </ul>
                            </div>
                            <button id="goToTableView2" class="btn" style="margin: 20px 0px 0px 80px;" >Table view >></button>
                        </div>
                    </td>  
                    <td>
                        <div id="map" style="width: 560px; height: 300px; margin: 20px; border: 1px solid black;">
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
