
function initSparklinesCategories() {
    $(function() {
        
        // Display
        $("#catPopover1").html(categoriesInfo.results.bindings[0]['classLabel'].value);


        var el = document.getElementById("catPopover1");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++) {
            if (attrs.item(i).nodeName == 'data-content') {
                attrs.item(i).value = categoriesInfo.results.bindings[0]['classDefinition'].value
            }
            if (attrs.item(i).nodeName == 'data-original-title') {
                attrs.item(i).value = categoriesInfo.results.bindings[0]['classLabel'].value
            }
        }
    });
}

function initSparklines() {
    $(function() {
        
        //console.log('data first sparkline : ' + populationInfo.results.bindings[0]['personCount'].value);
        
        // Fabricating the data
        var personCount1 = new Array();
        var source1 = new Array();
        var method1 = new Array();
        var reportedBy1 = new Array();
        var totalPersonCount1 = 0;

        var graphIndex = 0;
        for (var i = 0; i < populationInfo.results.bindings.length; i++) {
            if (i % 2 == 0) {
                personCount1[graphIndex] = populationInfo.results.bindings[i]['personCount'].value;
            } else {
                personCount1[graphIndex] = personCount1[graphIndex] * 1 + populationInfo.results.bindings[i]['personCount'].value * 1;
                graphIndex++;
            }
            // Getting the total
            totalPersonCount1 = personCount1[graphIndex - 1];
            // Getting the source
            if ($.inArray(populationInfo.results.bindings[i]['sourceName'].value, source1) < 0) {
                source1.push(populationInfo.results.bindings[i]['sourceName'].value);
            };
            // Getting the method
            if ($.inArray(populationInfo.results.bindings[i]['method'].value, method1) < 0) {
                method1.push(populationInfo.results.bindings[i]['method'].value);
            };
            // Getting the reportedBy
            if ($.inArray(populationInfo.results.bindings[i]['reportedBy'].value, reportedBy1) < 0) {
                reportedBy1.push(populationInfo.results.bindings[i]['reportedBy'].value);
            };
        };

        // Display
        $("#totalPersonCount1").html(totalPersonCount1);
        $("#date1").html(populationInfo.results.bindings[populationInfo.results.bindings.length - 1]['date'].value);

        var el = document.getElementById("sourcePopover1");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++){
            if (attrs.item(i).nodeName == 'data-content') {
                for (var j = 0; j < source1.length; j++) {
                    attrs.item(i).value = source1[j] + ' ';
                }
            };
        }


        var el = document.getElementById("methodPopover1");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++){
            if (attrs.item(i).nodeName == 'data-content') {
                for (var j = 0; j < method1.length; j++) {
                    attrs.item(i).value = method1[j] + ' ';
                }
            };
        }

        var el = document.getElementById("reportedByPopover1");
        for (var i=0, attrs=el.attributes, l=attrs.length; i<l; i++){
            if (attrs.item(i).nodeName == 'data-content') {
                for (var j = 0; j < reportedBy1.length; j++) {
                    attrs.item(i).value = reportedBy1[j] + ' ';
                }
            };
        }

        //var personCount1 = [4000,4200,5000,7000,6800,4000,4640];
        $("#sparkline1").sparkline(personCount1, {
            type: 'line',
            width: '100',
            height: '50',
            lineWidth: 3,
            spotColor: '#0000bf',
            minSpotColor: '#0000bf',
            maxSpotColor: '#0000bf',
            highlightSpotColor: '#000000',
            highlightLineColor: '#000000',
            spotRadius: 3,
            chartRangeMin: 0});
    });
    
    $(function() {
        var personCount2 = [2000,2200,3000,5000,4800,2000,2315];
        $("#sparkline2").sparkline(personCount2, {
            type: 'line',
            width: '100',
            height: '50',
            lineWidth: 3,
            spotColor: '#0000bf',
            minSpotColor: '#0000bf',
            maxSpotColor: '#0000bf',
            highlightSpotColor: '#000000',
            highlightLineColor: '#000000',
            spotRadius: 3,
            chartRangeMin: 0});
    });
    
    $(function() {
        var personCount3 = [700,800,1100,2000,1800,2000,1515];
        $("#sparkline3").sparkline(personCount3, {
            type: 'line',
            width: '100',
            height: '50',
            lineWidth: 3,
            spotColor: '#0000bf',
            minSpotColor: '#0000bf',
            maxSpotColor: '#0000bf',
            highlightSpotColor: '#000000',
            highlightLineColor: '#000000',
            spotRadius: 3,
            chartRangeMin: 0});
    });
    
    $(function() {
        var personCount4 = [520,600,450,710,1200,1030,810];
        $("#sparkline4").sparkline(personCount4, {
            type: 'line',
            width: '120',
            height: '60',
            lineWidth: 3,
            spotColor: '#0000bf',
            minSpotColor: '#0000bf',
            maxSpotColor: '#0000bf',
            highlightSpotColor: '#000000',
            highlightLineColor: '#000000',
            spotRadius: 3,
            chartRangeMin: 0});
    });
}