
var graphData = [];


/* 
 * Refresh the content when a new filter is triggered
 */
function refreshSlide2(event) 
{     
    /*
    console.log("refreshSlide2" + event);
    console.log("refreshSlide2" + event.id);
    console.log("refreshSlide2" + event.name);
*/

    if (event.id.indexOf("NextButton") != -1) 
    {
        fromSlideNbr = 1;
    }
    else if (event.id.indexOf("PreviousButton2") != -1) 
    {
        fromSlideNbr = 3;
    }
    else
    {
        fromSlideNbr = 2;
    }
    
    if (fromSlideNbr == 1)
    {
        switch (event.id)
        {
            case "NextButton1":
                graphData = popDisplacedCounts;
                dateArrayFull = dateArrayFull1;
                break;
            case "NextButton2":
                graphData = popRefugeeCounts;
                dateArrayFull = dateArrayFull2;
                break;
            case "NextButton3":
                graphData = popIdpCounts;
                dateArrayFull = dateArrayFull3;
                break;
            case "NextButton4":
                graphData = popOtherCounts;
                dateArrayFull = dateArrayFull4;
                break;
        }
    }
        
    $('#graphData').html(graphData);
    
    //updateFiltersSelection(event);
    setFilters(event);
    drawMap(event);
    drawChart(event);
}

    
$('#myModal').on('show', function () {
    $('#locListSelectedValue').html(lblLoc);
    $('#locListSelectedId').html('');
})
 
$('#myModal').on('hidden', function () {
   /*
   console.log($("#locListSelectedValue").html());
   console.log($("#locListSelectedId").html());
   */
    refreshSlide2(this);
})

function saveLocationSelection(event)
{
    /*
    console.log("event.id: " + event);
    console.log("event.id: " + event.html);
    console.log("event.id: " + event.id);
    console.log("event.value: " + event.value);
*/
   $("#locListSelectedValue").html(event.value);
   $("#locListSelectedId").html(event.id);
   
}


function geometryReady() 
{
//console.log("geometryReady: " + locGeom);
    if (locGeom != undefined &&
        locGeom != '' &&
        locGeom != 'no result') 
    {
        return true;
    } 
    else 
    {
        return false;
    }
}

function waiting(timeout_step) 
{
    if (geometryReady()) 
    {
        if (locGeom.indexOf('no result') > -1)
        {
            $("#mapMessage").show();
        }
        else
        {
            $("#mapMessage").hide();
            processGeometry();
        }
    } 
    else 
    {
        setTimeout(waiting, timeout_step);
    }
}

/*
 * Display of the map showing the current location
 */
var map;
var googleLayer;
var locationBoundariesLayer;
function drawMap (event) 
{/*
    console.log(event);
    console.log(fromSlideNbr);
    console.log($("#locListSelectedId").html());
    */
    switch (fromSlideNbr)
    {
        case 1:
        uri = '';// currentGeoZoneUri;
            break;
        case 2:
            if (event.id == 'myModal') 
            {
                uri = $("#locListSelectedId").html();
            }
            break;
    }
    locationSplit = uri.split('APL-');

    if (locationSplit.length == 2)
    {
        getlocationGeom(locationSplit[1]);
    }
    else if (uri.length == 0)
    {
        uri = '';// 'http://hxl.humanitarianresponse.info/data/locations/admin/mli/MLI';
        getlocationGeom(uri);
    }
    else 
    {
        getlocationGeom(uri);
    }
       

    if (map == null) 
    {
        map = L.map('map');
    } 
    else 
    {
        map.removeLayer(googleLayer);
        googleLayer = null;
    }

    if (googleLayer == null) 
    {
        googleLayer = new L.Google('ROADMAP');
        map.addLayer(googleLayer);
    }
    map.setView([14.5, -1.6], 4);

    waiting(100);
}


