<!DOCTYPE html>
<html lang="en">
<head>
	<title>HXL Dashboard</title>
	<meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    
    <link href="css/hxlator.css" rel="stylesheet"> 
    <link href="css/bootstrap-responsive.css" rel="stylesheet">
	<link href="css/jquery-ui-1.8.21.custom.css" rel="stylesheet">
    
       
    <link rel="shortcut icon" href="img/ochaonline_theme_favicon.ico">
    
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
        
    <script type="text/javascript" src="slide-fade-content.js"></script>
    <script type="text/javascript" src="jquery-1.7.2.min.js"></script>

    <script src="js/jquery.js"></script> 
    <script src="js/jquery-ui-1.8.21.custom.min.js"></script>
    <script type='text/javascript' src='http://www.google.com/jsapi'></script>

    <script type='text/javascript'>
      google.load('visualization', '1', {'packages':['annotatedtimeline']});
      //google.setOnLoadCallback(drawChart); not necessary because it is done on
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
          [new Date(2012, 0 ,1), 3000, undefined, undefined], // add 3 parameters for another line on the graph
          [new Date(2012, 1 ,1), 4045, undefined, undefined],
          [new Date(2012, 2 ,1), 5022, undefined, undefined],
          [new Date(2012, 3 ,1), 5284, undefined, undefined],
          [new Date(2012, 4 ,1), 3476, undefined, undefined],       
          /*[new Date(2012, 4 ,1), 3476, 'Conflict easing','At ceasefire a first wave of people leave the camp'],*/

          [new Date(2012, 5 ,1), 3322, undefined, undefined]
        ]);

        var chart = new google.visualization.AnnotatedTimeLine(document.getElementById('chart_div'));
        chart.draw(data, {displayAnnotations: true});
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
    <script type="text/javascript">
        var SlideWidth = 900;
        var SlideSpeed = 900;

        $(document).ready(function () {
            // set the prev and next buttons display
            //SetNavigationDisplay();
            
            $("#slideContainer1").show('slow');
            $("#slideContainer2").hide('slow');
            bindThem();
            
            
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
                drawChart(); 
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
    
    
    <!-- Google map example -->
<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=BIzaSyCO1uRxzM-IsW4NKTssQHKJo8kVxP1Nw8k&sensor=false">

<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
      
<!-- <script type="text/javascript" src="javascripts/jquery.gmap-1.0.4-min.js"></script>-->

        <script type="text/javascript">
    var map;

      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(41.716667,44.783333),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
      }

    </script>
</head>

<body onload="initialize()" onunload="GUnload()"><!-- Google map example -->

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
            <!--- NAVIGATION BUTTONS 
            <a href="javascript:void(0)" onclick="PreviousSlide()" id="PreviousButton" style="margin-right: 10px;">
                Previous Slide</a><a href="javascript:void(0)" onclick="NextSlide()" id="NextButton">Next
                    Slide</a>
            -->
    
    
<?php

?>
       <!----->  </div>
       <div style="clear: both;" ></div>
       <div style="clear: both;" ></div>
       <div style="clear: both;" ></div>
    
        <div class="footer" style="position: relative;">
            <p id="footer" style="text-align: center;" >
                <a href="http://hxl.humanitarianresponse.info/">Powered by HXL</a> &copy; 2012 UNOCHA
            </p>
        </div>
    </div>
	
</body>
</html>