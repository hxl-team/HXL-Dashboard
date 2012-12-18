
var comingFromTheFirstSlide;
var comingFromTheThirdSlide;

/* 
 * Refresh the content when a new filter is triggered
 */
function refreshSlide2(event) 
{     
    comingFromTheFirstSlide = false;
    comingFromTheThirdSlide = false;
    
//console.log("refreshSlide2" + event.id);
    
    if (event.id.indexOf("NextButton") != -1) 
    {
    //console.log("event.id.indexOf(NextButton)");
        
        comingFromTheFirstSlide = true;
        comingFromTheThirdSlide = false;
    }
    if (event.id.indexOf("infoPopover") != -1) 
    {
        comingFromTheFirstSlide = false;
        comingFromTheThirdSlide = true;
    }
    
    updateFiltersSelection(event);
    setFilteringLists(event);
    drawMap(event);
    drawChart(event);
}

function geometryReady() 
{
        console.log("geometryReady: " + locGeom);
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
        console.log("waiting");
        processGeometry();
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
{
    // TODO: simplify the test
    if (event != null &&
        !comingFromTheFirstSlide &&
        !comingFromTheThirdSlide) 
    {
        var uri ='';
        if (event.name.indexOf("loc") != -1) {
            uri = event.name.replace("loc", '');
        } 
        else 
        {
            uri = currentGeoZoneUri;
        }
    }
    else 
    {
        uri = currentGeoZoneUri;
    }

    getlocationGeom(uri);

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

    /*$('#myModal').modal({
        keyboard: false,
        backdrop: false
    })
    $('#myModal').modal('show');*/

    waiting(100);
}


var geomSplit;
var tempArray;
var coordinatesArray;
var finalGeom;
var geojsonFeature;
function processGeometry() 
{
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

/*
 * Load the content from the variables from slide 1 to the HTML depending on the chosen category.
 */
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
function updateFiltersSelection (event) 
{ 

//console.log(event.name + "updateFiltersSelection: " + event.id);

    var selectedCategoryIdFromS1 = -1;
    if (comingFromTheFirstSlide) 
    {
//console.log("comingFromTheFirstSlide");
       selectedCategoryIdFromS1 = event.id.replace("NextButton", '') * 1 - 1; // "NextButtonX"
    }
    if (comingFromTheThirdSlide) 
    {
//console.log("comingFromTheThirdSlide");
       selectedCategoryIdFromS1 = event.id.replace("infoPopover", '') * 1 - 1; // "NextButtonX"
//console.log("!!!comingFromTheThirdSlide: " + event.id);
    }

    // page title
    // the country must be a parametre after proto
    //$("#detailedViewTitle").html('Detailed view > ' + populationInfo.results.bindings[0]['countryDisplay'].value + ' > ');
    $("#detailedViewTitle").html('Detailed view > All countries > ');

    // Population categorie drop down list
    $('#catListItems').empty();
    var tempList = '';
    for (var i = 0; i < categoriesLabels.length; i++) 
    {
        tempList += '<li><a id="' + categoriesLabels[i] + '" name="catChoice" onclick="refreshSlide2(this)" >' + categoriesLabels[i] + '</a></li>';
    }
    $('#catListItems').html(tempList);

    //document.getElementById('catListItems').innerHTML = tempList;
    //$('#catListItems').html(tempList);
    tempList = null;
    // Selection
    var tempValue;// = categoriesLabels[0];
    var tempId;// = categoriesLabels[0];
    if (selectedCategoryIdFromS1 != -1) // coming here after change of slide
    {
        
//console.log("selectedCategoryIdFromS1: " + selectedCategoryIdFromS1);
        tempValue = categoriesLabels[selectedCategoryIdFromS1];
        tempId = categoriesLabels[selectedCategoryIdFromS1];

        $('#catListSelectedValue').html(tempValue);
        $('#catListSelectedId').html(tempId);
    } 
    else if (event.name =='catChoice') // new population category
    {
        //console.log("2");
        tempValue = event.id;
        tempId = event.id;

        $('#catListSelectedValue').html(tempValue);
        $('#catListSelectedId').html(tempId);
    }

    // Set choice for the location
    $('#locListItems').empty();

    // Setting the selection on location list
    if (comingFromTheFirstSlide || // Coming from the first slide
        comingFromTheThirdSlide) // Coming from the third slide
    {
        // initialization
        biggestGeoZone = 'Mali';
        currentGeoZone = 'Mali';
        biggestGeoZoneUri = 'http://hxl.humanitarianresponse.info/data/locations/admin/mli/MLI';
        currentGeoZoneUri = 'http://hxl.humanitarianresponse.info/data/locations/admin/mli/MLI';
        /*
        biggestGeoZone = populationInfo.results.bindings[0]['countryDisplay'].value;
        currentGeoZone = populationInfo.results.bindings[0]['countryDisplay'].value;
        biggestGeoZoneUri = populationInfo.results.bindings[0]['countryUri'].value;
        currentGeoZoneUri = populationInfo.results.bindings[0]['countryUri'].value;
*/
        $('#locListSelectedValue').html(lblLoc0);
    } 
    else // from filters
    {
        if (event.name.indexOf("loc") != -1) 
        {
            currentGeoZoneUri = '';
            $('#locListSelectedValue').html(event.id);
        }
    }
    $('#locListSelectedId').html('loc');
}

/*
 * This function manages with the drop down list aimed at filtering the data
 * to output new visualizations.
 * It consists in filling the lists 
 */
function setFilteringLists(event) 
{ 
//console.log(event.id);

    var infoLabelAdded = false;
    var tempList = '<li><a id="' + lblLoc0 + '" name="loc' + currentGeoZoneUri + '" onclick="refreshSlide2(this)" >' + lblLoc0 + '</a></li>';
    var checkArray = new Array();
    checkArray.push(lblLoc0);

    // Filling the location list
    for (var i = 0; i < populationInfo.results.bindings.length; i++) 
    {
        // checking the current zone URI
        if (currentGeoZoneUri == '') 
        {
            if (populationInfo.results.bindings[i]['countryDisplay'] != undefined &&
                populationInfo.results.bindings[i]['countryDisplay'].value == $('#locListSelectedValue').html()) 
            {
                currentGeoZoneUri = populationInfo.results.bindings[i]['countryUri'].value;
            }
        }
        // Adding the countries
        if (!infoLabelAdded)
        {
            tempList += '<li><a>-- Admin level 0</a></li>';
            infoLabelAdded = true;
        }
        
//console.log('biggestGeoZone');
        if (populationInfo.results.bindings[i]['countryDisplay'] != undefined &&
            $.inArray(populationInfo.results.bindings[i]['countryDisplay'].value, checkArray) < 0) 
        {
            //console.log(populationInfo.results.bindings[i]['countryDisplay'].value);
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['countryDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['countryUri'].value + '" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['countryDisplay'].value + '</a></li>'; 
            checkArray.push(populationInfo.results.bindings[i]['countryDisplay'].value);
        }
    }
    infoLabelAdded = false;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) 
    {
            //console.log(populationInfo.results.bindings[i]['locationAdminUnit1'].value);
        if (currentGeoZoneUri == '') 
        {
            if (populationInfo.results.bindings[i]['adminUnit1Display'] != undefined &&
                populationInfo.results.bindings[i]['adminUnit1Display'].value == $('#locListSelectedValue').html()) 
            {
                currentGeoZoneUri = populationInfo.results.bindings[i]['locationAdminUnit1'].value;
            }
        }
        if (!infoLabelAdded)
        {
            tempList += '<li><a>-- Admin level 1</a></li>';
            infoLabelAdded = true;
        }
        if (populationInfo.results.bindings[i]['adminUnit1Display'] != undefined && 
            $.inArray(populationInfo.results.bindings[i]['adminUnit1Display'].value, checkArray) < 0) 
        {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['adminUnit1Display'].value + '" name="loc' + populationInfo.results.bindings[i]['locationAdminUnit1'].value + '" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['adminUnit1Display'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['adminUnit1Display'].value);
        }
    }
    infoLabelAdded = false;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) 
    {
            //console.log(populationInfo.results.bindings[i]['locationAdminUnit2'].value);
        if (currentGeoZoneUri == '') 
        {
            if (populationInfo.results.bindings[i]['locationAdminUnit2'] != undefined  &&
                populationInfo.results.bindings[i]['locationAdminUnit2'].value == $('#locListSelectedValue').html()) 
            {
                currentGeoZoneUri = populationInfo.results.bindings[i]['locationAdminUnit2'].value;
            }
        }
        if (!infoLabelAdded)
        {
            tempList += '<li><a>-- Admin level 2</a></li>';
            infoLabelAdded = true;
        }
        if (populationInfo.results.bindings[i]['adminUnit2Display'] != undefined &&
            $.inArray(populationInfo.results.bindings[i]['adminUnit2Display'].value, checkArray) < 0) 
        {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['adminUnit2Display'].value + '" name="loc' + populationInfo.results.bindings[i]['locationAdminUnit2'].value + '" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['adminUnit2Display'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['adminUnit2Display'].value);
        }
    }
    infoLabelAdded = false;
    $('#locListItems').html(tempList);


//////////////////////////////


    // Load sex list
    $('#sexListItems').empty();
    tempList = '<li><a id="' + lblSex + '" onclick="refreshSlide2(this)" name="sex" >'+ lblSex + '</a></li>';
    checkArray = new Array();
    checkArray.push(lblSex);
    for (var i = 0; i < populationInfo.results.bindings.length; i++) 
    {
        if (populationInfo.results.bindings[i]['sexDisplay'] != undefined &&
            $.inArray(populationInfo.results.bindings[i]['sexDisplay'].value, checkArray) < 0) 
        {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['sexDisplay'].value + '" name="sex" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['sexDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['sexDisplay'].value);
        }
    }
    $('#sexListItems').html(tempList);
    // Selection
    if (comingFromTheFirstSlide ||
        comingFromTheThirdSlide) 
    {
        $('#sexListSelectedValue').html(checkArray[0]);
        $('#sexListSelectedId').html('sex');
    } 
    else 
    {
        if (event.name =='sex') 
        {
            $('#sexListSelectedValue').html(event.id);
        }
    }

    // Load age list
    $('#ageListItems').empty();
    tempList = '<li><a id="' + lblAge + '" onclick="refreshSlide2(this)" name="age" >'+ lblAge + '</a></li>';
    checkArray = new Array();
    checkArray.push(lblAge);
    for (var i = 0; i < populationInfo.results.bindings.length; i++) 
    {
        if (populationInfo.results.bindings[i]['ageDisplay'] != undefined &&
            $.inArray(populationInfo.results.bindings[i]['ageDisplay'].value, checkArray) < 0) 
        {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['ageDisplay'].value + '" name="age" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['ageDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['ageDisplay'].value);
        }
    }
    $('#ageListItems').html(tempList);
    // Selection
    if (comingFromTheFirstSlide ||
        comingFromTheThirdSlide) 
    {
        $('#ageListSelectedValue').html(checkArray[0]);
        $('#ageListSelectedId').html('age');
    } 
    else 
    {
        if (event.name =='age') 
        {
            $('#ageListSelectedValue').html(event.id);
        }
    }

    // Load origin list
    $('#originListItems').empty();
    tempList = '<li><a id="' + lblOri + '" onclick="refreshSlide2(this)" name="origin" >'+ lblOri + '</a></li>';
    checkArray = new Array();
    checkArray.push(lblOri);
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['nationalityDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['nationalityDisplay'].value + '" name="origin" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['nationalityDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['nationalityDisplay'].value);
        }
    }
    $('#originListItems').html(tempList);
    // Selection
    if (comingFromTheFirstSlide ||
        comingFromTheThirdSlide) {
        $('#originListSelectedValue').html(checkArray[0]);
        $('#originListSelectedId').html('origin');
    } else {
        if (event.name =='origin') {
            $('#originListSelectedValue').html(event.id);
        }
    }
    

    // Load source list
    $('#sourceListItems').empty();
    tempList = '<li><a id="' + lblSou + '" onclick="refreshSlide2(this)" name="source" >'+ lblSou + '</a></li>';
    checkArray = new Array();
    checkArray.push(lblSou);
    for (var i = 0; i < populationInfo.results.bindings.length; i++)
    {
        if (populationInfo.results.bindings[i]['sourceDisplay'] != undefined &&
            $.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, checkArray) < 0)
        {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['sourceDisplay'].value + '" name="source" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['sourceDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
        }
    }
    $('#sourceListItems').html(tempList);
    // Selection
    if (comingFromTheFirstSlide ||
        comingFromTheThirdSlide) {
        $('#sourceListSelectedValue').html(checkArray[0]);
        $('#sourceListSelectedId').html('source');
    } else {
        if (event.name =='source') {
            $('#sourceListSelectedValue').html(event.id);
        }
    }
    
}

