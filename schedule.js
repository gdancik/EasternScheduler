// This script highlights all occurences of 'qry'. The variable 'qry' should
// be set before calling this script

// TO DO: extract CRN add to Course object; modify code to work 
// for courses offered multiple times over different days

alert("in schedule.js");

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
    		var dys = rows[i].cells[10].innerText;
    		var tme = rows[i].cells[11].innerText;
			var Instructor = rows[i].cells[21].innerText;
			

			if (tme.trim() == "TBA") {
				alert("Days and/or times for the following course is TBA and will not be included in your schedule: " + subj + " " + crse);
				continue;
			}
			
			console.log("Course found " + subj + "-" + crse + " " + dys + ", " + tme + ", " + Instructor);
			var c = new Course(crn, subj, crse, dys, tme, Instructor) 
			
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


console.log("COURSES FOUND: " + COURSE_NUM);




// create new window and output the results

var newWindow = window.open("", null);
newWindow.document.write("<head>");
newWindow.document.write("<style>");

newWindow.document.write(".evenRow {\n");
newWindow.document.write("  background-color:lightgray;\n");
newWindow.document.write("}\n");

newWindow.document.write(".earlyTable {\n");
newWindow.document.write("  background-color:lightcoral;\n");
newWindow.document.write("}\n");

newWindow.document.write(".noearlyTable {\n");
newWindow.document.write("  background-color:lightyellow;\n");
newWindow.document.write("}\n");


newWindow.document.write("</style>");

newWindow.document.write("</head>");

newWindow.document.write("<div id = \"body\">");
newWindow.document.write("</div>");

printCoursesFound(newWindow, COURSES, COURSE_NUM);


// output available schedules

newWindow.document.write("<h1> Available Schedules </h1>");

//newWindow.document.write('<script src="schedule.js"></script>')


//newWindow.document.write('<button type="button" onclick="myClick()" id="b1"> Click me to hide the early schedule</button>')

newWindow.document.write("<button onclick='myClick()' id='b1'> Click me to hide schedules with courses that start before 9:00 am</button>")


var f = "earlyCount = 1;\n" + 
  "function myClick() {\n" +

	"//alert(\"in myClick\");\n" +

    "tables = document.getElementsByClassName('earlyDiv')\n" +
    "console.log(\"num found = \" + tables.length);\n" + 
    "var type = 'none';\n" +
    "if (earlyCount == 2){\n" +
    "     type = 'block';\n" +
    "}\n" +
 "   for (var i = 0; i < tables.length; i++) {" +
     "       tables[i].style.display = type;" +
         "   }" +
     "earlyCount = earlyCount + 1;\n" +
       "document.getElementById('b1').innerText = 'Click me to show all possible schedules';\n" +
     "if (earlyCount >2) {\n" +
     "  earlyCount = 1;\n" +
       "document.getElementById('b1').innerText = 'Click me to hide schedules with courses before 9:00am';\n" +
     "}" +
"};";




   var newScript = document.createElement("script");
   var inlineScript = document.createTextNode(f);
   newScript.appendChild(inlineScript); 
   newWindow.document.getElementById("body").appendChild(newScript);


newWindow.document.write("<br>")

newWindow.document.write("<br>")


// output course information to console
console.log("");
console.log("");


// create second course array (courseArray2) for valid courses only
var courseArray2 = [];  
for (i = 0; i < courseArray.length; i++) {
    if (courseArray[i].length == 0) {
        newWindow.alert("The course " + courses[i] + " was not found");
    } else {
        courseArray2.push(courseArray[i]);
    } 
}

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
       	printCourses(schedule1);
       	scheduleNum++;
       	console.log("");
       	printSchedule(newWindow, scheduleNum, schedule1);        
    } else {
       console.log("CONFLICT FOUND ")
       printCourses(schedule1);
       console.log(""); 
    } 
}


