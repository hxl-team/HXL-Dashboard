

var emergenciesLabels;
var emergenciesList = getEmergenciesInfo();

var categoriesLabels;
var categoriesInfo = getCategoriesInfo();
//var populationInfo;


/* Refresh the content when the emergency choice triggers. */
function refreshSlide1(eventId) 
{
    //console.log("refreshSlide1: " + emergenciesList.results.bindings[eventId]['emergencyUri'].value);
    
    if (setEmergencyChoice(eventId))
    {
        populationInfo = getPopulationInfo(emergenciesList.results.bindings[eventId]['emergencyUri'].value);
        initInfoCategory(categoriesInfo);  
        initSparkline1();  
        initSparkline2(); 
        initSparkline3();  
        initSparkline4();  
        testHideSparklines(populationInfo);
    }
}

/* Hides the sparkline blocks. */
function testHideSparklines()
{      
    if (populationInfo == null ||
        populationInfo == undefined || 
        populationInfo.results.bindings.length == 0 || 
        populationInfo.results.bindings[0] == null) {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />No population data available<br /><br />"); 
        return false;
    }   
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
    $('#dataBlock').show(); 
    return true;
}

/*
 * Tool for adding a comma for thousands on the row figures.
 */
function numberWithCommas(x) 
{
    if (x == undefined) return null;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


/*
 * Displays the title and the emergency selection.
 */
function setEmergencyChoice(eventId) 
{
    if (emergenciesList == null ||
        emergenciesList == undefined || 
        emergenciesList.results == null || 
        emergenciesList.results.bindings.length == 0 || 
        emergenciesList.results.bindings[0] == null)
    {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />Emergency information temporary unavailable<br /><br />"); 
        return false;
    }
    
    // Filling the list
    $('#emeListItems').empty();
    var tempList = '';
    for (var i = 0 ; i < emergenciesList.results.bindings.length; i++) 
    {
        tempList += '<li><a id="' + i + '" onclick="refreshSlide1(this.id)" >' + emergenciesList.results.bindings[i]['emergencyDisplay'].value + '</a></li>';
    }
    $('#emeListItems').html(tempList);
    tempList = null;
    
    // List choice
// Warning: Temporary setting using element 1 corresponding to the first set of test data
    var tempValue = emergenciesList.results.bindings[0]['emergencyDisplay'].value;
    var tempId = emergenciesList.results.bindings[0]['emergencyUri'].value;
    
    if (eventId != null) 
    {
        tempValue = emergenciesList.results.bindings[eventId]['emergencyDisplay'].value;
        tempId = emergenciesList.results.bindings[eventId]['emergencyUri'].value;
    }
    $('#emeListSelectedValue').html(tempValue);
    $('#emeListSelectedId').html(tempId);
}

/*
 * Displays the general or metadata information related to the sparklines.
 */
function initInfoCategory(categoriesData)
{
    //  Buttons over
    $("#infoPopover1").popover({placement:'bottom', trigger: 'hover', delay: {show: 300, hide: 100}}); 
    $("#catPopover1").popover({placement:'left', trigger: 'hover', delay: {show: 300, hide: 100}}); 
    
    $("#infoPopover2").popover({placement:'bottom', trigger: 'hover', delay: {show: 300, hide: 100}}); 
    $("#catPopover2").popover({placement:'left', trigger: 'hover', delay: {show: 300, hide: 100}}); 
    
    $("#infoPopover3").popover({placement:'bottom', trigger: 'hover', delay: {show: 300, hide: 100}}); 
    $("#catPopover3").popover({placement:'left', trigger: 'hover', delay: {show: 300, hide: 100}}); 
    
    $("#infoPopover4").popover({placement:'bottom', trigger: 'hover', delay: {show: 300, hide: 100}}); 
    $("#catPopover4").popover({placement:'left', trigger: 'hover', delay: {show: 300, hide: 100}}); 

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
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) 
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = categoriesData.results.bindings[0]['classDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') 
        {
            attrs.item(i).value = categoriesData.results.bindings[0]['classLabel'].value
        }
    }

    var el = document.getElementById("catPopover2");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) 
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = categoriesData.results.bindings[0]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') 
        {
            attrs.item(i).value = categoriesData.results.bindings[0]['subClassLabel'].value
        }
    }

    var el = document.getElementById("catPopover3");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) 
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = categoriesData.results.bindings[2]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') 
        {
            attrs.item(i).value = categoriesData.results.bindings[2]['subClassLabel'].value
        }
    }

    var el = document.getElementById("catPopover4");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) 
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = categoriesData.results.bindings[1]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') 
        {
            attrs.item(i).value = categoriesData.results.bindings[1]['subClassLabel'].value
        }
    }
}

