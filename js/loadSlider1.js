

// Arrays containing the date corresponding to different group of data.
// It is convenient if they are accessible for the second slide where we need to
// select the correct one as a base for the population matrix.
var dateArrayFull1 = new Array();
var dateArrayFull2 = new Array();
var dateArrayFull3 = new Array();
var dateArrayFull4 = new Array();

/* Refresh the content when the emergency choice triggers. */
function refreshSlide1(eventId) 
{
//console.log(eventId);
    if (setEmergencyChoice(eventId))
    {
        var emergencyUri = emergenciesList.results.bindings[eventId]['emergencyUri'].value;
        $('#dataBlock').show(); 
        $('#noDataBlock').hide(); 
            
        initSparkline1(emergencyUri);  
        initSparkline2(emergencyUri); 
        initSparkline3(emergencyUri);  
        initSparkline4(emergencyUri);  
        //testHideSparklines();
        
        try
        {
            $("#sourcesScore").html("Sources (from the most frequent to the less): ");
            sourcesScore = getSourcesScore(emergencyUri);
            console.log(sourcesScore.results.bindings.length);
            for (var i = 0; i < sourcesScore.results.bindings.length; i++)
            {
                $("#sourcesScore").html($("#sourcesScore").html() + sourcesScore.results.bindings[i]['sourceDisplay'].value + " ");
            }
        }
        catch (e)
        {
            $('#dataBlock').hide(); 
            $('#noDataBlock').show(); 
            $('#noDataBlock').html("<br /><br />Emergency information not available<br /><br />"); 
            return false;
        }
    }
}

/*
 * Displays the title and the emergency selection.
 */
function setEmergencyChoice(eventId) 
{
//console.log(eventId);
//console.log(emergenciesList.results.bindings.length);
    if (emergenciesList == null ||
        emergenciesList == undefined || 
        emergenciesList.results == null || 
        emergenciesList.results.bindings.length == 0 || 
        emergenciesList.results.bindings[0] == null)
    {
        $('#dataBlock').hide(); 
        $('#noDataBlock').show(); 
        $('#noDataBlock').html("<br /><br />Emergency information not available<br /><br />"); 
        return false;
    }
    
    // saving emergency values
    if (eventId == null)
    {
        $('#memEmergencyUri').html(emergenciesList.results.bindings[0]['emergencyUri'].value);
        $('#memEmergencyLabel').html(emergenciesList.results.bindings[0]['emergencyDisplay'].value);
    }
    else
    {
        $('#memEmergencyUri').html(emergenciesList.results.bindings[eventId]['emergencyUri'].value);
        $('#memEmergencyLabel').html(emergenciesList.results.bindings[eventId]['emergencyDisplay'].value);
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
    
    return true;
}

/*
 * Displays the general or metadata information related to the sparklines.
 */
function initCategoryLabels()
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
    // Category popovers
    $("#catPopover1").html(categoriesLabels[0]);
    $("#catPopover2").html(categoriesLabels[1]);
    $("#catPopover3").html(categoriesLabels[2]);
    $("#catPopover4").html(categoriesLabels[3]);

    var el = document.getElementById("catPopover1");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) 
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = categoriesInfo[0]['classDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') 
        {
            attrs.item(i).value = categoriesInfo[0]['classLabel'].value
        }
    }

    var el = document.getElementById("catPopover2");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) 
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = categoriesInfo[0]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') 
        {
            attrs.item(i).value = categoriesInfo[0]['subClassLabel'].value
        }
    }

    var el = document.getElementById("catPopover3");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) 
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = categoriesInfo[2]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') 
        {
            attrs.item(i).value = categoriesInfo[2]['subClassLabel'].value
        }
    }

    var el = document.getElementById("catPopover4");
    for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) 
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = categoriesInfo[1]['subClassDefinition'].value
        }
        if (attrs.item(i).nodeName == 'data-original-title') 
        {
            attrs.item(i).value = categoriesInfo[1]['subClassLabel'].value
        }
    }
}