var geomSplit;
var tempArray;
var coordinatesArray;
var finalGeom;
var geojsonFeature;
function processGeometry() 
{
    //console.log('processgeom');
    //console.log(locGeom);

    // Conversion of the string into an array of array of array of lat long coordinates
    geomSplit = locGeom.split('],[');
    tempArray = new Array();

    for (var i = geomSplit.length - 1; i >= 0; i--) 
    {
        //console.log(geomSplit[i]);
        coordinatesArray = geomSplit[i].split(',');
        coordinatesArray[0] = coordinatesArray[0] * 1.0;
        coordinatesArray[1] = coordinatesArray[1] * 1.0;
        tempArray[i] = [coordinatesArray[0], coordinatesArray[1]];
    }

    // Layer display
    if (geomSplit.length == 1) 
    {
        //console.log("geomSplit.length == 1");
        finalGeom = [coordinatesArray[0], coordinatesArray[1]];

        geojsonFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": finalGeom
            }
        };
    } 
    else 
    {
        //console.log("geomSplit.length else");
        finalGeom =  [tempArray];
        geojsonFeature = 
        {
            "type": "Feature",
            "geometry":
            {
                "type": "Polygon",
                "coordinates": finalGeom
            }
        };
    }

    if (locationBoundariesLayer != null)
    {
        map.removeLayer(locationBoundariesLayer);
        locationBoundariesLayer = null;
    }

    locationBoundariesLayer = L.geoJson().addTo(map);
    locationBoundariesLayer.addData(geojsonFeature);

    geomSplit = null;
    tempArray = null;
    coordinatesArray = null;
    finalGeom = null;
    geojsonFeature = null;
    //map = null;
}

var catChoice;
var locChoice;
var sexChoice;
var ageChoice;
var originChoice;
var sourceChoice;
var currentGeoZone;
var biggestGeoZone;
var currentGeoZoneUri;
var biggestGeoZoneUri;


/*
 * This function manages with the drop down list aimed at filtering the data
 * to output new visualizations.
 * It consists in filling the lists 
 */
function setFilters(event) 
{
    setPopTypeFilter(event);
    setLocationFilter(event);
    setSourceFilter(event);
    setSexFilter(event);
    setAgeFilter(event);
    setOriginFilter(event);
}

/*
 * This function fills the population type filter
 */
function setPopTypeFilter(event)
{ /*
    console.log(event.name); 
    console.log(event.id);
    console.log(event.innerHTML);
*/
    
    // Population categorie drop down list
    $('#catListItems').empty();
    var tempList = '';
    for (var i = 0; i < categoriesLabels.length; i++) 
    {
        tempList += '<li><a id="' + categoriesUris[i] + '" name="popType" onclick="refreshSlide2(this)" >' + categoriesLabels[i] + '</a></li>';
    }
    $('#catListItems').html(tempList);

    // Selection
    tempList = null;
    if (fromSlideNbr == 1) // coming here after change of slide
    {
        $('#catListSelectedValue').html(popTypeConverter[event.name]);
        $('#catListSelectedId').html(event.name);
    } 
    else if (event.name == 'popType') // new population category
    {
        $('#catListSelectedValue').html(event.innerHTML);
        $('#catListSelectedId').html(event.id);
    }
}

/*
 * This function fills the sex list filter 
 */
function setSexFilter(event) 
{ 
    var sexCategory = getSexCategories($('#memEmergencyUri').html());

    // Load sex list
    $('#sexListItems').empty();
    tempList = '<li><a id="" onclick="refreshSlide2(this)" name="sex" >'+ lblSex + '</a></li>';
    for (var i = 0; i < sexCategory.results.bindings.length; i++) 
    {
        tempList += '<li><a id="' + sexCategory.results.bindings[i]['sex'].value + '" name="sex" onclick="refreshSlide2(this)" >' + sexCategory.results.bindings[i]['title'].value + '</a></li>';
    }
    $('#sexListItems').html(tempList);
    // Selection
    if (fromSlideNbr == 2) 
    {
        if (event.name =='sex') 
        {
            $('#sexListSelectedValue').html(event.innerHTML);
            $('#sexListSelectedId').html(event.id);
        }
    } 
    else 
    {
        $('#sexListSelectedValue').html(lblSex);
        $('#sexListSelectedId').html('');
    }
}

/*
 * This function fills the age list filter 
 */
function setAgeFilter(event) 
{ 
    // Load age list
    var ageGroup = getAgeGroups($('#memEmergencyUri').html());

    $('#ageListItems').empty();
    tempList = '<li><a id="" onclick="refreshSlide2(this)" name="age" >'+ lblAge + '</a></li>';
    for (var i = 0; i < ageGroup.results.bindings.length; i++) 
    {
        tempList += '<li><a id="' + ageGroup.results.bindings[i]['ageGroup'].value + '" name="age" onclick="refreshSlide2(this)" >' + ageGroup.results.bindings[i]['title'].value + '</a></li>';
    }
    $('#ageListItems').html(tempList);
    // Selection
    if (fromSlideNbr == 2) 
    {
        if (event.name =='age') 
        {
            $('#ageListSelectedValue').html(event.innerHTML);
            $('#ageListSelectedId').html(event.id);
        }
    } 
    else 
    {
        $('#ageListSelectedValue').html(lblAge);
        $('#ageListSelectedId').html('');
    }
}

