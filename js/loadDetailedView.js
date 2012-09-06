
/* Google map example */
var map;

function initializeMap() {
var mapOptions = {
  center: new google.maps.LatLng(41.716667,44.783333),
  zoom: 8,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}

/*  */
function loadData() { 
  updateData();
}

/* Detailed graph */
google.load('visualization', '1', {'packages':['annotatedtimeline']});

// its timely display
function drawChart() {


var data = new google.visualization.DataTable();
data.addColumn('date', 'Date');
data.addColumn('number', 'IDPs (fake)');
data.addColumn('string', 'title1');
data.addColumn('string', 'text1');
data.addRows([
  [new Date(2011, 11 ,1), 2000, undefined, undefined], // add 3 column parameters for another line on the graph
  [new Date(2011, 12 ,10), 4045, undefined, undefined],
  [new Date(2012, 1 ,20), 5022, undefined, undefined],
  [new Date(2012, 2 ,25), 5284, undefined, undefined],
  [new Date(2012, 3 ,1), 4045, undefined, undefined],
  [new Date(2012, 4 ,25), 5022, undefined, undefined],
  [new Date(2012, 5 ,10), 5284, undefined, undefined],
  [new Date(2012, 6 ,25), 3476, undefined, undefined],       
  /*[new Date(2012, 4 ,1), 3476, 'Conflict easing','At ceasefire a first wave of people leave the camp'],*/

  [new Date(2012, 5 ,1), 3322, undefined, undefined]
]);

var options = {
  title : 'IDPs count in Burkina Faso Deou 2011 2012',
  vAxis: {title: "persons"},
  hAxis: {title: "Time"}
};

var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div2'));
chart.draw(data, options);
}


function InitLabels(event) {        
    // Display
    // page title
    var popCategory = '';
    switch(event.id)
    {
        case 'NextButton1':
            popCategory = uri2PopCategory();
            document.catForm.populations.options.selectedIndex = 0;
            break;
        case 'NextButton2':
            popCategory = uri2PopCategory('http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers');
            document.catForm.populations.options.selectedIndex = 1;
            break;
        case 'NextButton3':
            popCategory = uri2PopCategory('http://hxl.humanitarianresponse.info/ns/#IDP');
            document.catForm.populations.options.selectedIndex = 2;
            break;
        case 'NextButton4':
            popCategory = uri2PopCategory('http://hxl.humanitarianresponse.info/ns/#Others');
            document.catForm.populations.options.selectedIndex = 3;
            break;
        default:
            popCategory = uri2PopCategory();
            document.catForm.populations.options.selectedIndex = 0;
    }
    $("#detailedViewTitle").html('Detailed view > ' + populationInfo.results.bindings[0]['countryDisplay'].value + ' > ');

}
