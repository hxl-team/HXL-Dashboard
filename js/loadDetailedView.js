
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


var catChoice;
function InitLabels(buttonId) { 
    catChoice = -1;       
    // Display
    // page title
    var popCategory = '';
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
        default:
            catChoice = 0;
    }
    document.catForm.populations.options.selectedIndex = catChoice;
    $("#detailedViewTitle").html('Detailed view > ' + populationInfo.results.bindings[0]['countryDisplay'].value + ' > ');
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

    // Data preparation
    var detailedDataRows = '';

    //console.log("catChoice: " + catChoice)
    var newDate;
    switch(catChoice)
    {
        case 0:
            detailedDataRows = count1.toString().split(",");
            break;
        case 1:
            detailedDataRows = count2.toString().split(",");
            break;
        case 2:
            detailedDataRows = count3.toString().split(",");
            break;
        case 3:
            detailedDataRows = count4.toString().split(",");
            break;
    }

    var tempArray = new Array();
    for (var i = 0; i < count1.length; i++) {
        newDate = new Date();
        switch(catChoice)
        {
            case 0:
                newDate.setUTCFullYear(dateArray1[i].getFullYear());
                newDate.setUTCMonth(dateArray1[i].getMonth());
                newDate.setUTCDate(dateArray1[i].getDate());
                break;
            case 1:
                newDate.setUTCFullYear(dateOk2.getFullYear());
                newDate.setUTCMonth(dateOk2.getMonth());
                newDate.setUTCDate(dateOk2.getDate());
                break;
            case 2:
                newDate.setUTCFullYear(dateOk3.getFullYear());
                newDate.setUTCMonth(dateOk3.getMonth());
                newDate.setUTCDate(dateOk3.getDate());
                break;
            case 3:
                newDate.setUTCFullYear(dateOk4.getFullYear());
                newDate.setUTCMonth(dateOk4.getMonth());
                newDate.setUTCDate(dateOk4.getDate());
                break;
            default:
        }

        tempArray.push(new Array(newDate, detailedDataRows[i] * 1, undefined, undefined))
    }
    data.addRows(tempArray); 

/*
    // Drawing
   // data.addRows([
      [new Date(2011, 11 ,1), 2000, undefined, undefined], // add 3 column parameters for another line on the graph
      [new Date(2011, 12 ,10), 4045, undefined, undefined],
      [new Date(2012, 1 ,20), 5022, undefined, undefined],
      [new Date(2012, 2 ,25), 5284, undefined, undefined],
      [new Date(2012, 3 ,1), 4045, undefined, undefined],
      [new Date(2012, 4 ,25), 5022, undefined, undefined],
      [new Date(2012, 5 ,10), 5284, undefined, undefined],
      [new Date(2012, 6 ,25), 3476, undefined, undefined],       
      //new Date(2012, 4 ,1), 3476, 'Conflict easing','At ceasefire a first wave of people leave the camp'],

      [new Date(2012, 5 ,1), 3322, undefined, undefined]
    ]);*/

    var options = {
      title : 'IDPs count in Burkina Faso Deou 2011 2012',
      vAxis: {title: "persons"},
      hAxis: {title: "Time"}
    };

    var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div2'));
    chart.draw(data, options);
}