/*
 * Create assiocative arrays following the pattern [uri] = label.
 * Used for completing query results which 
 */
function initDataHelpers ()
{
    // Categories or population types
    categoriesInfo = getCategoriesInfo().results.bindings;
            
    categoriesLabels.push(categoriesInfo[0]['classLabel'].value);
    categoriesLabels.push(categoriesInfo[0]['subClassLabel'].value);
    categoriesLabels.push(categoriesInfo[2]['subClassLabel'].value);
    categoriesLabels.push(categoriesInfo[1]['subClassLabel'].value);

    categoriesUris = new Array();
    categoriesUris.push(categoriesInfo[0]['class'].value);
    categoriesUris.push(categoriesInfo[0]['subClass'].value);
    categoriesUris.push(categoriesInfo[2]['subClass'].value);
    categoriesUris.push(categoriesInfo[1]['subClass'].value);
    
    for (var i=0; i < categoriesUris.length; i++) 
    {
        popTypeConverter[categoriesUris[i]] = categoriesLabels[i];
    }
    
    // SexCategories
    sexInfo = getSexInfo().results.bindings;
    for (var i=0; i < sexInfo.length; i++) 
    {
        sexConverter[sexInfo[i]['sexCategory'].value] = sexInfo[i]['sexLabel'].value;
    }
    
    // AgeGroups
    ageInfo = getAgeInfo().results.bindings;
    for (var i=0; i < ageInfo.length; i++) 
    {
        ageConverter[ageInfo[i]['ageGroup'].value] = ageInfo[i]['ageLabel'].value;
    }
}

var popDisplacedCounts;
var popRefugeeCounts;
var popIdpCounts;
var popOtherCounts;

/*
 * It initializes the first displaced population sparkline and the few information 
 * linked to it.
 */
