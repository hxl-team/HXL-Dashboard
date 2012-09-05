
function initSparklinesCategories(categoriesData) {
    $(function() {
        
        // Display
        // Category and its popover
        $("#catPopover1").html(categoriesData.results.bindings[0]['classLabel'].value);
        $("#catPopover2").html(categoriesData.results.bindings[0]['subClassLabel'].value);
        $("#catPopover3").html(categoriesData.results.bindings[2]['subClassLabel'].value);
        $("#catPopover4").html(categoriesData.results.bindings[1]['subClassLabel'].value);

        var el = document.getElementById("catPopover1");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesData.results.bindings[0]['classDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesData.results.bindings[0]['classLabel'].value
            }
        }

        var el = document.getElementById("catPopover2");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesData.results.bindings[0]['subClassDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesData.results.bindings[0]['subClassLabel'].value
            }
        }

        var el = document.getElementById("catPopover3");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesData.results.bindings[2]['subClassDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesData.results.bindings[2]['subClassLabel'].value
            }
        }

        var el = document.getElementById("catPopover4");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesData.results.bindings[1]['subClassDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesData.results.bindings[1]['subClassLabel'].value
            }
        }
    });
}

function initSparklines() {
    $(function() {
        
        // Fabricating the data
        var count1 = new Array();
        var lastCount1 = 0;
        var date1 = '';
        var source1 = new Array();
        var method1 = new Array();
        var reportedBy1 = new Array();
        var count2 = new Array();
        var lastCount2 = 0;
        var date2 = '';
        var source2 = new Array();
        var method2 = new Array();
        var reportedBy2 = new Array();
        var count3 = new Array();
        var lastCount3 = 0;
        var date3 = '';
        var source3 = new Array();
        var method3 = new Array();
        var reportedBy3 = new Array();
        var count4 = new Array();
        var lastCount4 = 0;
        var date4 = '';
        var source4 = new Array();
        var method4 = new Array();
        var reportedBy4 = new Array();

        var currentDate = '';
        var graphIndex = -1;
        for (var i = 0; i < populationInfo.results.bindings.length; i++) {

            // parsing by date
            if (currentDate != populationInfo.results.bindings[i]['date'].value) {
                currentDate = populationInfo.results.bindings[i]['date'].value;
                graphIndex++;
                count1[graphIndex] = 0;
                count2[graphIndex] = 0;
                count3[graphIndex] = 0;
                count4[graphIndex] = 0;
            }

            switch(populationInfo.results.bindings[i]['type'].value) 
            {
                case "http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers":
                    date2 = populationInfo.results.bindings[i]['date'].value;
                    break;
                case "http://hxl.humanitarianresponse.info/ns/#IDP":
                    date3 = populationInfo.results.bindings[i]['date'].value;
                    break;
                case "http://hxl.humanitarianresponse.info/ns/#Others":
                    date4 = populationInfo.results.bindings[i]['date'].value;
                    break;
            }
                
            // Getting the main graph count and date, the main source, method and reported by
            count1[graphIndex] = parseInt(count1[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
            date1 = populationInfo.results.bindings[i]['date'].value;
            if ($.inArray(populationInfo.results.bindings[i]['sourceName'].value, source1) < 0) {
                source1.push(populationInfo.results.bindings[i]['sourceName'].value);
            }
            if ($.inArray(populationInfo.results.bindings[i]['method'].value, method1) < 0) {
                method1.push(populationInfo.results.bindings[i]['method'].value);
            }
            if ($.inArray(populationInfo.results.bindings[i]['reportedBy'].value, reportedBy1) < 0) {
                reportedBy1.push(populationInfo.results.bindings[i]['reportedBy'].value);
            }

            // Getting the graph count, the source, the method and the reported by.
            switch(populationInfo.results.bindings[i]['type'].value) 
            {
                case "http://hxl.humanitarianresponse.info/ns/#RefugeesAsylumSeekers":
                    count2[graphIndex] = parseInt(count2[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                    if ($.inArray(populationInfo.results.bindings[i]['sourceName'].value, source2) < 0) {
                        source2.push(populationInfo.results.bindings[i]['sourceName'].value);
                    }
                    if ($.inArray(populationInfo.results.bindings[i]['method'].value, method2) < 0) {
                        method2.push(populationInfo.results.bindings[i]['method'].value);
                    }
                    if ($.inArray(populationInfo.results.bindings[i]['reportedBy'].value, reportedBy2) < 0) {
                        reportedBy2.push(populationInfo.results.bindings[i]['reportedBy'].value);
                    }
                    break;
                case "http://hxl.humanitarianresponse.info/ns/#IDP":
                    count3[graphIndex] = parseInt(count3[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                    if ($.inArray(populationInfo.results.bindings[i]['sourceName'].value, source3) < 0) {
                        source3.push(populationInfo.results.bindings[i]['sourceName'].value);
                    }
                    if ($.inArray(populationInfo.results.bindings[i]['method'].value, method3) < 0) {
                        method3.push(populationInfo.results.bindings[i]['method'].value);
                    }
                    if ($.inArray(populationInfo.results.bindings[i]['reportedBy'].value, reportedBy3) < 0) {
                        reportedBy3.push(populationInfo.results.bindings[i]['reportedBy'].value);
                    }
                    break;
                case "http://hxl.humanitarianresponse.info/ns/#Others":
                    count4[graphIndex] = parseInt(count4[graphIndex]) + parseInt(populationInfo.results.bindings[i]['personCount'].value);
                    if ($.inArray(populationInfo.results.bindings[i]['sourceName'].value, source4) < 0) {
                        source4.push(populationInfo.results.bindings[i]['sourceName'].value);
                    }
                    if ($.inArray(populationInfo.results.bindings[i]['method'].value, method4) < 0) {
                        method4.push(populationInfo.results.bindings[i]['method'].value);
                    }
                    if ($.inArray(populationInfo.results.bindings[i]['reportedBy'].value, reportedBy4) < 0) {
                        reportedBy4.push(populationInfo.results.bindings[i]['reportedBy'].value);
                    }
                    break;
            }

            // Getting the big last count
            lastCount1 = count1[graphIndex];
            lastCount2 = count2[graphIndex];
            lastCount3 = count3[graphIndex];
            lastCount4 = count4[graphIndex];

        } // end loop

        // Display
        // Big count
        $("#lastCount1").html(numberWithCommas(lastCount1));
        $("#lastCount2").html(numberWithCommas(lastCount2));
        $("#lastCount3").html(numberWithCommas(lastCount3));
        $("#lastCount4").html(numberWithCommas(lastCount4));

        // Date
        dsplit1 = date1.split("-");
        dsplit2 = date2.split("-");
        dsplit3 = date3.split("-");
        dsplit4 = date4.split("-");
        
        dateOk1 = new XDate(dsplit1[0], dsplit1[1], dsplit1[2]);
        dateOk2 = new XDate(dsplit2[0], dsplit2[1], dsplit2[2]);
        dateOk3 = new XDate(dsplit3[0], dsplit3[1], dsplit3[2]);
        dateOk4 = new XDate(dsplit4[0], dsplit4[1], dsplit4[2]);

        $("#date1").html(dateOk1.toString("dd MMM yyyy"));
        $("#date2").html(dateOk2.toString("dd MMM yyyy"));
        $("#date3").html(dateOk3.toString("dd MMM yyyy"));
        $("#date4").html(dateOk4.toString("dd MMM yyyy"));

        // Popups Info
        var infoPop1 = document.getElementById("infoPopover1");
        for (var i=0, attrs=infoPop1.attributes, l=attrs.length; i<l; i++){
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = 'Source: ';
                for (var j = 0; j < source1.length; j++) {
                    attrs.item(i).value += source1[j] + ' ';
                }
                attrs.item(i).value += '<br />Method: ';
                for (var j = 0; j < method1.length; j++) {
                    attrs.item(i).value += method1[j] + ' ';
                }
                attrs.item(i).value += '<br />Reported by: ';
                for (var j = 0; j < reportedBy1.length; j++) {
                    attrs.item(i).value += reportedBy1[j] + ' ';
                }
            };
        }

        var infoPop2 = document.getElementById("infoPopover2");
        for (var i=0, attrs=infoPop2.attributes, l=attrs.length; i<l; i++){
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = 'Source: ';
                for (var j = 0; j < source1.length; j++) {
                    attrs.item(i).value += source2[j] + ' ';
                }
                attrs.item(i).value += '<br />Method: ';
                for (var j = 0; j < method2.length; j++) {
                    attrs.item(i).value += method2[j] + ' ';
                }
                attrs.item(i).value += '<br />Reported by: ';
                for (var j = 0; j < reportedBy2.length; j++) {
                    attrs.item(i).value += reportedBy2[j] + ' ';
                }
            };
        }

        var infoPop3 = document.getElementById("infoPopover3");
        for (var i=0, attrs=infoPop3.attributes, l=attrs.length; i<l; i++){
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = 'Source: ';
                for (var j = 0; j < source3.length; j++) {
                    attrs.item(i).value += source3[j] + ' ';
                }
                attrs.item(i).value += '<br />Method: ';
                for (var j = 0; j < method3.length; j++) {
                    attrs.item(i).value += method3[j] + ' ';
                }
                attrs.item(i).value += '<br />Reported by: ';
                for (var j = 0; j < reportedBy3.length; j++) {
                    attrs.item(i).value += reportedBy3[j] + ' ';
                }
            };
        }

        var infoPop4 = document.getElementById("infoPopover4");
        for (var i=0, attrs=infoPop4.attributes, l=attrs.length; i<l; i++){
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = 'Source: ';
                for (var j = 0; j < source4.length; j++) {
                    attrs.item(i).value += source4[j] + ' ';
                }
                attrs.item(i).value += '<br />Method: ';
                for (var j = 0; j < method4.length; j++) {
                    attrs.item(i).value += method4[j] + ' ';
                }
                attrs.item(i).value += '<br />Reported by: ';
                for (var j = 0; j < reportedBy4.length; j++) {
                    attrs.item(i).value += reportedBy4[j] + ' ';
                }
            };
        }

        // Instanciation
        $("#sparkline1").sparkline(count1, {
            type: 'line',
            width: '80',
            height: '34',
            lineWidth: 2,
            lineColor: '#6699cc',
            fillColor: '#F5F5F5',
            spotColor: '#046CB6',
            minSpotColor: '',
            maxSpotColor: '',
            highlightSpotColor: '#000000',
            highlightLineColor: '#000000',
            spotRadius: 2,
            chartRangeMin: 0});

        $("#sparkline2").sparkline(count2, {
            type: 'line',
            width: '80',
            height: '34',
            lineWidth: 2,
            lineColor: '#6699cc',
            fillColor: '#F5F5F5',
            spotColor: '#046CB6',
            minSpotColor: '',
            maxSpotColor: '',
            highlightSpotColor: '#000000',
            highlightLineColor: '#000000',
            spotRadius: 2,
            chartRangeMin: 0});

        $("#sparkline3").sparkline(count3, {
            type: 'line',
            width: '80',
            height: '34',
            lineWidth: 2,
            lineColor: '#6699cc',
            fillColor: '#F5F5F5',
            spotColor: '#046CB6',
            minSpotColor: '',
            maxSpotColor: '',
            highlightSpotColor: '#000000',
            highlightLineColor: '#000000',
            spotRadius: 2,
            chartRangeMin: 0});

        $("#sparkline4").sparkline(count4, {
            type: 'line',
            width: '80',
            height: '34',
            lineWidth: 2,
            lineColor: '#6699cc',
            fillColor: '#F5F5F5',
            spotColor: '#046CB6',
            minSpotColor: '',
            maxSpotColor: '',
            highlightSpotColor: '#000000',
            highlightLineColor: '#000000',
            spotRadius: 2,
            chartRangeMin: 0});
    });
}