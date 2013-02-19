 <?php
/*
 * Content of the first slide.
 */
?>
<div id="slide1" class="slide" style="width: 900px;" style="margin: 0 auto;" >
    <div id="slideContainer1" display="block" style="width: 860px; margin: 20px auto;">
        <table>
            <tr>
                <td>
                    <span style="font-size: 18px; line-height: 27px; color: inherit; font-weight: bold; margin: 0; text-rendering: optimizelegibility;" ></span>
                </td>
                <td>
                    <span id="overViewTitle" style="font-size: 18px; line-height: 27px; color: inherit; font-weight: bold; margin: 0; text-rendering: optimizelegibility;" >Emergency overview > </span>
                </td>
                <td>
                    <div id="emeList" class="btn-group">
                        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                            <span id="emeListSelectedValue" ></span>
                            <span id="emeListSelectedId" style="display: none;" ></span>
                            <span class="caret"></span>
                        </a>
                        <ul id="emeListItems" class="dropdown-menu">
                        </ul>
                    </div>
                </td>
            </tr>
        </table>
        <br />
        <br />
        <div id="noDataBlock" ></div>
        <div id="dataBlock" >
            
            <!-- SPARKLINE BLOC 1 -->
            <div class="well" style="width:500px; margin:0 auto; border-width: 4px" >
                <div id="errorPop1" class="center" style="display:none;" >No data available for the displaced population</div>
                <div id="popContent1" style="margin-left:50px;">
                    <table>
                        <tr>
                            <td width="220">
                                <div style="margin-top: 12px; margin-right: 10px; text-align: right;" >
                                    <a id="lastCount1" style="font-family:'sans-serif', 'Arial', sans-serif; font-size:34pt; font-weight:normal; color:#046CB6; text-decoration: none;" title="people" ></a>
                                </div>
                            </td>
                            <td width="80">
                                <div id="sparkline1" style="width: 80px; border-left: 1px solid #999999; border-bottom: 1px solid #999999;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div style="text-align: right;" >
                                    <h2 id="catPopover1" data-content="" rel="popover" data-original-title="" style="font-family:'sans-serif', 'Arial', sans-serif; font-size:16pt; font-weight:normal; color:#6699cc;" ></h2>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div style="text-align: right;" >
                                    as of <span id="date1" ></span> |
                                    <a id="infoPopover1" name="" data-content="" rel="popover" href="#" onClick="quickTable(this)" data-original-title="Info" >Info</a> | 
                                    <button id="NextButton1" name="" class="btn" >More >></button>
                                </div> 
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <br />

            <!-- SPARKLINE BLOC 2 -->
            <div class="well" style="width:480px; margin:0 auto; border-width: 2px" >
                <div id="errorPop2" class="center" style="display:none;" >No data available for refugees and asylum seekers</div>
                <div id="popContent2" style="margin-left:50px;">
                    <table>
                        <tr>
                            <td width="220">
                                <div style="margin-top: 12px; margin-right: 10px; text-align: right;" >
                                    <a id="lastCount2" style="font-family:'sans-serif', 'Arial', sans-serif; font-size:34pt; font-weight:normal; color:#046CB6; text-decoration: none;" title="people" ></a>
                                </div>
                            </td>
                            <td width="80">
                                <div id="sparkline2" style="width: 80px; border-left: 1px solid #999999; border-bottom: 1px solid #999999;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div style="text-align: right;" >
                                    <h2 id="catPopover2" data-content="" rel="popover" data-original-title="" style="font-family:'sans-serif', 'Arial', sans-serif; font-size:16pt; font-weight:normal; color:#6699cc;" ></h2>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div style="text-align: right;" >
                                    as of <span id="date2" ></span> |
                                    <a id="infoPopover2" name="" data-content="" rel="popover" href="#" onClick="quickTable(this)" data-original-title="Info" >Info</a> | 
                                    <button id="NextButton2" name="" class="btn" >More >></button>
                                </div> 
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <br />

            <!-- SPARKLINE BLOC 3 -->
            <div class="well" style="width:480px; margin:0 auto; border-width: 2px" >
                <div id="errorPop3" class="center" style="display:none;" >No data available for IDPs</div>
                <div id="popContent3" style="margin-left:50px;">
                    <table>
                        <tr>
                            <td width="220">
                                <div style="margin-top: 12px; margin-right: 10px; text-align: right;" >
                                    <a id="lastCount3" style="font-family:'sans-serif', 'Arial', sans-serif; font-size:34pt; font-weight:normal; color:#046CB6; text-decoration: none;" title="people" ></a>
                                </div>
                            </td>
                            <td width="80">
                                <div id="sparkline3" style="width: 80px; border-left: 1px solid #999999; border-bottom: 1px solid #999999;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div style="text-align: right;" >
                                    <h2 id="catPopover3" data-content="" rel="popover" data-original-title="" style="font-family:'sans-serif', 'Arial', sans-serif; font-size:16pt; font-weight:normal; color:#6699cc;" ></h2>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div style="text-align: right;" >
                                    as of <span id="date3" ></span> |
                                    <a id="infoPopover3" name="" data-content="" rel="popover" href="#" onClick="quickTable(this)" data-original-title="Info" >Info</a> | 
                                    <button id="NextButton3" name="" class="btn" >More >></button>
                                </div> 
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <br />

            <!-- SPARKLINE BLOC 4 -->
            <div class="well" style="width:480px; margin:0 auto; border-width: 2px" >
                <div id="errorPop4" class="center" style="display:none;" >No data available for others of concern</div>
                <div id="popContent4" style="margin-left:50px;">
                    <table>
                        <tr>
                            <td width="220">
                                <div style="margin-top: 12px; margin-right: 10px; text-align: right;" >
                                    <a id="lastCount4" style="font-family:'sans-serif', 'Arial', sans-serif; font-size:34pt; font-weight:normal; color:#046CB6; text-decoration: none;" title="people" ></a>
                                </div>
                            </td>
                            <td width="80">
                                <div id="sparkline4" style="width: 80px; border-left: 1px solid #999999; border-bottom: 1px solid #999999;"></div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div style="text-align: right;" >
                                    <h2 id="catPopover4" data-content="" rel="popover" data-original-title="" style="font-family:'sans-serif', 'Arial', sans-serif; font-size:16pt; font-weight:normal; color:#6699cc;" ></h2>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <div style="text-align: right;" >
                                    as of <span id="date4" ></span> |
                                    <a id="infoPopover4" name="" data-content="" rel="popover" href="#" onClick="quickTable(this)" data-original-title="Info" >Info</a> | 
                                    <button id="NextButton4" name="" class="btn" >More >></button>
                                </div> 
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <br />
            <br />
            <span id="sourcesScore" ></span>
        </div>
        <br />
    </div>
</div>
					