/*
 * This function fills the origin list filter 
 */
function setOriginFilter(event) 
{ 
    // Load origin list
    var origin = getOrigins($('#memEmergencyUri').html());
    $('#originListItems').empty();
    tempList = '<li><a id="" onclick="refreshSlide2(this)" name="origin" >'+ lblOri + '</a></li>';
    for (var i = 0; i < origin.results.bindings.length; i++) 
    {
        tempList += '<li><a id="' + origin.results.bindings[i]['origin'].value + '" name="origin" onclick="refreshSlide2(this)" >' + origin.results.bindings[i]['title'].value + '</a></li>';
    }
    $('#originListItems').html(tempList);
    // Selection
    if (fromSlideNbr == 2) 
    {
        if (event.name =='origin') 
        {
            $('#originListSelectedValue').html(event.innerHTML);
            $('#originListSelectedId').html(event.id);
        }
    } 
    else 
    {
        $('#originListSelectedValue').html(lblOri);
        $('#originListSelectedId').html('');
    }
}

/*
 * This function fill the source list filter 
 */
function setSourceFilter(event) 
{ 
    // Load source list
    $('#sourceListItems').empty();
    tempList = '<li><a id="' + lblSou + '" onclick="refreshSlide2(this)" name="source" >'+ lblSou + '</a></li>';
    tempList += '<li><a id="" name="source" onclick="refreshSlide2(this)" >*** actual source combinations ***</a></li>';
    
    allMessSourcesArray = new Array();
    checkArray = new Array();
    checkArray.push(lblSou);
    // First insert into the sources list for the combinaisons of sources.
    // this allow the user to make smart filtering with existing combinations of sources.
    for (var i = 0; i < sourcesSets.results.bindings.length; i++) 
    {
        tempList += '<li><a id="' + sourcesSets.results.bindings[i]['sources'].value + '" name="source" onclick="refreshSlide2(this)" >' + sourcesSets.results.bindings[i]['sources'].value + '</a></li>';

        var tempSources = sourcesSets.results.bindings[i]['sources'].value.split(", ");
        
        if (tempSources.length > 1)
        {
            // storing distinct individual sources from splitted combinations
            for (var j = 0; j < tempSources.length; j++)
            {
                if ($.inArray(tempSources[j], allMessSourcesArray) < 0)
                {
                    allMessSourcesArray.push(tempSources[j]);
                }
            }
        }
        else
        {
            checkArray.push(tempSources[0]);
        }
    }

    tempList += '<li><a id="" name="source" onclick="refreshSlide2(this)" >*** other individual sources ***</a></li>';
            
    // Second insert in the list for individual sources.
    // This allows the user to make filtering according only one organisation 
    // that can be of their interest.    
    for (var i = 0; i < allMessSourcesArray.length; i++) 
    {
        if ($.inArray(allMessSourcesArray[i], checkArray) < 0)
        {
            tempList += '<li><a id="' + allMessSourcesArray[i] + '" name="source" onclick="refreshSlide2(this)" >' + allMessSourcesArray[i] + '</a></li>';
        }
    }
 
    $('#sourceListItems').html(tempList);
    // Selection
    if (fromSlideNbr == 2) 
    {
        if (event.name =='source') 
        {
            $('#sourceListSelectedValue').html(event.id);
        }
    } 
    else 
    {
        $('#sourceListSelectedValue').html(lblSou);
        $('#sourceListSelectedId').html('source');
    }
}
    
    
/*
 * This function fills the location list filter 
 */