function initSparkline1(emergencyUri)
{
    popDisplacedCounts = getFilteredPopulation(emergencyUri,
                                            categoriesUris[0],
                                            null,
                                            null,
                                            null,
                                            null,
                                            null);
    
    if (popDisplacedCounts == null ||
        popDisplacedCounts.results == null ||
        popDisplacedCounts.results.bindings == null ||
        popDisplacedCounts.results.bindings.length == 0)
    {
        $('#errorPop1').show(); 
        $('#popContent1').hide(); 

        return false;
    } 
    else
    {
        $('#errorPop1').hide(); 
        $('#popContent1').show(); 
    }
    
    popDisplacedCounts = popDisplacedCounts.results.bindings;

    var source = new Array();
    var method = new Array();
    var reportedBy = new Array();
    var date = '';

    var count = new Array();
    var dateArray = new Array();
    
    var currentDate = '';
    var graphIndex = -1;
    
    // Getting the personCounts and the rest of the data
    for (var i = 0; i < popDisplacedCounts.length; i++)
    {
        // parsing by date
        if (currentDate != popDisplacedCounts[i]['date'].value)
        {
            currentDate = popDisplacedCounts[i]['date'].value;
            graphIndex++;
            count[graphIndex] = 0;
        }

        // Getting the main graph count and date, the main source, method and 
        // reported by
        count[graphIndex] = parseInt(count[graphIndex]) + parseInt(popDisplacedCounts[i]['personCount'].value);
        
        dateArray[graphIndex] = new Date(popDisplacedCounts[i]['date'].value);
        // For the chart, the date format can be interpreted only like 
        // "yyyy, m, d" but not "yyyy-m-d".
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            dateArrayFull1[i] = new Date(popDisplacedCounts[i]['date'].value.replace('-', ', '));
        } 
        else
        {
            dateArrayFull1[i] = new Date(popDisplacedCounts[i]['date'].value);
        }
        
        if (popDisplacedCounts[i]['sourceDisplay'] != undefined)
        {
            if ($.inArray(popDisplacedCounts[i]['sourceDisplay'].value, source) < 0)
            {
                source.push(popDisplacedCounts[i]['sourceDisplay'].value);
            }
        }
        
        if ($.inArray(popDisplacedCounts[i]['countMethod'].value, method) < 0)
        {
            method.push(popDisplacedCounts[i]['countMethod'].value);
        }
        
        if ($.inArray(popDisplacedCounts[i]['reportedByDisplay'].value, reportedBy) < 0)
        {
            reportedBy.push(popDisplacedCounts[i]['reportedByDisplay'].value);
        }
    }
    // As of date
    date = new XDate(popDisplacedCounts[popDisplacedCounts.length - 1]['date'].value);
    $("#date1").html(date.toString("dd MMM yyyy"));
    
    // The few next steps aim at rendering the data properly.
    // creates the main working matrix
    dateArray = matrixCreation(popDisplacedCounts);
    // Placing the data in the corresponding place in the matrix according date and population.
    var nbrOfPops = dataDroping(dateArray, popDisplacedCounts);
    // Completing the dateArray matrix with missing counts to be able to make
    // the correct sums on each day.
    fillingTheGaps(dateArray, nbrOfPops);
    // Suming columns
    var dateArraySum = getSumPerDay(dateArray);
    // Making the timeline to be regular
    var regularSum = linearizeTimeline(dateArray, dateArraySum);
    
    // Displays the big count
    var prettycount = numberWithCommas(dateArraySum[dateArraySum.length - 1]);
    $("#lastCount1").html(prettycount);
    $("#lastCount1").attr("title", prettycount + " people"); 

    // Popups Info
    var infoPop = document.getElementById("infoPopover1");
    var popFull = '';
    popFull = '<b>Source:</b>';
    for (var j = 0; j < source.length; j++) 
    {
        popFull += ' ' + source[j];
    }
    popFull += '.<br /><b>Method:</b>';
    for (var j = 0; j < method.length; j++) 
    {
        popFull += ' ' + method[j];
    }
    popFull += '.<br /><b>Reported by:</b>';
    for (var j = 0; j < reportedBy.length; j++) 
    {
        popFull += ' ' + reportedBy[j];
    }
    popFull += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop.attributes, l=attrs.length; i<l; i++)
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = popFull;
        }
    }

    // Instanciation
    $("#sparkline1").sparkline
    (
        regularSum, 
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
    return true;
}

//var popRefugeeCounts = getPopRefugees();
/*
 * It initializes the refugees sparkline and the few information 
 * linked to it.
 */
