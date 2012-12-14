
/*
 * Creates an associative array in which indexes are all the known dates.
 */
function matrixCreation(dataArray, typeFilter)
{
    var result = new Array();
    var currentDate = '';
    // For each unique day, an index is created in dateArray
    for (var i = 0; i < dataArray.results.bindings.length; i++)
    {
        if (typeFilter != null &&
            populationInfo.results.bindings[i]['populationType'].value != typeFilter) 
        {
            continue;
        }
        
        // use the first 10 caracters of a date following the pattern "yyyy-mm-dd".
        // Otherwise, consider using something like value.split(" ")[0]
        if (currentDate != dataArray.results.bindings[i]['date'].value.substr(0,10))
        {
            currentDate = dataArray.results.bindings[i]['date'].value.substr(0,10);
            result[currentDate] = '';
        }
    }
    return result;
}

/*
 * For each day, it places the data at their corresponding place in an array that 
 * becomes a column attached to the corresponding place in the general dateArray.
 */
function dataDroping(dateArray, rawData)
{
    // For each day, we look for the corresponding personCounts
    var tempPop = new Array();
    var popIndex = 0;
    for (var currentDate in dateArray)
    {
        var dailyPopCounts = new Array();
        
        // For each known date, it catches new population and its count to pur it in the correct place of the matrix
        for (var i = 0; i < rawData.results.bindings.length; i++)
        {
            if (currentDate == rawData.results.bindings[i]['date'].value.substr(0,10))
            {
                var alreadyKnownId = -1;
                for (var j = 0; j < tempPop.length; j++)
                {
                    if (tempPop[j] == rawData.results.bindings[i]['population'].value)
                    {
                        alreadyKnownId = j;
                        break;
                    }
                }
                if (alreadyKnownId != -1)
                {
                    tempPop[alreadyKnownId] = rawData.results.bindings[i]['population'].value;
                    dailyPopCounts[alreadyKnownId] = rawData.results.bindings[i]['personCount'].value;
                } 
                else
                {
                    tempPop[popIndex] = rawData.results.bindings[i]['population'].value;
                    dailyPopCounts[popIndex] = rawData.results.bindings[i]['personCount'].value;
                    
                    popIndex++;
                }
            }
        }        
        dateArray[currentDate] = dailyPopCounts;
    }
    return popIndex;
}

/*
 * Parsing the array by location for each date and filling gaps with
 * previous counts to get a continuous array of data. 
 */
function fillingTheGaps(dateArray, nbrOfPops)
{
    var limit = 40;
    var count = 0;
    for (var popIndex = 0; popIndex < nbrOfPops; popIndex++) 
    {
        count++;
        var currentCount = 0;
        for (var dateKey in dateArray)
        {
            if (dateArray[dateKey][popIndex] != undefined)
            {
                currentCount = dateArray[dateKey][popIndex];
            }
            else
            {
                dateArray[dateKey][popIndex] = currentCount;
            }
        }
    }
}

/*
 * Gives back an array containing the sums of columns.
 */ 
function getSumPerDay(timeReference)
{
    var result = new Array();
    var tempIndex = 0;
    for (var key in timeReference)
    {
        var tempSum = 0;
        for (var key2 in timeReference[key])
        {
            tempSum = parseInt(tempSum) + parseInt(timeReference[key][key2]);
        }
        result[tempIndex] = tempSum;
        tempIndex++;
    }
    return result;
}

/*
 * Deprecated in favour of linearizeTimeline.
 * Gives back an array containing the missing gap dates.
 * The newly created indexes contains the last data for a given population.
 */ 
function regularizeTimeline(timeReference, rawData)
{
    var sumId = 0;
    var oldId = 0;
    var previousDate;
    var previousValue;
    
    var regularResult = Array();
    for (var currentDate in timeReference)
    {
        //console.log(currentDate + " " + dateArraySum_refugees[oldId]);
        //console.log(dateArraySum_refugees[sumId]);
        
        if (oldId == 0)
        {
            regularResult[sumId] = rawData[sumId];
        }
        else
        {
            var between = daysBetween(previousDate, currentDate);
            
            //console.log("between: " + between);
            
            for (var i = 0; i <= between; i++)
            {
                sumId++;
                //console.log("sumId" + sumId);
                regularResult[sumId] = previousValue;
            }
        }
        previousDate = currentDate;
        previousValue = rawData[oldId];
        oldId++;
    }
    regularResult[sumId] = rawData[oldId - 1]; // the last value
    
    return regularResult;   
}

/*
 * Gives back an array containing the missing gap dates.
 * The newly created indexes contains the last data for a given population.
 * The added data must show a linear progression.
 */ 
function linearizeTimeline(timeReference, rawData)
{
    var sumId = 0;
    var oldId = 0;
    var previousDate;
    var previousValue;
    
    var result = Array();
    for (var currentDate in timeReference)
    {
        //console.log(currentDate + " " + dateArraySum_refugees[oldId]);
        //console.log(dateArraySum_refugees[sumId]);
        
        if (oldId == 0)
        {
            result[sumId] = rawData[oldId]; // the first value
        }
        else
        {
            var nbrDaysBetween = daysBetween(previousDate, currentDate);
            var currentValue = rawData[oldId];
            var valueBetween = currentValue - previousValue;
            var lineraStep = Math.round(valueBetween / nbrDaysBetween);
            /*
            console.log("------");
            console.log("previousDate: " + previousDate);
            console.log("currentDate: " + currentDate);
            console.log("previousValue: " + previousValue);
            console.log("currentValue: " + currentValue);
            console.log("-");
            console.log("value between: " + valueBetween);
            console.log("days between: " + nbrDaysBetween);
            console.log("-");
            console.log("linera step: " + lineraStep);
            */
            var linearPreviousValue = previousValue;
            for (var i = 0; i <= nbrDaysBetween; i++)
            {
                sumId++;
                //console.log("sumId" + sumId);
                result[sumId] = linearPreviousValue;
                linearPreviousValue = linearPreviousValue + lineraStep;
            }
        }
        previousDate = currentDate;
        previousValue = rawData[oldId];
        oldId++;
    }
    //console.log("-------------------------------------------------");
    //console.log(result[sumId]);
    result[sumId] = rawData[oldId - 1]; // the last value
    // before the last value (just a hack so that we can see the latest value
    // on the compacted sparkline)
    result[sumId - 1] = rawData[oldId - 1]; 
    //console.log(result[sumId]);
    
    return result;
}

/*
 * Gives back a clean date to display following a certain format.
 */ 
function makeCleanDate(rawData)
{
    var date = rawData.results.bindings[rawData.results.bindings.length - 1]['date'].value;
    dateSplit = date.split("-");
    myXdate = new XDate(dateSplit[0], dateSplit[1] - 1, dateSplit[2].split(" ")[0]);
        
    return myXdate.toString("dd MMM yyyy");   
}

/*
 * Tool for adding a comma for thousands on the row figures.
 */
function numberWithCommas(x)
{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*
 * Tool for getting the number of days between two days.
 * The date must be following the format "2012-02-29".
 * the result is inacurate when paasing the end of a month.
 */
function daysBetween(day1, day2)
{
    var day1Split = day1.split("-");
    var day2Split = day2.split("-");

    var d1 = new XDate(day1Split[0], day1Split[1], day1Split[2]);
    var d2 = new XDate(day2Split[0], day2Split[1], day2Split[2]);

    //console.log(day1);
    //console.log(day2); 
    //console.log(d1.diffDays(d2) - 1);

    return d1.diffDays(d2) - 1;
}