/*
 * It initializes the first displaced population sparkline and the few information 
 * linked to it.
 */
function initSparkline1()
{
    if (populationInfo == null ||
        populationInfo.results.bindings.length == 0)
    {
        return;
    } 

    var source1 = new Array();
    var method1 = new Array();
    var reportedBy1 = new Array();
    var date1 = '';

    count1 = new Array();
    dateArray1 = new Array();
    dateArrayFull1 = new Array();
    
    var currentDate = '';
    var graphIndex = -1;
    
    // Getting the personCounts and the rest of the data
    for (var i = 0; i < populationInfo.results.bindings.length; i++)
    {
        // parsing by date
        if (currentDate != populationInfo.results.bindings[i]['date'].value)
        {
            currentDate = populationInfo.results.bindings[i]['date'].value;
            graphIndex++;
            count1[graphIndex] = 0;
        }

        // Getting the main graph count and date, the main source, method and 
        // reported by
        count1[graphIndex] = parseInt(count1[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
        
        dateArray1[graphIndex] = new Date(populationInfo.results.bindings[i]['date'].value);
        // For the chart, the date format can be interpreted only like 
        // "yyyy, m, d" but not "yyyy-m-d".
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            dateArrayFull1[i] = new Date(populationInfo.results.bindings[i]['date'].value.replace('-', ', '));
        } 
        else
        {
            dateArrayFull1[i] = new Date(populationInfo.results.bindings[i]['date'].value);
        }
        
        date1 = populationInfo.results.bindings[i]['date'].value;  
        
        if (populationInfo.results.bindings[i]['sourceDisplay'] != undefined)
        {
            if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source1) < 0)
            {
                source1.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
            }
        }
        
        if ($.inArray(populationInfo.results.bindings[i]['countMethod'].value, method1) < 0)
        {
            method1.push(populationInfo.results.bindings[i]['countMethod'].value);
        }
        
        if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy1) < 0)
        {
            reportedBy1.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
        }
    }
    
    // The few next steps aim at rendering the data properly.
    // creates the main working matrix
    var dateArray1 = matrixCreation(populationInfo, null);
    // Placing the data in the corresponding place in the matrix according date and population.
    var nbrOfPops = dataDroping(dateArray1, populationInfo);
    // Completing the dateArray matrix with missing counts to make the correct sums.
    fillingTheGaps(dateArray1, nbrOfPops);
    // Suming columns
    var dateArraySum1 = getSumPerDay(dateArray1);
    // Making the timeline to be regular
    var regularSum1 = linearizeTimeline(dateArray1, dateArraySum1);
    
    // Displays the big count
    var prettyCount1 = numberWithCommas(dateArraySum1[dateArraySum1.length - 1]);
    $("#lastCount1").html(prettyCount1);
    $("#lastCount1").attr("title", prettyCount1 + " people"); 

    // Date
    dsplit1 = date1.split(" ");
    dsplit1 = dsplit1[0].split("-");
    dateOk1 = new XDate(dsplit1[0], dsplit1[1] , dsplit1[2]);
    $("#date1").html(dateOk1.toString("dd MMM yyyy"));

    // Popups Info
    var infoPop1 = document.getElementById("infoPopover1");
    var pop1Full = '';
    pop1Full = 'Source:';
    for (var j = 0; j < source1.length; j++) 
    {
        pop1Full += ' ' + source1[j];
    }
    pop1Full += '.<br />Method:';
    for (var j = 0; j < method1.length; j++) 
    {
        pop1Full += ' ' + method1[j];
    }
    pop1Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy1.length; j++) 
    {
        pop1Full += ' ' + reportedBy1[j];
    }
    pop1Full += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop1.attributes, l=attrs.length; i<l; i++)
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = pop1Full;
        }
    }

    // Instanciation
    $("#sparkline1").sparkline
    (
        regularSum1, 
        {
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
            chartRangeMin: 0
        }
    );
}

/*
 * It initializes the refugees sparkline and the few information 
 * linked to it.
 */
