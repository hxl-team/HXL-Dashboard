<?php
/*
 * Content of the second slide.
 */
?>
<div id="slide2" class="slide" style="width: 900px;" style="margin: 0 auto;" >
    <div id="slideContainer2" >
        <div style="margin: 20px;" >
            <button id="PreviousButton" ><< Overview</button>
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
                        <form name="catForm" action="" onchange="refresh()" style="margin: 0px 0px 10px 0px;">
                            <select id="catForm" class="btn" name="populations" style="width: 250px; text-align: left;" >
                            </select>
                        </form>
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
                        <div id="chart_div2" style="width: 850px; height: 350px; margin: 10px 20px 10px 0px;" >
                        </div>
                        <div id="" style="margin: 0px; text-align: center;" >
                            <button>XLS</button>
                            <button>GML</button>
                            <button>CSV</button>                        
                        </div>
                    </td>
                </tr>
                    <td style="vertical-align: top;" >
                        <div style="margin: 0px 10px 10px 0px;">
                            <form name="locForm" style="margin: 20px 0px 10px 0px;" action="" >Location (all admin levels and camps):<br />
                                <select id="locForm" onchange="refresh()" class="btn" name="locations" style="width: 250px; text-align: left;" >
                                    <option value="all_pop">* All camps</option>
                                </select>    
                            </form>
                            <form name="sexForm" onchange="refresh()" style="margin: 0px 0px 10px 0px;">Sex categories:<br />
                                <select id="sexForm" class="btn" name="sex" style="width: 250px; text-align: left;" >
                                    <option value="all_pop">* All sex categories</option>
                                </select>
                            </form>
                            <form name="ageForm" onchange="refresh()" style="margin: 0px 0px 10px 0px;">Age groups:<br />
                                <select id="ageForm" class="btn" name="age" style="width: 250px; text-align: left;" >
                                    <option value="all_pop">* All ages</option>
                                </select>
                            </form>
                            <form name="originForm" onchange="refresh()" style="margin: 0px 0px 10px 0px;">Country of origin:<br />
                                <select id="originForm" class="btn" name="origin" style="width: 250px; text-align: left;" >
                                    <option value="all_pop">* All countries</option>
                                </select>
                            </form>
                            <form name="sourceForm" onchange="refresh()" style="margin: 0px 0px 0px 0px;">Data source:<br />
                                <select id="sourceForm" class="btn" name="source" style="width: 250px; text-align: left;" >
                                    <option value="all_pop">* All sources</option>
                                </select>
                            </form>
                            <button id="goToTableView" style="margin: 20px 0px 0px 80px;" >Table view >></button>
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
