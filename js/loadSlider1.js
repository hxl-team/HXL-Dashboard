
var emergenciesList;
var emergenciesLabels;
emergenciesList = getEmergenciesInfo ();

var categoriesInfo;
var categoriesLabels;
categoriesInfo = getCategoriesInfo ();
var populationInfo;


/* Refresh the content when the emergency choice triggers. */
function refreshSlide1(event) { 
    setEmergencyChoice(event);
    getPopulationInfo(document.getElementById('emeListSelectedId').innerHTML);
    initInfoCategory(categoriesInfo);  
    initSparklines();  
    testHideSparklines();
}

/* Hides the sparkline blocks. */
function testHideSparklines()
{      
    if (populationInfo == null) {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />No population available (1)<br /><br />"); 
        return false;
    }   
    if (populationInfo == undefined) {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />No population available (2)<br /><br />"); 
        return false;
    }   
    if (populationInfo.results.bindings.length == 0) {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />No population available (3)<br /><br />"); 
        return false;
    }   
    if (populationInfo.results.bindings[0] == null) {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />No population available (4)<br /><br />"); 
        return false;
    }   
    /*
     *
    if (populationInfo == null || populationInfo == undefined || 
        populationInfo.results.bindings.length == 0 || populationInfo.results.bindings[0] == null) {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />No population available<br /><br />"); 
        return false;
    }   */
    else if (emergenciesList == null || emergenciesList == undefined)
    {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />No emergency available<br /><br />"); 
        return false;
    }
    else if (categoriesInfo == null || categoriesInfo == undefined)
    {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />No categories available<br /><br />"); 
        return false;
    }
    $('#noDataBlock').html(""); 
    $('#noDataBlock').hide(); 
    $('#noDataBlock').show(); 
    return true;
}

/*
 * Tool for adding a comma for thousands on the row figures.
 */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/*
 * Displays the title and the emergency selection.
 */
function setEmergencyChoice(event) {

    // Filling the list
    $('#emeListItems').empty();
    var tempList = '';
    //for (var i = emergenciesList.results.bindings.length - 1; i >= 0; i--) {
    for (var i = 0 ; i < emergenciesList.results.bindings.length; i++) {
        tempList += '<li><a id="' + i + '" onclick="refreshSlide1(this)" >' + emergenciesList.results.bindings[i]['emergencyDisplay'].value + '</a></li>';
    }
    $('#emeListItems').html(tempList);
    tempList = null;
    
    // List choice
// Warning: Temporary setting using element 1 corresponding to the first set of test data
    var tempValue = emergenciesList.results.bindings[1]['emergencyDisplay'].value;
    var tempId = emergenciesList.results.bindings[1]['emergencyUri'].value;
    
    if (event != null) {
        tempValue = emergenciesList.results.bindings[event.id]['emergencyDisplay'].value;
        tempId = emergenciesList.results.bindings[event.id]['emergencyUri'].value;
    }
    $('#emeListSelectedValue').html(tempValue);
    $('#emeListSelectedId').html(tempId);
}

/*
 * Displays the general or metadata information related to the sparklines.
 */
