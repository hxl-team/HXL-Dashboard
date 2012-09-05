
var SlideWidth = 900;
var SlideSpeed = 900;

$(document).ready(function () {
    
    $("#slideContainer1").show('slow');
    $("#slideContainer2").hide('slow');
    $("#slideContainer3").hide('slow');
    drawChart(); 
    initializeMap();
    
});

function CurrentMargin() {
    // get current margin of slider
    var currentMargin = $("#slider-wrapper").css("margin-left");

    // first page load, margin will be auto, we need to change this to 0
    if (currentMargin == "auto") {
        currentMargin = 0;
    }

    // return the current margin to the function as an integer
    return parseInt(currentMargin);
}


function NextSlide(event) {
    unBindThem();
   
    // get the current margin and subtract the slide width
    var newMargin = CurrentMargin() - SlideWidth;
    //console.log(newMargin);
    $("#slideContainer2").show('slow');
    
    //
    var titleEnd ='';
    switch(event.id)
    {
        case 'NextButton1':
            titleEnd = 'Displaced population';
            break;
        case 'NextButton2':
            titleEnd = 'Refugees and asylum seekers';
            break;
        case 'NextButton3':
            titleEnd = 'IDPs';
            break;
        case 'NextButton4':
            titleEnd = 'Others of concern';
            break;
        default:
            titleEnd = 'Displaced population';
    }
    document.getElementById('detailedViewTitle').innerHTML = 'Burkina Faso crisis - details of ' + titleEnd;
    
    // slide the wrapper to the left to show the next panel at the set speed. Then set the nav display on completion of animation.
    $("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed, function () {
        bindThem();
    });
}

function LastSlide() {
    unBindThem();
   
    // get the current margin and subtract the slide width
    var newMargin = CurrentMargin() - SlideWidth;
    console.log(newMargin);
    $("#slideContainer3").show('slow');
    
    // slide the wrapper to the left to show the next panel at the set speed. Then set the nav display on completion of animation.
    $("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed, function () {
        bindThem();
    });
}

function PrintTime() {
    var currentDate = new Date()
    var minutes = currentDate.getMinutes();
    var secondes = currentDate.getSeconds();
    return minutes + ":" + secondes;
}

function PreviousSlide(event) {
    unBindThem();

    switch(event.id)
    {
        case 'PreviousButton':
            $("#slideContainer2").hide('slow');
            break;
        case 'PreviousButton2':
            $("#slideContainer3").hide('slow');
            break;
    }
    

    // get the current margin and subtract the slide width
    var newMargin = CurrentMargin() + SlideWidth;
    //console.log(newMargin);

    // slide the wrapper to the right to show the previous panel at the set speed. Then set the nav display on completion of animation.
    $("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed, function () { bindThem(); });
    
}

// Function to add event listeners to the sliders
function load() {
    bindThem();
} 

function bindThem() {
    var btnNext1 = document.getElementById("NextButton1");
    var btnNext2 = document.getElementById("NextButton2");
    var btnNext3 = document.getElementById("NextButton3");
    var btnNext4 = document.getElementById("NextButton4");
    var btnTableView = document.getElementById("tableView");
    var btnPrevious = document.getElementById("PreviousButton");
    var btnPrevious2 = document.getElementById("PreviousButton2");
    
    $(btnNext1).bind('click', function(){NextSlide(this);});
    $(btnNext2).bind('click', function(){NextSlide(this);});
    $(btnNext3).bind('click', function(){NextSlide(this);});
    $(btnNext4).bind('click', function(){NextSlide(this);});
    $(btnTableView).bind('click', function(){LastSlide(this);});
    // the other way to write it works only for Previous
    btnPrevious.addEventListener("click", PreviousSlide, false);
    btnPrevious2.addEventListener("click", PreviousSlide, false);
} 

function unBindThem() {
    var btnNext1 = document.getElementById("NextButton1");
    var btnNext2 = document.getElementById("NextButton2");
    var btnNext3 = document.getElementById("NextButton3");
    var btnNext4 = document.getElementById("NextButton4");
    var btnTableView = document.getElementById("tableView");
    var btnPrevious = document.getElementById("PreviousButton");
    var btnPrevious2 = document.getElementById("PreviousButton2");
    
    $(btnNext1).unbind('click');
    $(btnNext2).unbind('click');
    $(btnNext3).unbind('click');
    $(btnNext4).unbind('click');
    $(btnTableView).unbind('click');
    // the other way to write it works only for Previous
    btnPrevious.removeEventListener("click", PreviousSlide, false);
    btnPrevious2.removeEventListener("click", PreviousSlide, false);
} 

// Loading the sliders
document.addEventListener("DOMContentLoaded", load, false);