/*******************
* Detailed graph 
******************/
google.load('visualization', '1', {'packages':['annotatedtimeline']});
var chartData;
var chart;
function drawChart (event) 
{
    //console.log(event);
    //console.log(event.id);

    var selectedCategoryIdFromS1 = -1;
    // Getting the id of the clicked "Next" button".
    if (comingFromTheFirstSlide) 
    {
       selectedCategoryIdFromS1 = event.id.replace("NextButton", '') * 1 - 1; // "NextButtonX"
    } 
    else if (comingFromTheThirdSlide) 
    {
       selectedCategoryIdFromS1 = event.id.replace("infoPopover", '') * 1 - 1; // "NextButtonX"
    } 
    /*else 
    {
        selectedCategoryIdFromS1 = $('#catListSelectedId').html().replace("NextButton", '') * 1 - 1; // "NextButtonX"
        console.log("use filters" + selectedCategoryIdFromS1);
    }
*/
    chartData = new google.visualization.DataTable();

    var dateArray = new Array();

    chartData.addColumn('date', 'Date');
    chartData.addColumn('number', $('#catListSelectedValue').html() + ':');
    chartData.addColumn('string', 'title1');
    chartData.addColumn('string', 'text1');


    // Creation of the list of populations passing the current filter
    var dailyPopList = new Array();
    for (var i = 0; i < populationInfo.results.bindings.length; i++)
    {
        // filters        
        if ($('#catListSelectedValue').html() == categoriesLabels[0] ||
            populationInfo.results.bindings[i]['populationTypeDisplay'].value == $('#catListSelectedValue').html())
        {
            if (comingFromTheFirstSlide  ||
                $('#locListSelectedValue').html() == lblLoc0 ||
                $('#locListSelectedValue').html() == '-- Countries' ||
                $('#locListSelectedValue').html() == '-- Regions' ||
                $('#locListSelectedValue').html() == '-- Provinces' ||
                $('#locListSelectedValue').html() == '-- Camps' ||
                populationInfo.results.bindings[i]['countryDisplay'].value == $('#locListSelectedValue').html() ||
                (populationInfo.results.bindings[i]['adminUnit1Display'] != undefined &&
                populationInfo.results.bindings[i]['adminUnit1Display'].value == $('#locListSelectedValue').html()) ||
                (populationInfo.results.bindings[i]['adminUnit2Display'] != undefined &&
                populationInfo.results.bindings[i]['adminUnit2Display'].value == $('#locListSelectedValue').html()) ||
                populationInfo.results.bindings[i]['locationDisplay'].value == $('#locListSelectedValue').html())
            {
                if (comingFromTheFirstSlide  ||
                    $('#sexListSelectedValue').html() == lblSex ||
                    (populationInfo.results.bindings[i]['sexDisplay'] != undefined &&
                    populationInfo.results.bindings[i]['sexDisplay'].value == $('#sexListSelectedValue').html()))
                {
                    if (comingFromTheFirstSlide  ||
                        $('#ageListSelectedValue').html() == lblAge ||
                        (populationInfo.results.bindings[i]['ageDisplay'] != undefined &&
                        populationInfo.results.bindings[i]['ageDisplay'].value == $('#ageListSelectedValue').html()))
                    {
                        if (comingFromTheFirstSlide  ||
                            $('#originListSelectedValue').html() == lblOri ||
                            (populationInfo.results.bindings[i]['nationalityDisplay'] != undefined &&
                            populationInfo.results.bindings[i]['nationalityDisplay'].value == $('#originListSelectedValue').html()))
                        {
                            if (comingFromTheFirstSlide  ||
                                $('#sourceListSelectedValue').html() == lblSou ||
                                (populationInfo.results.bindings[i]['sourceDisplay'] != undefined &&
                                populationInfo.results.bindings[i]['sourceDisplay'].value == $('#sourceListSelectedValue').html()))
                            {
                                if ($.inArray(populationInfo.results.bindings[i]['population'].value, dailyPopList) < 0)
                                {
                                    dailyPopList.push(populationInfo.results.bindings[i]['population'].value);
                                }
        
                            }
                        }
                    }
                }
            }
        }  // end filters
    } // end for
    
  //  console.log(dailyPopList.length);
    
    
    var popCountMatrix = new Array();
    
    
    // Data preparation
    var newDate;
    var tempArray = new Array();
    var currentDate = '';
    var graphIndex = -1;
    var tempDay;
    var popCounts = new Array();
    var dates = new Array();
    var pops = new Array();
    
    for (var i = 0; i < populationInfo.results.bindings.length; i++)
    {
        // filters        
        if ($('#catListSelectedValue').html() == categoriesLabels[0] ||
            populationInfo.results.bindings[i]['populationTypeDisplay'].value == $('#catListSelectedValue').html())
        {
            //console.log($('#locListSelectedValue').html());
            
            if (comingFromTheFirstSlide  ||
                $('#locListSelectedValue').html() == lblLoc0 ||
                $('#locListSelectedValue').html() == '-- Countries' ||
                $('#locListSelectedValue').html() == '-- Regions' ||
                $('#locListSelectedValue').html() == '-- Provinces' ||
                $('#locListSelectedValue').html() == '-- Camps' ||
                
                populationInfo.results.bindings[i]['countryDisplay'].value == $('#locListSelectedValue').html() ||
                (populationInfo.results.bindings[i]['adminUnit1Display'] != undefined &&
                populationInfo.results.bindings[i]['adminUnit1Display'].value == $('#locListSelectedValue').html()) ||
                (populationInfo.results.bindings[i]['adminUnit2Display'] != undefined &&
                populationInfo.results.bindings[i]['adminUnit2Display'].value == $('#locListSelectedValue').html()) ||
                populationInfo.results.bindings[i]['locationDisplay'].value == $('#locListSelectedValue').html())
            {
                if (comingFromTheFirstSlide  ||
                    $('#sexListSelectedValue').html() == lblSex ||
                    (populationInfo.results.bindings[i]['sexDisplay'] != undefined &&
                    populationInfo.results.bindings[i]['sexDisplay'].value == $('#sexListSelectedValue').html()))
                {
                    if (comingFromTheFirstSlide  ||
                        $('#ageListSelectedValue').html() == lblAge ||
                        (populationInfo.results.bindings[i]['ageDisplay'] != undefined &&
                        populationInfo.results.bindings[i]['ageDisplay'].value == $('#ageListSelectedValue').html()))
                    {
                        if (comingFromTheFirstSlide  ||
                            $('#originListSelectedValue').html() == lblOri ||
                            (populationInfo.results.bindings[i]['nationalityDisplay'] != undefined &&
                            populationInfo.results.bindings[i]['nationalityDisplay'].value == $('#originListSelectedValue').html()))
                        {
                            if (comingFromTheFirstSlide  ||
                                $('#sourceListSelectedValue').html() == lblSou ||
                                (populationInfo.results.bindings[i]['sourceDisplay'] != undefined &&
                                populationInfo.results.bindings[i]['sourceDisplay'].value == $('#sourceListSelectedValue').html()))
                            {

//popCounts.push(populationInfo.results.bindings[i]['personCount'].value);
//pops.push(populationInfo.results.bindings[i]['population'].value);

                                tempDay = populationInfo.results.bindings[i]['date'].value.split(" ")[0];

                                // parsing by date
                                if (currentDate != tempDay) 
                                {
                                //console.log("test");
                                    currentDate = tempDay;
                                    graphIndex++;
                                    //count[graphIndex] = 0;
                                    newDate = new Date();

                                    newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                                    newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                                    newDate.setUTCDate(dateArrayFull1[i].getDate());
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
                                    if (dailyPopList[j] == populationInfo.results.bindings[i]['population'].value)
                                    {
                                        popCountMatrix[newDate][j] = parseInt(populationInfo.results.bindings[i]['personCount'].value);
                                    }
                                }
                                
                            }
                        }
                    }
                }
            }
        }  // end filters
    } // end for

                
    fillingTheGaps(popCountMatrix, dailyPopList.length);

    
    var count = new Array(dateArray.length);
    var dateId = 0;
    for (var tempDate in popCountMatrix)
    {
        count[dateId] = 0;
        for (var i = 0; i < popCountMatrix[tempDate].length; i++)
        {
            //console.log(tempDate + " - " + i + " - " + popCountMatrix[tempDate][i]);
            count[dateId] += popCountMatrix[tempDate][i];
        }
        dateId++;
    }
    
   

    for (var i = 0; i < count.length; i++) 
    {
        //console.log(dateArray[i]);
        //console.log(count[i]);
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


