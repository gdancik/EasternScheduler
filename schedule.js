// This script highlights all occurences of 'qry'. The variable 'qry' should
// be set before calling this script


alert("in schedule.js");

if (typeof(qry) == "undefined") {
    alert("Error: qry is not set");
} 

console.log("scheduler is running with qry = " + qry + "...");

// get all HTML from the body
var html = document.getElementsByTagName('table');


// determine the number of courses entered
var commaCheck = ((qry.length - qry.replace(/,/g, "").length)+1);

//  
var courseSet = [];

var courses = qry.split(", ");

var COURSES = [];
var COURSE_NUM = 0;


// start at 4th table (index 3) stop at 2nd to last table
for (tableIndex = 3; tableIndex < html.length-1; tableIndex++) {
  var table = html[tableIndex];  // index 14 is CS
  var rows = table.rows;

  for (var i = 3; i < rows.length; i++) {
	  
	for(var j = 0; j < courses.length; j++){

        // get subject and course number (e.g., from CSC 210)    
        var thisCourse = courses[j].split(" "); 
	
        // check for match between subject and crse number     
		if (rows[i].cells[3].innerText == thisCourse[0] && rows[i].cells[4].innerText == thisCourse[1]) {
    		var subj = rows[i].cells[3].innerText;
	    	var crse = rows[i].cells[4].innerText;
    		var dys = rows[i].cells[10].innerText;
    		var tme = rows[i].cells[11].innerText;
            
            // get start and end times
		    var timeTable = tme.split("-");
		    var start = convertTime(timeTable[0]);
		    var end = convertTime(timeTable[1]);
            
            // we need arrays days, start, and end times
            days = dys.split("");

            startArray = new Array(days.length);
            startArray.fill(start);

            endArray = new Array(days.length);
            endArray.fill(end);

      
            tme = {"start": [startArray], "end": [endArray]};

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


newWindow.document.write("<h2> Courses found </h2>");
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




