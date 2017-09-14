// functions.js - classes and functions used by schedule.js


/************************************************************
 * convertTime: converts time 'x' of form 'hh:mm am/pm' into 
 * military/decimal form, ex: 2:15 pm --> 14.25
 ***********************************************************/
function convertTime(x) {

   // split x into min and hour
	x = x.split(":");
	var hour = x[0];
    var min = x[1];

    var PM = min.search("pm") > 0;
    hour = parseInt(hour);
    min = parseInt(min);

    // convert to military time
    if (hour < 12 && PM ) {
        hour += 12;
    } else if (hour == 12 && !PM) {
        hour -= 12;
    }
	min = min/60;
    return hour + min;
}



/************************************************************
 * Course object used to store course information
 * c1 = new Course("CSC", "210", "MWF", "09:00 am-09:50 pm") 
 *
 * TO DO: add CRN; write function to add another day/times 
 *        to current Course object; modify print() accordingly
 ************************************************************/
Course = class {
    constructor(Subj, Crse, strDays, strTimes) {
        this.Subj = Subj;
		this.Crse = Crse;
        this.strDays = strDays;
        this.strTimes = strTimes;

        // get day, startTime and endTime arrays
        
        // dayStr is of form MWF
        this.days = strDays.split("");   
            
        // get start and end times from strTimes in format
        // 09:00 am - 09:50 am
		var timeTable = strTimes.split("-");
		var start = convertTime(timeTable[0]);
		var end = convertTime(timeTable[1]);

        var startArray = new Array(this.days.length);
        startArray.fill(start);

        var endArray = new Array(this.days.length);
        endArray.fill(end);
            
        this.startTimes = startArray;
        this.endTimes = endArray; 

    }
    print() {
            console.log(this.Subj + "-" + this.Crse + this.strDays + "," + this.strTimes);
        
	}
}


function inRange(x,a,b) {
    return (a <= x && x <= b);
}

function hasConflict(c1,c2) {
    for (var i = 0; i < c1.days.length; i++) {
        for (var j = 0; j < c2.days.length; j++) {
            if (c1.days[i] == c2.days[j]) {
                start1 = c1.startTimes[i];
                end1 = c1.endTimes[i];
                start2 = c2.startTimes[j];
                end2 = c2.endTimes[j];
                
                if (inRange(start1, start2, end2)) {
                    return true;
                } else if (inRange(end1, start2, end2)) {
                    return true;
                } else if (inRange(start2, start1, end1)) {
                    return true;
                } else if (inRange(end2, start1, end1)) {
                    return true;
                }

            }
        }
    }
    return false; 
}



// create an index table for combinations when there are 
//      arr[i] objects 
// Example: combinations([2,3,1]  choose 2 x 3 x 1 objects
var combinations = function(arr) {
    var n = 1;
    for (i = 0; i < arr.length; i++) {
        n*= arr[i];
    }

    console.log("length = " + arr.length);
    var combs = [];
    for (i = 0; i < n; i++) {
        combs[i] = new Array(arr.length);
    }

    var column = arr.length;
    var numReps = 1;
    while (column >0) {

        var value = 0;
        for (i = 1; i <= n; i++) {

            if ((i-1)%numReps == 0) {
                value++;
                if (value > arr[column-1]) {
                    value = 1;
                }
            }
            combs[i-1][column-1] = value-1;
            
        }
        
        numReps *= arr[column-1];
        column--;
    }

    return combs;
}

// print 2D array
var print2D = function(x) {
    for (i = 0; i < x.length; i++) {
        console.log(x[i]);
    }
}
