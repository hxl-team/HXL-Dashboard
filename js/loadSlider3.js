/*
 * Use the filtered data to display the flat table.
 */
var tableView;
var tableView2;
var oTableTools;
function LoadTableView()
{
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
    
    var popMem = '';
    var dateMem = '';
    var sourceMem = '';
    var sourceMem1 = '';
    var sourceMem2 = '';
    var sourceMem3 = '';
    var simSource = 0;
                        
    for (var i = 0; i < graphData.length; i++) 
    {
        // TODO: log
        if (graphData[i]['personCount'].value == '') continue; 
        
        if (graphData[i]['sourceDisplay'] != undefined)
        {
            sourceValue = graphData[i]['sourceDisplay'].value;
        }
        else
        {
            sourceValue = 'N/A';
        }

        if (graphData[i + 1] != null &&
            graphData[i]['population'].value == graphData[i + 1]['population'].value &&
            graphData[i]['date'].value == graphData[i + 1]['date'].value)
        {
            simSource++;
            continue;
        }
        else if (simSource > 0)
        {

                if (simSource > 1)
            {
                sourceValue = graphData[i]['sourceDisplay'].value + ', ' + 
                                graphData[i - 1]['sourceDisplay'].value + ', ' + 
                                graphData[i - 2]['sourceDisplay'].value;
            }
            else
            {

                sourceValue = graphData[i]['sourceDisplay'].value + ', ' + 
                                graphData[i - 1]['sourceDisplay'].value;
            }
            simSource = 0;
        }
          
        // If ok, it means the agregation os sources is ok.
        if (i == graphData.length - 1 ||
            popMem != graphData[i + 1]['population'].value)
        {
            graphIndex++;
            personCount[graphIndex] = 0;
            housesholdCount[graphIndex] = 0;
            newDate = new Date();
            newDate.setUTCFullYear(dateArrayFull[i].getFullYear());
            newDate.setUTCMonth(dateArrayFull[i].getMonth());
            newDate.setUTCDate(dateArrayFull[i].getDate());
            dateArray[graphIndex] = newDate;

            // PersonCounts and householdCounts
            if (graphData[i]['personCount'] != null)
            {
                personCount[graphIndex] = parseInt(personCount[graphIndex]) + parseInt(graphData[i]['personCount'].value);
            } 
            else 
            {
                personCount[graphIndex] = "N/A";
            }
            if (graphData[i]['housesholdCount'] != null) 
            {
                housesholdCount[graphIndex] = parseInt(housesholdCount[graphIndex]) + parseInt(graphData[i]['housesholdCount'].value);
            } 
            else 
            {
                housesholdCount[graphIndex] = "N/A";
            }

            // Storing the result of the filtering for the table view.
            catValue = '';
            if (graphData[i]['populationType'] != undefined)
            {
                catValue = popTypeConverter[graphData[i]['populationType'].value];
            }
            else
            {
                catValue = $('#catListSelectedValue').html();
            }
            locValue = '';
            if (graphData[i]['locationDisplay'] != undefined)
            {
                locValue = graphData[i]['locationDisplay'].value;
            }
            sexValue = '';
            if (graphData[i]['sex'] != undefined)
            {
                sexValue = sexConverter[graphData[i]['sex'].value];
            }
            ageValue = '';
            if (graphData[i]['age'] != undefined)
            {
                ageValue = ageConverter[graphData[i]['age'].value].replace("Ages ", '');
            }
            originValue = '';
            if (graphData[i]['nationalityDisplay'] != undefined)
            {
                originValue = graphData[i]['nationalityDisplay'].value;
            }
            methodValue = 'undefined';
            if (graphData[i]['methodDisplay'] != undefined)
            {
                methodValue = graphData[i]['methodDisplay'].value;
            }
            reportedByValue = '';
            if (graphData[i]['reportedByDisplay'] != undefined)
            {
                reportedByValue = graphData[i]['reportedByDisplay'].value;
            }

        // This date format works on IE8 and FF.
            tableViewData[graphIndex] = new Array(new XDate(Date.parse(dateArray[graphIndex])).toString("dd MMM yyyy"), catValue, personCount[graphIndex] * 1, housesholdCount[graphIndex] * 1, locValue, sexValue, ageValue, originValue, sourceValue, methodValue, reportedByValue);
        }
       
    // console.log(tableViewData[graphIndex]);
    // console.log(graphIndex);
    
    } // end for
    $('#tableView').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="tableDisplay"></table>' );

    var itemPerPage = 20;

    tableView = $('#tableDisplay').dataTable( {
        "aaData": tableViewData,
        "iDisplayLength": itemPerPage,
        "aLengthMenu": [[20, 50, -1], [20, 50, "All"]],
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
        "oTableTools": {
            "sSwfPath": "lib/DataTables/TableTools/media/swf/copy_csv_xls_pdf.swf"
        },
        "fnInitComplete": function() {
            this.fnAdjustColumnSizing(true);
        }
    } );  

    // Instanciation of the download bar.
    // Better this way to be able to clean them separately.
    oTableTools = new TableTools( tableView, {
        "sSwfPath": "lib/DataTables/TableTools/media/swf/copy_csv_xls_pdf.swf" 
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