function initSparkline2(emergencyUri)
{
    //console.log("initSparkline2");
    
    popRefugeeCounts = getFilteredPopulation(emergencyUri,
                                            categoriesUris[1],
                                                null,
                                                null,
                                                null,
                                                null,
                                                null);
    //var popRefugeeCounts = getPopRefugees();
    
    if (popRefugeeCounts == null ||
        popRefugeeCounts.results == null ||
        popRefugeeCounts.results.bindings == null ||
        popRefugeeCounts.results.bindings.length == 0)
    {
        $('#errorPop2').show(); 
        $('#popContent2').hide(); 

        return false;
    } 
    else
    {
        $('#errorPop2').hide(); 
        $('#popContent2').show(); 
    }
    popRefugeeCounts = popRefugeeCounts.results.bindings;

    var source = new Array();
    var method = new Array();
    var reportedBy = new Array();
    var date = '';

    var count = new Array();
    var dateArray = new Array();
    
    var currentDate = '';
    var graphIndex = -1;
    // Getting the personCounts and the rest of the data
    for (var i = 0; i < popRefugeeCounts.length; i++)
    {
        // parsing by date
        if (currentDate != popRefugeeCounts[i]['date'].value)
        {
            currentDate = popRefugeeCounts[i]['date'].value;
            graphIndex++;
            count[graphIndex] = 0;
        }

        // Getting the main graph count and date, the main source, method and reported by
        count[graphIndex] = parseInt(count[graphIndex]) + parseInt(popRefugeeCounts[i]['personCount'].value);
        
        dateArray[graphIndex] = new Date(popRefugeeCounts[i]['date'].value);
        // For the chart, the date format can be interpreted only like yyyy, m, d but not yyyy-m-d.
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            dateArrayFull2[i] = new Date(popRefugeeCounts[i]['date'].value.replace('-', ', '));
        } 
        else
        {
            dateArrayFull2[i] = new Date(popRefugeeCounts[i]['date'].value);
        }
        
//console.log("testttt2t: " + dateArrayFull2[i]);

        if (popRefugeeCounts[i]['sourceDisplay'] != undefined)
        {
            if ($.inArray(popRefugeeCounts[i]['sourceDisplay'].value, source) < 0)
            {
                source.push(popRefugeeCounts[i]['sourceDisplay'].value);
            }
        }
        
        if ($.inArray(popRefugeeCounts[i]['countMethod'].value, method) < 0)
        {
            method.push(popRefugeeCounts[i]['countMethod'].value);
        }
        
        if ($.inArray(popRefugeeCounts[i]['reportedByDisplay'].value, reportedBy) < 0)
        {
            reportedBy.push(popRefugeeCounts[i]['reportedByDisplay'].value);
        }
        
    }
    // As of date
    date = new XDate(popRefugeeCounts[popRefugeeCounts.length - 1]['date'].value);
    $("#date2").html(date.toString("dd MMM yyyy"));

    // The few next steps aim at rendering the data properly.
    // creates the main working matrix
    dateArray = matrixCreation(popRefugeeCounts);
    // Placing the data in the corresponding place in the matrix according date and population.
    var nbrOfPops = dataDroping(dateArray, popRefugeeCounts);
    // Completing the dateArray matrix with missing counts to make the correct sums.
    fillingTheGaps(dateArray, nbrOfPops);
    // Suming columns
    var dateArraySum = getSumPerDay(dateArray);
    // Making the timeline to be regular
    var regularSum = linearizeTimeline(dateArray, dateArraySum);
    
    // Displays the big count
    var prettycount = numberWithCommas(dateArraySum[dateArraySum.length - 1]);
    $("#lastCount2").html(prettycount);
    $("#lastCount2").attr("title", prettycount + " people"); 

    // Popups Info
    var infoPop = document.getElementById("infoPopover2");
    var popFull = '';
    popFull = 'Source:';
    for (var j = 0; j < source.length; j++) 
    {
        popFull += ' ' + source[j];
    }
    popFull += '.<br />Method:';
    for (var j = 0; j < method.length; j++) 
    {
        popFull += ' ' + method[j];
    }
    popFull += '.<br />Reported by:';
    for (var j = 0; j < reportedBy.length; j++) 
    {
        popFull += ' ' + reportedBy[j];
    }
    popFull += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop.attributes, l=attrs.length; i<l; i++)
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = popFull;
        }
    }

    // Instanciation
    $("#sparkline2").sparkline
    (
        regularSum, 
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
    return true;
}

//var popIdpCounts = getPopIdps();
/*
 * It initializes the IDPs sparkline and the few information 
 * linked to it.
 */
