<!DOCTYPE html>
<html lang="en">
<head>
	<title>HXL Dashboard</title>
	<meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <link href="css/hxlator.css" rel="stylesheet"> 
    <link rel="shortcut icon" href="img/favicon.ico">
    
    <STYLE type="text/css">
        /* THIS IS THE ACTUAL DISPLAY AREA OF THE SLIDERS */
        #container
        {
            width: 900px;
            overflow: hidden;
        }

        /* SET TO THE TOTAL WIDTH OF ALL DIVS */
        #slider-wrapper
        {
            width: 1800px;
        }

        /* THESE ARE THE INDIVIDUAL SLIDE PROPERTIES */
        .slide
        {
            width: 900px;
            /*height: 400px;*/
            overflow: hidden;
            float: left;
        }
       
        /**/
        .center {
            /*width: 50%;
            margin: 0px auto;*/
              width: 100%;
            text-align: center;

        }

    </STYLE>
    
    <!--[if lt IE 9]>
      <script src="js/html5.js"></script>
    <![endif]-->
        
    <script src="js/jquery.js"></script>
    <script type="text/javascript" src="js/slide-fade-content.js"></script>

    <!-- For popovers -->
    <script src="js/bootstrap-tooltip.js"></script>  
    <script src="js/bootstrap-popover.js"></script> 

    <script type='text/javascript' src='js/google-jsapi.js'></script>
    
    <!-- Google map example -->
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyCO1uRxzM-IsW4NKTssQHKJo8kVxP1Nw8k&sensor=false"></script>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
      
    <!-- Sliding panels -->
    <script type="text/javascript">
        var SlideWidth = 900;
        var SlideSpeed = 900;

        $(document).ready(function () {
            
            $("#slideContainer1").show('slow');
            $("#slideContainer2").hide('slow');
            bindThem();
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
        

        function NextSlide() {
            unBindThem();
           
            // get the current margin and subtract the slide width
            var newMargin = CurrentMargin() - SlideWidth;

            $("#slideContainer2").show('slow');
            
            // slide the wrapper to the left to show the next panel at the set speed. Then set the nav display on completion of animation.
            $("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed, function () {
                bindThem();
            });
        }
  
        function PreviousSlide() {
            unBindThem();

            $("#slideContainer2").hide('slow');

            // get the current margin and subtract the slide width
            var newMargin = CurrentMargin() + SlideWidth;

            // slide the wrapper to the right to show the previous panel at the set speed. Then set the nav display on completion of animation.
            $("#slider-wrapper").animate({ marginLeft: newMargin }, SlideSpeed, function () { bindThem() });
            
        }
        
        // Function to add event listeners to the sliders
        function load() {
            var el = document.getElementById("NextButton");
            var el2 = document.getElementById("PreviousButton");
            el.addEventListener("click", NextSlide, false);
            el2.addEventListener("click", PreviousSlide, false);
        } 

        function bindThem() {
            var el = document.getElementById("NextButton");
            var el2 = document.getElementById("PreviousButton");
            el.addEventListener("click", NextSlide, false);
            el2.addEventListener("click", PreviousSlide, false);
        } 

        function unBindThem() {
            var el = document.getElementById("NextButton");
            var el2 = document.getElementById("PreviousButton");
            el.removeEventListener("click", NextSlide, false);
            el2.removeEventListener("click", PreviousSlide, false);
        } 
        
        // Loading the sliders
        document.addEventListener("DOMContentLoaded", load, false);
    </script>
    
    <!-- Country choice -->
<script type="text/javascript">
function showUser(str)
{
if (str=="")
  {
  document.getElementById("txtHint").innerHTML="";
  return;
  }
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
    }
  }