function setLocationFilter(event) 
{ /*
            console.log("event: " + event);
            console.log("eventid: " + event.id);
            console.log("eventname: " + event.name);
    */
    // Selection
    switch (fromSlideNbr)
    {
        case 1:
            $('#locListSelectedValue').html(lblLoc);
            $('#locListSelectedId').html('');
            biggestGeoZone = 'Mali';
            currentGeoZone = 'Mali';
            biggestGeoZoneUri = 'http://hxl.humanitarianresponse.info/data/locations/admin/mli/MLI';
            currentGeoZoneUri = 'http://hxl.humanitarianresponse.info/data/locations/admin/mli/MLI';
            break;
        case 2:
            if (event == 'location') 
            {
                currentGeoZone = $('#locListSelectedValue').html();
                currentGeoZoneUri = $('#locListSelectedId').html();
            }
            break;
    }
    
    var countryScore = getCountryScore($('#memEmergencyUri').html());

    unit_tree = [];
    unit = {uri: null, name: null, sapl: false, parent_uri: null, sub: []};

    for (var i = 0; i < countryScore.results.bindings.length; i++)
    {
        unit = {uri: null, name: null, parent_uri: null, sub: []};
        unit.uri = countryScore.results.bindings[i]['countryUri'].value;
        unit.name = countryScore.results.bindings[i]['countryName'].value;
        unit_tree.push(unit); // adds countries

        var locationLevels = getLevelLocations($('#memEmergencyUri').html(), unit_tree[i].uri);
        var locationLeftOver = getTheRestOfLocations($('#memEmergencyUri').html(), unit_tree[i].uri);

        // inserting level 1
        var checkArray = [];
        for (var j = 0; j < locationLevels.results.bindings.length; j++)
        {   
            if ($.inArray(locationLevels.results.bindings[j]['atLocationL1'].value, checkArray) < 0)
            {
                unit = {uri: null, name: null, parent_uri: null, sub: []};
                unit.uri = locationLevels.results.bindings[j]['atLocationL1'].value;
                unit.name = locationLevels.results.bindings[j]['atLocationL1Display'].value;
                unit.parent_uri = unit_tree[i].uri;
                unit_tree[i].sub.push(unit);
                checkArray.push(locationLevels.results.bindings[j]['atLocationL1'].value);
            }
        }

        // parsing level 1 to add level 2
        checkArray = [];
        for (var j = 0; j < unit_tree[i].sub.length; j++) 
        {
            for (var k = 0; k < locationLevels.results.bindings.length; k++)
            {
                if (unit_tree[i].sub[j].uri == locationLevels.results.bindings[k]['atLocationL1'].value &&
                    $.inArray(locationLevels.results.bindings[k]['atLocationL2'].value, checkArray) < 0)
                {
                    unit = {uri: null, name: null, parent_uri: null, sub: []};
                    unit.uri = locationLevels.results.bindings[k]['atLocationL2'].value;

                    unit.name = locationLevels.results.bindings[k]['atLocationL2Display'].value;
                    unit.parent_uri = unit_tree[i].sub[j].uri;
                    unit_tree[i].sub[j].sub.push(unit);
                    checkArray.push(locationLevels.results.bindings[k]['atLocationL2'].value);
                }
            }
        }

        // parsing level 2 to add locations
        checkArray = [];
        for (var j = 0; j < unit_tree[i].sub.length; j++) 
        {
            for (var k = 0; k < unit_tree[i].sub[j].sub.length; k++)
            {
                //tempId = 0;
                for (var l = 0; l < locationLevels.results.bindings.length; l++)
                {
                    if (unit_tree[i].sub[j].sub[k].uri == locationLevels.results.bindings[l]['atLocationL2'].value &&
                        $.inArray(locationLevels.results.bindings[l]['location'].value, checkArray) < 0)
                    {
                        unit = {uri: null, name: null, parent_uri: null, sub: []};
                        unit.uri = locationLevels.results.bindings[l]['location'].value;

                        unit.name = locationLevels.results.bindings[l]['locationDisplay'].value;
                        unit.sapl = true;
                        unit.parent_uri = unit_tree[i].sub[j].sub[k].uri;
                        unit_tree[i].sub[j].sub[k].sub.push(unit);
                        
                        checkArray.push(locationLevels.results.bindings[l]['location'].value);
                    }
                }
            }
        }



        // APL left over
        checkArray = [];
        for (var j = 0; j < locationLeftOver.results.bindings.length; j++)
        {   
            unit = {uri: null, name: null, parent_uri: null, sub: []};
            unit.uri = locationLeftOver.results.bindings[j]['location'].value;
            unit.name = locationLeftOver.results.bindings[j]['locationDisplay'].value;
            unit.sapl = true;
            unit.parent_uri = unit_tree[i].uri;
            unit_tree[i].sub.push(unit);
            checkArray.push(locationLeftOver.results.bindings[j]['location'].value);
        }
    }

    /*
    // log for debug
    for (var i = 0; i < unit_tree.length; i++)
    {
        console.log(unit_tree[i].uri);
        for (var j = 0; j < unit_tree[i].sub.length; j++) 
        {
            console.log("  " + unit_tree[i].sub[j].uri);
            for (var k = 0; k < unit_tree[i].sub[j].sub.length; k++)
            {
                console.log("  " + "  " + unit_tree[i].sub[j].sub[k].uri);
                for (var l = 0; l < unit_tree[i].sub[j].sub[k].sub.length; l++)
                {
                    console.log("  " + "  " + "  " + unit_tree[i].sub[j].sub[k].sub[l].uri);
                }
            }
        } 
    }
    */

    var liPre1 = '<li><input onclick="saveLocationSelection(this)" type="checkbox" id="';
    var liPre2 = '" value="';
    var liPre3 = '" ><label>';
    var liPost = '</label>';
    var aplIcon = '<img src="img/apl.png" alt="Affected People Location" style="margin-left: 5px;" />';
    modalContent = '<table><tr>';
    // display
    // The 'APL-' helps to know which query should be used
    for (var i = 0; i < unit_tree.length; i++)
    {
        modalContent += '<td style="vertical-align: top; width:275px;">';
        modalContent += '<ul id="tree' + i + '" style="padding:5px 5px 0px 10px" >';
        //console.log(unit_tree[i].uri);
        modalContent += liPre1;
        if (unit_tree[i].sapl) modalContent += 'APL-';
        modalContent += unit_tree[i].uri;
        modalContent += liPre2;
        modalContent += unit_tree[i].name;
        modalContent += liPre3;
        modalContent += '<b>' + unit_tree[i].name + '</b>';
        modalContent += liPost;
        if (unit_tree[i].sapl) modalContent += aplIcon;
        modalContent += '<ul>';
        
        for (var j = 0; j < unit_tree[i].sub.length; j++) 
        {
           // console.log("  " + unit_tree[i].sub[j].uri);
            modalContent += liPre1;
            if (unit_tree[i].sub[j].sapl) modalContent += 'APL-';
            modalContent += unit_tree[i].sub[j].uri;
            modalContent += liPre2;
            modalContent += unit_tree[i].sub[j].name;
            modalContent += liPre3;
            modalContent += unit_tree[i].sub[j].name;
            modalContent += liPost;
            if (unit_tree[i].sub[j].sapl) modalContent += aplIcon;
            if (unit_tree[i].sub[j].sub.length > 0) modalContent += '<ul>';
            
            for (var k = 0; k < unit_tree[i].sub[j].sub.length; k++)
            {
                //console.log("  " + "  " + unit_tree[i].sub[j].sub[k].uri);
                modalContent += liPre1;
                if (unit_tree[i].sub[j].sub[k].sapl) modalContent += 'APL-';
                modalContent += unit_tree[i].sub[j].sub[k].uri;
                modalContent += liPre2;
                modalContent += unit_tree[i].sub[j].sub[k].name;
                modalContent += liPre3;
                modalContent += unit_tree[i].sub[j].sub[k].name;
                modalContent += liPost;
                if (unit_tree[i].sub[j].sub[k].sapl) modalContent += aplIcon;
                modalContent += '<ul>';
                
                for (var l = 0; l < unit_tree[i].sub[j].sub[k].sub.length; l++)
                {
                    //console.log("  " + "  " + "  " + unit_tree[i].sub[j].sub[k].sub[l].uri);
                    modalContent += liPre1;
                    if (unit_tree[i].sub[j].sub[k].sub[l].sapl) modalContent += 'APL-';
                    modalContent += unit_tree[i].sub[j].sub[k].sub[l].uri;
                    modalContent += liPre2;
                    modalContent += unit_tree[i].sub[j].sub[k].sub[l].name;
                    modalContent += liPre3;
                    modalContent += unit_tree[i].sub[j].sub[k].sub[l].name;
                    modalContent += liPost;
                    if (unit_tree[i].sub[j].sub[k].sub[l].sapl) modalContent += aplIcon;
                }
                modalContent += '</ul>';
            }
            if (unit_tree[i].sub[j].sub.length > 0) modalContent += '</ul>';
        }
        modalContent += '</ul>';
        modalContent += '</ul>';
        modalContent += '</td>';
    }
    modalContent += '</td></tr></table>';

    $('#modalContent').html(modalContent);

    // 
    $('#tree0').checkboxTree();
    $('#tree1').checkboxTree();
    $('#tree2').checkboxTree();
    $('#tree3').checkboxTree();
}

