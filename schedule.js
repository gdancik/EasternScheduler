// This script highlights all occurences of 'qry'. The variable 'qry' should
// be set before calling this script

// TO DO: extract CRN add to Course object; modify code to work 
// for courses offered multiple times over different days

alert("in schedule.js");

if (typeof(qry) == "undefined") {
    alert("Error: qry is not set");
} 

console.log("scheduler is running with qry = " + qry + "...");

// get all HTML from the body
var html = document.getElementsByTagName('table');


// determine the number of courses entered
var commaCheck = ((qry.length - qry.replace(/,/g, "").length)+1);

var courses = qry.split(", ");

// COURSES is array of all courses
var COURSES = [];
var COURSE_NUM = 0;

// courseArray is array of course lists, e.g., one element for all 
// CSC 210 courses, one element for all MAT 243 courses, etc
// initialize as a collection of blank arrays for each requested course
var courseArray = [];
for (var j = 0; j < courses.length; j++) {
    courseArray[j] = [];
}

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

            var crn = rows[i].cells[2].innerText;
            var subj = rows[i].cells[3].innerText;
	    	var crse = rows[i].cells[4].innerText;
    		var dys = rows[i].cells[10].innerText;
    		var tme = rows[i].cells[11].innerText;

		    COURSES[COURSE_NUM] = new Course(crn, subj, crse, dys, tme) 
		    COURSE_NUM++;

            courseArray[j].push( new Course(crn, subj, crse, dys, tme)   );

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
newWindow.document.write("<th>CRN</th>");
newWindow.document.write("<th>Subj</th>");
newWindow.document.write("<th>Crse</th>");
newWindow.document.write("<th>Days</th>");
newWindow.document.write("<th>Time</th>");
newWindow.document.write("</tr>");
for (var i = 0; i < COURSE_NUM; i++) {
	
	//newWindow.document.write("<tr>");

    // add a 'blank' line between courses
    if (i> 0 && (COURSES[i].Subj != COURSES[i-1].Subj || COURSES[i].Crse != COURSES[i-1].Crse)) {
        newWindow.document.write("<tr style = 'background-color: black'><td colspan=5> </td></tr>");
    }

	if (i % 2 == 0){
		newWindow.document.write("<tr class=\"evenRow\">");
	}
	else {
		newWindow.document.write("<tr class=\"oddRow\">");
	}
	//This will alternate the color of the table rows for easier readability
	
		newWindow.document.write("<td>"+COURSES[i].CRN+"</td>");
		newWindow.document.write("<td>"+COURSES[i].Subj+"</td>");
		newWindow.document.write("<td>"+COURSES[i].Crse+"</td>");
		newWindow.document.write("<td>"+COURSES[i].strDays+"</td>");
        newWindow.document.write("<td>"+COURSES[i].strTimes+"</td>");

        newWindow.document.write("</tr>");
	}
newWindow.document.write("</table>");
newWindow.document.write("<br/><br/>");

newWindow.document.write("<h1> Available Schedules </h1>");
newWindow.document.write("<p> Coming soon... </p>");


// output course information to console
console.log("");
console.log("");


// course array with valid courses only
var courseArray2 = [];
for (i = 0; i < courseArray.length; i++) {
    if (courseArray[i].length == 0) {
        newWindow.alert("The course " + courses[i] + " was not found");
    } else {
        courseArray2.push(courseArray[i]);
    } 
}


lengths = [];
for (i = 0; i < courseArray2.length; i++) {
    lengths.push(courseArray2[i].length);
}

combs = combinations(lengths);

//console.log("combinations = ");
//print2D(combs);

// for each combination
for (i = 0; i < combs.length; i++) {
    
    var schedule1 = [];
    // create schedule for given combination
    for (j = 0; j < combs[i].length; j++) {
        schedule1.push(courseArray2[j][combs[i][j]])
    }

    if (!anyConflicts(schedule1)) {
       console.log("Possible Schedule: ")
       printCourses(schedule1);
       console.log(""); 
    } else {
       console.log("CONFLICT FOUND ")
       printCourses(schedule1);
       console.log(""); 
    } 
}

