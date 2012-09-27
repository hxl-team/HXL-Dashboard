<!DOCTYPE html>
<html lang="en">
<head>
	<title>Humanitarian Profile Data Browser</title>
	<meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <link rel="shortcut icon" href="img/favicon.ico">
    <link href="css/hxlator.css" rel="stylesheet"> 
    <link href="css/slider.css" rel="stylesheet"> 
    
    <!--[if lt IE 9]><script src="js/html5.js"></script><![endif]-->
    <script src="js/jquery/jquery-1.8.2.js"></script>
    <script type="text/javascript" src="js/slide-fade-content.js"></script>
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
    <script src="lib/leaflet/leaflet.js"></script>
    <script src='lib/leaflet/leaflet-google.js'></script>
    <script src='http://maps.google.com/maps/api/js?sensor=false&amp;v=3.2'></script>

    <!-- DataTables -->
    <script type="text/javascript" src="lib/datatables/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="lib/datatables/tableTools/js/TableTools.js"></script>
    <script type="text/javascript" src="lib/datatables/tableTools/js/ZeroClipboard.js"></script>
    <script type="text/javascript" charset="utf-8" src="lib/datatables/dataTables.bootstrap.js"></script>
    <link href="lib/datatables/css/demo_page.css" rel="stylesheet">
    <link href="lib/datatables/css/demo_table.css" rel="stylesheet">

    <!-- Bootstrap -->
    <script src="lib/bootstrap/js/bootstrap.js"></script>
    <script src="lib/bootstrap/js/bootstrap-modal.js"></script>
    <script src="js/bootstrap/bootstrap-tooltip.js"></script>  
    <script src="js/bootstrap/bootstrap-popover.js"></script>

    <!-- Sliding panels -->
    <script type='text/javascript' src='js/panelsManagement.js'></script>

<style type="text/css">

.popover {
     border: 0px;
     background-color:transparent; 
}
.popover-inner {
     border: 2px solid black;
     background-color:transparent; 
}




.w10 {
    width: 10px;
    text-align: center;
}
.w20 {
    width: 20px;
    text-align: center;
}
.w30 {
    width: 30px;
    text-align: center;
}
.w40 {
    width: 40px;
    text-align: center;
}
.w45 {
    width: 45px;
    text-align: center;
}
.w50 {
    width: 50px;
    text-align: center;
}
.w60 {
    width: 60px;
    text-align: center;
}
.w65 {
    width: 65px;
    text-align: center;
}
.w70 {
    width: 70px;
    text-align: center;
}
.w80 {
    width: 80px;
    text-align: center;
}
.w90 {
    width: 90px;
    text-align: center;
}
.w100 {
    width: 100px;
    text-align: center;
}


</style>

</head>
<body>


<div id="myModal" class="modal hide fade">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h3>Please wait</h3>
    </div>
    <div class="modal-body">
        <img src="img/loading.gif" />
        <p><span id="waitingText" >Data is being downloaded... </span></p>
    </div>
    <div class="modal-footer">
        <a href="#" class="btn">Close</a>
        <a href="#" class="btn btn-primary">Save changes</a>
    </div>
</div>



    <div class="navbar container" style="width: 940px;" >
        <div class="container" style="width: 940px;" >
            <span class="brand"><img src="img/logo.png" /></span>
            <div class="nav-hxlator">
                <ul class="nav" id="topnav">
                <li class="active"><a href="." style="background-color: #FFFFFF; box-shadow:none;" >Humanitarian Profile Data Browser</a></li>
                </ul>
            </div>
        </div>
    </div> 
    <div class="container" style="text-align: left; width: 940px;">
        <a href="https://sites.google.com/site/hxlproject/"><img src="img/hxl-logo-s.png" align="right" /></a>
        <br />
        <br />
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
                <a href="http://hxl.humanitarianresponse.info/">Powered by HXL</a> &copy; 2012 UNOCHA
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
