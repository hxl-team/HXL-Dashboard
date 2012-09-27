
/* Refresh the content when a new filter is triggered */
function refreshSlide2(event) { 
    SetLabelsSlide2(event);
    initializeMap(event);
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

function ShowLayer()
{
    Popup.style.display="block";
    $('#map').hide();
}
function HideLayer()
{
    Popup.style.display="none";
    $('#map').show();
}

/*
 * Display of the map showing the current location
 */
var map;
var googleLayer;
var locationBoundariesLayer;
function initializeMap(event) {

    if (event != null && event.id.indexOf("NextButton") == -1) {
        if (event.name.indexOf("loc") != -1) {
            var uri = event.name.replace("loc", '')
            getlocationGeom(uri);
        } 
    }
    if (map == null) {
        map = L.map('map');
    }

    if (googleLayer == null) {
        googleLayer = new L.Google('ROADMAP');
    }

    map.setView([12.367838, -1.530247], 6);
    map.addLayer(googleLayer);
    $('#myModal').modal({
        keyboard: false,
        backdrop: false
    })
    $('#myModal').modal('show');

    waiting(100);
}

function processGeometry () {
    $('#myModal').modal('hide');
    // Conversion of the string into an array of array of array of lat long coordinates
    var geomSplit = locGeom.split('],[');
    var tempArray = new Array();
    var coordinatesArray;
    var finalGeomArray;
    
    for (var i = geomSplit.length - 1; i >= 0; i--) {
        coordinatesArray = geomSplit[i].split(',');
        coordinatesArray[0] = coordinatesArray[0] * 1.0;
        coordinatesArray[1] = coordinatesArray[1] * 1.0;
        tempArray[i] = [coordinatesArray[0], coordinatesArray[1]];
        if (geomSplit.length.length < 10)console.log(coordinatesArray[0] + ", " + coordinatesArray[1]);
    };
    geomSplit = null;
    coordinatesArray = null;

    finalGeomArray =  [tempArray];

    // Layer display
    var geojsonFeature = {
        "type": "Feature",
        "geometry": {
            "type": "Polygon",
            "coordinates": finalGeomArray
        }
    };

    if (locationBoundariesLayer != null){
        map.removeLayer(locationBoundariesLayer);
    }

    locationBoundariesLayer = L.geoJson().addTo(map);
    locationBoundariesLayer.addData(geojsonFeature);
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
function SetLabelsSlide2(event) { 

    var selectedCategoryIdFromS1 = -1;
    if (event.id.indexOf("NextButton") != -1) {
       selectedCategoryIdFromS1 = event.id.replace("NextButton", '') * 1 - 1; // "NextButtonX"
    } else {
        selectedCategoryIdFromS1 = $('#catListSelectedId').html().replace("NextButton", '') * 1 - 1; // "NextButtonX"
    }

    // page title
    // the country must be a parametre after proto
    $("#detailedViewTitle").html('Detailed view > ' + populationInfo.results.bindings[0]['countryDisplay'].value + ' > ');

    // Population categorie drop down list
    $('#catListItems').empty();
    var tempList = '';
    for (var i = 0; i < categoriesLabels.length; i++) {
        tempList += '<li><a id="' + categoriesLabels[i] + ' name="catChoice" onclick="refreshSlide2(this)" >' + categoriesLabels[i] + '</a></li>';
    }
    $('#catListItems').html(tempList);
    tempList = null;
    // Selection
    var tempValue = categoriesLabels[0];
    var tempId = categoriesLabels[0];
    if (selectedCategoryIdFromS1 != -1) {
        tempValue = categoriesLabels[selectedCategoryIdFromS1];
        tempId = categoriesLabels[selectedCategoryIdFromS1];
    }
    $('#catListSelectedValue').html(tempValue);
    $('#catListSelectedId').html(tempId);

    // Load location list (all levels)
    var infoLabelAdded = false;
    $('#locListItems').empty();
    var tempList = '<li><a id="' + biggestGeoZone + '" name="loc" onclick="refreshSlide2(this)" href="#graph" >* All camps</a></li>';
    var checkArray = new Array();
    checkArray.push('* All camps');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if (!infoLabelAdded){
            tempList += '<li><a>-- Countries</a></li>';
            infoLabelAdded = true;
        }
        if ($.inArray(populationInfo.results.bindings[i]['countryDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['countryDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['countryUri'].value + '" onclick="refreshSlide2(this)" href="#graph" >' + populationInfo.results.bindings[i]['countryDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['countryDisplay'].value);
        }
    }
    infoLabelAdded = false;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if (!infoLabelAdded){
            tempList += '<li><a>-- Regions</a></li>';
            infoLabelAdded = true;
        }
        if ($.inArray(populationInfo.results.bindings[i]['regionDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['regionDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['regionUri'].value + '" onclick="refreshSlide2(this)" href="#graph" >' + populationInfo.results.bindings[i]['regionDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['regionDisplay'].value);
        }
    }
    infoLabelAdded = false;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if (!infoLabelAdded){
            tempList += '<li><a>-- Provinces</a></li>';
            infoLabelAdded = true;
        }
        if ($.inArray(populationInfo.results.bindings[i]['provinceDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['provinceDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['provinceUri'].value + '" onclick="refreshSlide2(this)" href="#graph" >' + populationInfo.results.bindings[i]['provinceDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['provinceDisplay'].value);
        }
    }
    infoLabelAdded = false;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if (!infoLabelAdded){
            tempList += '<li><a>-- Camps</a></li>';
            infoLabelAdded = true;
        }
        if ($.inArray(populationInfo.results.bindings[i]['campDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['campDisplay'].value + '" name="loc' + populationInfo.results.bindings[i]['campUri'].value + '" onclick="refreshSlide2(this)" href="#graph" >' + populationInfo.results.bindings[i]['campDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['campDisplay'].value);
        }
    }
    $('#locListItems').html(tempList);
    // Selection
    if (event.id.indexOf("NextButton") != -1) {
        $('#locListSelectedValue').html(checkArray[0]);
        $('#locListSelectedId').html('loc');
    } else{
        if (event.name.indexOf("loc") != -1) {
            var uri = event.name.replace("loc", '')
            $('#locListSelectedValue').html(event.id);
        } 
    }

    // Load sex list
    $('#sexListItems').empty();
    tempList = '<li><a>* All sex categories</a></li>';
    checkArray = new Array();
    checkArray.push('* All sex categories');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['sexDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['sexDisplay'].value + '" name="sex" onclick="refreshSlide2(this)" href="#graph" >' + populationInfo.results.bindings[i]['sexDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['sexDisplay'].value);
        }
    }
    $('#sexListItems').html(tempList);
    // Selection
    if (event.id.indexOf("NextButton") != -1) {
        $('#sexListSelectedValue').html(checkArray[0]);
        $('#sexListSelectedId').html('sex');
    } else {
        if (event.name =='sex') {
            $('#sexListSelectedValue').html(event.id);
        }
    }

    // Load age list
    $('#ageListItems').empty();
    tempList = '<li><a>* All age groups</a></li>';
    checkArray = new Array();
    checkArray.push('* All age groups');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['ageDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['ageDisplay'].value + '" name="age" onclick="refreshSlide2(this)" href="#graph" >' + populationInfo.results.bindings[i]['ageDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['ageDisplay'].value);
        }
    }
    $('#ageListItems').html(tempList);
    // Selection
    if (event.id.indexOf("NextButton") != -1) {
        $('#ageListSelectedValue').html(checkArray[0]);
        $('#ageListSelectedId').html('age');
    } else {
        if (event.name =='age') {
            $('#ageListSelectedValue').html(event.id);
        }
    }

    // Load origin list
    $('#originListItems').empty();
    tempList = '<li><a>* All origins</a></li>';
    checkArray = new Array();
    checkArray.push('* All origins');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['nationalityDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['nationalityDisplay'].value + '" name="origin" onclick="refreshSlide2(this)" href="#graph" >' + populationInfo.results.bindings[i]['nationalityDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['nationalityDisplay'].value);
        }
    }
    $('#originListItems').html(tempList);
    // Selection
    if (event.id.indexOf("NextButton") != -1) {
        $('#originListSelectedValue').html(checkArray[0]);
        $('#originListSelectedId').html('origin');
    } else {
        if (event.name =='origin') {
            $('#originListSelectedValue').html(event.id);
        }
    }

    // Load source list
    $('#sourceListItems').empty();
    tempList = '<li><a>* All sources</a></li>';
    checkArray = new Array();
    checkArray.push('* All sources');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, checkArray) < 0) {
            tempList += '<li><a id="' + populationInfo.results.bindings[i]['sourceDisplay'].value + '" name="source" onclick="refreshSlide2(this)" href="#graph" >' + populationInfo.results.bindings[i]['sourceDisplay'].value + '</a></li>';
            checkArray.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
        }
    }
    $('#sourceListItems').html(tempList);
    // Selection
    if (event.id.indexOf("NextButton") != -1) {
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

    var selectedCategoryIdFromS1 = -1;
    if (event.id.indexOf("NextButton") != -1) {
       selectedCategoryIdFromS1 = (event.id.substr(10, 1) * 1 ) - 1; // "NextButtonX"
    } else {
        selectedCategoryIdFromS1 = $('#catListSelectedId').html().replace("NextButton", '') * 1 - 1; // "NextButtonX"
    }

    dataTable = new google.visualization.DataTable();

    var count = new Array();
    var dateArray = new Array();

    dataTable.addColumn('date', 'Date');
    dataTable.addColumn('number', $('select#catForm').val() + ':');
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
        if (event.id.indexOf("NextButton") != -1  ||
            $('#catListSelectedValue').html() == categoriesLabels[0] ||
            populationInfo.results.bindings[i]['type'].value == $('#catListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#locListSelectedValue').html() == '* All camps' ||
            $('#locListSelectedValue').html() == '-- Countries' ||
            $('#locListSelectedValue').html() == '-- Regions' ||
            $('#locListSelectedValue').html() == '-- Provinces' ||
            $('#locListSelectedValue').html() == '-- Camps' ||
            populationInfo.results.bindings[i]['countryDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['regionDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['provinceDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['campDisplay'].value == $('#locListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#sexListSelectedValue').html() == '* All sex categories' ||
            populationInfo.results.bindings[i]['sexDisplay'].value == $('#sexListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#ageListSelectedValue').html() == '* All age groups' ||
            populationInfo.results.bindings[i]['ageDisplay'].value == $('#ageListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#originListSelectedValue').html() == '* All origins' ||
            populationInfo.results.bindings[i]['nationalityDisplay'].value == $('#originListSelectedValue').html()){
        if (event.id.indexOf("NextButton") != -1  ||
            $('#sourceListSelectedValue').html() == '* All sources' ||
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
}


