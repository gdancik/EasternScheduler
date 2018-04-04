
// outputs courses found to the new window
function printCoursesFound(newWindow, COURSES, COURSE_NUM) {

	newWindow.document.write("<h1> Courses Found </h1>");
	newWindow.document.write("<table>");
	newWindow.document.write("<th>CRN</th>");
	newWindow.document.write("<th>Subj</th>");
	newWindow.document.write("<th>Crse</th>");
	newWindow.document.write("<th>Instructor</th>");
	
	newWindow.document.write("<th>Days</th>");
	newWindow.document.write("<th>Time</th>");
	
	newWindow.document.write("</tr>");


	// output courses that are found
	for (var i = 0; i < COURSE_NUM; i++) {
	
    	// add a 'blank' line between courses
    	if (i> 0 && (COURSES[i].Subj != COURSES[i-1].Subj || COURSES[i].Crse != COURSES[i-1].Crse)) {
        	newWindow.document.write("<tr style = 'background-color: black'><td colspan=5> </td></tr>");
    	}

		writeCourse(newWindow, COURSES[i], i)
	}
	
	newWindow.document.write("</table>");
	newWindow.document.write("<br/><br/>");
}




// write course information -- used to output list of all courses
function writeCourse(newWindow, c, i) {

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
			newWindow.document.write("<td>"+COURSES[i].Instructor+"</td>");
		} else {
			newWindow.document.write("<td>"+"</td>");
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


// outputs a single schedule to the window
function printSchedule(newWindow, scheduleNum, schedule1) {

		var early = tooEarly(schedule1);
		
        
		
        // TO DO: fix border to only show 1 line by adding
        // style="border-collapse:collapse" in table tag;

		if (early) {
			newWindow.document.write("<div class = 'earlyDiv'>");
		} else {		
			newWindow.document.write("<div class = 'noearlyDiv'>");
		}
	
        var className = "noearlyTable";
        if (early) {
            className = "earlyTable";
        }

        	newWindow.document.write("<h3 style = 'display:inline;'>Schedule " + scheduleNum + "</h3>");       
			newWindow.document.write("<table border = 1 style='border-collapse:collapse' width='60%' class = \"" + className + "\">");
		
        // TO DO: output heading, CRN, Subj, Crse
        newWindow.document.write("<tr>")
        newWindow.document.write("<th width = '10%'>CRN</th>")
        newWindow.document.write("<th width = '10%'>Subject</th>")
        newWindow.document.write("<th width = '10%'>Course Number</th>")
		newWindow.document.write("<th width = '10%'>Instructor</th>")
		
        newWindow.document.write("<th width = '10%'>Day</th>");
        newWindow.document.write("<th width = '20%'>Time</th>");
        newWindow.document.write("</tr>")
            
       	for (var s = 0; s < schedule1.length; s++) {
             
           	var c = schedule1[s];           
	        console.log(c.Subj + " " + c.Crse + " " + c.strDays + c.strTimes);                      
            newWindow.document.write("<tr>");
            newWindow.document.write("<td>" + c.CRN +"</td>");
            newWindow.document.write("<td>" + c.Subj+"</td>");
            newWindow.document.write("<td>" + c.Crse+"</td>");
			newWindow.document.write("<td>" + c.Instructor+"</td>");
			
            newWindow.document.write("<td>" + c.strDays+"</td>");
            newWindow.document.write("<td>" + c.strTimes+"</td>");
            newWindow.document.write("</tr>");
                   
       	}
    
    	newWindow.document.write("</table>");        
    	newWindow.document.write("</div>");        
        newWindow.document.write("<br>");     
       
}