function initSparkline2()
{
    if (populationInfo == null ||
        populationInfo.results.bindings.length == 0)
    {
        return;
    } 

    var source2 = new Array();
    var method2 = new Array();
    var reportedBy2 = new Array();
    var date2 = '';

    count2 = new Array();
    dateArray2 = new Array();
    dateArrayFull2 = new Array();
    
    var currentDate = '';
    var graphIndex = -1;
    // Getting the personCounts and the rest of the data
    for (var i = 0; i < populationInfo.results.bindings.length; i++)
    {
        // parsing by date
        if (currentDate != populationInfo.results.bindings[i]['date'].value)
        {
            currentDate = populationInfo.results.bindings[i]['date'].value;
            graphIndex++;
            count2[graphIndex] = 0;
        }

        // Getting the main graph count and date, the main source, method and reported by
        count2[graphIndex] = parseInt(count2[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
        
        dateArray2[graphIndex] = new Date(populationInfo.results.bindings[i]['date'].value);
        // For the chart, the date format can be interpreted only like yyyy, m, d but not yyyy-m-d.
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            dateArrayFull2[i] = new Date(populationInfo.results.bindings[i]['date'].value.replace('-', ', '));
        } 
        else
        {
            dateArrayFull2[i] = new Date(populationInfo.results.bindings[i]['date'].value);
        }
        
        if (populationInfo.results.bindings[i]['populationType'].value == "http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers") 
        {
            date2 = populationInfo.results.bindings[i]['date'].value;
        }
        
        if (populationInfo.results.bindings[i]['sourceDisplay'] != undefined)
        {
            if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source2) < 0)
            {
                source2.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
            }
        }
        
        if ($.inArray(populationInfo.results.bindings[i]['countMethod'].value, method2) < 0)
        {
            method2.push(populationInfo.results.bindings[i]['countMethod'].value);
        }
        
        if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy2) < 0)
        {
            reportedBy2.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
        }
    }
    
    // The few next steps aim at rendering the data properly.
    // creates the main working matrix
    var dateArray2 = matrixCreation(populationInfo, "http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers");
    // Placing the data in the corresponding place in the matrix according date and population.
    var nbrOfPops = dataDroping(dateArray2, populationInfo);
    // Completing the dateArray matrix with missing counts to make the correct sums.
    fillingTheGaps(dateArray2, nbrOfPops);
    // Suming columns
    var dateArraySum2 = getSumPerDay(dateArray2);
    // Making the timeline to be regular
    var regularSum2 = linearizeTimeline(dateArray2, dateArraySum2);
    
    // Displays the big count
    var prettyCount2 = numberWithCommas(dateArraySum2[dateArraySum2.length - 1]);
    $("#lastCount2").html(prettyCount2);
    $("#lastCount2").attr("title", prettyCount2 + " people"); 

    // Date
    dsplit2 = date2.split(" ");
    dsplit2 = dsplit2[0].split("-");
    dateOk2 = new XDate(dsplit2[0], dsplit2[1] , dsplit2[2]);
    $("#date2").html(dateOk2.toString("dd MMM yyyy"));

    // Popups Info
    var infoPop2 = document.getElementById("infoPopover2");
    var pop2Full = '';
    pop2Full = 'Source:';
    for (var j = 0; j < source2.length; j++) 
    {
        pop2Full += ' ' + source2[j];
    }
    pop2Full += '.<br />Method:';
    for (var j = 0; j < method2.length; j++) 
    {
        pop2Full += ' ' + method2[j];
    }
    pop2Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy2.length; j++) 
    {
        pop2Full += ' ' + reportedBy2[j];
    }
    pop2Full += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop2.attributes, l=attrs.length; i<l; i++)
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = pop2Full;
        }
    }

    // Instanciation
    $("#sparkline2").sparkline
    (
        regularSum2, 
        {
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
            chartRangeMin: 0
        }
    );
}

/*
 * It initializes the IDPs sparkline and the few information 
 * linked to it.
 */
