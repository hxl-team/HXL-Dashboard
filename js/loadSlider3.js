/*
 *
 */
function InitLabelsTableView() { 
    $("#tableViewTitle").html(populationInfo.results.bindings[0]['emergencyDisplay'].value + ' > Table view');
}

/*
 * Use the filtered data to display the flat table.
 */
var tableView;
var tableView2;
var oTableTools;
function LoadTableView() {

    var personCount = new Array();
    var housesholdCount = new Array();
    var dateArray = new Array();
    var tableViewData = new Array();
    // Data preparation
    var newDate;
    var tempArray = new Array();
    var currentDate = '';
    var graphIndex = -1;

    var locValue;
    var catValue;
    var sexValue;
    var ageValue;
    var originValue;
    var sourceValue;
    var methodValue;
    var reportedByValue;

    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        // filters      
        if ($('#catListSelectedValue').html() == categoriesLabels[0] ||
            populationInfo.results.bindings[i]['type'].value == $('#catListSelectedValue').html()){

        if ($('#locListSelectedValue').html() == lblLoc0 ||
            $('#locListSelectedValue').html() == '-- Countries' ||
            $('#locListSelectedValue').html() == '-- Regions' ||
            $('#locListSelectedValue').html() == '-- Provinces' ||
            $('#locListSelectedValue').html() == '-- Camps' ||
            populationInfo.results.bindings[i]['countryDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['regionDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['provinceDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['campDisplay'].value == $('#locListSelectedValue').html()){
        if ($('#sexListSelectedValue').html() == lblSex ||
            populationInfo.results.bindings[i]['sexDisplay'].value == $('#sexListSelectedValue').html()){
        if ($('#ageListSelectedValue').html() == lblAge ||
            populationInfo.results.bindings[i]['ageDisplay'].value == $('#ageListSelectedValue').html()){
        if ($('#originListSelectedValue').html() == lblOri ||
            populationInfo.results.bindings[i]['nationalityDisplay'].value == $('#originListSelectedValue').html()){
        if ($('#sourceListSelectedValue').html() == lblSou ||
            populationInfo.results.bindings[i]['sourceDisplay'].value == $('#sourceListSelectedValue').html()){

            graphIndex++;
            personCount[graphIndex] = 0;
            housesholdCount[graphIndex] = 0;
            newDate = new Date();
            newDate.setUTCFullYear(dateArrayFull1[i].getFullYear());
            newDate.setUTCMonth(dateArrayFull1[i].getMonth());
            newDate.setUTCDate(dateArrayFull1[i].getDate());
            dateArray[graphIndex] = newDate;

            // PersonCounts and householdCounts
            if (populationInfo.results.bindings[i]['personCount'] != null) {
                personCount[graphIndex] = parseInt(personCount[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
            } else {
                personCount[graphIndex] = "N/A";
            }
            if (populationInfo.results.bindings[i]['housesholdCount'] != null) {
                housesholdCount[graphIndex] = parseInt(housesholdCount[graphIndex]) + parseInt(populationInfo.results.bindings[i]['housesholdCount'].value);
            } else {
                housesholdCount[graphIndex] = "N/A";
            }
        
            // Storing the result of the filtering for the table view.
            locValue = currentGeoZone;
            catValue = populationInfo.results.bindings[i]['type'].value;
            sexValue = populationInfo.results.bindings[i]['sexDisplay'].value;
            ageValue = populationInfo.results.bindings[i]['ageDisplay'].value.replace("Ages ", '');
            originValue = populationInfo.results.bindings[i]['nationalityDisplay'].value;
            sourceValue = populationInfo.results.bindings[i]['sourceDisplay'].value;
            methodValue = populationInfo.results.bindings[i]['methodDisplay'].value;
            reportedByValue = populationInfo.results.bindings[i]['reportedByDisplay'].value;

            // This date format works on IE8 and FF.
            tableViewData[graphIndex] = new Array(new XDate(Date.parse(dateArray[graphIndex])).toString("dd MMM yyyy"), catValue, personCount[graphIndex] * 1, housesholdCount[graphIndex] * 1, locValue, sexValue, ageValue, originValue, sourceValue, methodValue, reportedByValue);
        // end filters
        }
        }
        }
        }
        }
        }
    } // end for
    $('#tableView').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="tableDisplay"></table>' );

    var itemPerPage = 25;
    /*
    if (graphIndex > 3 * itemPerPage){
        itemPerPage = 25;
    }
    if (graphIndex > 3 * itemPerPage){
        itemPerPage = 50;
    }
    if (graphIndex > 3 * itemPerPage){
        itemPerPage = 100;
    }
*/

    tableView = $('#tableDisplay').dataTable( {
        "aaData": tableViewData,
        "iDisplayLength": itemPerPage,
        "aLengthMenu": [[25, 50, -1], [25, 50, "All"]],
        /*"sScrollY": "500px",
        "sScrollX": "100%",
        "sScrollXInner": "2000px",*/
        /*"bAutoWidth": false,*/
        "bPaginate": true,
        "aoColumns": [
            { "sTitle": "Date", "sClass": "w90" },
            { "sTitle": "Type of population", "sClass": "w180" },
            { "sTitle": "Person count", "sClass": "w45" },
            { "sTitle": "Household count", "sClass": "w65" },
            { "sTitle": "Location", "sClass": "w180" },
            { "sTitle": "Sex", "sClass": "w50" },
            { "sTitle": "Age", "sClass": "w50" },
            { "sTitle": "Nationality", "sClass": "w100" },
            { "sTitle": "Source", "sClass": "w180" },
            { "sTitle": "Method", "sClass": "w180" },
            { "sTitle": "Reported by", "sClass": "w60" }
        ],
        "sDom": 'T<"clear">lfrtip',
        /*"oTableTools": {
            "sSwfPath": "lib/datatables/tableTools/swf/copy_cvs_xls_pdf.swf"
        },*/
        "fnInitComplete": function() {
            this.fnAdjustColumnSizing(true);
        }
    } );  

    // Instanciation of the download bar.
    // Better this way to be able to clean them separately.
    oTableTools = new TableTools( tableView, {
        "sSwfPath": "lib/datatables/tableTools/swf/copy_csv_xls_pdf.swf" 
    } );
    //$("div[class='DTTT btn-group']").clone().appendTo('#tableViewBefore2');
    //$("div[class='DTTT btn-group']").hide();
    //$("#tableViewBefore2").empty();
    //$('#tableViewBefore2').append( oTableTools.dom.container );
    //$('.downloadBar').prepend( oTableTools.dom.container );

    // Text showing what is displayed per page
    $("#tableViewBefore1").empty();
    $('#tableDisplay_info').appendTo("#tableViewBefore1");

    // To choose how many records per page
    $("#tableViewBefore3").empty();
    $("#tableViewBefore2").empty();
    $('#tableDisplay_length').appendTo('#tableViewBefore3');
    $('#tableDisplay_filter').appendTo('#tableViewBefore2');

    // pagination
    $("#tableViewBefore4").empty();
    $("div[class='dataTables_paginate paging_bootstrap pagination']").appendTo("#tableViewBefore4");

    tableViewData = null;
    personCount = null;
    housesholdCount = null;
    dateArray = null;
    tempArray = null;
    oTableTools = null;
}