function initSparkline3(emergencyUri)
{
    //console.log("initSparkline3");
    
    popIdpCounts = getFilteredPopulation(emergencyUri,
                                            categoriesUris[2],
                                                null,
                                                null,
                                                null,
                                                null,
                                                null);
    
    if (popIdpCounts == null ||
        popIdpCounts.results == null ||
        popIdpCounts.results.bindings == null ||
        popIdpCounts.results.bindings.length == 0)
    {
        $('#errorPop3').show(); 
        $('#popContent3').hide(); 

        return false;
    } 
    else
    {
        $('#errorPop3').hide(); 
        $('#popContent3').show(); 
    }

    popIdpCounts = popIdpCounts.results.bindings;
    
    var source = new Array();
    var method = new Array();
    var reportedBy = new Array();
    var date = '';

    var count = new Array();
    var dateArray = new Array();
    
    var currentDate = '';
    var graphIndex = -1;
    // Getting the personCounts and the rest of the data
    for (var i = 0; i < popIdpCounts.length; i++)
    {
        // parsing by date
        if (currentDate != popIdpCounts[i]['date'].value)
        {
            currentDate = popIdpCounts[i]['date'].value;
            graphIndex++;
            count[graphIndex] = 0;
        }

        // Getting the main graph count and date, the main source, method and reported by
        count[graphIndex] = parseInt(count[graphIndex]) + parseInt(popIdpCounts[i]['personCount'].value);
        
        dateArray[graphIndex] = new Date(popIdpCounts[i]['date'].value);
        // For the chart, the date format can be interpreted only like yyyy, m, d but not yyyy-m-d.
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            dateArrayFull3[i] = new Date(popIdpCounts[i]['date'].value.replace('-', ', '));
        } 
        else
        {
            dateArrayFull3[i] = new Date(popIdpCounts[i]['date'].value);
        }
        
//console.log("testtttt: " + dateArrayFull3[i]);
        
        if (popIdpCounts[i]['sourceDisplay'] != undefined)
        {
            if ($.inArray(popIdpCounts[i]['sourceDisplay'].value, source) < 0)
            {
                source.push(popIdpCounts[i]['sourceDisplay'].value);
            }
        }
        
        if ($.inArray(popIdpCounts[i]['countMethod'].value, method) < 0)
        {
            method.push(popIdpCounts[i]['countMethod'].value);
        }
        
        if ($.inArray(popIdpCounts[i]['reportedByDisplay'].value, reportedBy) < 0)
        {
            reportedBy.push(popIdpCounts[i]['reportedByDisplay'].value);
        }
    }
    // As of date
    date = new XDate(popIdpCounts[popIdpCounts.length - 1]['date'].value);
    $("#date3").html(date.toString("dd MMM yyyy"));
    
    // The few next steps aim at rendering the data properly.
    // creates the main working matrix
    dateArray = matrixCreation(popIdpCounts);
    // Placing the data in the corresponding place in the matrix according date and population.
    var nbrOfPops = dataDroping(dateArray, popIdpCounts);
    // Completing the dateArray matrix with missing counts to make the correct sums.
    fillingTheGaps(dateArray, nbrOfPops);
    // Suming columns
    var dateArraySum = getSumPerDay(dateArray);
    // Making the timeline to be regular
    var regularSum = linearizeTimeline(dateArray, dateArraySum);
        
    // Displays the big count
    var prettycount = numberWithCommas(dateArraySum[dateArraySum.length - 1]);
    $("#lastCount3").html(prettycount);
    $("#lastCount3").attr("title", prettycount + " people"); 

    // Popups Info
    var infoPop = document.getElementById("infoPopover3");
    var popFull = '';
    popFull = 'Source:';
    for (var j = 0; j < source.length; j++) 
    {
        popFull += ' ' + source[j];
    }
    popFull += '.<br />Method:';
    for (var j = 0; j < method.length; j++) 
    {
        popFull += ' ' + method[j];
    }
    popFull += '.<br />Reported by:';
    for (var j = 0; j < reportedBy.length; j++) 
    {
        popFull += ' ' + reportedBy[j];
    }
    popFull += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop.attributes, l=attrs.length; i<l; i++)
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = popFull;
        }
    }

    // Instanciation
    $("#sparkline3").sparkline
    (
        regularSum, 
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
    return true;
}

//var popOtherCounts = getPopOthers();
/*
 * It initializes the others of concern sparkline and the few information 
 * linked to it.
 */