function initSparkline3()
{
    if (populationInfo == null ||
        populationInfo.results.bindings.length == 0)
    {
        return;
    } 

    var source3 = new Array();
    var method3 = new Array();
    var reportedBy3 = new Array();
    var date3 = '';

    count3 = new Array();
    dateArray3 = new Array();
    dateArrayFull3 = new Array();
    
    var currentDate = '';
    var graphIndex = -1;
    // Getting the personCounts and the rest of the data
    for (var i = 0; i < populationInfo.results.bindings.length; i++)
    {
        // parsing by date
        if (currentDate != populationInfo.results.bindings[i]['date'].value)
        {
            currentDate = populationInfo.results.bindings[i]['date'].value;
            graphIndex++;
            count3[graphIndex] = 0;
        }

        // Getting the main graph count and date, the main source, method and reported by
        count3[graphIndex] = parseInt(count3[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
        
        dateArray3[graphIndex] = new Date(populationInfo.results.bindings[i]['date'].value);
        // For the chart, the date format can be interpreted only like yyyy, m, d but not yyyy-m-d.
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            dateArrayFull3[i] = new Date(populationInfo.results.bindings[i]['date'].value.replace('-', ', '));
        } 
        else
        {
            dateArrayFull3[i] = new Date(populationInfo.results.bindings[i]['date'].value);
        }
        
        if (populationInfo.results.bindings[i]['populationType'].value == "http://hxl.humanitarianresponse.info/ns/#IDP") 
        {
            date3 = populationInfo.results.bindings[i]['date'].value;
        }
        
        if (populationInfo.results.bindings[i]['sourceDisplay'] != undefined)
        {
            if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, source3) < 0)
            {
                source3.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
            }
        }
        
        if ($.inArray(populationInfo.results.bindings[i]['countMethod'].value, method3) < 0)
        {
            method3.push(populationInfo.results.bindings[i]['countMethod'].value);
        }
        
        if ($.inArray(populationInfo.results.bindings[i]['reportedByDisplay'].value, reportedBy3) < 0)
        {
            reportedBy3.push(populationInfo.results.bindings[i]['reportedByDisplay'].value);
        }
    }
    
    // The few next steps aim at rendering the data properly.
    // creates the main working matrix
    var dateArray3 = matrixCreation(populationInfo, "http://hxl.humanitarianresponse.info/ns/#IDP");
    // Placing the data in the corresponding place in the matrix according date and population.
    var nbrOfPops = dataDroping(dateArray3, populationInfo);
    // Completing the dateArray matrix with missing counts to make the correct sums.
    fillingTheGaps(dateArray3, nbrOfPops);
    // Suming columns
    var dateArraySum3 = getSumPerDay(dateArray3);
    // Making the timeline to be regular
    var regularSum3 = linearizeTimeline(dateArray3, dateArraySum3);
        
    // Displays the big count
    var prettyCount3 = numberWithCommas(dateArraySum3[dateArraySum3.length - 1]);
    $("#lastCount3").html(prettyCount3);
    $("#lastCount3").attr("title", prettyCount3 + " people"); 

    // Date
    dsplit3 = date3.split(" ");
    dsplit3 = dsplit3[0].split("-");
    dateOk3 = new XDate(dsplit3[0], dsplit3[1] , dsplit3[2]);
    $("#date3").html(dateOk3.toString("dd MMM yyyy"));

    // Popups Info
    var infoPop3 = document.getElementById("infoPopover3");
    var pop3Full = '';
    pop3Full = 'Source:';
    for (var j = 0; j < source3.length; j++) 
    {
        pop3Full += ' ' + source3[j];
    }
    pop3Full += '.<br />Method:';
    for (var j = 0; j < method3.length; j++) 
    {
        pop3Full += ' ' + method3[j];
    }
    pop3Full += '.<br />Reported by:';
    for (var j = 0; j < reportedBy3.length; j++) 
    {
        pop3Full += ' ' + reportedBy3[j];
    }
    pop3Full += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop3.attributes, l=attrs.length; i<l; i++)
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = pop3Full;
        }
    }

    // Instanciation
    $("#sparkline3").sparkline
    (
        regularSum3, 
        {
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
            chartRangeMin: 0
        }
    );
}

/*
 * It initializes the Others sparkline and the few information 
 * linked to it.
 */
function initSparkline4()
{
    // Displays the big count
    $("#lastCount4").html(0);
    $("#lastCount4").attr("title", "0 people"); 

    // Date
    $("#date4").html(" - ");

    // Popups Info
    var infoPop3 = document.getElementById("infoPopover3");
    var pop3Full = '';
    pop3Full = 'Source: undefined';
    pop3Full += '.<br />Method: undefined';
    pop3Full += '.<br />Reported by: undefined';
    pop3Full += '.<br />(Click for all details)';
    
    // Instanciation
    $("#sparkline4").sparkline
    (
        [0], 
        {
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
            chartRangeMin: 0
        }
    );
}
