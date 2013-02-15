<!DOCTYPE html>
<html lang="en">
<head>
    <title>Humanitarian Profile Dashboard</title>
    <meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
    <link href="img/favicon.ico" rel="shortcut icon">
    <link href="css/slider.css" rel="stylesheet"> 
    
    <!--[if lt IE 9]><script src="lib/html5.js"></script><![endif]-->
    <script src="lib/jquery/jquery-1.8.2.js"></script>
    <script src="lib/jquery/jquery.sparkline.min.js" type="text/javascript"></script>
    <script src="lib/json2.js"></script> 
    <script src="js/sparqlQueries.js"></script>  
    <script src='lib/xdate.js' type='text/javascript'></script>
    <script src='lib/google-jsapi.js' type='text/javascript'></script>
    
    <!-- Bootstrap -->
    <link href="lib/bootstrap/css/bootstrap.css" rel="stylesheet">
    <link href="css/bootstrap-responsive.css" rel="stylesheet">

    <!-- Map -->
    <link href="lib/leaflet/leaflet.css" rel="stylesheet" />
    <!--[if lte IE 8]><link href="lib/leaflet/leaflet.ie.css" rel="stylesheet" /><![endif]-->
    <script src="lib/leaflet/leaflet.js" type='text/javascript'></script>
    <script src='lib/leaflet/leaflet-google.js' type='text/javascript'></script>
    <script src='http://maps.google.com/maps/api/js?sensor=false&amp;v=3.2' type='text/javascript'></script>

    <!-- DataTables -->
    <script src="lib/DataTables/js/jquery.dataTables.js" type="text/javascript"></script>
    <script src="lib/DataTables/TableTools/media/js/TableTools.js" type="text/javascript"></script>
    <script src="lib/DataTables/TableTools/media/js/ZeroClipboard.js" type="text/javascript"></script>
    <script src="lib/DataTables/dataTables.bootstrap.js" type="text/javascript" charset="utf-8"></script>
    <link href="lib/DataTables/css/demo_page.css" rel="stylesheet">
    <link href="lib/DataTables/css/demo_table.css" rel="stylesheet">

    <!-- Bootstrap -->
    <script src="lib/bootstrap/js/bootstrap.js" type='text/javascript'></script>

    <!-- Sliding panels -->
    <script src='js/panelsManagement.js' type='text/javascript'></script>

    <!-- Browser detection -->
    <script src="js/browserDetection.js"></script>
    
    <script src="js/functions.js"></script>  

    <!-- Style personalization -->
    <link href="css/dashboard.css" rel="stylesheet" />

    
    <!-- additional styles for correcting some bootstrap css and others -->
    <style type="text/css">
        label {
            display: inline;
        }
        input[type="checkbox"] {
            margin: 0px 5px 0 0;
        }
        ul {
            margin-left: 10px;
        }
        .modal {
            width: 900px;
            margin-left: -450px;
        }
        #modalContent {
            width: 1100px;
            max-width: 900px;
        }
        
    </style>
    
    <!-- start checkboxTree configuration -->
    <script src="lib/checkboxTree/jquery-ui-1.8.12.custom/js/jquery-ui-1.8.12.custom.min.js" type="text/javascript"></script>
    <link href="lib/checkboxTree/jquery-ui-1.8.12.custom/css/smoothness/jquery-ui-1.8.12.custom.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="lib/checkboxTree/jquery.checkboxtree.min.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/checkboxTree/jquery.checkboxtree.min.css"/>
    <!-- end checkboxTree configuration -->

    <script type="text/javascript" src="lib/checkboxTree/jquery.cookie.js"></script>
    <script type="text/javascript">
        //<!--
        $(document).ready(function() {
            $('#tabs').tabs({
                cookie: { expires: 30 }
            });
            $('.jquery').each(function() {
                eval($(this).html());
            });
            $('.button').button();
        });
        //-->
    </script>
    
</head>
<body>
    <span id="memEmergencyUri" style="display:none" ></span>
    <span id="memEmergencyLabel" style="display:none" ></span>
    <!--<span id="memSourceQueryLabels" style="display:none" ></span>-->
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
        <span class="label label-warning" style="margin-left: 20px;">Note:</span><span class="text-warning" > This is a test setup and some of the data shown here may be inaccurate, outdated, or even entirely made up.</span>
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
