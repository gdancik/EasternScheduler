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

			if (tme.trim() == "TBA") {
				alert("Days and/or times for the following course is TBA and will not be included in your schedule: " + subj + " " + crse);
				continue;
			}
			
			console.log("Course found " + subj + "-" + crse + " " + dys + ", " + tme);
			var c = new Course(crn, subj, crse, dys, tme) 
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


function writeCourse(c, i) {

	for (var r = 0; r < c.strDays.length; r++) {

		//This will alternate the color of the table rows for easier readability
		if (i % 2 == 0){
			newWindow.document.write("<tr class=\"evenRow\">");
		} else {
			newWindow.document.write("<tr class=\"oddRow\">");
		}


		// output course info, but if multi-row we only output days/times
		if (r == 0) {
			newWindow.document.write("<td>"+COURSES[i].CRN+"</td>");
			newWindow.document.write("<td>"+COURSES[i].Subj+"</td>");
			newWindow.document.write("<td>"+COURSES[i].Crse+"</td>");
		} else {
			newWindow.document.write("<td>"+"</td>");
			newWindow.document.write("<td>"+"</td>");
			newWindow.document.write("<td>"+"</td>");
		}

		// output days and times
		newWindow.document.write("<td>"+COURSES[i].strDays[r]+"</td>");
    	newWindow.document.write("<td>"+COURSES[i].strTimes[r]+"</td>");
		newWindow.document.write("</tr>");
        
    }  
}



for (var i = 0; i < COURSE_NUM; i++) {
	
	//newWindow.document.write("<tr>");

    // add a 'blank' line between courses
    if (i> 0 && (COURSES[i].Subj != COURSES[i-1].Subj || COURSES[i].Crse != COURSES[i-1].Crse)) {
        newWindow.document.write("<tr style = 'background-color: black'><td colspan=5> </td></tr>");
    }

	writeCourse(COURSES[i], i)
}

newWindow.document.write("</table>");
newWindow.document.write("<br/><br/>");

newWindow.document.write("<h1> Available Schedules </h1>");

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

// TO DO: modify code below to output possible schedules to new window in table form:
// CRN | Subject  |  Course number (Crse)

// for each combination
var scheduleNum = 1;
for (i = 0; i < combs.length; i++) {
    
    var schedule1 = [];
    // create schedule for given combination -- NO CHANGES NEEDED
    for (j = 0; j < combs[i].length; j++) {
        schedule1.push(courseArray2[j][combs[i][j]]);
    }

    

    if (!anyConflicts(schedule1)) {

        // MODIFY HERE
         newWindow.document.write("Schedule " + scheduleNum + "<br>");       
        scheduleNum++;
        
        // TO DO: fix border to only show 1 line by adding
        // style="border-collapse:collapse" in table tag;
        newWindow.document.write("<table border = 1 style='border-collapse:collapse'>");

        // TO DO: output heading, CRN, Subj, Crse
        newWindow.document.write("<tr>")
        newWindow.document.write("<th>CRN</th>")
        newWindow.document.write("<th>Subject</th>")
        newWindow.document.write("<th>Course Number</th>")
        newWindow.document.write("<th>Day</th>");
        newWindow.document.write("<th>Time</th>");
        newWindow.document.write("</tr>")
        
    
       for (var s = 0; s < schedule1.length; s++) {
    
         
           var c = schedule1[s];           
           //console.log(c.Subj + " " + c.Crse + " " + c.strDays + c.strTimes);
           
           
           //newWindow.document.write("(" + c.CRN + ") " + c.Subj + " " + c.Crse + "<br>");     
    
           
           // TO DO: if the day is MWF, then highlight in yellow
           //        if the day is TR, then highlight in pink
           //        otherwise no highlight
           //        the day information is in c.strDays
        
           console.log("days = " + c.strDays);
           if (c.strDays == "MWF"){
             newWindow.document.write("<tr style = 'background-color: yellow'>"); 
           }
           else if (c.strDays == "TR"){
              newWindow.document.write("<tr style = 'background-color: pink'>");  
           } else {
               newWindow.document.write("<tr>"); 
           }
            // change to e.g., the day string is equal to "MWF"
            //if (s == 0) {
            //    newWindow.document.write("<tr style = 'background-color: yellow'>");
            //} else {
            //    newWindow.document.write("<tr>");
            //}
           
            newWindow.document.write("<td>" + c.CRN +"</td>");
            newWindow.document.write("<td>" + c.Subj+"</td>");
            newWindow.document.write("<td>" + c.Crse+"</td>");
            newWindow.document.write("<td>" + c.strDays+"</td>");
            newWindow.document.write("<td>" + c.strTimes+"</td>");
            newWindow.document.write("</tr>");
        
           
       }
    
            newWindow.document.write("</table>");
        // END MODIFICATIONS
        
        newWindow.document.write("<br>");     
       
    } else {
    //    newWindow.document.write("Schedule " + (i+1) + " -- CONFLICT<br>");       
    } 
}

