
var lblLoc = "* All Affected Population Locations";
var lblSex = "* All sex categories";
var lblAge = "* All age groups";
var lblOri = "* All origins";
var lblSou = "* All sources";

var sourcesSets;
var sourcesScore;

var fromSlideNbr;

// Loading the slider
window.onload = bindButtonsEvents; 

var SlideWidth = 900;
var SlideSpeed = 900;

var emergenciesLabels;
var emergenciesList = getEmergenciesInfo();

var categoriesUris;
var categoriesLabels;
var categoriesInfo;
var sexInfo;
var ageInfo;

var popTypeConverter = [];
var sexConverter = [];
var ageConverter = [];
var sourceConverter = [];
var sourceInvConverter = [];

/*
 * Slide 1 Initialization 
 */
$(document).ready
(
    function () 
    {   
        if (setEmergencyChoice(null))
        { 
            var emergencyUri = emergenciesList.results.bindings[0]['emergencyUri'].value;
            
            initDataHelpers();  
            
            // Display
            initCategoryLabels();

            // displaying sources information
            $("#sourcesScore").html("Sources (from the most frequent to the least): ");
            sourcesScore = getSourcesScore(emergencyUri);
            for (var i = 0; i < sourcesScore.results.bindings.length; i++)
            {
                $("#sourcesScore").html($("#sourcesScore").html() + sourcesScore.results.bindings[i]['sourceDisplay'].value + " ");
            }
            
            initSparkline1(emergencyUri, categoriesUris[0]);  
            initSparkline2(emergencyUri, categoriesUris[1]); 
            initSparkline3(emergencyUri, categoriesUris[2]);  
            initSparkline4(emergencyUri, categoriesUris[3]);  
        
            sourcesSets = getSourcesSets(emergencyUri);
        }
    }
);

function NextSlide(event) 
{
    document.getElementById('slideContainer2').style.display="block";
    document.getElementById('slideContainer1').style.display="none";
    
    fromSlideNbr = 1;
    refreshSlide2(event);
    fromSlideNbr = 2;
}

function LastSlide() 
{
    LoadTableView();

    document.getElementById('slideContainer2').style.display="none";
    document.getElementById('slideContainer3').style.display="block";
}

/*
 * Jumps from the first slide to the third one.
 */
function quickTable(event) 
{
    fromSlideNbr = 1;
    NextSlide(event);
    LastSlide();
}

function PreviousSlide(event) 
{
    switch(event.id)
    {
        case 'PreviousButton1':
            //fromSlideNbr = 2;
            document.getElementById('slideContainer2').style.display="none";
            document.getElementById('slideContainer1').style.display="block";
            break;
        case 'PreviousButton2':
            //fromSlideNbr = 3;
            document.getElementById('slideContainer3').style.display="none";
            document.getElementById('slideContainer2').style.display="block";

            break;
    }
}

/*
 * Cleaning the dataTable and especially the tableTools responsible on IE for an
 * iterative 50 Mo accumalation of wasted memory on the process iexplorer.exe.
 * DataTables are not the ideal tool (not enough customizable, scalable).
 */
function cleaningTableView()
{
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

function bindButtonsEvents()
{
    $('#NextButton1').bind('click', function(){NextSlide(this);});
    $('#NextButton2').bind('click', function(){NextSlide(this);});
    $('#NextButton3').bind('click', function(){NextSlide(this);});
    $('#NextButton4').bind('click', function(){NextSlide(this);});
    $('#goToTableView1').bind('click', function(){LastSlide(this);});
    $('#goToTableView2').bind('click', function(){LastSlide(this);});
    $('#PreviousButton1').bind('click', function(){PreviousSlide(this);});
    $('#PreviousButton2').bind('click', function(){PreviousSlide(this);});
} 
