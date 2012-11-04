<!DOCTYPE html>
<html lang="en">
<head>
	<title>Humanitarian Profile Data Browser</title>
	<meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <link rel="shortcut icon" href="img/favicon.ico">
    <link href="css/slider.css" rel="stylesheet"> 
    
    <!--[if lt IE 9]><script src="js/html5.js"></script><![endif]-->
    <script src="js/jquery/jquery-1.8.2.js"></script>
    <script type="text/javascript" src="js/jquery/jquery.sparkline.min.js"></script>
    <script src="js/json2.js"></script> 
    <script src="js/sparqlQueries.js"></script>  
    <script type='text/javascript' src='js/xdate.js'></script>
    <script type='text/javascript' src='js/google-jsapi.js'></script>
    
    <!-- Bootstrap -->
    <link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Map -->
    <link rel="stylesheet" href="lib/leaflet/leaflet.css" />
    <!--[if lte IE 8]><link rel="stylesheet" href="lib/leaflet/leaflet.ie.css" /><![endif]-->
    <script type='text/javascript' src="lib/leaflet/leaflet.js"></script>
    <script type='text/javascript' src='lib/leaflet/leaflet-google.js'></script>
    <script type='text/javascript' src='http://maps.google.com/maps/api/js?sensor=false&amp;v=3.2'></script>

    <!-- DataTables -->
    <script type="text/javascript" src="lib/datatables/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="lib/datatables/tableTools/js/TableTools.js"></script>
    <script type="text/javascript" src="lib/datatables/tableTools/js/ZeroClipboard.js"></script>
    <script type="text/javascript" charset="utf-8" src="lib/datatables/dataTables.bootstrap.js"></script>
    <link href="lib/datatables/css/demo_page.css" rel="stylesheet">
    <link href="lib/datatables/css/demo_table.css" rel="stylesheet">

    <!-- Bootstrap -->
    <script type='text/javascript' src="lib/bootstrap/js/bootstrap.js"></script>

    <!-- Sliding panels -->
    <script type='text/javascript' src='js/panelsManagement.js'></script>

    <!-- Browser detection -->
    <script src="js/browserDetection.js"></script>

    <!-- Style personalization -->
    <link href="css/dashboard.css" rel="stylesheet">

</head>
<body>
    <div class="navbar container" style="width: 940px;" >
        <div class="container" style="width: 940px;" >
            <span class="brand"><img src="img/logo.png" /></span>
            <div class="nav-hxl">
                <ul class="nav" id="topnav">
                <li class="active"><a href="." style="background-color: #FFFFFF; box-shadow:none;" >Humanitarian Profile Data Browser</a></li>
                </ul>
            </div>
        </div>
    </div> 
    <div class="container" style="text-align: left; width: 940px;">
        <span style="margin-left: 20px;">Note: this is a test setup and some of the data shown here may be inaccurate, outdated, or even entirely made up.</span>
     	<br />
        <!-- DISPLAY CONTAINER -->
        <div style="position: relative" >
            <div style="width: 900px; padding: 0 auto; margin: 0 auto;" >
                <div id="container" class="hero-unit" style="width: 900px; padding: 0; margin: 0; background-color: #FFFFFF;" >
                    <div id="slider-wrapper">
                        <?php 
                            include('slider1.php');
                        ?>
                        <?php 
                            include('slider2.php');
                        ?>
                        <?php 
                            include('slider3.php');
                        ?>
                    </div>
                </div>
            </div>
                <br />
            <p id="footer" style="text-align: center;" >
                <a href="http://hxl.humanitarianresponse.info/">Powered by HXL</a>
            </p> 
        </div>
        <div style="clear: both;" ></div>
        <div class="container footer">
    		<div class="row">
                <div class="span3"><strong>Contact</strong><br />
            		This site is part of the HumanitarianResponse network. Write to 
         	         <a href="mailto:info@humanitarianresponse.info">info@humanitarianresponse.info</a> for more information.
                </div>
                <div class="span3"><strong>Links</strong><br />
                    <a href="https://sites.google.com/site/hxlproject/">HXL Project</a><br />
                    <a href="http://hxl.humanitarianresponse.info/">HXL Standard</a>
                </div>
    		    <div class="span3"><strong>Follow HXL</strong><br />
    		        <span class="label label-warning">TBD</span>
                </div>
    		    <div class="span3"><strong>Legal</strong><br />
    		      &copy; 2012 UNOCHA
                </div>
    		</div>
	   </div>
    </div>


</body>
</html>


    <!-- ContentLoad -->
    <script type='text/javascript' src='js/loadSlider1.js'></script>
    <script type='text/javascript' src='js/loadSlider2.js'></script>
    <script type='text/javascript' src='js/loadSlider3.js'></script>
