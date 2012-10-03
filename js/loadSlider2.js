
/* Refresh the content when a new filter is triggered */
function refreshSlide2(event) { 
    SetLabelsSlide2(event);
    drawMap(event);
    drawChart(event);
}

function geometryReady() {
    if (locGeom != '') {
        return true;
    } else {
        return false;
    }
}

function waiting(timeout_step) {
    if (geometryReady()) {
        processGeometry();
    } else {
        setTimeout(waiting, timeout_step);
    }
}

/*
 * Display of the map showing the current location
 */
var map;
var googleLayer;
var locationBoundariesLayer;
function drawMap(event) {

    if (event != null &&
        event.id.indexOf("NextButton") == -1 &&
        event.id.indexOf("infoPopover") == -1) {
        var uri ='';
        if (event.name.indexOf("loc") != -1) {
                uri = event.name.replace("loc", '');
        } else {
            uri = currentGeoZoneUri;
        }
    }
    else {
        uri = currentGeoZoneUri;
    }

    getlocationGeom(uri);

    if (_DEBUG) {
        console.log(uri);
    }


    if (map == null) {
        map = L.map('map');
    } else {

    map.removeLayer(googleLayer);
    googleLayer = null;
    }

    if (googleLayer == null) {
        googleLayer = new L.Google('ROADMAP');
    map.addLayer(googleLayer);
    }
    map.setView([12.367838, -1.530247], 6);

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
function processGeometry () {
//console.log(locGeom);

    //$('#myModal').modal('hide');

    

    // Conversion of the string into an array of array of array of lat long coordinates
    geomSplit = locGeom.split('],[');
    tempArray = new Array();

    for (var i = geomSplit.length - 1; i >= 0; i--) {
        coordinatesArray = geomSplit[i].split(',');
        coordinatesArray[0] = coordinatesArray[0] * 1.0;
        coordinatesArray[1] = coordinatesArray[1] * 1.0;
        tempArray[i] = [coordinatesArray[0], coordinatesArray[1]];
    };

    // Layer display
    if (geomSplit.length == 1) {

        finalGeom = [coordinatesArray[0], coordinatesArray[1]];

        geojsonFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": finalGeom
            }
        };
    } else {
        finalGeom =  [tempArray];
        geojsonFeature = {
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": finalGeom
            }
        };
    }

    if (locationBoundariesLayer != null){
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
function SetLabelsSlide2(event) { 

//console.log(event.id);

    var selectedCategoryIdFromS1 = -1;
    if (event.id.indexOf("NextButton") != -1) {
       selectedCategoryIdFromS1 = event.id.replace("NextButton", '') * 1 - 1; // "NextButtonX"
    }
    if (event.id.indexOf("infoPopover") != -1) {
       selectedCategoryIdFromS1 = event.id.replace("infoPopover", '') * 1 - 1; // "NextButtonX"
    }

    // page title
    // the country must be a parametre after proto
    $("#detailedViewTitle").html('Detailed view > ' + populationInfo.results.bindings[0]['countryDisplay'].value + ' > ');

    // Population categorie drop down list
    $('#catListItems').empty();
    var tempList = '';
    for (var i = 0; i < categoriesLabels.length; i++) {
        tempList += '<li><a id="' + categoriesLabels[i] + '" name="catChoice" onclick="refreshSlide2(this)" >' + categoriesLabels[i] + '</a></li>';
    }
    $('#catListItems').html(tempList);

    //document.getElementById('catListItems').innerHTML = tempList;
    //$('#catListItems').html(tempList);
    tempList = null;
    // Selection
    var tempValue;// = categoriesLabels[0];
    var tempId;// = categoriesLabels[0];
    if (selectedCategoryIdFromS1 != -1) { // from the first slide
        tempValue = categoriesLabels[selectedCategoryIdFromS1];
        tempId = categoriesLabels[selectedCategoryIdFromS1];

        $('#catListSelectedValue').html(tempValue);
        $('#catListSelectedId').html(tempId);
    } else {
        if (event.name =='catChoice') {
            tempValue = event.id;
            tempId = event.id;

        $('#catListSelectedValue').html(tempValue);
        $('#catListSelectedId').html(tempId);
        }

    }

    // Load location list (all levels)
    var infoLabelAdded = false;
    $('#locListItems').empty();
    var tempList = '<li><a id="' + lblLoc0 + '" name="loc' + populationInfo.results.bindings[0]['countryUri'].value + '" onclick="refreshSlide2(this)" >' + lblLoc0 + '</a></li>';
    var checkArray = new Array();
    checkArray.push(lblLoc0);

    // Selection on location list
    if (event.id.indexOf("NextButton") != -1 ||
        event.id.indexOf("infoPopover") != -1) { // Coming from the first slide



        // initialization
        biggestGeoZone = populationInfo.results.bindings[0]['countryDisplay'].value;
        currentGeoZone = populationInfo.results.bindings[0]['countryDisplay'].value;
        biggestGeoZoneUri = populationInfo.results.bindings[0]['countryUri'].value;
        currentGeoZoneUri = populationInfo.results.bindings[0]['countryUri'].value;

//console.log(currentGeoZoneUri);


        $('#locListSelectedValue').html(checkArray[0]);
    } else{
        if (event.name.indexOf("loc") != -1) {
            currentGeoZoneUri = '';
            $('#locListSelectedValue').html(event.id);
        }
        /* else {
            var uri = event.name.replace("loc", '');

        }
*/
    }
    $('#locListSelectedId').html('loc');

    // Filling the location list
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        // catching the current zone URI
        if (currentGeoZoneUri == '') {
            if (populationInfo.results.bindings[i]['countryDisplay'].value == $('#locListSelectedValue').html()) {
                currentGeoZoneUri = populationInfo.results.bindings[i]['countryUri'].value;
            }
        }
        if (!infoLabelAdded){
            tempList += '<li><a>-- Admin level 0</a></li>';
            infoLabelAdded = true;
        }
        if ($.inArray(populationInfo.results.bindings[i]['countryDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['countryDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['countryUri'].value + '" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['countryDisplay'].value + '</a></li>'; 
            checkArray.push(populationInfo.results.bindings[i]['countryDisplay'].value);
        }
    }
    infoLabelAdded = false;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if (currentGeoZoneUri == '') {
            if (populationInfo.results.bindings[i]['regionDisplay'].value == $('#locListSelectedValue').html()) {
                currentGeoZoneUri = populationInfo.results.bindings[i]['regionUri'].value;
            }
        }
        if (!infoLabelAdded){
            tempList += '<li><a>-- Admin level 1</a></li>';
            infoLabelAdded = true;
        }
        if ($.inArray(populationInfo.results.bindings[i]['regionDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['regionDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['regionUri'].value + '" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['regionDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['regionDisplay'].value);
        }
    }
    infoLabelAdded = false;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if (currentGeoZoneUri == '') {
            if (populationInfo.results.bindings[i]['provinceDisplay'].value == $('#locListSelectedValue').html()) {
                currentGeoZoneUri = populationInfo.results.bindings[i]['provinceUri'].value;
            }
        }
        if (!infoLabelAdded){
            tempList += '<li><a>-- Admin level 2</a></li>';
            infoLabelAdded = true;
        }
        if ($.inArray(populationInfo.results.bindings[i]['provinceDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['provinceDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['provinceUri'].value + '" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['provinceDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['provinceDisplay'].value);
        }
    }
    infoLabelAdded = false;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if (currentGeoZoneUri == '') {
            if (populationInfo.results.bindings[i]['campDisplay'].value == $('#locListSelectedValue').html()) {
                currentGeoZoneUri = populationInfo.results.bindings[i]['campUri'].value;
            }
        }
        if (!infoLabelAdded){
            tempList += '<li><a>-- Affected Population Location</a></li>';
            infoLabelAdded = true;
        }
        if ($.inArray(populationInfo.results.bindings[i]['campDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['campDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['campUri'].value + '" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['campDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['campDisplay'].value);
        }
    }
    $('#locListItems').html(tempList);

    // Load sex list
    $('#sexListItems').empty();
    tempList = '<li><a id="' + lblSex + '" onclick="refreshSlide2(this)" name="sex" >'+ lblSex + '</a></li>';
    checkArray = new Array();
    checkArray.push(lblSex);
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['sexDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['sexDisplay'].value + '" name="sex" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['sexDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['sexDisplay'].value);
        }
    }
    $('#sexListItems').html(tempList);
    // Selection
    if (event.id.indexOf("NextButton") != -1 ||
        event.id.indexOf("infoPopover") != -1) {
        $('#sexListSelectedValue').html(checkArray[0]);
        $('#sexListSelectedId').html('sex');
    } else {
        if (event.name =='sex') {
            $('#sexListSelectedValue').html(event.id);
        }
    }

    // Load age list
    $('#ageListItems').empty();
    tempList = '<li><a id="' + lblAge + '" onclick="refreshSlide2(this)" name="age" >'+ lblAge + '</a></li>';
    checkArray = new Array();
    checkArray.push(lblAge);
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['ageDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['ageDisplay'].value + '" name="age" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['ageDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['ageDisplay'].value);
        }
    }
    $('#ageListItems').html(tempList);
    // Selection
    if (event.id.indexOf("NextButton") != -1 ||
        event.id.indexOf("infoPopover") != -1) {
        $('#ageListSelectedValue').html(checkArray[0]);
        $('#ageListSelectedId').html('age');
    } else {
        if (event.name =='age') {
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
    if (event.id.indexOf("NextButton") != -1 ||
        event.id.indexOf("infoPopover") != -1) {
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
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['sourceDisplay'].value + '" name="source" onclick="refreshSlide2(this)" >' + populationInfo.results.bindings[i]['sourceDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
        }
    }
    $('#sourceListItems').html(tempList);
    // Selection
    if (event.id.indexOf("NextButton") != -1 ||
        event.id.indexOf("infoPopover") != -1) {
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
var dataTable;
var chart;
function drawChart(event) {
/*

    if (event.id.indexOf("infoPopover") != -1) {
       selectedCategoryIdFromS1 = event.id.replace("infoPopover", '') * 1 - 1; // "NextButtonX"
    }



    if (event.id.indexOf("NextButton") != -1) {
       selectedCategoryIdFromS1 = event.id.replace("NextButton", '') * 1 - 1; // "NextButtonX"
    }
    if (event.id.indexOf("infoPopover") != -1) {
       selectedCategoryIdFromS1 = event.id.replace("infoPopover", '') * 1 - 1; // "NextButtonX"
    }
*/
    var selectedCategoryIdFromS1 = -1;
    if (event.id.indexOf("NextButton") != -1) {
       selectedCategoryIdFromS1 = event.id.replace("NextButton", '') * 1 - 1; // "NextButtonX"
    } else if (event.id.indexOf("infoPopover") != -1) {
       selectedCategoryIdFromS1 = event.id.replace("infoPopover", '') * 1 - 1; // "NextButtonX"
    } else {
        selectedCategoryIdFromS1 = $('#catListSelectedId').html().replace("NextButton", '') * 1 - 1; // "NextButtonX"
    }

    dataTable = new google.visualization.DataTable();

    var count = new Array();
    var dateArray = new Array();

    dataTable.addColumn('date', 'Date');
    dataTable.addColumn('number', $('#catListSelectedValue').html() + ':');
    dataTable.addColumn('string', 'title1');
    dataTable.addColumn('string', 'text1');

    // Data preparation
    var personCountDtl = 0;
    var newDate;
    var tempArray = new Array();
    var currentDate = '';
    var graphIndex = -1;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        // filters        
        if (//event.id.indexOf("NextButton") != -1  ||
            $('#catListSelectedValue').html() == categoriesLabels[0] ||
            populationInfo.results.bindings[i]['type'].value == $('#catListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#locListSelectedValue').html() == lblLoc0 ||
            $('#locListSelectedValue').html() == '-- Countries' ||
            $('#locListSelectedValue').html() == '-- Regions' ||
            $('#locListSelectedValue').html() == '-- Provinces' ||
            $('#locListSelectedValue').html() == '-- Camps' ||
            populationInfo.results.bindings[i]['countryDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['regionDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['provinceDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['campDisplay'].value == $('#locListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#sexListSelectedValue').html() == lblSex ||
            populationInfo.results.bindings[i]['sexDisplay'].value == $('#sexListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#ageListSelectedValue').html() == lblAge ||
            populationInfo.results.bindings[i]['ageDisplay'].value == $('#ageListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#originListSelectedValue').html() == lblOri ||
            populationInfo.results.bindings[i]['nationalityDisplay'].value == $('#originListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#sourceListSelectedValue').html() == lblSou ||
            populationInfo.results.bindings[i]['sourceDisplay'].value == $('#sourceListSelectedValue').html()){

            // parsing by date
            if (currentDate != populationInfo.results.bindings[i]['date'].value) {
                currentDate = populationInfo.results.bindings[i]['date'].value;
                graphIndex++;
                count[graphIndex] = 0;
                newDate = new Date();

                newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                newDate.setUTCDate(dateArrayFull1[i].getDate());

                dateArray[graphIndex] = newDate;

            }
            count[graphIndex] = parseInt(count[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value)  * 1;
        // end filters
        }
        }
        }
        }
        }
        }
    } // end for

    for (var i = 0; i < count.length; i++) {
        tempArray.push(new Array(dateArray[i], count[i], undefined, undefined));
    }
    dataTable.addRows(tempArray); 

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
    chart.draw(dataTable, options);

    dataTable = null;
    options = null;
    chart = null;
}