function initSparkline4(emergencyUri)
{
    //console.log("initSparkline4");
    
    popOtherCounts = getFilteredPopulation(emergencyUri,
                                            categoriesUris[3],
                                                null,
                                                null,
                                                null,
                                                null,
                                                null);
    if (popOtherCounts == null ||
        popOtherCounts.results == null ||
        popOtherCounts.results.bindings == null ||
        popOtherCounts.results.bindings.length == 0)
    {
        $('#errorPop4').show(); 
        $('#popContent4').hide(); 

        return false;
    } 
    else
    {
        $('#errorPop4').hide(); 
        $('#popContent4').show(); 
    }

    popOtherCounts = popOtherCounts.results.bindings;
        
    var source = new Array();
    var method = new Array();
    var reportedBy = new Array();
    var date = '';

    var count = new Array();
    var dateArray = new Array();
    
    var currentDate = '';
    var graphIndex = -1;
    // Getting the personCounts and the rest of the data
    for (var i = 0; i < popOtherCounts.length; i++)
    {
        // parsing by date
        if (currentDate != popOtherCounts[i]['date'].value)
        {
            currentDate = popOtherCounts[i]['date'].value;
            graphIndex++;
            count[graphIndex] = 0;
        }
    
        // Getting the main graph count and date, the main source, method and reported by
        count[graphIndex] = parseInt(count[graphIndex]) + parseInt(popOtherCounts[i]['personCount'].value);
        
        dateArray[graphIndex] = new Date(popOtherCounts[i]['date'].value);
        // For the chart, the date format can be interpreted only like yyyy, m, d but not yyyy-m-d.
        if (navigator.appName == 'Microsoft Internet Explorer')
        {
            dateArrayFull4[i] = new Date(popOtherCounts[i]['date'].value.replace('-', ', '));
        } 
        else
        {
            dateArrayFull4[i] = new Date(popOtherCounts[i]['date'].value);
        }
        
        if (popOtherCounts[i]['sourceDisplay'] != undefined)
        {
            if ($.inArray(popOtherCounts[i]['sourceDisplay'].value, source) < 0)
            {
                source.push(popOtherCounts[i]['sourceDisplay'].value);
            }
        }
        
        if ($.inArray(popOtherCounts[i]['countMethod'].value, method) < 0)
        {
            method.push(popOtherCounts[i]['countMethod'].value);
        }
        
        if ($.inArray(popOtherCounts[i]['reportedByDisplay'].value, reportedBy) < 0)
        {
            reportedBy.push(popOtherCounts[i]['reportedByDisplay'].value);
        }
    }
    // As of date
    date = new XDate(popOtherCounts[popOtherCounts.length - 1]['date'].value);
    $("#date4").html(date.toString("dd MMM yyyy"));
    
    // The few next steps aim at rendering the data properly.
    // creates the main working matrix
    dateArray = matrixCreation(popOtherCounts);
    // Placing the data in the corresponding place in the matrix according date and population.
    var nbrOfPops = dataDroping(dateArray, popOtherCounts);
    // Completing the dateArray matrix with missing counts to make the correct sums.
    fillingTheGaps(dateArray, nbrOfPops);
    // Suming columns
    var dateArraySum = getSumPerDay(dateArray);
    // Making the timeline to be regular
    var regularSum = linearizeTimeline(dateArray, dateArraySum);
        
    // Displays the big count
    var prettycount = numberWithCommas(dateArraySum[dateArraySum.length - 1]);
    $("#lastCount4").html(prettycount);
    $("#lastCount4").attr("title", prettycount + " people"); 

    // Popups Info
    var infoPop = document.getElementById("infoPopover3");
    var popFull = '';
    popFull = 'Source:';
    for (var j = 0; j < source.length; j++) 
    {
        popFull += ' ' + source[j];
    }
    popFull += '.<br />Method:';
    for (var j = 0; j < method.length; j++) 
    {
        popFull += ' ' + method[j];
    }
    popFull += '.<br />Reported by:';
    for (var j = 0; j < reportedBy.length; j++) 
    {
        popFull += ' ' + reportedBy[j];
    }
    popFull += '.<br />(Click for all details)';
    for (var i=0, attrs=infoPop.attributes, l=attrs.length; i<l; i++)
    {
        if (attrs.item(i).nodeName == 'data-content') 
        {
            attrs.item(i).value = popFull;
        }
    }

    // Instanciation
    $("#sparkline4").sparkline
    (
        regularSum, 
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
    return true;
}
