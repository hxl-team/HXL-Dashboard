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

        if ($('#locListSelectedValue').html() == '* All camps' ||
            $('#locListSelectedValue').html() == '-- Countries' ||
            $('#locListSelectedValue').html() == '-- Regions' ||
            $('#locListSelectedValue').html() == '-- Provinces' ||
            $('#locListSelectedValue').html() == '-- Camps' ||
            populationInfo.results.bindings[i]['countryDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['regionDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['provinceDisplay'].value == $('#locListSelectedValue').html() ||
            populationInfo.results.bindings[i]['campDisplay'].value == $('#locListSelectedValue').html()){
        if ($('#sexListSelectedValue').html() == '* All sex categories' ||
            populationInfo.results.bindings[i]['sexDisplay'].value == $('#sexListSelectedValue').html()){
        if ($('#ageListSelectedValue').html() == '* All age groups' ||
            populationInfo.results.bindings[i]['ageDisplay'].value == $('#ageListSelectedValue').html()){
        if ($('#originListSelectedValue').html() == '* All origins' ||
            populationInfo.results.bindings[i]['nationalityDisplay'].value == $('#originListSelectedValue').html()){
        if ($('#sourceListSelectedValue').html() == '* All sources' ||
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

    var itemPerPage = 15;
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
        "aLengthMenu": [[15, 25, 50, -1], [15, 25, 50, "All"]],
        /*"sScrollY": "500px",
        "sScrollX": "100%",
        "sScrollXInner": "2000px",*/
        "bAutoWidth": false,
        "bPaginate": true,
        "aoColumns": [
            { "sTitle": "Date", "sClass": "w30" },
            { "sTitle": "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Type of population&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", "sClass": "w90" },
            { "sTitle": "Person count", "sClass": "w45" },
            { "sTitle": "Household count", "sClass": "w65" },
            { "sTitle": "Location", "sClass": "w50" },
            { "sTitle": "Sex", "sClass": "w30" },
            { "sTitle": "Age", "sClass": "w30" },
            { "sTitle": "Nationality", "sClass": "w50" },
            { "sTitle": "Source", "sClass": "w80" },
            { "sTitle": "Method", "sClass": "w80" },
            { "sTitle": "Reported by", "sClass": "w50" }
        ],
        "sDom": 'T<"clear">lfrtip',
        "oTableTools": {
            "sSwfPath": "datatables/tableTools/swf/copy_cvs_xls_pdf.swf"
            },
"fnInitComplete": function() {
this.fnAdjustColumnSizing(true);
}
    } );  

    tableView = null;
    tableViewData = null;
    personCount = null;
    housesholdCount = null;
    dateArray = null;
    tempArray = null;
}