function initInfoCategory(categoriesData) {

    //  Buttons over
    $("#infoPopover1").popover({placement:'bottom', trigger: 'hover', delay: {show: 300, hide: 100 }}); 
    $("#catPopover1").popover({placement:'left', trigger: 'hover', delay: {show: 300, hide: 100 }}); 
    
    $("#infoPopover2").popover({placement:'bottom', trigger: 'hover', delay: {show: 300, hide: 100 }}); 
    $("#catPopover2").popover({placement:'left', trigger: 'hover', delay: {show: 300, hide: 100 }}); 
    
    $("#infoPopover3").popover({placement:'bottom', trigger: 'hover', delay: {show: 300, hide: 100 }}); 
    $("#catPopover3").popover({placement:'left', trigger: 'hover', delay: {show: 300, hide: 100 }}); 
    
    $("#infoPopover4").popover({placement:'bottom', trigger: 'hover', delay: {show: 300, hide: 100 }}); 
    $("#catPopover4").popover({placement:'left', trigger: 'hover', delay: {show: 300, hide: 100 }}); 

    // Display
    // Category and its popover
    categoriesLabels = new Array();
    categoriesLabels.push(categoriesData.results.bindings[0]['classLabel'].value);
    categoriesLabels.push(categoriesData.results.bindings[0]['subClassLabel'].value);
    categoriesLabels.push(categoriesData.results.bindings[2]['subClassLabel'].value);
    categoriesLabels.push(categoriesData.results.bindings[1]['subClassLabel'].value);

    $("#catPopover1").html(categoriesLabels[0]);
    $("#catPopover2").html(categoriesLabels[1]);
    $("#catPopover3").html(categoriesLabels[2]);
    $("#catPopover4").html(categoriesLabels[3]);

    var el = document.getElementById("catPopover1");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = categoriesData.results.bindings[0]['classDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') {
            attrs.item(i).value = categoriesData.results.bindings[0]['classLabel'].value
        }
    }

    var el = document.getElementById("catPopover2");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = categoriesData.results.bindings[0]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') {
            attrs.item(i).value = categoriesData.results.bindings[0]['subClassLabel'].value
        }
    }

    var el = document.getElementById("catPopover3");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = categoriesData.results.bindings[2]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') {
            attrs.item(i).value = categoriesData.results.bindings[2]['subClassLabel'].value
        }
    }

    var el = document.getElementById("catPopover4");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = categoriesData.results.bindings[1]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') {
            attrs.item(i).value = categoriesData.results.bindings[1]['subClassLabel'].value
        }
    }
}

/*
 * Load the content from the query to variables and use values to instanciate the sparklines.
 */
