// This script highlights all occurences of 'qry'. The variable 'qry' should
// be set before calling this script

alert("in highlight.js");

Course = class {
    constructor(Subj, Crse, days, times) {
        this.Subj = Subj;
		this.Crse = Crse;
        this.days = days;
        this.times = times;
    }
    print() {
		 // get unique starting and ending times
        var starts = Array.from(new Set(this.times['start']));
        var ends = Array.from(new Set(this.times['end']));
        if (starts.length == 1 && ends.length == 1) {
            console.log(this.Subj + "-" + this.Crse + ", " + this.days.join("") + " " + 
                    starts[0] + "-" + ends[0]);
        } else {
            console.log(this.Subj + "-" + this.Crse + ", days/times vary");
        }
        
	}
}


if (typeof(qry) == "undefined") {
    qry = "Connecticut";
} else if (qry == "" || qry == " ") {
    qry = "Connecticut";
}

//alert(" highlight.js with qry = " + qry);

console.log("highlighter is running with qry = " + qry + "...");

// get all HTML from the body
var html = document.getElementsByTagName('table');


// modify the below to only print out the information for matching
// courses

var commaCheck = ((qry.length - qry.replace(/,/g, "").length)+1);

//alert("You've got " + commaCheck + " courses"); 
/*
checks the amount of commas and adds one to represent the amount of courses if you would like
a variable amount of course inputs*/

var courseSet = [];

var inputCourse = qry.split(", ");

for (var i=0; i < commaCheck; i++){
	courseSet[i] = inputCourse[i];
}


var classCourse = [];

var classTimes = [commaCheck][2];

for (var i = 0; i <commaCheck; i++){
	classSet = courseSet[i].split(" ");
	console.log("got: " + classSet[0] + ", " + classSet[1]);
	classCourse[i] = new Array(2);
	classCourse[i][0] = classSet[0];
	classCourse[i][1] = classSet[1];
}

var COURSES = [];
var COURSE_NUM = 0;

// converts time x (hh:mm am/pm) into military/decimal form
// 2:15 pm --> 14.25
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



// start at 4th table (index 3) stop at 2nd to last table
for (tableIndex = 3; tableIndex < html.length-1; tableIndex++) {
  var table = html[tableIndex];  // index 14 is CS
  var rows = table.rows;

  for (var i = 3; i < rows.length; i++) {
	  
	for(var j = 0; j < commaCheck; j++){
	    
		
		if (rows[i].cells[3].innerText == classCourse[j][0] && rows[i].cells[4].innerText == classCourse[j][1]) {
		var subj = rows[i].cells[3].innerText;
		var crse = rows[i].cells[4].innerText;
		var dys = rows[i].cells[10].innerText;
		var tme = rows[i].cells[11].innerText;
		// do something similar to pull out the days/times

		//console.log("Course: " + subj + "-" + crse + "  Days: " + dys + "  Time: " + tme);
		
		//This will split the time and convert it into military and decimal
		//i.e. it will turn 4:30 PM into 16.5.
		
		var timeTable = tme.split("-");
		var start = convertTime(timeTable[0]);
		var end = convertTime(timeTable[1]);
      
        days = dys.split("");
        tme = {"start": [start], "end": [end]};

		COURSES[COURSE_NUM] = new Course(subj, crse, days, tme) 
		COURSE_NUM++;
			
		} // end if statement
		
	} //end inner inner for loop
	  
  } // end inner for loop
	
} // end  outer for loop


console.log("COURSES FOUND: " + COURSE_NUM);

var newWindow = window.open("", null);
newWindow.document.write("<style>");
newWindow.document.write(".evenRow {");
newWindow.document.write("  background-color:lightgray;");
newWindow.document.write("}");
newWindow.document.write("</style>");


newWindow.document.write("<h2> Course found </h2>");
newWindow.document.write("<table>");
//newWindow.document.write("<tr id=\"oddRow\"">);
newWindow.document.write("<th>Subj</th>");
newWindow.document.write("<th>Crse</th>");
newWindow.document.write("<th>Days</th>");
newWindow.document.write("<th>Start Times</th>");
newWindow.document.write("<th>End Times</th>");
newWindow.document.write("</tr>");
for (var i = 0; i < COURSE_NUM; i++) {
	
	//newWindow.document.write("<tr>");
	
	if (i % 2 == 0){
		newWindow.document.write("<tr class=\"evenRow\">");
	}
	else {
		newWindow.document.write("<tr class=\"oddRow\">");
	}
	//This will alternate the color of the table rows for easier readability
	
		newWindow.document.write("<td>"+COURSES[i].Subj+"</td>");
		newWindow.document.write("<td>"+COURSES[i].Crse+"</td>");
		newWindow.document.write("<td>"+COURSES[i].days+"</td>");
        newWindow.document.write("<td>"+COURSES[i].times["start"]+"</td>");
		newWindow.document.write("<td>"+COURSES[i].times["end"]+"</td>");

        newWindow.document.write("</tr>");
	}
newWindow.document.write("</table>");




