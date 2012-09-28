
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
    SetLabelsSlide2(event);

    document.getElementById('slideContainer2').style.display="block";
    document.getElementById('slideContainer1').style.display="none";
    
    drawMap(event);
    drawChart(event); 
}

function LastSlide() {
    InitLabelsTableView();
    LoadTableView();

    document.getElementById('slideContainer2').style.display="none";
    document.getElementById('slideContainer3').style.display="block";
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
            document.getElementById('slideContainer2').style.display="none";
            document.getElementById('slideContainer1').style.display="block";
            break;
        case 'PreviousButton2':
            document.getElementById('slideContainer3').style.display="none";
            document.getElementById('slideContainer2').style.display="block";

            // Cleaning the dataTable and especially the tableTools responsible on IE for an iterative 50 Mo accumalation of wasted memory on the process iexplorer.exe.
            oTableTools.fnCleanUp();
            //$(tableView).dataTable().fnDestroy();
            if (typeof(CollectGarbage) == "function") {
                //CollectGarbage();
            }
            //$("#tableView").empty(); 

            break;
    }
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
