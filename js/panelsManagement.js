var _DEBUG = false;

var lblLoc0 = "* All Affected Population Locations";
var lblLoc1 = "* All Affected Population Locations";
var lblLoc2 = "* All Affected Population Locations";
var lblLoc3 = "* All Affected Population Locations";
var lblSex = "* All sex categories";
var lblAge = "* All age groups";
var lblOri = "* All origins";
var lblSou = "* All sources";


// Loading the slider
window.onload = bindButtonsEvents; 

var SlideWidth = 900;
var SlideSpeed = 900;

/* Slide 1 Initialization */
$(document).ready(function () {

    document.getElementById('slideContainer1').style.display="block";
    document.getElementById('slideContainer2').style.display="none";
    document.getElementById('slideContainer3').style.display="none";

    setEmergencyChoice(null);  
    getPopulationInfo (document.getElementById('emeListSelectedId').innerHTML);
    initInfoCategory(categoriesInfo);  
    initSparklines();  
    testHideSparklines();
});

function NextSlide(event) {

    if (_DEBUG) {
        console.log('From slide 1 ... ');
    }

    SetLabelsSlide2(event);

    document.getElementById('slideContainer2').style.display="block";
    document.getElementById('slideContainer1').style.display="none";
    
    drawMap(event);
    drawChart(event); 




    //InitLabelsTableView();
    //LoadTableView();
    /*$("div[class='DTTT btn-group']").hide(); // DownloadBar
    $('#tableViewBefore2').before( oTableTools.dom.container );*/
//$("div[class='DTTT btn-group']").clone().appendTo('#DownloadBar');

}

function LastSlide() {

    InitLabelsTableView();
    LoadTableView();

    //$('#tableViewBefore2').before( oTableTools.dom.container );

    document.getElementById('slideContainer2').style.display="none";
    document.getElementById('slideContainer3').style.display="block";
}

function quickTable(event) {
    if (_DEBUG) {
        console.log("quickTable: " + event.id);
    }
    NextSlide(event);
    LastSlide();
}

function PrintTime() {
    var currentDate = new Date()
    var minutes = currentDate.getMinutes();
    var secondes = currentDate.getSeconds();
    return minutes + ":" + secondes;
}

function PreviousSlide(event) {


    switch(event.id)
    {
        case 'PreviousButton1':
            if (_DEBUG) {
                console.log('From slide 2 to slide 1');
            }
            document.getElementById('slideContainer2').style.display="none";
            document.getElementById('slideContainer1').style.display="block";
            break;
        case 'PreviousButton2':
            if (_DEBUG) {
                console.log('From slide 3 to slide 2');
            }

            SetLabelsSlide2(event);

            document.getElementById('slideContainer3').style.display="none";
            document.getElementById('slideContainer2').style.display="block";

            drawMap(event);
            drawChart(event); 
    
            //cleaningTableView();

            //$('.downloadBar').prepend( oTableTools.dom.container );

            break;
    }
}

function cleaningTableView() {
    // Cleaning the dataTable and especially the tableTools responsible on IE for an iterative 50 Mo accumalation of wasted memory on the process iexplorer.exe.
    //oTableTools.fnCleanUp(); // improtant
    // Barely no effect with the following:
    $(tableView).dataTable().fnDestroy();
    tableView = null;


//$(".DTTT_collection").remove();

    if (typeof(CollectGarbage) == "function") {
        CollectGarbage();
    }
    $("#tableView").empty(); 
    
}

function bindButtonsEvents() {
    var btnNext1 = document.getElementById("NextButton1");
    var btnNext2 = document.getElementById("NextButton2");
    var btnNext3 = document.getElementById("NextButton3");
    var btnNext4 = document.getElementById("NextButton4");
    var btnTableView1 = document.getElementById("goToTableView1");
    var btnTableView2 = document.getElementById("goToTableView2");
    var btnPrevious1 = document.getElementById("PreviousButton1");
    var btnPrevious2 = document.getElementById("PreviousButton2");
    
    $(btnNext1).bind('click', function(){NextSlide(this);});
    $(btnNext2).bind('click', function(){NextSlide(this);});
    $(btnNext3).bind('click', function(){NextSlide(this);});
    $(btnNext4).bind('click', function(){NextSlide(this);});
    $(btnTableView1).bind('click', function(){LastSlide(this);});
    $(btnTableView2).bind('click', function(){LastSlide(this);});
    $(btnPrevious1).bind('click', function(){PreviousSlide(this);});
    $(btnPrevious2).bind('click', function(){PreviousSlide(this);});
} 
