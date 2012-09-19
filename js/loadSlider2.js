/*
 * Display of the map showing the current location
 */
var map;
var locationBoundariesLayer;
function initializeMap() {

    if (map == null) map = L.map('map');
    map.setView([12.367838, -1.530247], 6);

    var googleLayer    = new L.Google('ROADMAP');
    map.addLayer(googleLayer);

    // Conversion of the string into an array of array of array of lat long coordinates
    var geomSplit = locGeom.split('],[');
    var tempArray = new Array();
    var coordinatesArray;
    for (var i = geomSplit.length - 1; i >= 0; i--) {
        coordinatesArray = geomSplit[i].split(',');
        coordinatesArray[0] = coordinatesArray[0] * 1.0;
        coordinatesArray[1] = coordinatesArray[1] * 1.0;
        tempArray[i] = [coordinatesArray[0], coordinatesArray[1]];
    };
    var finalGeomArray =  [tempArray];

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
function InitLabels(buttonId) { 
    catChoice = 0;
    locChoice = 1; 
    sexChoice = 0; 
    ageChoice = 0; 
    originChoice = 0; 
    sourceChoice = 0; 

    // page title
    $("#detailedViewTitle").html('Detailed view > ' + populationInfo.results.bindings[0]['countryDisplay'].value + ' > ');
    switch(buttonId)
    {
        case 'NextButton1':
            catChoice = 0;
            break;
        case 'NextButton2':
            catChoice = 1;
            break;
        case 'NextButton3':
            catChoice = 2;
            break;
        case 'NextButton4':
            catChoice = 3;
            break;
    }
    $('#catForm').empty();
    for (var i = 0; i < categoriesLabels.length; i++) {
        $('#catForm').append('<option value="' + categoriesLabels[i] + '">' + categoriesLabels[i] + '</option>');
    }
    document.catForm.populations.options.selectedIndex = catChoice;

    // Memorize selections
    if (document.locForm.locations != undefined)
    {
        locChoice = document.locForm.locations.options.selectedIndex;
    }
    if (document.sexForm.sex != undefined)
    {
        sexChoice = document.sexForm.sex.options.selectedIndex;
    }
    if (document.ageForm.age != undefined)
    {
        ageChoice = document.ageForm.age.options.selectedIndex;
    }
    if (document.originForm.origin != undefined)
    {
        originChoice = document.originForm.origin.options.selectedIndex;
    }
    if (document.sourceForm.source != undefined)
    {
        sourceChoice = document.sourceForm.source.options.selectedIndex;
    }

    // Load location list
    var tempArray = new Array();
    $('#locForm').empty();
    $('#locForm').append('<option value="all_locations">* All locations</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['countryDisplay'].value, tempArray) < 0) {
            $('#locForm').append('<option value="' + populationInfo.results.bindings[i]['countryPCode'].value + '">' + populationInfo.results.bindings[i]['countryDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['countryDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['regionDisplay'].value, tempArray) < 0) {
            $('#locForm').append('<option value="' + populationInfo.results.bindings[i]['regionDisplay'].value + '">' + populationInfo.results.bindings[i]['regionDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['regionDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['provinceDisplay'].value, tempArray) < 0) {
            $('#locForm').append('<option value="' + populationInfo.results.bindings[i]['provinceDisplay'].value + '">' + populationInfo.results.bindings[i]['provinceDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['provinceDisplay'].value);
        }
        if ($.inArray(populationInfo.results.bindings[i]['departementDisplay'].value, tempArray) < 0) {
            $('#locForm').append('<option value="' + populationInfo.results.bindings[i]['departementDisplay'].value + '">' + populationInfo.results.bindings[i]['departementDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['departementDisplay'].value);
        }
    }

    // Current location
    $('#locForm')[0].selectedIndex = locChoice;
    if ($('#locForm')[0].selectedIndex != 0) {
        currentGeoZone = $('select#locForm').val();
    } else {
        currentGeoZone = biggestGeoZone;
    }

    // Load other lists
    var tempArray = new Array();
    $('#sexForm').empty();
    $('#sexForm').append('<option value="all_sex">* All sex categories</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['sexDisplay'].value, tempArray) < 0) {

            $('#sexForm').append('<option value="' + populationInfo.results.bindings[i]['sexDisplay'].value + '">' + populationInfo.results.bindings[i]['sexDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['sexDisplay'].value);
        }
    }
    $('#sexForm')[0].selectedIndex = sexChoice;

    var tempArray = new Array();
    $('#ageForm').empty();
    $('#ageForm').append('<option value="all_ages">* All age categories</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['ageDisplay'].value, tempArray) < 0) {

            $('#ageForm').append('<option value="' + populationInfo.results.bindings[i]['ageDisplay'].value + '">' + populationInfo.results.bindings[i]['ageDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['ageDisplay'].value);
        }
    }
    $('#ageForm')[0].selectedIndex = ageChoice;

    var tempArray = new Array();
    $('#originForm').empty();
    $('#originForm').append('<option value="all_countries">* All countries</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['nationalityDisplay'].value, tempArray) < 0) {

            $('#originForm').append('<option value="' + populationInfo.results.bindings[i]['nationalityPCode'].value + '">' + populationInfo.results.bindings[i]['nationalityDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['nationalityDisplay'].value);
        }
    }
    $('#originForm')[0].selectedIndex = originChoice;

    var tempArray = new Array();
    $('#sourceForm').empty();
    $('#sourceForm').append('<option value="all_sources">* All sources</option>');
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        if ($.inArray(populationInfo.results.bindings[i]['sourceDisplay'].value, tempArray) < 0) {

            $('#sourceForm').append('<option value="' + populationInfo.results.bindings[i]['sourceDisplay'].value + '">' + populationInfo.results.bindings[i]['sourceDisplay'].value + '</option>');
            tempArray.push(populationInfo.results.bindings[i]['sourceDisplay'].value);
        }
    }
    $('#sourceForm')[0].selectedIndex = sourceChoice;
}

/* Refresh the content when a new filter is triggered */
function refresh() { 
    InitLabels("NextButton" + ((document.catForm.populations.options.selectedIndex * 1) + 1));
    drawChart(document.catForm.populations.options.selectedIndex); 
    initializeMap();
}

/*******************
* Detailed graph 
******************/
google.load('visualization', '1', {'packages':['annotatedtimeline']});
var tableViewData;
function drawChart(catChoiceLocal) {
    var count = new Array();
    var dateArray = new Array();
    var data = new google.visualization.DataTable();
    tableViewData = new Array();

    data.addColumn('date', 'Date');
    data.addColumn('number', $('select#catForm').val() + ':');
    data.addColumn('string', 'title1');
    data.addColumn('string', 'text1');

    // Data preparation
    var personCountDtl = 0;
    var newDate;
    var tempArray = new Array();
    var currentDate = '';
    var graphIndex = -1;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        // filters        
        if ($('select#catForm').val() == categoriesLabels[0] ||
            populationInfo.results.bindings[i]['type'].value == $('select#catForm').val()){
        if (locChoice == 0  ||
            populationInfo.results.bindings[i]['countryPCode'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['regionDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['provinceDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['departementDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['campDisplay'].value == $('select#locForm').val()){
        if (sexChoice == 0  ||
            populationInfo.results.bindings[i]['sexDisplay'].value == $('select#sexForm').val()){
        if (ageChoice == 0  ||
            populationInfo.results.bindings[i]['ageDisplay'].value == $('select#ageForm').val()){
        if (originChoice == 0  ||
            populationInfo.results.bindings[i]['nationalityPCode'].value == $('select#originForm').val()){
        if (sourceChoice == 0  ||
            populationInfo.results.bindings[i]['sourceDisplay'].value == $('select#sourceForm').val()){

            // parsing by date
            if (currentDate != populationInfo.results.bindings[i]['date'].value) {
                currentDate = populationInfo.results.bindings[i]['date'].value;
                graphIndex++;
                count[graphIndex] = 0;
                newDate = new Date();
                switch(catChoiceLocal)
                {
                    case 0:
                    // Must be improved and use the largest of all, or maybe not if not tolerated by ie.
                        newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                        newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                        newDate.setUTCDate(dateArrayFull1[i].getDate());
                        break;
                    case 1:
                        newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                        newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                        newDate.setUTCDate(dateArrayFull1[i].getDate());
                        break;
                    case 2:
                        newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                        newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                        newDate.setUTCDate(dateArrayFull1[i].getDate());
                        break;
                    case 3:
                        newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
                        newDate.setUTCMonth(dateArrayFull1[i].getMonth());
                        newDate.setUTCDate(dateArrayFull1[i].getDate());
                        break;
                    default:
                }
                dateArray[graphIndex] = newDate;
            }
            count[graphIndex] = parseInt(count[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
        // end filters
        }
        }
        }
        }
        }
        }
    } // end for

    for (var i = 0; i < count.length; i++) {
        tempArray.push(new Array(dateArray[i], count[i] * 1, undefined, undefined));
    }
    data.addRows(tempArray); 

    var options = {
      title : 'Evolution of the number of displaced people',
      vAxis: {title: "Count"},
      hAxis: {title: "Time"},
      dateFormat: 'dd MMM yyyy',
      displayExactValues: true
    };

    var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div2'));
    chart.draw(data, options);
}


