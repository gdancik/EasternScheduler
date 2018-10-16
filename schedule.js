// This script identifies valid schedules based on 'qry', which is
// a list of courses, e.g., CSC 210, MAT 243, etc. The variable 'qry' is  
// set by popup.js before calling this script


console.log = function(x){}

if (typeof(qry) == "undefined") {
    alert("Error: qry is not set");
} 


// output the query to the console
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

// look through schedule
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
            var sec = rows[i].cells[5].innerText;
            var title = rows[i].cells[8].innerText;
            if (title == "Laboratory") {
                crse += " (lab)";
            }
    		var dys = rows[i].cells[10].innerText;
    		var tme = rows[i].cells[11].innerText;
			var Instructor = rows[i].cells[21].innerText;
			

			if (tme.trim() == "TBA") {
				alert("Days and/or times for the following course is TBA and will not be included in your schedule: " + subj + " " + crse);
				continue;
			}
			
			console.log("Course found " + subj + "-" + crse + " " + dys + ", " + tme + ", " + Instructor);
			var c = new Course(crn, subj, crse, sec, title, dys, tme, Instructor) 
			
			// check next row since some courses take 2 rows
			if(i<rows.length-1) {
				if (rows[i+1].cells[2].innerText.trim() == "") {
					c.addTime(rows[i+1].cells[10].innerText, rows[i+1].cells[11].innerText);
				}
			}

		    COURSES[COURSE_NUM] = c;
		    COURSE_NUM++;
		    
            courseArray[j].push(c);

		} // end if statement
		
	} //end inner inner for loop
	  
  } // end inner for loop
	
} // end  outer for loop


console.log("NUMBER OF COURSES FOUND: " + COURSE_NUM);


// create new window to output the courses found and possible schedules

var newWindow = window.open("", null);
newWindow.document.write("<html>");
newWindow.document.write("<head>");
newWindow.document.write("<title>Possible Schedules</title>");
newWindow.document.write("<style>");

newWindow.document.write(".evenRow {\n");
newWindow.document.write("  background-color:lightgray;\n");
newWindow.document.write("}\n");

newWindow.document.write("tr.exclude, td.exclude {\n");
newWindow.document.write("  background-color:red;\n");
newWindow.document.write("	opacity: 0.6;\n");
newWindow.document.write("}\n");

newWindow.document.write("tr.include, td.include {\n");
newWindow.document.write("  background-color:lightgreen;\n");
newWindow.document.write("	opacity: 1.0;\n");
newWindow.document.write("}\n");

newWindow.document.write("td {\n");
newWindow.document.write("  text-align:center;\n");
newWindow.document.write("}\n");


newWindow.document.write("</style>");
newWindow.document.write("</head>");

newWindow.document.write("<div id = \"body\">");
newWindow.document.write("</div>");

// display table showing the courses that were found
printCoursesFound(newWindow, COURSES, COURSE_NUM);


// output available schedules
newWindow.document.write("<h1 id = 'available'> Available Schedules </h1>");



   // NOTE: ALL javascript functions running on newWindow must be appended here,
   // in the example, 'f' is the name of a function in toggleSchedules.js

    function attachFunction(f, newWindow) {
        var newScript = document.createElement("script");
	    var inlineScript = document.createTextNode(f.toString());
	    newScript.appendChild(inlineScript); 
	    newWindow.document.getElementById("body").appendChild(newScript);
    }

    attachFunction(f0, newWindow);
    attachFunction(f, newWindow);
    attachFunction(f2, newWindow);
    attachFunction(f3, newWindow);
    attachFunction(f4, newWindow);
    attachFunction(f5, newWindow);
    attachFunction(f6, newWindow);
    attachFunction(f7, newWindow);



// output course information to console
console.log("");
console.log("");


// courseArray may contain some courses that have separate labs
// these need to put into their own course
function getLabs(c) {
    var c1 = [];
    var c2 = [];
    for (var i = 0; i < c.length; i++) {
        if (c[i].Title == "Laboratory") {
            c2.push(c[i]);
        } else {
            c1.push(c[i]);
        }
    }
    return [c1,c2];
}



// create second course array (courseArray2) for valid courses only
var courseArray2 = [];  
for (i = 0; i < courseArray.length; i++) {
    if (courseArray[i].length == 0) {
        newWindow.alert("The course " + courses[i] + " was not found");
    } else {
        courseArray2.push(courseArray[i]);
    } 
}

var c2 = [];
for (var i = 0; i < courseArray2.length; i++) {
        var x = getLabs(courseArray2[i]);
        if (x[0].length >0) {
            c2.push(x[0]);
        }
        if (x[1].length >0) {
            c2.push(x[1]);
        }
}

courseArray2 = c2;
// creates lengths array with the number of each course found
lengths = [];
for (i = 0; i < courseArray2.length; i++) {
    lengths.push(courseArray2[i].length);
}

// get index array for all course combinations
combs = combinations(lengths);

// for each combination
var scheduleNum = 0;

for (i = 0; i < combs.length; i++) {

    // create schedule for given combination    
    var schedule1 = [];
    for (j = 0; j < combs[i].length; j++) {
        schedule1.push(courseArray2[j][combs[i][j]])
    }

	// if schedule is good, print it
    if (!anyConflicts(schedule1)) {
       	console.log("Possible Schedule: ")
       	printCourses(schedule1); // print to console
       	scheduleNum++;
       	console.log("");
        // print schedule to window
       	printSchedule(newWindow, scheduleNum, schedule1);     
    } else {
       console.log("CONFLICT FOUND ")
       printCourses(schedule1); // print to console
       console.log(""); 
    } 
}

newWindow.document.write("<script type ='text/javascript'>\nhighlightConflicts();\n</script>");


newWindow.document.getElementById("available").innerHTML = 
    "Available Schedules (" + scheduleNum + " available)";