var count1;
var count2;
var count3;
var count4;
var dateArray1;
var dateArray2;
var dateArray3;
var dateArray4;
function initSparklines() {
      
    if (populationInfo.results.bindings.length == 0)
    {
        return;
    } 

    var source1 = new Array();
    var source2 = new Array();
    var source3 = new Array();
    var source4 = new Array();
    var method1 = new Array();
    var method2 = new Array();
    var method3 = new Array();
    var method4 = new Array();
    var reportedBy1 = new Array();
    var reportedBy2 = new Array();
    var reportedBy3 = new Array();
    var reportedBy4 = new Array();
    var lastCount1 = 0;
    var lastCount2 = 0;
    var lastCount3 = 0;
    var lastCount4 = 0;
    var date1 = '';
    var date2 = '';
    var date3 = '';
    var date4 = '';

    count1 = new Array();
    count2 = new Array();
    count3 = new Array();
    count4 = new Array();
    dateArray1 = new Array();
    dateArray2 = new Array();
    dateArray3 = new Array();
    dateArray4 = new Array();
    dateArrayFull1 = new Array();
    dateArrayFull2 = new Array();
    dateArrayFull3 = new Array();
    dateArrayFull4 = new Array();

    var currentDate = '';
    var graphIndex = -1;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {

        // parsing by date
        if (currentDate != populationInfo.results.bindings[i]['date'].value) {
            currentDate = populationInfo.results.bindings[i]['date'].value;
            graphIndex++;
            count1[graphIndex] = 0;
            count2[graphIndex] = 0;
            count3[graphIndex] = 0;
            count4[graphIndex] = 0;
        }

        switch(populationInfo.results.bindings[i]['typeUri'].value) 
        {
            case "http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers":
                date2 = populationInfo.results.bindings[i]['date'].value;
                break;
            case "http://hxl.humanitarianresponse.info/ns/#IDP":
                date3 = populationInfo.results.bindings[i]['date'].value;
                break;
            case "http://hxl.humanitarianresponse.info/ns/#Others":
                date4 = populationInfo.results.bindings[i]['date'].value;
                break;
        }

        // Getting the main graph count and date, the main source, method and reported by
        count1[graphIndex] = parseInt(count1[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
        dateArray1[graphIndex] = new Date(populationInfo.results.bindings[i]['date'].value);
        // For the chart, the date format can be interpreted only like yyyy, m, d but not yyyy-m-d.
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            dateArrayFull1[i] = new Date(populationInfo.results.bindings[i]['date'].value.replace('-', ', '));
        } else {

            dateArrayFull1[i] = new Date(populationInfo.results.bindings[i]['date'].value);
        }
        date1 = populationInfo.results.bindings[i]['date'].value;
        if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source1) < 0) {
            source1.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['methodDisplay'].value, method1) < 0) {
            method1.push(populationInfo.results.bindings[i]['methodDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy1) < 0) {
            reportedBy1.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
        }

        // Getting the graph count, the source, the method and the reported by.
        switch(populationInfo.results.bindings[i]['typeUri'].value) 
        {
            case "http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers":
                count2[graphIndex] = parseInt(count2[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source2) < 0) {
                    source2.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['methodDisplay'].value, method2) < 0) {
                    method2.push(populationInfo.results.bindings[i]['methodDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy2) < 0) {
                    reportedBy2.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
                }
                break;
            case "http://hxl.humanitarianresponse.info/ns/#IDP":
                count3[graphIndex] = parseInt(count3[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source3) < 0) {
                    source3.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['methodDisplay'].value, method3) < 0) {
                    method3.push(populationInfo.results.bindings[i]['methodDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy3) < 0) {
                    reportedBy3.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
                }
                break;
            case "http://hxl.humanitarianresponse.info/ns/#Others":
                count4[graphIndex] = parseInt(count4[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source4) < 0) {
                    source4.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['methodDisplay'].value, method4) < 0) {
                    method4.push(populationInfo.results.bindings[i]['methodDisplay'].value);
                }
                if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy4) < 0) {
                    reportedBy4.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
                }
                break;
        }

        // Getting the big last count
        lastCount1 = count1[graphIndex];
        lastCount2 = count2[graphIndex];
        lastCount3 = count3[graphIndex];
        lastCount4 = count4[graphIndex];

    } // end loop
    // Display big count
    var prettyCount1 = numberWithCommas(lastCount1);
    var prettyCount2 = numberWithCommas(lastCount2);
    var prettyCount3 = numberWithCommas(lastCount3);
    var prettyCount4 = numberWithCommas(lastCount4);
    $("#lastCount1").html(prettyCount1);
    $("#lastCount1").attr("title", prettyCount1 + " people"); // !!! hardcode
    $("#lastCount2").html(prettyCount2);
    $("#lastCount2").attr("title", prettyCount2 + " people");
    $("#lastCount3").html(prettyCount3);
    $("#lastCount3").attr("title", prettyCount3 + " people");
    $("#lastCount4").html(prettyCount4);
    $("#lastCount4").attr("title", prettyCount4 + " people");

    // Date
    dsplit1 = date1.split("-");
    dsplit2 = date2.split("-");
    dsplit3 = date3.split("-");
    dsplit4 = date4.split("-");

    dateOk1 = new XDate(dsplit1[0], dsplit1[1] - 1, dsplit1[2]);
    dateOk2 = new XDate(dsplit2[0], dsplit2[1] - 1, dsplit2[2]);
    dateOk3 = new XDate(dsplit3[0], dsplit3[1] - 1, dsplit3[2]);
    dateOk4 = new XDate(dsplit4[0], dsplit4[1] - 1, dsplit4[2]);

    $("#date1").html(dateOk1.toString("dd MMM yyyy"));
    $("#date2").html(dateOk2.toString("dd MMM yyyy"));
    $("#date3").html(dateOk3.toString("dd MMM yyyy"));
    $("#date4").html(dateOk4.toString("dd MMM yyyy"));

    // Popups Info
    var infoPop1 = document.getElementById("infoPopover1");
    var pop1Full = '';
    pop1Full = 'Source:';
    for (var j = 0; j < source1.length; j++) {
        pop1Full += ' ' + source1[j];
    }
    pop1Full += '.<br />Method:';
    for (var j = 0; j < method1.length; j++) {
        pop1Full += ' ' + method1[j];
    }
    pop1Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy1.length; j++) {
        pop1Full += ' ' + reportedBy1[j];
    }
    pop1Full += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop1.attributes, l=attrs.length; i<l; i++){
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = pop1Full;
        }
    }

    var infoPop2 = document.getElementById("infoPopover2");
    var pop2Full = '';
    pop2Full = 'Source:';
    for (var j = 0; j < source2.length; j++) {
        pop2Full += ' ' + source2[j];
    }
    pop2Full += '.<br />Method:';
    for (var j = 0; j < method2.length; j++) {
        pop2Full += ' ' + method2[j];
    }
    pop2Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy2.length; j++) {
        pop2Full += ' ' + reportedBy2[j];
    }
    pop2Full += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop2.attributes, l=attrs.length; i<l; i++){
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = pop2Full;
        }
    }

    var infoPop3 = document.getElementById("infoPopover3");
    var pop3Full = '';
    pop3Full = 'RSource:';
    for (var j = 0; j < source3.length; j++) {
        pop3Full += ' ' + source3[j];
    }
    pop3Full += '.<br />Method:';
    for (var j = 0; j < method3.length; j++) {
        pop3Full += ' ' + method3[j];
    }
    pop3Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy3.length; j++) {
        pop3Full += ' ' + reportedBy3[j];
    }
    pop3Full += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop3.attributes, l=attrs.length; i<l; i++){
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = pop3Full;
        }
    }

    var infoPop4 = document.getElementById("infoPopover4");
    var pop4Full = '';
    pop4Full = 'Source:';
    for (var j = 0; j < source4.length; j++) {
        pop4Full += ' ' + source4[j];
    }
    pop4Full += '.<br />Method:';
    for (var j = 0; j < method4.length; j++) {
        pop4Full += ' ' + method4[j];
    }
    pop4Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy4.length; j++) {
        pop4Full += ' ' + reportedBy4[j];
    }
    pop4Full += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop4.attributes, l=attrs.length; i<l; i++){
        if (attrs.item(i).nodeName == 'data-content') {
            attrs.item(i).value = pop4Full;
        }
    }

    // Instanciation
    $("#sparkline1").sparkline(count1, {
        type: 'line',
        width: '80',
        height: '34',
        lineWidth: 2,
        lineColor: '#6699cc',
        fillColor: '#F5F5F5',
        spotColor: '#046CB6',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '#000000',
        highlightLineColor: '#000000',
        spotRadius: 2,
        chartRangeMin: 0});

    $("#sparkline2").sparkline(count2, {
        type: 'line',
        width: '80',
        height: '34',
        lineWidth: 2,
        lineColor: '#6699cc',
        fillColor: '#F5F5F5',
        spotColor: '#046CB6',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '#000000',
        highlightLineColor: '#000000',
        spotRadius: 2,
        chartRangeMin: 0});

    $("#sparkline3").sparkline(count3, {
        type: 'line',
        width: '80',
        height: '34',
        lineWidth: 2,
        lineColor: '#6699cc',
        fillColor: '#F5F5F5',
        spotColor: '#046CB6',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '#000000',
        highlightLineColor: '#000000',
        spotRadius: 2,
        chartRangeMin: 0});

    $("#sparkline4").sparkline(count4, {
        type: 'line',
        width: '80',
        height: '34',
        lineWidth: 2,
        lineColor: '#6699cc',
        fillColor: '#F5F5F5',
        spotColor: '#046CB6',
        minSpotColor: '',
        maxSpotColor: '',
        highlightSpotColor: '#000000',
        highlightLineColor: '#000000',
        spotRadius: 2,
        chartRangeMin: 0});
}