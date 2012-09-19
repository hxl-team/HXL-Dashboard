
/*
 * Use the filtered data to display the flat table.
 */
function LoadTableView() {

    var personCount = new Array();
    var housesholdCount = new Array();
    var dateArray = new Array();
    var data = new google.visualization.DataTable();
    // Data preparation
    //var personCountDtl = 0;
    var newDate;
    var tempArray = new Array();
    var currentDate = '';
    var graphIndex = -1;
    for (var i = 0; i < populationInfo.results.bindings.length; i++) {
        // filters        
        if ($('select#catForm').val() == categoriesLabels[0] ||
            populationInfo.results.bindings[i]['type'].value == $('select#catForm').val()){
        if (locChoice == 0  ||
            populationInfo.results.bindings[i]['countryPCode'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['regionDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['provinceDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['departementDisplay'].value == $('select#locForm').val() ||
            populationInfo.results.bindings[i]['campDisplay'].value == $('select#locForm').val()){
        if (sexChoice == 0  ||
            populationInfo.results.bindings[i]['sexDisplay'].value == $('select#sexForm').val()){
        if (ageChoice == 0  ||
            populationInfo.results.bindings[i]['ageDisplay'].value == $('select#ageForm').val()){
        if (originChoice == 0  ||
            populationInfo.results.bindings[i]['nationalityPCode'].value == $('select#originForm').val()){
        if (sourceChoice == 0  ||
            populationInfo.results.bindings[i]['sourceDisplay'].value == $('select#sourceForm').val()){

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
            var locValue = currentGeoZone;
            var catValue = populationInfo.results.bindings[i]['type'].value;
            var sexValue = populationInfo.results.bindings[i]['sexDisplay'].value;
            var ageValue = populationInfo.results.bindings[i]['ageDisplay'].value.replace("Ages ", '');
            var originValue = populationInfo.results.bindings[i]['nationalityDisplay'].value;
            var sourceValue = populationInfo.results.bindings[i]['sourceDisplay'].value;
            var methodValue = populationInfo.results.bindings[i]['methodDisplay'].value;
            var reportedByValue = populationInfo.results.bindings[i]['reportedByDisplay'].value;

            // This date format works on IE8 and FF.
            tableViewData[graphIndex] = new Array(new XDate(Date.parse(dateArray[graphIndex])).toString("dd MMM yyyy"), catValue, personCount[graphIndex] * 1, housesholdCount[graphIndex] * 1, locValue, sexValue, ageValue, originValue, sourceValue, methodValue, reportedByValue);
console.log(reportedByValue);
        // end filters
        }
        }
        }
        }
        }
        }
    } // end for
    $('#tableView').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="tableDisplay"></table>' );

    var itemPerPage = 10;
    if (graphIndex > itemPerPage){
        itemPerPage = 25;
    }
    if (graphIndex > itemPerPage){
        itemPerPage = 50;
    }
    if (graphIndex > itemPerPage){
        itemPerPage = 100;
    }

    var tableV = $('#tableDisplay').dataTable( { 
        "iDisplayLength": itemPerPage,
        "aaData": tableViewData,
        "aoColumns": [
            { "sTitle": "Date" },
            { "sTitle": "Type of population" },
            { "sTitle": "Person count" },
            { "sTitle": "Household count" },
            { "sTitle": "Location" },
            { "sTitle": "Sex" },
            { "sTitle": "Age" },
            { "sTitle": "Nationality" },
            { "sTitle": "Source" },
            { "sTitle": "Method" },
            { "sTitle": "Reported by" }
        ],
        "sDom": 'T<"clear">lfrtip',
        "oTableTools": {
            "sSwfPath": "datatables/tableTools/swf/copy_csv_xls_pdf.swf"
        },
        "sScrollX": "100%",
        "sScrollXInner": "150%",
        "bScrollCollapse": true,
    } );  
}