/*******************
* Detailed graph 
******************/
google.load('visualization', '1', {'packages':['annotatedtimeline']});
var chartData;
var chart;
var dateArrayFull = new Array();
function drawChart (event) 
{
    chartData = new google.visualization.DataTable();

    var dateArray = new Array();
    var sourceId = new Array();

    chartData.addColumn('date', 'Date');
    chartData.addColumn('number', $('#catListSelectedValue').html() + ':');
    chartData.addColumn('string', 'title1');
    chartData.addColumn('string', 'text1');

    if (fromSlideNbr == 2)
    {   
        var sources = null;
        if ($("#sourceListSelectedValue").html() != lblSou) 
        {
            sources = $("#sourceListSelectedValue").html().split(', ');
            
            for (var i=0; i < sources.length; i++) 
            {
                sourceId[i] =  sourceInvConverter[sources[i]];
            }
        }
        else 
        {
            sourceId = null;
        }
        var filteredPop = getFilteredPopulation($('#memEmergencyUri').html(),
                                                $('#catListSelectedId').html(),
                                                $("#locListSelectedId").html(),
                                                sourceId,
                                                $("#sexListSelectedId").html(),
                                                $("#ageListSelectedId").html(),
                                                $("#originListSelectedId").html());

        graphData = filteredPop.results.bindings;
        
        dateArrayFull = [];
        // Getting the personCounts and the rest of the data
        for (var i = 0; i < graphData.length; i++)
        {
            // For the chart, the date format can be interpreted only like 
            // "yyyy, m, d" but not "yyyy-m-d".
            if (navigator.appName == 'Microsoft Internet Explorer')
            {
                dateArrayFull[i] = new Date(graphData[i]['date'].value.replace('-', ', '));
            } 
            else
            {
                dateArrayFull[i] = new Date(graphData[i]['date'].value);
            }
        }
    }
    
    // Creation of the list of populations passing the current filter
    // This array is later used to store person counts in a 2 dimension matrix 
    // day x population to allow further processing and summing to have the correct 
    // array for the graph.
    var dailyPopList = new Array();
    for (var i = 0; i < graphData.length; i++)
    {
        // TODO: log
        if (graphData[i]['personCount'].value == '') continue; 
        
        if ($.inArray(graphData[i]['population'].value, dailyPopList) < 0)
        {
            dailyPopList.push(graphData[i]['population'].value);
        }
    } // end for
    
    var popCountMatrix = new Array();
    
    // Data preparation
    var newDate;
    var tempArray = new Array();
    var currentDate = '';
    var graphIndex = -1;
    var tempDay;
    
    var dates = new Array();
       
    for (var i = 0; i < graphData.length; i++)
    {
        // TODO: log
        if (graphData[i]['personCount'].value == '') continue; 
        
        tempDay = graphData[i]['date'].value.split(" ")[0];

        // parsing by date
        if (currentDate != tempDay) 
        {
            currentDate = tempDay;
            graphIndex++;
            newDate = new Date();

            newDate.setUTCFullYear(dateArrayFull[i].getFullYear());
            newDate.setUTCMonth(dateArrayFull[i].getMonth());
            newDate.setUTCDate(dateArrayFull[i].getDate());
            newDate.setUTCHours(0);
            newDate.setMinutes(0);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);

            dateArray[graphIndex] = newDate;

            newDate = tempDay;

            // adding the second dimension to the matrix
            popCountMatrix[newDate] = new Array(dailyPopList.length);
        }

        dates.push(newDate);

        for (var j = 0; j < dailyPopList.length; j++)
        {
            if (dailyPopList[j] == graphData[i]['population'].value)
            {
                popCountMatrix[newDate][j] = parseInt(graphData[i]['personCount'].value);
            }
        }
    } // end for

    fillingTheGaps(popCountMatrix, dailyPopList.length);

    var count = new Array(dateArray.length);
    var dateId = 0;
    for (var tempDate in popCountMatrix)
    {
        count[dateId] = 0;
        for (var i = 0; i < popCountMatrix[tempDate].length; i++)
        {
            count[dateId] += popCountMatrix[tempDate][i];
        }
        dateId++;
    }
    
    for (var i = 0; i < count.length; i++) 
    {
        tempArray.push(new Array(dateArray[i], count[i], undefined, undefined));
    }
    chartData.addRows(tempArray); 

    tempArray = null;
    dateArray = null;
    count = null;

    var options = {
        title : 'Evolution of the number of displaced people',
        vAxis: {title: "Count"},
        hAxis: {title: "Time"},
        dateFormat: 'dd MMM yyyy',
        displayExactValues: true
    };

    chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div2'));
    chart.draw(chartData, options);

    chartData = null;
    options = null;
    chart = null;
}