xmlhttp.open("GET","getuser.php?q="+str,true);
xmlhttp.send();
}
</script>
    
    <!-- Simple graph -->
    <script type='text/javascript'>
      google.load('visualization', '1', {packages: ['corechart']});
      
      function drawVisualization() {
        // Some raw data (not necessarily accurate)
        var data = google.visualization.arrayToDataTable([
          ['Month', 'Affected people',],
          ['nov 2011',  115],
          ['dec 2011',  135],
          ['jan 2012',  157],
          ['feb 2012',  139],
          ['mar 2012',  135],
          ['may 2012',  150],
          ['jun 2012',  129],
          ['jul 2012',  100]
        ]);

        var options = {
          title : 'IDPs count in Burkina Faso 2011 2012',
          vAxis: {title: "persons"},
          vAxis: {baseline: 0},
          hAxis: {title: "Month"},
          seriesType: "bars",
          series: {5: {type: "line"}}
        };

        var chart = new google.visualization.ComboChart(document.getElementById('chart_div1'));
        chart.draw(data, options);
      }
      google.setOnLoadCallback(drawVisualization);

    </script>
    
    
    <!--  Buttons over -->
    <script type="text/javascript">
        $(function () { 
            $("#sourcePopover").popover({placement:'bottom', delay: {show: 300, hide: 100 }}); 
            $("#methodPopover").popover({placement:'bottom', delay: {show: 300, hide: 100 }}); 
            $("#reportedByPopover").popover({placement:'bottom', delay: {show: 300, hide: 100 }}); 
            $("#catPopover").popover({placement:'left', delay: {show: 300, hide: 100 }}); 
        }); 
    </script>
    
    
    <!-- Detailed graph -->
    <script type='text/javascript'>
      google.load('visualization', '1', {'packages':['annotatedtimeline']});
      
      // its timely display
      function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'IDPs (fake)');
        data.addColumn('string', 'title1');
        data.addColumn('string', 'text1');
        /*
        data.addColumn('number', 'children');
        data.addColumn('string', 'title2');
        data.addColumn('string', 'text2');*/
        data.addRows([
          [new Date(2011, 11 ,1), 3000, undefined, undefined], // add 3 column parameters for another line on the graph
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
    </script>
    
    
    <!-- Google map example -->
    <script type="text/javascript">
    var map;

      function initializeMap() {
        var mapOptions = {
          center: new google.maps.LatLng(41.716667,44.783333),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
      }

    </script>
    
    
    <!--
    <script type="text/javascript">
        var options = {
        width: 400,
        height: 240,
        animation: {
        duration: 1000,
        easing: 'in'
        },
        hAxis: {viewWindow: {min:0, max:5}}
        };

        var chart = new google.visualization.SteppedAreaChart(
            document.getElementById('visualization'));
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'x');
        data.addColumn('number', 'y');
        var MAX = 10;
        for (var i = 0; i < MAX; ++i) {
        data.addRow([i.toString(), Math.floor(Math.random() * 100)]);
        }
        var prevButton = document.getElementById('b1');
        var nextButton = document.getElementById('b2');
        var changeZoomButton = document.getElementById('b3');

        function drawChart() {
            // Disabling the button while the chart is drawing.
            prevButton.disabled = true;
            nextButton.disabled = true;
            changeZoomButton.disabled = true;
            google.visualization.events.addListener(chart, 'ready',
                function() {
                prevButton.disabled = options.hAxis.viewWindow.min <= 0;
                nextButton.disabled = options.hAxis.viewWindow.max >= MAX;
                changeZoomButton.disabled = false;
                });
            chart.draw(data, options);
        }

        prevButton.onclick = function() {
            options.hAxis.viewWindow.min -= 1;
            options.hAxis.viewWindow.max -= 1;
            drawChart();
        }
        nextButton.onclick = function() {
            options.hAxis.viewWindow.min += 1;
            options.hAxis.viewWindow.max += 1;
            drawChart();
        }
        var zoomed = false;
        changeZoomButton.onclick = function() {
            if (zoomed) {
            options.hAxis.viewWindow.min = 0;
            options.hAxis.viewWindow.max = 5;
            } else {
            options.hAxis.viewWindow.min = 0;
            options.hAxis.viewWindow.max = MAX;
            }
            zoomed = !zoomed;
            drawChart();
        }
        drawChart();  
    </script>
-->
		
    
</head>

<body>
    <div class="navbar container">
        <div class="container">
            <span class="brand"><img src="img/logo.png" /></span>
            <div class="nav-hxlator">
            <ul class="nav" id="topnav">

            <li class="active"><a href="index.php">HXL Dashboard</a></li>
            <li><a href="#">Other menu item</a></li>
            </ul>
            </div>
        </div>
    </div>    


    <div class="container" style="text-align: left;">
        <!-- <div class="hero-unit" >	 -->   
        <a href="https://sites.google.com/site/hxlproject/"><img src="img/hxl-logo-s.png" align="right" /></a><br />
            <h2>HXL Dashboard</h2>
        
     	<br />
<br />
            <!--- DISPLAY CONTAINER --->
            <div style="position: relative" >
            <div style="width: 900px; padding: 0 auto; margin: 0 auto;" >
            <div id="container" class="hero-unit" style="width: 900px; padding: 0; margin: 0;" >
                <!-- OUTTER WRAPPER style="width: 800px;" -->
                <div id="slider-wrapper">
                <!-- SLIDE 1 -->
                            <?php 
                                include('slider1.php');
                            ?>

                    <!-- SLIDE 2 -->
                
                            <?php 
                                include('slider2.php');
                            ?>

            
                </div>
            </div>
            </div>
                <br />
            <p id="footer" style="text-align: center;" >
                <a href="http://hxl.humanitarianresponse.info/">Powered by HXL</a> &copy; 2012 UNOCHA
            </p>
    
    
<?php

?>
       <!----->  </div>
       <div style="clear: both;" ></div>
       <div class="container footer">
		<div class="row">
		  <div class="span3"><strong>Contact</strong><br />
		  This site is part of the HumanitarianResponse network. Write to 
		  <a href="mailto:info@humanitarianresponse.info">info@humanitarianresponse.info</a> for more information.</div>
		  <div class="span3"><strong>Links</strong><br />
		  <a href="https://sites.google.com/site/hxlproject/">HXL Project</a><br />
		  <a href="http://hxl.humanitarianresponse.info/">HXL Standard</a></div>
		  <div class="span3"><strong>Follow HXL</strong><br />
		  <span class="label label-warning">TBD</span></div>
		  <div class="span3"><strong>Legal</strong><br />
		  &copy; 2012 UNOCHA</div>
		</div>
	</div>
    </div>
	
</body>
</html>